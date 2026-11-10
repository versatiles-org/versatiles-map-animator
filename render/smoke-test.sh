#!/usr/bin/env bash
# Checks that a built image starts, without the network:
#
#   render/smoke-test.sh <image> <renderer|server> [platform]
#
# A build can succeed and still give an image that fails at start, e.g. when
# a new Playwright brings a browser that needs a system library missing from
# the list in render/Dockerfile. So the renderer checks:
#   - every binary of the headless shell finds its libraries (`ldd`); that
#     also works for an arm64 image on an amd64 machine, under QEMU
#   - ffmpeg encodes H.264
#   - the headless shell starts and gives a page WebGL (native platform only:
#     the browser under QEMU is too slow and too fragile to tell anything)
#   - render.mjs loads and prints its help
# and the server variant also that it answers HTTP on port 8080.
set -euo pipefail

image="${1:?usage: $0 <image> <renderer|server> [platform]}"
variant="${2:?usage: $0 <image> <renderer|server> [platform]}"
platform="${3:-}"

run() {
	docker run --rm ${platform:+--platform "$platform"} "$@"
}

echo "== libraries of the headless shell"
# shellcheck disable=SC2016 # expanded in the container
run --entrypoint sh "$image" -c '
	missing=$(find /ms-playwright -type f \( -perm -u+x -o -name "*.so*" \) -exec ldd {} + 2>/dev/null | grep "not found" | sort -u)
	if [ -n "$missing" ]; then echo "$missing"; exit 1; fi
'

echo "== ffmpeg"
run --entrypoint ffmpeg "$image" -hide_banner -loglevel error \
	-f lavfi -i testsrc=duration=0.2:size=64x64 -c:v libx264 -f null -

if [ -z "$platform" ]; then
	echo "== headless shell with WebGL"
	run --workdir /app/render --entrypoint node "$image" --input-type=module -e "
		import { chromium } from 'playwright';
		import { chromiumArgs } from './gpu.mjs';
		const browser = await chromium.launch({ args: chromiumArgs() });
		const page = await browser.newPage();
		const renderer = await page.evaluate(() => {
			const gl = document.createElement('canvas').getContext('webgl2');
			return gl && gl.getParameter(gl.RENDERER);
		});
		await browser.close();
		if (!renderer) throw new Error('no WebGL2 context');
		console.log(renderer);
	"
fi

echo "== render.mjs"
run --entrypoint node "$image" /app/render/render.mjs --help >/dev/null

if [ "$variant" = server ]; then
	echo "== server answers HTTP"
	name="smoke-test-$$"
	docker run -d --name "$name" ${platform:+--platform "$platform"} -p 127.0.0.1::8080 "$image" >/dev/null
	trap 'docker rm -f "$name" >/dev/null' EXIT
	port=$(docker port "$name" 8080/tcp | head -n 1 | sed 's/.*://')
	for _ in $(seq 60); do
		if curl -fs -o /dev/null "http://127.0.0.1:$port/"; then
			echo "ok"
			exit 0
		fi
		sleep 1
	done
	docker logs "$name"
	echo "the server did not answer within 60 seconds"
	exit 1
fi

echo "ok"
