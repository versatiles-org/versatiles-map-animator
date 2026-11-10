# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-11-10

### Features

- **render:** progress as JSON, and the video height from the animation's aspect ratio ([806de81](https://github.com/versatiles-org/versatiles-map-animator/commit/806de8146309ca619138322ab8eed011f8d5ee25))
- render server with login, queue, previews and downloads ([306c80b](https://github.com/versatiles-org/versatiles-map-animator/commit/306c80be657650fedd6ca97118af72bf7af13afa))
- render on the server from the editor's video dialog ([debb63c](https://github.com/versatiles-org/versatiles-map-animator/commit/debb63c6ee2c327a9e5699fe0af86ed039c3344f))
- **server:** optional HTTPS with certificates from Let's Encrypt ([d544a41](https://github.com/versatiles-org/versatiles-map-animator/commit/d544a415f400f744fbd698b5b0fd70f1a4fd6320))
- **server:** show hours in the time a render has left ([be6502e](https://github.com/versatiles-org/versatiles-map-animator/commit/be6502e5bcc7c2e17c9a63e580865147977f3bfd))
- **server:** VersaTiles favicon on the login and render pages ([2662987](https://github.com/versatiles-org/versatiles-map-animator/commit/2662987a99aa94241902677e5854343168c781e4))
- **server:** include time in video download names to prevent overwrites ([fae70fd](https://github.com/versatiles-org/versatiles-map-animator/commit/fae70fd6ff92e0f1c1548b3637147869fd436ec8))
- hillshading with terrain on the satellite map too ([910b6dd](https://github.com/versatiles-org/versatiles-map-animator/commit/910b6dd76745d0cca2c53ce91f4adccd5bdc9d39))
- sun on the satellite map, lighting the terrain's hillshade ([329ea4d](https://github.com/versatiles-org/versatiles-map-animator/commit/329ea4df61a83d3aaec0521fd1bd795a40b3e09d))
- add sun configuration to Alps and Corsica examples ([52599be](https://github.com/versatiles-org/versatiles-map-animator/commit/52599be2e87b34b4c95829326b5a48dccda77b7b))
- VersaTiles logo at the top left of the editor, next to the title ([ca6cce9](https://github.com/versatiles-org/versatiles-map-animator/commit/ca6cce99628bf0719be87649b25d69ed938432aa))
- show the attribution of the map data as text, with the VersaTiles logo moved to the left ([692d4bb](https://github.com/versatiles-org/versatiles-map-animator/commit/692d4bb691ccb3eddb6fcff9bfea808cd85a2ca2))
- add donation link and improve footer layout in Sidebar component ([fdf2cfb](https://github.com/versatiles-org/versatiles-map-animator/commit/fdf2cfb3c0a6fa673ae9d26e51684372a324f704))

### Bug Fixes

- **docker:** add libatk-bridge, which Chromium needs on amd64 ([339f72c](https://github.com/versatiles-org/versatiles-map-animator/commit/339f72c356ecafa7ce3d58478a2d8c313ac09f37))
- **server:** renders added in the same millisecond keep their order ([763fc03](https://github.com/versatiles-org/versatiles-map-animator/commit/763fc033084e25d76635b9e69957e9f623750c11))
- **server:** button labels centered in the render list ([9582e04](https://github.com/versatiles-org/versatiles-map-animator/commit/9582e0490ce0d05ecad33c57bbef9041806f91c4))
- pass the sun as the light option of @versatiles/style 7 ([c8d46d3](https://github.com/versatiles-org/versatiles-map-animator/commit/c8d46d3c25a269d3c1ce2462e55a59a1778a4a05))
- draw the low-zoom land cover of the tiles when the land cover group is shown ([e0a7dda](https://github.com/versatiles-org/versatiles-map-animator/commit/e0a7dda56dbc7af600d347f18a3d396cd7bb8d20))
- enhance upgrade script to include dependency updates in the render directory ([62051c5](https://github.com/versatiles-org/versatiles-map-animator/commit/62051c5a0ce43aea1d3ef333dd755f46dba75c6c))

### Performance Improvements

- **render:** keep terrain textures whose picture the zoom does not change ([9bdb3d3](https://github.com/versatiles-org/versatiles-map-animator/commit/9bdb3d3556c490a3a47f3bbb479b1a5b8ff1bb53))

### Code Refactoring

- group the Svelte components into top_bar, sidebar, map_stage and timeline folders ([bc55025](https://github.com/versatiles-org/versatiles-map-animator/commit/bc55025d72cccd1ab795677ad634fa0d491d7928))
- improve land cover handling in buildBaseStyle function ([0750852](https://github.com/versatiles-org/versatiles-map-animator/commit/0750852481b1bcb2ac205b8950ad36af5766d476))

### Documentation

- **server:** how to update the server ([a55b5bc](https://github.com/versatiles-org/versatiles-map-animator/commit/a55b5bc679b19feb81e98aca5e9dfafa26d68eb7))
- editor screenshot in the README and as the link-preview image ([86c499c](https://github.com/versatiles-org/versatiles-map-animator/commit/86c499ce5803716da389b0e82f39b5797e27ae72))
- leave types.ts and fonts.ts out of the dependency graph ([6e8925a](https://github.com/versatiles-org/versatiles-map-animator/commit/6e8925a245d9529940f67e36f6eb9c7a701b7b71))
- remove collapse-dir configuration from deps-graph in vrt.config.json ([88a98f4](https://github.com/versatiles-org/versatiles-map-animator/commit/88a98f465ef00d1b43b3600e62aabbfaa1da80b9))

### Tests

- follow the renamed tile sources of @versatiles/style 9.1 ([7883e13](https://github.com/versatiles-org/versatiles-map-animator/commit/7883e139513b5c6431a63d499bfc00d71e6c5a8b))
- **e2e:** match tile paths with hyphens, as in osm-vector ([4a7eadc](https://github.com/versatiles-org/versatiles-map-animator/commit/4a7eadc9a6c6b5b63485da3b05a3f3d09438c1ef))

### Build System

- release with vrt release-npm and list the images in the release notes ([3fab34e](https://github.com/versatiles-org/versatiles-map-animator/commit/3fab34e8631ac9382a168b1b2e0dc243b2c80702))

### CI/CD

- render server image as a variant of the renderer image ([d4a436e](https://github.com/versatiles-org/versatiles-map-animator/commit/d4a436ef13bf9aadea07f1717cb4628f72c59219))
- push the render images only after the tests pass ([3f0bdd7](https://github.com/versatiles-org/versatiles-map-animator/commit/3f0bdd7cf3e682b931bbc773bedc0567ad8a6923))
- smoke-test the render images on both platforms before pushing them ([e9fac5a](https://github.com/versatiles-org/versatiles-map-animator/commit/e9fac5a2e2b88ca4e30fadf13f035c4a1829b3c0))
- skip CI for changes to documentation only ([52b1825](https://github.com/versatiles-org/versatiles-map-animator/commit/52b1825812bf0164d853246072f58b5efdaea5b9))
- build the render images on pull requests only when they can change ([04c5aa3](https://github.com/versatiles-org/versatiles-map-animator/commit/04c5aa3294f243284a221db6f4b75f8d47d7c379))
- add a release workflow that tags the tested images with the version ([29f8bd1](https://github.com/versatiles-org/versatiles-map-animator/commit/29f8bd1ed3af1cbe4d9350426215e431181fc1bc))

### Chores

- **deps:** update dependencies to latest versions ([317fb9c](https://github.com/versatiles-org/versatiles-map-animator/commit/317fb9c1d58175f028b72ae818302120b81c9d73))
- update dependencies to latest versions ([f1aa4c1](https://github.com/versatiles-org/versatiles-map-animator/commit/f1aa4c1ed79dd538bd5d3498e4a02b7d1a4cd5d6))
- update playwright dependency to version 1.64.1 ([43f9bc3](https://github.com/versatiles-org/versatiles-map-animator/commit/43f9bc3e41a6afaa7a0eac4d42d0a6a17e90f5a6))
- add doc-graph script and update upgrade command in package.json ([5ed066a](https://github.com/versatiles-org/versatiles-map-animator/commit/5ed066ae6236c906dc89853f63d65eba914712de))
- update dependencies in package.json and package-lock.json ([35402ab](https://github.com/versatiles-org/versatiles-map-animator/commit/35402ab238676d5464ba95bf3c639d2ef86771ce))
- update dependencies in package.json and package-lock.json ([c03b1e0](https://github.com/versatiles-org/versatiles-map-animator/commit/c03b1e0f3ec0c13163bf1c3e64e87582e136a616))
- update dependencies to latest versions ([5b33d6d](https://github.com/versatiles-org/versatiles-map-animator/commit/5b33d6dae162809e6df259b4ade0446ffe932294))

### Other Changes

- Add VRT configuration for dependency graph generation ([941fcb4](https://github.com/versatiles-org/versatiles-map-animator/commit/941fcb4f987052c3a6adf17573763a96ab9810a4))

