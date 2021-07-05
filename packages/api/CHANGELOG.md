# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.22.1-alpha.0](https://github.com/centraldigital/centech-api/compare/versions/2.22.1%0Dversions/2.22.1-alpha.0) (2021-04-01)

### [2.22.1](https://github.com/centraldigital/centech-api/compare/versions/2.22.0-alpha.18%0Dversions/2.22.1) (2021-04-01)


### Bug Fixes

* ignore PersistedQueryNotFound on Sentry ([#228](https://github.com/centraldigital/centech-api/issues/228)) ([1648607](https://github.com/centraldigital/centech-api/commits/1648607c747b29562f227ee2b32da1a834a82ed9))


### Others

* **release:** 2.22.0 [skip ci] ([ae0b7f3](https://github.com/centraldigital/centech-api/commits/ae0b7f3362553b157b8cdd0b09aaeff6d77eda9d))
* **release:** 2.22.0-alpha.19 [skip ci] ([fee6e85](https://github.com/centraldigital/centech-api/commits/fee6e852c2f5ae1ad640a4639ba2b855041aae80))

## [2.21.0](https://github.com/centraldigital/centech-api/compare/versions/2.21.0-alpha.7%0Dversions/2.21.0) (2021-03-11)


### Features

* add feature flag similar product ([64f5ee3](https://github.com/centraldigital/centech-api/commits/64f5ee33185d77270967cce1d7f89f746df20e58))


### Bug Fixes

* add sentry error when timeout ([9ffb9fc](https://github.com/centraldigital/centech-api/commits/9ffb9fc485fd2830e94b2d6f26efbba8e5ba85bb))
* add try catch on redlock ([2f0c578](https://github.com/centraldigital/centech-api/commits/2f0c578b7f75dcf077e8875870fdbfde8689ef69))
* update condition to push sentry ([290fd30](https://github.com/centraldigital/centech-api/commits/290fd30bd79d9f24b2779e158898fdc969ef214c))


### Reverts

* Revert "feat: [DSC-1260] return subcategory filter when send `baseCategoryId` on query (#159)" (#180) ([ec1f0b0](https://github.com/centraldigital/centech-api/commits/ec1f0b01ef053541cd6843b668c50a1a2ea0ac73)), closes [#159](https://github.com/centraldigital/centech-api/issues/159) [#180](https://github.com/centraldigital/centech-api/issues/180)
* Revert "feat: [CON-460] pwbProductAssociationBySku (you may like) (#158)" (#178) ([b43311b](https://github.com/centraldigital/centech-api/commits/b43311beb138f85fb8de1b26005b78b257298210)), closes [#158](https://github.com/centraldigital/centech-api/issues/158) [#178](https://github.com/centraldigital/centech-api/issues/178)


### Others

* **release:** 2.19.12 [skip ci] ([7395271](https://github.com/centraldigital/centech-api/commits/7395271b85fa25afa044f38b65fcad5e2a0f68ba))
* **release:** 2.19.13 [skip ci] ([5e809a4](https://github.com/centraldigital/centech-api/commits/5e809a479168d471915c1b143ea66c35d9b5a4ed))
* **release:** 2.21.0-alpha.10 [skip ci] ([9cc26ee](https://github.com/centraldigital/centech-api/commits/9cc26eefa4d5437fdb33f71284df971159fea79f))
* **release:** 2.21.0-alpha.8 [skip ci] ([1cf094c](https://github.com/centraldigital/centech-api/commits/1cf094c288fbfa689987048bfdf56c1ed67da6a5))
* **release:** 2.21.0-alpha.9 [skip ci] ([b5f6d51](https://github.com/centraldigital/centech-api/commits/b5f6d51a707908dfee0a0b243f21b0f4de585fab))

### [2.19.11](https://github.com/centraldigital/centech-api/compare/versions/2.21.0-alpha.6%0Dversions/2.19.11) (2021-03-10)


### Features

* add responseCache plugin for v2ProductSearch ([698aa0c](https://github.com/centraldigital/centech-api/commits/698aa0c4f8f1f05feb94dc228710e4891ecbd0e8))


### Bug Fixes

* add redlock on redis client ([f885cfb](https://github.com/centraldigital/centech-api/commits/f885cfbe1ee0a2a8234ed8a8662fd19fac232fb8))
* add RESPONSE_CACHE_PLUGIN_ENABLE flag ([1db257e](https://github.com/centraldigital/centech-api/commits/1db257eed590dd9ba42ddc239eec922f9f933b28))
* add RESPONSE_CACHE_PLUGIN_ENABLE flag ([289c1b8](https://github.com/centraldigital/centech-api/commits/289c1b84b6cb4eece4ebd09df4737a9c3fea0c59))
* add RESPONSE_CACHE_PLUGIN_ENABLE flag ([9c3c573](https://github.com/centraldigital/centech-api/commits/9c3c573bbd7ab9df99215e3572e1db46708e7e7b))
* update logic ([87622a5](https://github.com/centraldigital/centech-api/commits/87622a5a3f916b7b341281c91ab7f1cd7030a5a6))
* update redlock logic ([9300495](https://github.com/centraldigital/centech-api/commits/930049519311395ec1243bcc9ecf0919107ba7d1))


### Others

* **release:** 2.19.11 [skip ci] ([b57aafe](https://github.com/centraldigital/centech-api/commits/b57aafeb17cc5b5d29503140df53744012e4380e))

### [2.19.10](https://github.com/centraldigital/centech-api/compare/versions/2.21.0-alpha.2%0Dversions/2.19.10) (2021-03-09)


### Bug Fixes

* ignore app background by  header ([db4e2c1](https://github.com/centraldigital/centech-api/commits/db4e2c1993a4a128f3a3cbafdb62b289477a1f88))


### Others

* **release:** 2.19.10 [skip ci] ([765e216](https://github.com/centraldigital/centech-api/commits/765e216a2f0c973ca3ebddaf9a8dd07c838a4fc8))

### [2.19.9](https://github.com/centraldigital/centech-api/compare/versions/2.19.8%0Dversions/2.19.9) (2021-03-05)


### Bug Fixes

* check redis read write config before set cache ([1e0392e](https://github.com/centraldigital/centech-api/commits/1e0392e5dcfd35169eaa94ee73736883335755a2))


### Others

* **release:** 2.19.9 [skip ci] ([bf79e4a](https://github.com/centraldigital/centech-api/commits/bf79e4a3afe3f10359dff72d8d304bb0597808f7))

### [2.19.8](https://github.com/centraldigital/centech-api/compare/versions/2.19.8-alpha.0%0Dversions/2.19.8) (2021-03-04)


### Others

* **release:** 2.19.8 [skip ci] ([fdd47b7](https://github.com/centraldigital/centech-api/commits/fdd47b740e57b2ea26373af9d45744a840dca5f2))

### [2.19.8-alpha.0](https://github.com/centraldigital/centech-api/compare/versions/2.19.7%0Dversions/2.19.8-alpha.0) (2021-03-04)


### Others

* **release:** 2.19.8-alpha.0 [skip ci] ([39e6546](https://github.com/centraldigital/centech-api/commits/39e6546a8999caea7656cb1291b1d81e309c6640))

### [2.19.7](https://github.com/centraldigital/centech-api/compare/versions/2.19.6%0Dversions/2.19.7) (2021-03-04)


### Bug Fixes

* add missing file ([b12619a](https://github.com/centraldigital/centech-api/commits/b12619a912e21643da23355b0aa15d7c0185faad))
* remove non used ([c9d499d](https://github.com/centraldigital/centech-api/commits/c9d499d32f0993f5d998b05235ceb851f60bc991))


### Others

* **release:** 2.19.7 [skip ci] ([ed5631d](https://github.com/centraldigital/centech-api/commits/ed5631de9e21abd3b35859c049ce981f38e0574f))

### [2.19.6](https://github.com/centraldigital/centech-api/compare/versions/2.19.5%0Dversions/2.19.6) (2021-03-04)


### Features

* add manual redis master slave ([59b78d3](https://github.com/centraldigital/centech-api/commits/59b78d3c453101cae77144bb4465f2964ead83ee))


### Others

* **release:** 2.19.6 [skip ci] ([c7c9e64](https://github.com/centraldigital/centech-api/commits/c7c9e6478c7736a544c931fa97ae9bc94ed45b4b))

### [2.19.5](https://github.com/centraldigital/centech-api/compare/versions/2.19.5-alpha.1%0Dversions/2.19.5) (2021-03-04)


### Bug Fixes

* remove debug error on redis ([5acce68](https://github.com/centraldigital/centech-api/commits/5acce68e63acaee9d728db758cfb4d877368e37d))


### Others

* **release:** 2.19.5 [skip ci] ([b5070ca](https://github.com/centraldigital/centech-api/commits/b5070ca4706868bffc856bd0767a4dc6eddcc1c6))

### [2.19.5-alpha.1](https://github.com/centraldigital/centech-api/compare/versions/2.19.5-alpha.0%0Dversions/2.19.5-alpha.1) (2021-03-04)


### Others

* **release:** 2.19.5-alpha.1 [skip ci] ([4f40f46](https://github.com/centraldigital/centech-api/commits/4f40f4686139ca44034c419474a0c5bce9acad36))

### [2.19.5-alpha.0](https://github.com/centraldigital/centech-api/compare/versions/2.19.4%0Dversions/2.19.5-alpha.0) (2021-03-04)


### Others

* **release:** 2.19.5-alpha.0 [skip ci] ([4a66ba4](https://github.com/centraldigital/centech-api/commits/4a66ba431a0cb0036a12056eec357a0536a2c3bf))

### [2.19.4](https://github.com/centraldigital/centech-api/compare/versions/2.19.3%0Dversions/2.19.4) (2021-03-04)


### Bug Fixes

* redis condition on graphql ([3189b67](https://github.com/centraldigital/centech-api/commits/3189b67e217f9cb501aeb48e63f70f6b1ec2c423))


### Others

* **release:** 2.19.4 [skip ci] ([fd6652b](https://github.com/centraldigital/centech-api/commits/fd6652b29e42bdda39f27682791779e40ec2b734))

### [2.19.3](https://github.com/centraldigital/centech-api/compare/versions/2.20.0-alpha.3%0Dversions/2.19.3) (2021-03-04)


### Others

* **release:** 2.19.3 [skip ci] ([13dac45](https://github.com/centraldigital/centech-api/commits/13dac458de333f9d43533d7034e837df8c5b6cb2))

### [2.19.2](https://github.com/centraldigital/centech-api/compare/versions/2.19.1%0Dversions/2.19.2) (2021-03-01)


### Bug Fixes

* close categories.id filter ([#123](https://github.com/centraldigital/centech-api/issues/123)) ([d1a00e2](https://github.com/centraldigital/centech-api/commits/d1a00e263143970300b93e45accc42ea5a5d62c2))


### Others

* **release:** 2.19.2 [skip ci] ([09e06f8](https://github.com/centraldigital/centech-api/commits/09e06f8ebbfa3ccc1aeea8acc105294ddc0f7049))

### [2.19.1](https://github.com/centraldigital/centech-api/compare/versions/2.19.0%0Dversions/2.19.1) (2021-02-26)


### Reverts

* Revert "feature: [POP-649] create order tracking api (#100)" ([6215955](https://github.com/centraldigital/centech-api/commits/62159559c74f7bfa031a0408b5d2020790985b2c)), closes [#100](https://github.com/centraldigital/centech-api/issues/100)


### Others

* **release:** 2.19.1 [skip ci] ([d74a7bc](https://github.com/centraldigital/centech-api/commits/d74a7bc3042cf8264e7a6cde50fbe30271f9780a))

## [2.19.0](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.35%0Dversions/2.19.0) (2021-02-26)


### Others

* **release:** 2.19.0 [skip ci] ([cb340df](https://github.com/centraldigital/centech-api/commits/cb340dfd8016180a800b3706cf343a683c0bc5c8))

## [2.19.0-alpha.35](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.34%0Dversions/2.19.0-alpha.35) (2021-02-25)


### Bug Fixes

* setting guess customer id as 00000 ([6fffac8](https://github.com/centraldigital/centech-api/commits/6fffac8fd9513bd499a46a120896539d2994b732))


### Others

* **release:** 2.19.0-alpha.35 [skip ci] ([83b00af](https://github.com/centraldigital/centech-api/commits/83b00afa248c428c4e1f02ee5d2426ad6e636579))

## [2.19.0-alpha.34](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.33%0Dversions/2.19.0-alpha.34) (2021-02-25)


### Others

* **release:** 2.19.0-alpha.34 [skip ci] ([8ff0684](https://github.com/centraldigital/centech-api/commits/8ff0684378d59023f4ab3dd68a43cd1900ba2654))

## [2.19.0-alpha.33](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.32%0Dversions/2.19.0-alpha.33) (2021-02-25)


### Bug Fixes

* Cannot set property 'ttl' of undefined on CNC-901 ([709d82a](https://github.com/centraldigital/centech-api/commits/709d82a8bbed945676ed1c896dc7df759c096b71))
* change type error on `Invalid store on headers` ([aebaf7c](https://github.com/centraldigital/centech-api/commits/aebaf7cb01b1af2a700da6a53450c68e23e59cc7))


### Others

* **release:** 2.19.0-alpha.33 [skip ci] ([ff0522f](https://github.com/centraldigital/centech-api/commits/ff0522fae7816a38bf9f22367a90ea0752983a9d))

## [2.19.0-alpha.32](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.31%0Dversions/2.19.0-alpha.32) (2021-02-25)


### Bug Fixes

* [LNI-718] To improve this resolve to have filter visibility 2 and 4 ([#111](https://github.com/centraldigital/centech-api/issues/111)) ([5423183](https://github.com/centraldigital/centech-api/commits/54231833d360366b46198f7c80ddf1f6ccd18ac9))
* improvement in this resolver to have filter visibility ([26cfb87](https://github.com/centraldigital/centech-api/commits/26cfb872eb2dbe19917c250211bbe1e89aaf6d4f))


### Others

* **release:** 2.19.0-alpha.32 [skip ci] ([d5ea86f](https://github.com/centraldigital/centech-api/commits/d5ea86f5b0224f150386d40b0ea2b61844e77e7c))

## [2.19.0-alpha.31](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.30%0Dversions/2.19.0-alpha.31) (2021-02-25)


### Others

* **release:** 2.19.0-alpha.31 [skip ci] ([e535fb9](https://github.com/centraldigital/centech-api/commits/e535fb9c50a344dcfdd4bedea0cd3fdf032ac8ee))

## [2.19.0-alpha.30](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.29%0Dversions/2.19.0-alpha.30) (2021-02-25)


### Others

* **release:** 2.19.0-alpha.30 [skip ci] ([3d5c76f](https://github.com/centraldigital/centech-api/commits/3d5c76fef4bf792ff976b53874f1857bf1ab3e44))

## [2.19.0-alpha.29](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.28%0Dversions/2.19.0-alpha.29) (2021-02-24)


### Bug Fixes

* CVE-2021-23840 by `apk upgrade -U -a` in Dockerfile ([7f056d2](https://github.com/centraldigital/centech-api/commits/7f056d2137cceaff4bc64c67741e5f19dbf3ba21))


### Others

* **release:** 2.19.0-alpha.29 [skip ci] ([cf5dd0d](https://github.com/centraldigital/centech-api/commits/cf5dd0db8bf9afdb9c089febba5ba94d55625128))

## [2.19.0-alpha.28](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.27%0Dversions/2.19.0-alpha.28) (2021-02-24)


### Others

* **release:** 2.19.0-alpha.28 [skip ci] ([56eee61](https://github.com/centraldigital/centech-api/commits/56eee61a9ea644817b124eb4d190f44c731327b7))

## [2.19.0-alpha.27](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.26%0Dversions/2.19.0-alpha.27) (2021-02-24)


### Others

* **release:** 2.19.0-alpha.27 [skip ci] ([5a73bcc](https://github.com/centraldigital/centech-api/commits/5a73bcc728cedbab72925503db6ea8ccfaf0051a))

## [2.19.0-alpha.26](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.25%0Dversions/2.19.0-alpha.26) (2021-02-24)


### Others

* **release:** 2.19.0-alpha.26 [skip ci] ([4c81524](https://github.com/centraldigital/centech-api/commits/4c815240d42e163bdff8fbbc70a55d4073805fe2))

## [2.19.0-alpha.25](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.24%0Dversions/2.19.0-alpha.25) (2021-02-24)


### Others

* **release:** 2.19.0-alpha.25 [skip ci] ([fe6639a](https://github.com/centraldigital/centech-api/commits/fe6639a14b6908a68bf2596e4ce9613a134bc81f))

## [2.19.0-alpha.24](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.23%0Dversions/2.19.0-alpha.24) (2021-02-23)


### Others

* **release:** 2.19.0-alpha.24 [skip ci] ([5503da4](https://github.com/centraldigital/centech-api/commits/5503da4d8da3d5efcb6a23e5ef83bbec9c15f602))


### CI

* fix report-portal pipeline ([9d59321](https://github.com/centraldigital/centech-api/commits/9d5932165a60b677b573186672dd9f6ec02c2df2))

## [2.19.0-alpha.23](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.22%0Dversions/2.19.0-alpha.23) (2021-02-23)


### Others

* **release:** 2.19.0-alpha.23 [skip ci] ([7184b51](https://github.com/centraldigital/centech-api/commits/7184b516568dd459d82e27caa01b31c2a362bf08))

## [2.19.0-alpha.22](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.21%0Dversions/2.19.0-alpha.22) (2021-02-23)


### Others

* **release:** 2.19.0-alpha.22 [skip ci] ([d6cbfea](https://github.com/centraldigital/centech-api/commits/d6cbfeae68f5a26a6c71a48131e609c398a5bee4))

## [2.19.0-alpha.21](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.20%0Dversions/2.19.0-alpha.21) (2021-02-23)


### Others

* **release:** 2.19.0-alpha.21 [skip ci] ([4dfae25](https://github.com/centraldigital/centech-api/commits/4dfae25105d6515a63af1ee2d1948617c4a17879))

## [2.19.0-alpha.20](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.19%0Dversions/2.19.0-alpha.20) (2021-02-23)


### Bug Fixes

* [DSC-625] add cacheKeyFor ([2ba016e](https://github.com/centraldigital/centech-api/commits/2ba016ef693297627b10c8d1c847920490ba522f))
* [DSC-625] trim data ([cc4c649](https://github.com/centraldigital/centech-api/commits/cc4c6497f21a0e1b1f75b81fc0d7af1ee96b712b))


### Others

* **release:** 2.19.0-alpha.20 [skip ci] ([cd28965](https://github.com/centraldigital/centech-api/commits/cd28965aa9a7e7dc7fe92227d756d6f718641bd9))

## [2.19.0-alpha.19](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.18%0Dversions/2.19.0-alpha.19) (2021-02-23)


### Others

* **release:** 2.19.0-alpha.19 [skip ci] ([a07d531](https://github.com/centraldigital/centech-api/commits/a07d531973188e1fea8e665a393d068914996106))

## [2.19.0-alpha.18](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.17%0Dversions/2.19.0-alpha.18) (2021-02-23)


### Others

* **release:** 2.19.0-alpha.18 [skip ci] ([828c84b](https://github.com/centraldigital/centech-api/commits/828c84b8d51a2d705509b453bac26b0c966f1491))

## [2.19.0-alpha.17](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.16%0Dversions/2.19.0-alpha.17) (2021-02-23)


### Bug Fixes

* [DSC-835] handle client send empty store on header default to TH ([#75](https://github.com/centraldigital/centech-api/issues/75)) ([5206d68](https://github.com/centraldigital/centech-api/commits/5206d68168774e99d033033854a79f49d0164043))
* change type int to float on amount in V2ShippingMethods type ([#97](https://github.com/centraldigital/centech-api/issues/97)) ([d78e694](https://github.com/centraldigital/centech-api/commits/d78e69417250accd53b764e1d9673a2573c17b25))


### Others

* **release:** 2.19.0-alpha.17 [skip ci] ([a0efeed](https://github.com/centraldigital/centech-api/commits/a0efeedad2702ca3c4834da8c6293546ad714561))

## [2.19.0-alpha.16](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.15%0Dversions/2.19.0-alpha.16) (2021-02-23)


### Bug Fixes

* reverse review.imageUrls support full path ([#95](https://github.com/centraldigital/centech-api/issues/95)) ([b0f811c](https://github.com/centraldigital/centech-api/commits/b0f811cd8717b4a7b58eba531ca423c680df0d20))


### Others

* **release:** 2.19.0-alpha.16 [skip ci] ([e8abc87](https://github.com/centraldigital/centech-api/commits/e8abc87e54b6ea32baaf4ebaa29e8220b2f9bdee))

## [2.19.0-alpha.15](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.14%0Dversions/2.19.0-alpha.15) (2021-02-23)


### Others

* **release:** 2.19.0-alpha.15 [skip ci] ([65a3f1b](https://github.com/centraldigital/centech-api/commits/65a3f1b591a131ae40b7a9f0aecdeb4f325b9c75))

## [2.19.0-alpha.14](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.13%0Dversions/2.19.0-alpha.14) (2021-02-23)


### Others

* **release:** 2.19.0-alpha.14 [skip ci] ([1589341](https://github.com/centraldigital/centech-api/commits/1589341f068b546765ddc24ea5b91e30c2097c17))

## [2.19.0-alpha.13](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.12%0Dversions/2.19.0-alpha.13) (2021-02-23)


### Features

* [CON-147] expose product video media ([#88](https://github.com/centraldigital/centech-api/issues/88)) ([267385b](https://github.com/centraldigital/centech-api/commits/267385bf2b1ac2ea0bc43450ba6f2b67285c5077))
* [DSC-625] create query `v2SuggestKeywordSearch` get data from elastic search ([#96](https://github.com/centraldigital/centech-api/issues/96)) ([5d2d019](https://github.com/centraldigital/centech-api/commits/5d2d019f6539cb7793cf5f584fd8a915701cfe39))


### Bug Fixes

* enable category filter ([ac9be88](https://github.com/centraldigital/centech-api/commits/ac9be881de97087d25a74328151e9861c5f3794b))


### Others

* **release:** 2.19.0-alpha.13 [skip ci] ([ac53e07](https://github.com/centraldigital/centech-api/commits/ac53e07a420349bd523d6c6441227e980158c448))

## [2.19.0-alpha.12](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.11%0Dversions/2.19.0-alpha.12) (2021-02-23)


### Others

* **release:** 2.19.0-alpha.12 [skip ci] ([6b2ff0d](https://github.com/centraldigital/centech-api/commits/6b2ff0d1d59788c0ff687950f46259be9cfe77e1))

## [2.19.0-alpha.11](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.10%0Dversions/2.19.0-alpha.11) (2021-02-23)


### Bug Fixes

* [DSC-625] fix code smell ([1921fd6](https://github.com/centraldigital/centech-api/commits/1921fd6289ec634f133e8c7ed57f08e427efc8df))


### Others

* **release:** 2.19.0-alpha.11 [skip ci] ([d5457ad](https://github.com/centraldigital/centech-api/commits/d5457ad3bd1e17168ab816604aded64da0aac812))


### Tests

* add unit test ([dda7c16](https://github.com/centraldigital/centech-api/commits/dda7c1637a9a37cec969da7b261a256845111af0))

## [2.19.0-alpha.10](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.9%0Dversions/2.19.0-alpha.10) (2021-02-22)


### Features

* [DSC-625] elastic search change interface ([f16092e](https://github.com/centraldigital/centech-api/commits/f16092e6e9e565ef91422a8059481833d2b89177))


### Others

* **release:** 2.19.0-alpha.10 [skip ci] ([d391727](https://github.com/centraldigital/centech-api/commits/d3917273faafc7691fb84f40c8eb9cb8b6248cea))

## [2.19.0-alpha.9](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.8%0Dversions/2.19.0-alpha.9) (2021-02-22)


### Others

* **release:** 2.19.0-alpha.9 [skip ci] ([99fdf58](https://github.com/centraldigital/centech-api/commits/99fdf584ec56fa247ec2340d8b16f95d3abbbc41))

## [2.19.0-alpha.8](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.7%0Dversions/2.19.0-alpha.8) (2021-02-22)


### Others

* **release:** 2.19.0-alpha.8 [skip ci] ([286e1aa](https://github.com/centraldigital/centech-api/commits/286e1aa3d1d82319469e58a073abb503c9fe3208))

## [2.19.0-alpha.7](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.6%0Dversions/2.19.0-alpha.7) (2021-02-22)


### Bug Fixes

* check each step to failure ([467c11b](https://github.com/centraldigital/centech-api/commits/467c11b43ebb3efb0d41c5a2b0dbd4255aac87be))
* update condition check pipeline ([83a4870](https://github.com/centraldigital/centech-api/commits/83a48709849a85e3e7c8c9a3e103d04711b684cd))


### Others

* **release:** 2.19.0-alpha.7 [skip ci] ([963d9ba](https://github.com/centraldigital/centech-api/commits/963d9ba9202145ae84ef5e3f1447e20e24226af3))

## [2.19.0-alpha.6](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.5%0Dversions/2.19.0-alpha.6) (2021-02-19)


### Others

* **release:** 2.19.0-alpha.6 [skip ci] ([e3b1d10](https://github.com/centraldigital/centech-api/commits/e3b1d10dea25099bd84ecd297a973efdb243d3b5))

## [2.19.0-alpha.5](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.3%0Dversions/2.19.0-alpha.5) (2021-02-19)


### Features

* [CON-275] v2AddReview ([#82](https://github.com/centraldigital/centech-api/issues/82)) ([bf139c7](https://github.com/centraldigital/centech-api/commits/bf139c7852848ecaf162a95c9568dfa2ded152ef))


### Bug Fixes

* [NS-36] fix workflows when merge branch at the same time ([#83](https://github.com/centraldigital/centech-api/issues/83)) ([fa17d25](https://github.com/centraldigital/centech-api/commits/fa17d25b0c50e7a1fa828b98e06650c6aa7e1cfd))


### Others

* **release:** 2.19.0-alpha.5 [skip ci] ([2b2a0bb](https://github.com/centraldigital/centech-api/commits/2b2a0bbc9e6b0509f1d0e73d5e50999c8988cd3d))

## [2.19.0-alpha.3](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.2%0Dversions/2.19.0-alpha.3) (2021-02-19)


### Features

* [NS-31] add security-check.yml for check image security ([#79](https://github.com/centraldigital/centech-api/issues/79)) ([5a583d5](https://github.com/centraldigital/centech-api/commits/5a583d5f925f7ea748ba538a7176245c2bce43f0))


### Others

* **release:** 2.19.0-alpha.3 [skip ci] ([414660e](https://github.com/centraldigital/centech-api/commits/414660ee70c15630aee38be79c0fef671d097afa))

## [2.19.0-alpha.2](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.1%0Dversions/2.19.0-alpha.2) (2021-02-19)


### Bug Fixes

* **v2Wishlists:** use wishlist_id from groups instead of item.wishlist_id ([#80](https://github.com/centraldigital/centech-api/issues/80)) ([f765ff9](https://github.com/centraldigital/centech-api/commits/f765ff97f5d4643f61e0385557e72273d239f837))


### Others

* **release:** 2.19.0-alpha.2 [skip ci] ([bc4de7b](https://github.com/centraldigital/centech-api/commits/bc4de7bb05eb67892426d787e86ebeccde4d0eb4))

## [2.19.0-alpha.1](https://github.com/centraldigital/centech-api/compare/versions/2.19.0-alpha.0%0Dversions/2.19.0-alpha.1) (2021-02-18)


### Others

* fixing typo ([9967918](https://github.com/centraldigital/centech-api/commits/9967918f88f6da7d7ae0e4fd236820e01495bc19))
* **release:** 2.19.0-alpha.1 [skip ci] ([7158f9d](https://github.com/centraldigital/centech-api/commits/7158f9d47db3192723f0f6431574a72b0a5e258b))

## [2.19.0-alpha.0](https://github.com/centraldigital/centech-api/compare/versions/2.18.2-alpha.1%0Dversions/2.19.0-alpha.0) (2021-02-18)


### Others

* **release:** 2.19.0-alpha.0 [skip ci] ([38bd86e](https://github.com/centraldigital/centech-api/commits/38bd86eeae013753effdb2ff4bff9030ad4cb698))

### [2.18.2-alpha.1](https://github.com/centraldigital/centech-api/compare/versions/2.18.2-alpha.0%0Dversions/2.18.2-alpha.1) (2021-02-18)


### Others

* **release:** 2.18.2-alpha.1 [skip ci] ([3bd14c0](https://github.com/centraldigital/centech-api/commits/3bd14c025e2885283bc32b6dd09658f77c38cfe8))

### [2.18.2-alpha.0](https://github.com/centraldigital/centech-api/compare/versions/2.18.0-alpha.16%0Dversions/2.18.2-alpha.0) (2021-02-18)


### Features

* Implement v2ProductRecommendationByUser resolver ([4d3c7af](https://github.com/centraldigital/centech-api/commits/4d3c7af11cfabd1fb5fcbad74c78195fe56ad77a))


### Bug Fixes

* fix workflows when merge branch at the same time ([019122a](https://github.com/centraldigital/centech-api/commits/019122adebdeb8e23c44286f4bff8dc8d3952ea2))
* update id on job release tag ([e23bf4a](https://github.com/centraldigital/centech-api/commits/e23bf4ab1874a551067f5fb24502e2b1b1f25372))


### Others

* **release:** 2.18.2-alpha.0 [skip ci] ([0928695](https://github.com/centraldigital/centech-api/commits/0928695d7224fbde313e1f0dc7bc1a87cfc74c26))

## [2.18.0-alpha.16](https://github.com/centraldigital/centech-api/compare/versions/2.18.1%0Dversions/2.18.0-alpha.16) (2021-02-15)


### Features

* [DSC-625] create query `v2SuggestKeywordSearch` return only keyword from data lake ([72f756e](https://github.com/centraldigital/centech-api/commits/72f756e18cc75a52c38a621b435ee99890390fd5))
* CNC-901 Add parameter for skipping cache ([da1d342](https://github.com/centraldigital/centech-api/commits/da1d342900adf7da93a5345fd15a2f79fdfa71fa))
* CNC-901 Add parameter for skipping cache ([364259e](https://github.com/centraldigital/centech-api/commits/364259e6788aa1af88e018dfdfcd068374aa4af1))
* CNC-901 Add parameter for skipping cache ([666d4c9](https://github.com/centraldigital/centech-api/commits/666d4c94ded7173d7163a58c8a0c95d226306710))
* CNC-901 Add parameter for skipping cache ([b15a2f2](https://github.com/centraldigital/centech-api/commits/b15a2f20206830ab2102da4c469ad370bde789c0))
* CNC-901 Update Unit Test ([ac5c459](https://github.com/centraldigital/centech-api/commits/ac5c459c9cba62c75153efcf9f0829c1128461c7))


### Bug Fixes

* handle if CS send prooducts null ([de23851](https://github.com/centraldigital/centech-api/commits/de23851b98ad7dbf03216dc7f53b18d0887a7416))
* update @graphql-tools/git-loader to 6.2.6 ([c622c59](https://github.com/centraldigital/centech-api/commits/c622c595e9f6b8330c04bd4b59b33891f74327d5))
* update config on operation and graphql-request ([cb710e5](https://github.com/centraldigital/centech-api/commits/cb710e5dff08360415fc41135e004fe4efbda307))
* update dependencies [@graphql-codegen](https://github.com/graphql-codegen), graphql and graphql-request ([21848d7](https://github.com/centraldigital/centech-api/commits/21848d740d41e8595c2516b6256ddc8626697605))


### Others

* **release:** 2.18.0-alpha.16 [skip ci] ([25a7752](https://github.com/centraldigital/centech-api/commits/25a7752498a8737295ac1cd1b58c26fdae35d1f2))

## [1.96.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.96.2...versions/1.96.3) (2020-11-25)

**Note:** Version bump only for package @central-tech/api





## [1.96.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.96.1...versions/1.96.2) (2020-11-25)


### Bug Fixes

*  CPI-701 sort product on productAssociationBySku and productRecommendationByUser ([6b59155](https://bitbucket.org/centraltechnology/centech-api/commits/6b59155ec1eac5c4ef78c6e90a90e67fe03c66ae))
* [CPI-696] add discount logic when special_from_date and special_to_date is null ([a2215e3](https://bitbucket.org/centraltechnology/centech-api/commits/a2215e340a77154ce850ded9c414b4a751a43420))
* CPI-700 add online_salable, offline_salable on pdp (Query product, productById) ([b902e3c](https://bitbucket.org/centraltechnology/centech-api/commits/b902e3ce4425aea9241795f54d2812ae95f16a0c))
* remove non-null from stock_id in V2PackageOption ([93cb2af](https://bitbucket.org/centraltechnology/centech-api/commits/93cb2af51373b9aa435ffd333ffc347f37211a19))





## [1.96.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.96.0...versions/1.96.1) (2020-11-24)


### Bug Fixes

* update is3ds and validateCVV logic for tops ([932b5b1](https://bitbucket.org/centraltechnology/centech-api/commits/932b5b18757a3fb716adca07f6af659e5124970a))





# [1.96.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.95.0...versions/1.96.0) (2020-11-24)


### Bug Fixes

* CDS-10386 create findProductDetailByIdNew ([534c9a4](https://bitbucket.org/centraltechnology/centech-api/commits/534c9a499151c471e1aa15c2f53043d9d94eb782))
* CDS-10411 add require param sku ([9a3d9cc](https://bitbucket.org/centraltechnology/centech-api/commits/9a3d9ccfd98f7522663bcc5312067a276e006a89))
* CPS-10386 remove store code ([3e230de](https://bitbucket.org/centraltechnology/centech-api/commits/3e230de71b21b675d5dd1fc838c7dfa62e18037d))


### Features

* [CDS-10411] add query stockItem ([ae3d64a](https://bitbucket.org/centraltechnology/centech-api/commits/ae3d64ae95e9c8fdafa2229e23a851678d475162))
* CS-10386 add query `productById` ([c1de80a](https://bitbucket.org/centraltechnology/centech-api/commits/c1de80a291cfd656ea1980cce27737a8be1de5a6))





# [1.95.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.94.2...versions/1.95.0) (2020-11-20)


### Bug Fixes

* add .env in gitignore and change command in package.json ([7158c4f](https://bitbucket.org/centraltechnology/centech-api/commits/7158c4fe3302e82342d655fcc6e0d25c784bc820))
* change environment path ([6e11cbd](https://bitbucket.org/centraltechnology/centech-api/commits/6e11cbd092887b79c668b9a3365678430fd74947))
* check throw ApplicationError is not boolean ([b8999a0](https://bitbucket.org/centraltechnology/centech-api/commits/b8999a0d4e4743e9350e9ce8779b5143313894c0))
* close introspection in prod ([828d1e7](https://bitbucket.org/centraltechnology/centech-api/commits/828d1e73c3698c5a5ba607ad2b4bd1d6018ae138))
* close introspection in prod ([86a8947](https://bitbucket.org/centraltechnology/centech-api/commits/86a89470f24b9457e6d878e6fbb5a6caeb02f378))
* close introspection on production, uat, lte ([dfb209a](https://bitbucket.org/centraltechnology/centech-api/commits/dfb209ace227f81cb7e19a8ccb3fac1b5465ba17))
* command in package json ([f8e0a43](https://bitbucket.org/centraltechnology/centech-api/commits/f8e0a4384c2a1f496afa3c514c83b5d68cb1ac82))
* remove start:dev ([13c97fa](https://bitbucket.org/centraltechnology/centech-api/commits/13c97fadeb3e50fe25a632ec613644b4f3f78bbd))
* **v2DeliveryPackageOptions:** CPI-686 change input query ([bba32a9](https://bitbucket.org/centraltechnology/centech-api/commits/bba32a915508de136a7a1e15ff1a96c85a654e13))


### Features

* add env-cmd ([37419da](https://bitbucket.org/centraltechnology/centech-api/commits/37419dad92568b4f3791f4206e891ca054a566e9))





## [1.94.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.94.1...versions/1.94.2) (2020-11-20)


### Bug Fixes

* add example env ([368254d](https://bitbucket.org/centraltechnology/centech-api/commits/368254d099b96f48ca809ed18257a7abab0e4cff))
* change `InventoryStock` from `IS` to `Prime` ([e8e6b0f](https://bitbucket.org/centraltechnology/centech-api/commits/e8e6b0f161b2d3aa8c1ff36b94cc227a0561bfa4))
* update `Prime` qty logic ([0577a03](https://bitbucket.org/centraltechnology/centech-api/commits/0577a039541b4dead4f063ca3d49f6dec220fea9))
* update mock env ([2294ce7](https://bitbucket.org/centraltechnology/centech-api/commits/2294ce74ee00930439d0151e3a9fd32071399116))
* update test ([fac138b](https://bitbucket.org/centraltechnology/centech-api/commits/fac138b2314531bc6b0bb98074d8353825640b81))
* update type and logic on InventoryStockBySkus ([5711c88](https://bitbucket.org/centraltechnology/centech-api/commits/5711c88fe593922ec985818f8dafef9fe120e590))





## [1.94.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.94.0...versions/1.94.1) (2020-11-20)


### Bug Fixes

* **PDP:** add is_out_of_service to delivery options on PDP ([bacce3f](https://bitbucket.org/centraltechnology/centech-api/commits/bacce3fedd1116170907091fc29c63a663d0ecaf))





# [1.94.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.93.2...versions/1.94.0) (2020-11-19)


### Bug Fixes

* sortProductOptionValues trim value before sort ([8e7b835](https://bitbucket.org/centraltechnology/centech-api/commits/8e7b835f5cf53a0ea0da6365b9ff3939e9c42404))
* **Recommendation:** POWH-3845 Fix API Product Recommendation ([295e75a](https://bitbucket.org/centraltechnology/centech-api/commits/295e75aeb132bb3a4f3308b8d51115d572b9d510))


### Features

* CPI-654 add productAssociationBySku support v1 product schema ([23be073](https://bitbucket.org/centraltechnology/centech-api/commits/23be073c8f9cee2fd7f2b702e65e083dee82f565))





## [1.93.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.93.1...versions/1.93.2) (2020-11-18)


### Bug Fixes

* change type on `rounded_rating` to float ([2db9c28](https://bitbucket.org/centraltechnology/centech-api/commits/2db9c2887946cdd3652e97afeedb1e1cd11f27fb))





## [1.93.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.93.0...versions/1.93.1) (2020-11-18)


### Bug Fixes

* handle if inventory service not set ([f0b62a3](https://bitbucket.org/centraltechnology/centech-api/commits/f0b62a361da6b03345b53a1656679d3c89f2e135))





# [1.93.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.92.0...versions/1.93.0) (2020-11-18)


### Bug Fixes

* add v2SetValidatePin operation ([d2fb9b1](https://bitbucket.org/centraltechnology/centech-api/commits/d2fb9b12f7b38ff29af5de8c72462fe94f4be5a6))
* **v2SetValidatePin:** remove post_code from input ([6e9d80b](https://bitbucket.org/centraltechnology/centech-api/commits/6e9d80b60d137d6da735575bd18a4b202d54dbf9))


### Features

* OFM-4838 customer address id is empty ([e8f43e4](https://bitbucket.org/centraltechnology/centech-api/commits/e8f43e4443014fecf4745603fefb5e55b8e3d6a3))





# [1.92.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.91.0...versions/1.92.0) (2020-11-17)


### Bug Fixes

* [CC-10] add `v2InventoryStockBySku` query and `V2Product.inventoryStock` use inventory service to get real time stock ([75bfba4](https://bitbucket.org/centraltechnology/centech-api/commits/75bfba463bd5623d0c011b0b3d388c1ab40b3543))
* add test on usecase ([5d13cef](https://bitbucket.org/centraltechnology/centech-api/commits/5d13cef18605c7b1bc096def51ea861d187b7327))
* open logic online/offline salable ([0b65d0d](https://bitbucket.org/centraltechnology/centech-api/commits/0b65d0d345c0644639047c7cb3e869d3233e64fe))
* remove transform setValidatePin paylaod ([82f4838](https://bitbucket.org/centraltechnology/centech-api/commits/82f4838cde617280f9cc0aaa36b152586cf5d679))


### Features

* add v2SetValidatePin Mutation ([8edd90b](https://bitbucket.org/centraltechnology/centech-api/commits/8edd90b2b281fd39c060e059ae91b8b5461c31ce))
* CPI-675 add new query estimateShippingMethodsV4 ([e5e86c2](https://bitbucket.org/centraltechnology/centech-api/commits/e5e86c28490c99a592c93c0211bc22113764acf8))
* CPI-676 add new query v2DeliveryPackageOptions & add new field 'time_label' on V2MethodLabels ([effbc7b](https://bitbucket.org/centraltechnology/centech-api/commits/effbc7b181514ed4b7da61c91b34c41ae2b4af21))





# [1.91.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.90.0...versions/1.91.0) (2020-11-17)


### Bug Fixes

* **Repayment:** await is3ds result before send to paymentService ([35a9abb](https://bitbucket.org/centraltechnology/centech-api/commits/35a9abbb7bf957375eab0ea17841a619ebd57474))


### Features

* **PreOrder:** add is_pre_order to estimateShippingMethods to use on check out step 2 page ([7722e62](https://bitbucket.org/centraltechnology/centech-api/commits/7722e62c05b9fda8d04b9004d67070a3446b2d73))
* Add SectionTitle type for mobile cms ([f19066a](https://bitbucket.org/centraltechnology/centech-api/commits/f19066a74dbb7be885671cd3be5dcc7102d3b052))
* Add widget video selector mobile ([e5095b3](https://bitbucket.org/centraltechnology/centech-api/commits/e5095b34aeca154b88943f904d6985f61c38f1d2))





# [1.90.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.89.2...versions/1.90.0) (2020-11-13)


### Bug Fixes

* **PreOrder:** POWH-3934 update field cart from pre_order_message to pwb_standard_pre_order_message ([e5a2a93](https://bitbucket.org/centraltechnology/centech-api/commits/e5a2a934bccb7e2117beac1eac0801bc406f1624))


### Features

* add Category bar mobile widgets ([9c4964a](https://bitbucket.org/centraltechnology/centech-api/commits/9c4964a08f2568749055dafebbb31bd7295e0b11))





## [1.89.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.89.1...versions/1.89.2) (2020-11-12)


### Bug Fixes

* **PreOrder:** POWH-3934 Change field name from pwb_standard_pre_order_message to pre_order_message ([fa18761](https://bitbucket.org/centraltechnology/centech-api/commits/fa1876180ec446f20b3ef79040d82dd2c014f71d))





## [1.89.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.89.0...versions/1.89.1) (2020-11-12)


### Bug Fixes

* change point input in `burnPoint` to `Float` ([8011bb9](https://bitbucket.org/centraltechnology/centech-api/commits/8011bb9316ccc7f113a895171febd617e3c465d0))





# [1.89.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.88.0...versions/1.89.0) (2020-11-12)


### Features

* **PDP, PLP, Cart:** bank to display on badges ([8f74285](https://bitbucket.org/centraltechnology/centech-api/commits/8f74285c9b4ea1fb7a39d44d183c76f8297f4944))





# [1.88.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.87.2...versions/1.88.0) (2020-11-11)


### Features

* **Cart:** POWH-3934 add pre-order message for Cart ([3be354b](https://bitbucket.org/centraltechnology/centech-api/commits/3be354b8d2a538d3ba2f653b8d62202bdc0ad8ac))
* **PreOrder:** POWH-3934 Add Schema Pre-Order API ([ae6372b](https://bitbucket.org/centraltechnology/centech-api/commits/ae6372bd9c6148173d6ef2ea02767760b5f24183))





## [1.87.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.87.1...versions/1.87.2) (2020-11-11)


### Bug Fixes

* add `toLowerCase` on urlDataloader ([679f87d](https://bitbucket.org/centraltechnology/centech-api/commits/679f87d2f9002b3507b94954614f99a16cfdc163))
* check AGGR_RESPONSE before change value ([25b5ea0](https://bitbucket.org/centraltechnology/centech-api/commits/25b5ea0e7e37f5644cb00b588ad29868d42e70c2))
* close online/offline salable feature ([1911765](https://bitbucket.org/centraltechnology/centech-api/commits/19117658c8e70ece7a54c5394be396db542975ce))
* optimize import ([9e8db77](https://bitbucket.org/centraltechnology/centech-api/commits/9e8db7781ce5571cb48e81e3a616b60c5919b04f))
* refactor `createSKUsOrIDsDataloader` ([9025be8](https://bitbucket.org/centraltechnology/centech-api/commits/9025be8d747afdb5859781136ecc4cdd11a745ec))
* remove optional chaining when have default vaule on `productSearch` ([47b50f8](https://bitbucket.org/centraltechnology/centech-api/commits/47b50f8a2c076b5a3fa18f878556a3eb2c8a934f))
* return null or empty when cs return null ([4bf3dc3](https://bitbucket.org/centraltechnology/centech-api/commits/4bf3dc3eac7e6c37df0d194c36840857a0fd9681))
* return shipping_method_flags for FE ([fbc270e](https://bitbucket.org/centraltechnology/centech-api/commits/fbc270e7311e7e7cf203e7d11f133b802d4c299b))





## [1.87.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.87.0...versions/1.87.1) (2020-11-11)


### Bug Fixes

* change `max_size_upload` to `Float` on storeConfig ([76ca9db](https://bitbucket.org/centraltechnology/centech-api/commits/76ca9db5892d6ed8894641274c341a3b7933de32))





# [1.87.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.86.0...versions/1.87.0) (2020-11-11)


### Bug Fixes

* [CPI-661] add missing `bank_name` on `cards` ([721fd8c](https://bitbucket.org/centraltechnology/centech-api/commits/721fd8c8f772e915f412d19cc34848b26c9fb3cf))
* case configurable description null ([114ae5d](https://bitbucket.org/centraltechnology/centech-api/commits/114ae5d372f27f77a751559058b13c801e15379c))
* change timezone on `discount` and `flash_deal` to utc ([7af2ceb](https://bitbucket.org/centraltechnology/centech-api/commits/7af2cebf9ebee282db068d205c734a98fbffb7d4))
* CPI-656 change variable name ([f28f04f](https://bitbucket.org/centraltechnology/centech-api/commits/f28f04f009e28d11c24be64d5b6c6e3ef4468427))
* CPI-656 create getValueByKeyUpperCase function ([83bade3](https://bitbucket.org/centraltechnology/centech-api/commits/83bade36f577f07093bc493ebef0c08dc5051858))
* CPI-656 remove unused code ([48c5989](https://bitbucket.org/centraltechnology/centech-api/commits/48c5989c4f714ce507798a2814549006e2a19d93))
* remove cartWithParent extension ([81233ec](https://bitbucket.org/centraltechnology/centech-api/commits/81233ec94eb2f006c7323ae853ed8e308624fc47))
* update `cardTransform` and update testcase ([8502815](https://bitbucket.org/centraltechnology/centech-api/commits/8502815c6300f579f4c0ffaf7cb844e8a8b254be))


### Features

* **DataLake:** POWH-3845 API Data Lake Recommendation ([86dfb7e](https://bitbucket.org/centraltechnology/centech-api/commits/86dfb7e7f2f78c55cf4be92d78c8aa61b7b941bd))
* [CPI-662] add logic to filter shipping method flags ([fc26a0d](https://bitbucket.org/centraltechnology/centech-api/commits/fc26a0d51de33962842062ff505d614c439cadd8))
* CPI-656 product option value sort by name ASC and clothing size ([2c0ba8b](https://bitbucket.org/centraltechnology/centech-api/commits/2c0ba8bb132417738c302274f48a240a3e94ac00))





# [1.86.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.85.0...versions/1.86.0) (2020-11-10)


### Bug Fixes

* jest ignore catalogService `cs-graphql.ts` and `query.ts` files ([1fb7e63](https://bitbucket.org/centraltechnology/centech-api/commits/1fb7e632bb6ef6b63d92f87114abec1ea555691e))


### Features

* **StoreConfigs:** Get configuration for image in customer review and rating ([77bf0b0](https://bitbucket.org/centraltechnology/centech-api/commits/77bf0b0fb0bab772ac63d6cfc54870fb1101d41c))
* CPI-660 add field `online_salable` and `offline_salable` on product ([2e414b4](https://bitbucket.org/centraltechnology/centech-api/commits/2e414b4be38906b9adb3b7aa43f1d4fe76183250))





# [1.85.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.84.0...versions/1.85.0) (2020-11-06)


### Bug Fixes

* deafualt url for datalake recommendation ([c97e1b4](https://bitbucket.org/centraltechnology/centech-api/commits/c97e1b4af2ba75722c9229b707981985e78257ae))
* **V2Product:** CPI-658 `V2Product.links` return with empty ProductLinks when links is null ([666f09f](https://bitbucket.org/centraltechnology/centech-api/commits/666f09fe8135e7ab7516c85e8fad2e4b5672fa49))
* add missing .env.example datalake ([90020ee](https://bitbucket.org/centraltechnology/centech-api/commits/90020ee00c8b0de6a5ac33c2b3b60b563e3b4a2d))
* seperate dataLakeRecommendationApi rremove datalakeCustomUrlType ([78f2bed](https://bitbucket.org/centraltechnology/centech-api/commits/78f2bed51868602e2af6f7be2d03e80675a79e6b))


### Features

* CPI 575 product search support filter by rating and sort by rating and review count ([3c9bd11](https://bitbucket.org/centraltechnology/centech-api/commits/3c9bd1132a8c64fe484654e0551fc5b86fe56b00))
* CPI-653 add productRecommendationByUser query in productCatalogServiceV2 extension ([4fbfd9f](https://bitbucket.org/centraltechnology/centech-api/commits/4fbfd9f16f1a6d54875c1885e301ec68d35b6b00))





# [1.84.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.83.0...versions/1.84.0) (2020-11-05)


### Bug Fixes

* change type on PaymentService testcase ([e5b0f8f](https://bitbucket.org/centraltechnology/centech-api/commits/e5b0f8f6c5b6f9035b4ae77fb8d4abfef4702189))
* some sonarqube issue ([9284dbd](https://bitbucket.org/centraltechnology/centech-api/commits/9284dbd9a922539157f07a5d186b1f57556b7295))
* wrong usecase ([069cfd3](https://bitbucket.org/centraltechnology/centech-api/commits/069cfd3fe5643fa600545962765af8bfb39168a9))


### Features

* CPI-641 Log Sentry when product's children empty ([eb635e3](https://bitbucket.org/centraltechnology/centech-api/commits/eb635e3e06f0624c39d5a16728e29daeaf582393))
* OFM-4821 change data mock about payment type without OTP ([aacfe3d](https://bitbucket.org/centraltechnology/centech-api/commits/aacfe3d28831129a7b85fbc7cb2fb8c9cbada24d))
* OFM-4821 force OTP is false away, a part of the payment process ([c5cdc13](https://bitbucket.org/centraltechnology/centech-api/commits/c5cdc1383d0705a99f6020d9d924418a5b168bc0))
* OFM-4821 force OTP is false away, a part of the payment process ([df08387](https://bitbucket.org/centraltechnology/centech-api/commits/df08387465946fc1f14223a4d858778ee03e1c83))
* run sonar on pullrequest ([3100826](https://bitbucket.org/centraltechnology/centech-api/commits/3100826f6a23bf95c36d0b4c93a821b5971ecb73))
* update pullrequest sonarqube config ([879888c](https://bitbucket.org/centraltechnology/centech-api/commits/879888c47a47094f2f0a28e946a7dc11bba53439))





# [1.83.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.82.0...versions/1.83.0) (2020-10-30)


### Bug Fixes

* add missing field on ofm ([ae087ed](https://bitbucket.org/centraltechnology/centech-api/commits/ae087ed2a41c0b3a4aa22b4a5ca28ac8a44eab95))
* change endpoint of `paymentInformations` on OFM bu ([e13c469](https://bitbucket.org/centraltechnology/centech-api/commits/e13c469315ae5e33f5a463d4cb588b2ae80f6d81))
* query product by sku missing field `reviews.images` ([6b536c1](https://bitbucket.org/centraltechnology/centech-api/commits/6b536c1bec5c712a549bec86a2e6f3252ebf4c95))
* remove cartId dataSource on `paymentInformations` OFM ([8760845](https://bitbucket.org/centraltechnology/centech-api/commits/8760845fdb397ea48fe3a526de1b6353cea21297))
* **cartWithParent:** change findBySku to findBySkuNew ([64ab450](https://bitbucket.org/centraltechnology/centech-api/commits/64ab450b5f0da7a1c946a817dc4bea0cfe765f86))


### Features

* edit format ([39d62a9](https://bitbucket.org/centraltechnology/centech-api/commits/39d62a9537cbfb5b14c00345b1ac4f387eabb208))





# [1.82.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.81.0...versions/1.82.0) (2020-10-29)


### Bug Fixes

* mapp `price_discount` to `discount_amount` on CS query ([943fe12](https://bitbucket.org/centraltechnology/centech-api/commits/943fe12cfc17c74d364ecad02ff7f9a18a379d38))
* remove query field CS ([1cc3242](https://bitbucket.org/centraltechnology/centech-api/commits/1cc32422f9df44e43619cd61b636bfd393070dde))
* remove query field CS ([21f28f4](https://bitbucket.org/centraltechnology/centech-api/commits/21f28f40a199f1a75418f1240e3ec822e96bd7a5))


### Features

* **PLP:** POWH-3678 POWH-3874 add available time of ship from store (3hr) shipping method ([cd1efde](https://bitbucket.org/centraltechnology/centech-api/commits/cd1efde270981c233d56625044ffc6321df90822))
* **PLP:** POWH-3678 POWH-3874 change to long cache ([a39536c](https://bitbucket.org/centraltechnology/centech-api/commits/a39536caa354e8cfe33b40eaa8cc4351cf8d8f91))





# [1.81.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.78.12...versions/1.81.0) (2020-10-27)


### Bug Fixes

* add `DataloaderNew.prime` on CS datascoure ([7ab8582](https://bitbucket.org/centraltechnology/centech-api/commits/7ab858222ce5c0108925c0db61d32d778ed79d47))
* add blacklist attrCode ([b62b780](https://bitbucket.org/centraltechnology/centech-api/commits/b62b7803a07aa12721b501d1bb2bf2fa19e6d69a))
* add company_id, address_line2, branch_code at CartBillingAddressCustomAttributes schema ([ad6d602](https://bitbucket.org/centraltechnology/centech-api/commits/ad6d602f9b67483abb4808b703c54492321de766))
* add default value when `media_gallery_entries` is null ([7efe728](https://bitbucket.org/centraltechnology/centech-api/commits/7efe728a66e6241371fdf9b74487fc5a262dcc40))
* add enum `THREE_HOURS_DELIVERY` on V2ShippingMethod ([0ce516c](https://bitbucket.org/centraltechnology/centech-api/commits/0ce516c2d8ddf03c66cd1cc9c48a209bd0acdba8))
* add message when fetch store fail on server start ([25dd5e9](https://bitbucket.org/centraltechnology/centech-api/commits/25dd5e90ec35f20529ce667e5dc9d4c4f4199b0d))
* add missing logic on sorting ([11a9e2f](https://bitbucket.org/centraltechnology/centech-api/commits/11a9e2ff228ea939640f79d272a22c62b407e7b9))
* add ProductOption schema ([bc0ce2c](https://bitbucket.org/centraltechnology/centech-api/commits/bc0ce2ccc4e94ac9ace54b97e2b17a44fb84c44d))
* add sentry `@sentry/tracing` ([84353de](https://bitbucket.org/centraltechnology/centech-api/commits/84353dedf3ca81f78ec146b1d0b70a544833046b))
* catalog service data source error `url_key` of null ([d3e4fcb](https://bitbucket.org/centraltechnology/centech-api/commits/d3e4fcb26e179c279124fd71eeec3b73d7e988f5))
* CDS-9643 improve performance loaderAttributeCodes & fix cache config ([2d5dce8](https://bitbucket.org/centraltechnology/centech-api/commits/2d5dce87ce9b6525128a95542d63366a45d60783))
* CDS-9643 improve performance loaderAttributes ([069062d](https://bitbucket.org/centraltechnology/centech-api/commits/069062d5a473f75a04f9ed2463e39f9146fa8eac))
* CPI-610 check lat lng before get geocode ([758c991](https://bitbucket.org/centraltechnology/centech-api/commits/758c99149c0cb1476b16a8691fba6a975c33d816))
* CPI-610 remove `query-string` package / use second param of apollo-datasource ([8e06c36](https://bitbucket.org/centraltechnology/centech-api/commits/8e06c365296ce014ada6f3538ea6018e9be8ec45))
* CPI-610 remove check offset and limit undefined ([9a78ba9](https://bitbucket.org/centraltechnology/centech-api/commits/9a78ba94cb2b6a3f10ab48f68b0b741d40c1e286))
* CPI-610 use chuck array from lodash / check google api key / change logic offset and limit ([3cd698b](https://bitbucket.org/centraltechnology/centech-api/commits/3cd698bba4039bd74c205282cb6f0b941a9cfab8))
* ignore `ApplicationError` on sentry and newrelic ([27f641a](https://bitbucket.org/centraltechnology/centech-api/commits/27f641a5385265606bea2459da6a1f5365c7ece9))
* images of review is null ([93e76bd](https://bitbucket.org/centraltechnology/centech-api/commits/93e76bdd37f6da261ac01d2bc7ff7320115a8dc2))
* loader loaderAttributeCodes must memo with `attribute_code` ([b539e64](https://bitbucket.org/centraltechnology/centech-api/commits/b539e64f9ad37472be65d0510015b3c92947e993))
* missing default `attributeLabel` ([dd94cdd](https://bitbucket.org/centraltechnology/centech-api/commits/dd94cdd8990f8f0a570e0873a263cd4cb2e260df))
* move logic transform configurable product to cs2-transformer ([309a82c](https://bitbucket.org/centraltechnology/centech-api/commits/309a82c4b37624a31b849b2d8054b77763d06108))
* PLP remove meta tag and brand content ([bf64ffa](https://bitbucket.org/centraltechnology/centech-api/commits/bf64ffa8a90cfe2cf3a454e10356a2ea278857de))
* query `search` aggregations' of null ([8ba7724](https://bitbucket.org/centraltechnology/centech-api/commits/8ba7724b58487108a603104c17a6b408c9e3256a))
* refactor reduce of dataloader ([5931230](https://bitbucket.org/centraltechnology/centech-api/commits/5931230012e6cf6311cf061ed1a65ea82c73b2b7))
* reformat ([739c586](https://bitbucket.org/centraltechnology/centech-api/commits/739c586e7a2e64dd95c09561b3a974380a86b0f5))
* remove comment & log ([d7c7d63](https://bitbucket.org/centraltechnology/centech-api/commits/d7c7d6348a30e473f8e98de0ee8dc330e952e757))
* remove desc on product and add `findProductDetailBySKU` ([030d259](https://bitbucket.org/centraltechnology/centech-api/commits/030d2597b4fdaafe8452fb20457e59f138aef2de))
* remove desc on product and add `findProductDetailBySKU` ([4c387f5](https://bitbucket.org/centraltechnology/centech-api/commits/4c387f5fe0f9df9e875c7571accd73de40a9de71))
* transformProduct when configurable is empty ([6e31890](https://bitbucket.org/centraltechnology/centech-api/commits/6e3189068dd03f7a5ebea82d148b02c692456d00))
* update sentry ([599d4d4](https://bitbucket.org/centraltechnology/centech-api/commits/599d4d484330cf9152bd28d40c0a0872fb402db5))
* update thumb on configurable product ([4627190](https://bitbucket.org/centraltechnology/centech-api/commits/462719032b4d4f3342ddcae5f77fa08d4787a220))
* use `transaction.setName` when apollo `didResolveOperation` ([f06ba49](https://bitbucket.org/centraltechnology/centech-api/commits/f06ba49bd058f2739765a414235f153e30eaba2a))
* **cart:** CPI-627 add cartWithParent extension, use cs instead at resolver ([437bad2](https://bitbucket.org/centraltechnology/centech-api/commits/437bad29926708bd9a2a31ee7eef27d0dbcac940))
* **cart:** CPI-627 add parent(product) at CartItem ([2d962f3](https://bitbucket.org/centraltechnology/centech-api/commits/2d962f36d458c50ca0181e189d522c3e680602d9))
* **packageOptions:** use new findByIds instead ([ee1df61](https://bitbucket.org/centraltechnology/centech-api/commits/ee1df61f6512dd33bf7522fa04b50be7927c93f6))
* unit test add payment method `dolfin` ([18f0aa3](https://bitbucket.org/centraltechnology/centech-api/commits/18f0aa384a736b1d047deb7122355ffff36d4105))


### Features

* add `dolfin` payment ([55ca804](https://bitbucket.org/centraltechnology/centech-api/commits/55ca80415d913a52998756eaeb81092d0ed84ba6))
* add dolfin payment method ([9b42ee4](https://bitbucket.org/centraltechnology/centech-api/commits/9b42ee4f6c41825bb117c335c42f9d1488f84907))
* add new field overall_rating.rounded_rating in Rating schema ([4e8a718](https://bitbucket.org/centraltechnology/centech-api/commits/4e8a7180e043e9328718bb07d653e604f199df06))
* CPI-601 add query `paymentStatus` in payment service ([a33f9c5](https://bitbucket.org/centraltechnology/centech-api/commits/a33f9c5ce598ed2f8ecc5900c092cedf06cbca58))
* CPI-610 query `estimateShippingMethods` get nearest store by search keyword or postcode ([a822c88](https://bitbucket.org/centraltechnology/centech-api/commits/a822c881a1f59be1d7590af447ee76d0dd996fe0))
* CPI-610 query `estimateShippingMethodsV3` change operation ([80ac704](https://bitbucket.org/centraltechnology/centech-api/commits/80ac704e9198d70b6e0e761b90d8191c16cc1da5))
* CPI-628 query `storePickupLocationsAvailable` get distance by keyword or lat long ([ac85c5a](https://bitbucket.org/centraltechnology/centech-api/commits/ac85c5acaeca702c3e2a24cb1c0bbca485131f6b))





# [1.80.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.78.5...versions/1.80.0) (2020-10-15)

### Bug Fixes

* add `x-request-id` on response header by `plugin` ([4fb4499](https://bitbucket.org/centraltechnology/centech-api/commits/4fb449932d47e916a03ba4c635cf32115fdb621b))
* add company_id, address_line2, branch_code at CartBillingAddressCustomAttributes schema ([ad6d602](https://bitbucket.org/centraltechnology/centech-api/commits/ad6d602f9b67483abb4808b703c54492321de766))
* add message when fetch store fail on server start ([25dd5e9](https://bitbucket.org/centraltechnology/centech-api/commits/25dd5e90ec35f20529ce667e5dc9d4c4f4199b0d))
* add sentry `@sentry/tracing` ([84353de](https://bitbucket.org/centraltechnology/centech-api/commits/84353dedf3ca81f78ec146b1d0b70a544833046b))
* add Sentry Plugin on apollo-server ([2f7fbdd](https://bitbucket.org/centraltechnology/centech-api/commits/2f7fbdd9664cfb35c1203a2d6b07a569b04db3c9))
* catalog service data source error `url_key` of null ([d3e4fcb](https://bitbucket.org/centraltechnology/centech-api/commits/d3e4fcb26e179c279124fd71eeec3b73d7e988f5))
* change formatErrorPlugin to formatErrorUtil, add newrelice didEncounterErrors event ([62f4591](https://bitbucket.org/centraltechnology/centech-api/commits/62f4591a7a37e8455a174c788c71bc0d4a809860))
* CPI-610 check lat lng before get geocode ([758c991](https://bitbucket.org/centraltechnology/centech-api/commits/758c99149c0cb1476b16a8691fba6a975c33d816))
* CPI-610 remove `query-string` package / use second param of apollo-datasource ([8e06c36](https://bitbucket.org/centraltechnology/centech-api/commits/8e06c365296ce014ada6f3538ea6018e9be8ec45))
* CPI-610 remove check offset and limit undefined ([9a78ba9](https://bitbucket.org/centraltechnology/centech-api/commits/9a78ba94cb2b6a3f10ab48f68b0b741d40c1e286))
* CPI-610 use chuck array from lodash / check google api key / change logic offset and limit ([3cd698b](https://bitbucket.org/centraltechnology/centech-api/commits/3cd698bba4039bd74c205282cb6f0b941a9cfab8))
* query `search` aggregations' of null ([8ba7724](https://bitbucket.org/centraltechnology/centech-api/commits/8ba7724b58487108a603104c17a6b408c9e3256a))
* refactor reduce of dataloader ([5931230](https://bitbucket.org/centraltechnology/centech-api/commits/5931230012e6cf6311cf061ed1a65ea82c73b2b7))
* reformat ([739c586](https://bitbucket.org/centraltechnology/centech-api/commits/739c586e7a2e64dd95c09561b3a974380a86b0f5))
* unit test add payment method `dolfin` ([18f0aa3](https://bitbucket.org/centraltechnology/centech-api/commits/18f0aa384a736b1d047deb7122355ffff36d4105))
* **Sentry:** add `fingerprint` on sentry error ([d802a50](https://bitbucket.org/centraltechnology/centech-api/commits/d802a503dda1033847789eab491f5e575a01541e))
* **Sentry:** add `keep_classnames` on webpack `TerserPlugin` for grouping on sentry ([4c89d3b](https://bitbucket.org/centraltechnology/centech-api/commits/4c89d3b48a5d2b45c60ff01c82de0d2551cbfe2d))
* **Sentry:** add missing data on request usage ([8b062b4](https://bitbucket.org/centraltechnology/centech-api/commits/8b062b48a9f9f24a07c1f24252ec92bccbbf8062))
* warning deprecate extensions(use plugin instead) ([f790e74](https://bitbucket.org/centraltechnology/centech-api/commits/f790e745daca5f980ac993e4dae74131a33fe7b0))


### Features

* add `dolfin` payment ([55ca804](https://bitbucket.org/centraltechnology/centech-api/commits/55ca80415d913a52998756eaeb81092d0ed84ba6))
* add dolfin payment method ([9b42ee4](https://bitbucket.org/centraltechnology/centech-api/commits/9b42ee4f6c41825bb117c335c42f9d1488f84907))
* CPI-601 add query `paymentStatus` in payment service ([a33f9c5](https://bitbucket.org/centraltechnology/centech-api/commits/a33f9c5ce598ed2f8ecc5900c092cedf06cbca58))
* CPI-610 query `estimateShippingMethods` get nearest store by search keyword or postcode ([a822c88](https://bitbucket.org/centraltechnology/centech-api/commits/a822c881a1f59be1d7590af447ee76d0dd996fe0))
* CPI-610 query `estimateShippingMethodsV3` change operation ([80ac704](https://bitbucket.org/centraltechnology/centech-api/commits/80ac704e9198d70b6e0e761b90d8191c16cc1da5))





## [1.79.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.79.0...versions/1.79.1) (2020-10-14)

**Note:** Version bump only for package @central-tech/api





# [1.79.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.78.2...versions/1.79.0) (2020-10-09)


### Bug Fixes

* add company_id, address_line2, branch_code at CartBillingAddressCustomAttributes schema ([ad6d602](https://bitbucket.org/centraltechnology/centech-api/commits/ad6d602f9b67483abb4808b703c54492321de766))
* unit test add payment method `dolfin` ([18f0aa3](https://bitbucket.org/centraltechnology/centech-api/commits/18f0aa384a736b1d047deb7122355ffff36d4105))
* **Sentry:** add `fingerprint` on sentry error ([d802a50](https://bitbucket.org/centraltechnology/centech-api/commits/d802a503dda1033847789eab491f5e575a01541e))
* **Sentry:** add `keep_classnames` on webpack `TerserPlugin` for grouping on sentry ([4c89d3b](https://bitbucket.org/centraltechnology/centech-api/commits/4c89d3b48a5d2b45c60ff01c82de0d2551cbfe2d))
* add `x-request-id` on response header by `plugin` ([4fb4499](https://bitbucket.org/centraltechnology/centech-api/commits/4fb449932d47e916a03ba4c635cf32115fdb621b))
* add Sentry Plugin on apollo-server ([2f7fbdd](https://bitbucket.org/centraltechnology/centech-api/commits/2f7fbdd9664cfb35c1203a2d6b07a569b04db3c9))
* catalog service data source error `url_key` of null ([d3e4fcb](https://bitbucket.org/centraltechnology/centech-api/commits/d3e4fcb26e179c279124fd71eeec3b73d7e988f5))
* change formatErrorPlugin to formatErrorUtil, add newrelice didEncounterErrors event ([62f4591](https://bitbucket.org/centraltechnology/centech-api/commits/62f4591a7a37e8455a174c788c71bc0d4a809860))
* CPI-610 check lat lng before get geocode ([758c991](https://bitbucket.org/centraltechnology/centech-api/commits/758c99149c0cb1476b16a8691fba6a975c33d816))
* CPI-610 remove `query-string` package / use second param of apollo-datasource ([8e06c36](https://bitbucket.org/centraltechnology/centech-api/commits/8e06c365296ce014ada6f3538ea6018e9be8ec45))
* CPI-610 remove check offset and limit undefined ([9a78ba9](https://bitbucket.org/centraltechnology/centech-api/commits/9a78ba94cb2b6a3f10ab48f68b0b741d40c1e286))
* CPI-610 use chuck array from lodash / check google api key / change logic offset and limit ([3cd698b](https://bitbucket.org/centraltechnology/centech-api/commits/3cd698bba4039bd74c205282cb6f0b941a9cfab8))
* query `search` aggregations' of null ([8ba7724](https://bitbucket.org/centraltechnology/centech-api/commits/8ba7724b58487108a603104c17a6b408c9e3256a))
* refactor reduce of dataloader ([5931230](https://bitbucket.org/centraltechnology/centech-api/commits/5931230012e6cf6311cf061ed1a65ea82c73b2b7))
* **Sentry:** add missing data on request usage ([8b062b4](https://bitbucket.org/centraltechnology/centech-api/commits/8b062b48a9f9f24a07c1f24252ec92bccbbf8062))
* warning deprecate extensions(use plugin instead) ([f790e74](https://bitbucket.org/centraltechnology/centech-api/commits/f790e745daca5f980ac993e4dae74131a33fe7b0))


### Features

* add `dolfin` payment ([55ca804](https://bitbucket.org/centraltechnology/centech-api/commits/55ca80415d913a52998756eaeb81092d0ed84ba6))
* add dolfin payment method ([9b42ee4](https://bitbucket.org/centraltechnology/centech-api/commits/9b42ee4f6c41825bb117c335c42f9d1488f84907))
* CPI-601 add query `paymentStatus` in payment service ([a33f9c5](https://bitbucket.org/centraltechnology/centech-api/commits/a33f9c5ce598ed2f8ecc5900c092cedf06cbca58))
* CPI-610 query `estimateShippingMethods` get nearest store by search keyword or postcode ([a822c88](https://bitbucket.org/centraltechnology/centech-api/commits/a822c881a1f59be1d7590af447ee76d0dd996fe0))
* CPI-610 query `estimateShippingMethodsV3` change operation ([80ac704](https://bitbucket.org/centraltechnology/centech-api/commits/80ac704e9198d70b6e0e761b90d8191c16cc1da5))


## [1.78.11](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.78.10...versions/1.78.11) (2020-10-19)


### Bug Fixes

* query product from CS - change fields ([b1efc7b](https://bitbucket.org/centraltechnology/centech-api/commits/b1efc7be3102cc03d84e0e220b3841ade3699458))
* query product from CS - change fields ([a1c4dbc](https://bitbucket.org/centraltechnology/centech-api/commits/a1c4dbc96fffc5226936764583ba6828aa1a6ee6))
* query product from CS - remove unused fields ([73ada5e](https://bitbucket.org/centraltechnology/centech-api/commits/73ada5e19f6656d6d11ccfeb333a0cd8ae940ed8))

## [1.78.10](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.78.9...versions/1.78.10) (2020-10-16)


### Bug Fixes

* handle case configurable child empty ([dea0f6d](https://bitbucket.org/centraltechnology/centech-api/commits/dea0f6d1da9bb8e584ce4b1dfd141f9c09637a1a))





## [1.78.9](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.78.8...versions/1.78.9) (2020-10-16)


### Bug Fixes

* bad gateway from cs ([d77461f](https://bitbucket.org/centraltechnology/centech-api/commits/d77461fb7ccd6609762ea55fe08921da1475740b))
* defualt findProductChildren in case product null ([28202f5](https://bitbucket.org/centraltechnology/centech-api/commits/28202f51b9784d7b59b5e2b280f6040485ced829))





## [1.78.8](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.78.7...versions/1.78.8) (2020-10-16)


### Bug Fixes

* **v2product:** mediaGallery error ([a0a85a4](https://bitbucket.org/centraltechnology/centech-api/commits/a0a85a4b304cbd2f4b91d191c18cbf661d468d3f))
* ignore `ApplicationError` ([9920112](https://bitbucket.org/centraltechnology/centech-api/commits/9920112e99e5f412db00a83d6dd73c7fbaca476b))
* update newrelic plugin ([44a7faf](https://bitbucket.org/centraltechnology/centech-api/commits/44a7fafa647f23f038eecb66914749a7380fba03))
* update type on requestid plugin ([a0032c7](https://bitbucket.org/centraltechnology/centech-api/commits/a0032c779bb4216e5f5190265614551387705953))
* update type on requestusage plugin ([2901c4b](https://bitbucket.org/centraltechnology/centech-api/commits/2901c4b7acdcc6a7cb8033fd26b0c939db10228a))





## [1.78.7](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.78.6...versions/1.78.7) (2020-10-15)


### Bug Fixes

* remove cmsv2 from 1.78.x ([aaee8df](https://bitbucket.org/centraltechnology/centech-api/commits/aaee8df234ae45d1b354063f76c0e0f34a77f0ff))
* thumbnailUrl resolver ([46e15b0](https://bitbucket.org/centraltechnology/centech-api/commits/46e15b0413e5afde8b18eb3fdabb62e76f6de7c7))
* **Sentry:** add `fingerprint` on sentry error ([d802a50](https://bitbucket.org/centraltechnology/centech-api/commits/d802a503dda1033847789eab491f5e575a01541e))
* **Sentry:** add `keep_classnames` on webpack `TerserPlugin` for grouping on sentry ([4c89d3b](https://bitbucket.org/centraltechnology/centech-api/commits/4c89d3b48a5d2b45c60ff01c82de0d2551cbfe2d))
* add `x-request-id` on response header by `plugin` ([4fb4499](https://bitbucket.org/centraltechnology/centech-api/commits/4fb449932d47e916a03ba4c635cf32115fdb621b))
* add Sentry Plugin on apollo-server ([2f7fbdd](https://bitbucket.org/centraltechnology/centech-api/commits/2f7fbdd9664cfb35c1203a2d6b07a569b04db3c9))
* change formatErrorPlugin to formatErrorUtil, add newrelice didEncounterErrors event ([62f4591](https://bitbucket.org/centraltechnology/centech-api/commits/62f4591a7a37e8455a174c788c71bc0d4a809860))
* **Sentry:** add missing data on request usage ([8b062b4](https://bitbucket.org/centraltechnology/centech-api/commits/8b062b48a9f9f24a07c1f24252ec92bccbbf8062))
* warning deprecate extensions(use plugin instead) ([f790e74](https://bitbucket.org/centraltechnology/centech-api/commits/f790e745daca5f980ac993e4dae74131a33fe7b0))





## [1.78.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.78.5...versions/1.78.6) (2020-10-15)


### Bug Fixes

* paging on response value ([242911b](https://bitbucket.org/centraltechnology/centech-api/commits/242911b78da72dcc57ca40d0d817e24f7efd4d8e))
* wrong result when query by skus on new schema ([d292663](https://bitbucket.org/centraltechnology/centech-api/commits/d292663ec39e9a7bc857f8e3f97546b1a2715b17))





## [1.78.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.78.4...versions/1.78.5) (2020-10-15)


## [1.78.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.78.1...versions/1.78.2) (2020-10-08)


### Bug Fixes

* **estimateShippingMethods:** add method_code field at EstimateShippingMethods schema ([5800ee3](https://bitbucket.org/centraltechnology/centech-api/commits/5800ee385f13b196c9001f9bdeccccffec047812))





## [1.78.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.78.0...versions/1.78.1) (2020-10-08)


### Bug Fixes

* **cartTotals:** add total_save, total_save_incl_tax and correct name CartTotalsExtensionAttributesCartSummary schema ([97ca34f](https://bitbucket.org/centraltechnology/centech-api/commits/97ca34f83f6a3542c0995284adb3db936c01ab51))
* **cartTotals:** add total_shipping_fee, total_shipping_fee_incl_tax at CartTotalsExtensionAttributesCartSummary schema ([6b7cd5a](https://bitbucket.org/centraltechnology/centech-api/commits/6b7cd5ad5e1036794dc97fac8cadd4c875f2cd57))
* **Sentry:** improve requestUsage log in Sentry and add `request_id` on error response ([6daf916](https://bitbucket.org/centraltechnology/centech-api/commits/6daf916748fdd632c5e55a01bfb9b7143f0691f8))





# [1.78.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.77.2...versions/1.78.0) (2020-10-06)


### Bug Fixes

* cart checkout fail on when refactor cart-checkout ([557163c](https://bitbucket.org/centraltechnology/centech-api/commits/557163c710aeba65c49ac661f5395342f1bef9d8))
* CPI-612 add card_code at PaymentInformationInput ([e5700a6](https://bitbucket.org/centraltechnology/centech-api/commits/e5700a6ed348b81d11598af0db93c3ceba1b5364))


### Features

* CPI-602 add union pay on `CardType` ([0a2a838](https://bitbucket.org/centraltechnology/centech-api/commits/0a2a8381e3256653c97c85ff44d96e05819779e4))





## [1.77.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.77.1...versions/1.77.2) (2020-10-05)


### Bug Fixes

* CPI-615 change `alternative` to `alternate` ([4b3f5ee](https://bitbucket.org/centraltechnology/centech-api/commits/4b3f5ee16bf4bc3fefb713a75bad92560cf693f0))





## [1.77.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.77.0...versions/1.77.1) (2020-10-05)


### Bug Fixes

* CPI-615 error when `CATALOG_SERVICE_BASE_URL_ALTERNATIVE` is empty ([64efecb](https://bitbucket.org/centraltechnology/centech-api/commits/64efecb3132bad1f900e0520f7308488df0f7ae6))
* **Redis:** CPI-615 change cache key for AB test with `x-intent-alias` header ([9cfc52c](https://bitbucket.org/centraltechnology/centech-api/commits/9cfc52c9cf9df117fddada523aa86c04efcf265a))





# [1.77.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.76.0...versions/1.77.0) (2020-10-05)


### Bug Fixes

* **CartTotals:** CPI-604 add cart_summary (other_discount, t1c_discount, coupon_discount) ([a4e7e55](https://bitbucket.org/centraltechnology/centech-api/commits/a4e7e552ae9287b2419e16741192af32d5fb4c54))
* add request body ([f384d2c](https://bitbucket.org/centraltechnology/centech-api/commits/f384d2c597cb7ae90a903b9f1c82381ed15b37f6))
* log `RequestUsage` error on cart and cart-guest on checkout step ([3bd79d7](https://bitbucket.org/centraltechnology/centech-api/commits/3bd79d7c14876053aac61006d5697b3bc5bd29a8))
* pipeline error when filter `requestUsage` on log ([c2fcb83](https://bitbucket.org/centraltechnology/centech-api/commits/c2fcb8312f2e3ad8f92c4b4d728cbb19d1275642))
* remove body on response query ([23380bb](https://bitbucket.org/centraltechnology/centech-api/commits/23380bb3f51369fbb61cd5ce6ce48c106954b3f1))
* type error on `GraphqlDataSource` request used ([bacbbaf](https://bitbucket.org/centraltechnology/centech-api/commits/bacbbaf250141168e6d566c5d224ddbebd43bcaf))


### Features

* CPI-615 add CATALOG_SERVICE_BASE_URL_ALTERNATIVE for A/B testing ([ebe373e](https://bitbucket.org/centraltechnology/centech-api/commits/ebe373ed676f7e438d85855195f41254127edaa1))
* Improve cmd `yarn dev` with `ts-node` ([8d14b94](https://bitbucket.org/centraltechnology/centech-api/commits/8d14b948e1ea2092ef59e29f714bd34e612086b5))





# [1.76.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.75.0...versions/1.76.0) (2020-10-01)


### Bug Fixes

* CPI-570 remove and change toLowerCase ([a4698ae](https://bitbucket.org/centraltechnology/centech-api/commits/a4698ae6ee4fe657ae293a07f57de57d8b71726a))
* edit type ([982082b](https://bitbucket.org/centraltechnology/centech-api/commits/982082b4b363af300f98a9205bf9c6080dc75bfa))
* refactor payment service ([dc90992](https://bitbucket.org/centraltechnology/centech-api/commits/dc9099246a6a3bd32aedd885199e4c11096b6e7f))
* remove console.log ([878a710](https://bitbucket.org/centraltechnology/centech-api/commits/878a710a2117b084a0ba34f32c9124edb5bddb8a))


### Features

* **PaymentInfo:** add installment_type ([f061996](https://bitbucket.org/centraltechnology/centech-api/commits/f061996a4c1a5bf8d605bb25a444930fd004bfa9))
* **PaymentInfo:** add operation installment_type ([1c57e74](https://bitbucket.org/centraltechnology/centech-api/commits/1c57e743969d4f453ef01975f87c0617ceed2cf5))





# [1.75.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.14...versions/1.75.0) (2020-10-01)


### Features

* CPI-587 get attribute label on schema v2 from mdc ([3968b68](https://bitbucket.org/centraltechnology/centech-api/commits/3968b682f1fe5a77d18a94b26a21a8237e0c19c1))





## [1.74.14](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.13...versions/1.74.14) (2020-09-30)


### Bug Fixes

* **Redis:** Disable Tag Cache By SKU ([e16793a](https://bitbucket.org/centraltechnology/centech-api/commits/e16793a7f40a22a72348b41f538ced843075e446))





## [1.74.13](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.12...versions/1.74.13) (2020-09-30)


### Bug Fixes

* v2product add field `promotionTag` and fix seller ([65f34f9](https://bitbucket.org/centraltechnology/centech-api/commits/65f34f9f3c848e84c50cd5b86a02efb11c17e67d))





## [1.74.12](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.11...versions/1.74.12) (2020-09-28)


### Bug Fixes

* CPI-592 change to lower case ([6ed7552](https://bitbucket.org/centraltechnology/centech-api/commits/6ed755281e2d163cd98a6636ca37c80ba0014f62))





## [1.74.11](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.10...versions/1.74.11) (2020-09-28)


### Bug Fixes

* CPI-592 support preorder / by order on schema v2 ([49e2ef0](https://bitbucket.org/centraltechnology/centech-api/commits/49e2ef02ccc20a286d44c5dc1687e9c9dbffd6cf))





## [1.74.10](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.9...versions/1.74.10) (2020-09-25)


### Bug Fixes

* add missing field `createdAt` on v2Review ([ae4022b](https://bitbucket.org/centraltechnology/centech-api/commits/ae4022b0c4b8ec12ed78a7d7837b50bafed502a1))





## [1.74.9](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.8...versions/1.74.9) (2020-09-25)


### Bug Fixes

* add news_from_date on cs schema ([c2405dd](https://bitbucket.org/centraltechnology/centech-api/commits/c2405ddff1648d5705b2587a61c1c0de4e98b740))





## [1.74.8](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.7...versions/1.74.8) (2020-09-24)


### Bug Fixes

* **pickupLocations:** add  to PickupStoreLocation ([98d6b68](https://bitbucket.org/centraltechnology/centech-api/commits/98d6b6895de9a935ea9d8e88e0f5a4531bc01543))





## [1.74.7](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.6...versions/1.74.7) (2020-09-23)

**Note:** Version bump only for package @central-tech/api





## [1.74.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.5...versions/1.74.6) (2020-09-23)


### Bug Fixes

* **Newrelic:** log app_name when start ([7b0f8cc](https://bitbucket.org/centraltechnology/centech-api/commits/7b0f8ccb4ee37718c54b4df7ff74633c45c1f355))





## [1.74.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.4...versions/1.74.5) (2020-09-23)


### Bug Fixes

* change newrelic app name base on APP_ENV ([6b9f888](https://bitbucket.org/centraltechnology/centech-api/commits/6b9f888ddd19866636d128207536a4ec05d3b90e))





## [1.74.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.3...versions/1.74.4) (2020-09-23)


### Bug Fixes

* add missing header on checkout when call with `axios` ([2f6a964](https://bitbucket.org/centraltechnology/centech-api/commits/2f6a964c67e0be954b2be47b33f2bddb54e879e2))
* change bu to LowerCase ([3d1cbf9](https://bitbucket.org/centraltechnology/centech-api/commits/3d1cbf970461e3758e3f018a5015716620c5ed51))
* header user-agent on cart checkout ([096a428](https://bitbucket.org/centraltechnology/centech-api/commits/096a4287be14affe15c6e180f10ff23799593f6c))
* toLowerCase error when run test on pipeline ([46823d3](https://bitbucket.org/centraltechnology/centech-api/commits/46823d3b7c9624bd3cdd2593c268db2597fdf5f7))





## [1.74.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.2...versions/1.74.3) (2020-09-23)


### Bug Fixes

* change vip api cache ([e9917c7](https://bitbucket.org/centraltechnology/centech-api/commits/e9917c74e9b7d51501d0f89c7bb6e5875732ed58))
* CPI-527 add caching in data source ([4179304](https://bitbucket.org/centraltechnology/centech-api/commits/4179304de25684bbe10de3f81babef91cbcdecc6))
* CPI-527 add short cache and change cache ([8eeaff5](https://bitbucket.org/centraltechnology/centech-api/commits/8eeaff532e1e08b4761a792a879feaffb9d27fe9))
* CPI-527 remove cache from method post ([9683cda](https://bitbucket.org/centraltechnology/centech-api/commits/9683cdaf8c93605d007b1beebb95699f3f05c26a))





## [1.74.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.1...versions/1.74.2) (2020-09-23)


### Bug Fixes

* send x-request-id to mdc ([231e456](https://bitbucket.org/centraltechnology/centech-api/commits/231e4568b1bacd6de0d3752ca02af63b782337f4))





## [1.74.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.74.0...versions/1.74.1) (2020-09-22)


### Bug Fixes

* **v2SuggestSearch:** add product_size, category_size args to cs ([4aadb98](https://bitbucket.org/centraltechnology/centech-api/commits/4aadb98c6b389947ea973714230fb45ca883834a))





# [1.74.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.73.7...versions/1.74.0) (2020-09-22)


### Bug Fixes

* add `google_tag_manager_cookie` in store config extension attr ([aaff242](https://bitbucket.org/centraltechnology/centech-api/commits/aaff2428977bcf42a916382e594c6b3d154ab0e8))
* add `socialLoginV2` extension to CDS ([59f52cd](https://bitbucket.org/centraltechnology/centech-api/commits/59f52cd8e15eb03c2fb430c0e3844ed2e5ca77ce))
* add attributeCode on V2ConfigurableOption and V2ProductOption ([4c72ed6](https://bitbucket.org/centraltechnology/centech-api/commits/4c72ed63b9ab74711bf37fef46dd39789671be5e))
* add cache ttl for CS urlKey ([ddd950a](https://bitbucket.org/centraltechnology/centech-api/commits/ddd950a67b4f96452aef1e472ed201c31732890e))
* add enum allow return and allow express in product flag ([bae22fd](https://bitbucket.org/centraltechnology/centech-api/commits/bae22fd21f3e91c6dae155dbe997fd073971946c))
* add enum beauty and only at central in product flag v2 ([b8ce6e4](https://bitbucket.org/centraltechnology/centech-api/commits/b8ce6e48196b5e82c98da4dc81bf0a22d40b924a))
* add level field in breadcrumb ([37876b0](https://bitbucket.org/centraltechnology/centech-api/commits/37876b08fb96486baf3b81740ecd191c44897642))
* add support select redis db using `REDIS_DB` env ([475a5d5](https://bitbucket.org/centraltechnology/centech-api/commits/475a5d538dc9d90a976d5ef0ff503bf3b466c260))
* allow header `x-intent-alias`  ([ab41012](https://bitbucket.org/centraltechnology/centech-api/commits/ab4101208efb6243ffa529afc4b231985b7442da))
* attribute check is null ([35b1e3f](https://bitbucket.org/centraltechnology/centech-api/commits/35b1e3feedae68f0cf99bc8e258305f89d4f6dd6))
* bypass `mergeGuestCart` when not send `guest_token` ([4de100a](https://bitbucket.org/centraltechnology/centech-api/commits/4de100adf519ab70ee4cd67600fa0f276a7b8855))
* change cache to `defaultCache` ([5c73118](https://bitbucket.org/centraltechnology/centech-api/commits/5c731184fa3acaf2b6de6a78e2a0f271ab378b91))
* change tracing to false ([0625a48](https://bitbucket.org/centraltechnology/centech-api/commits/0625a4837444a1e92a4fd6f1fda441a821fd1818))
* change type on ConfigExtensionAttribute. google_tag_manager_cookies ([57532f9](https://bitbucket.org/centraltechnology/centech-api/commits/57532f9d42ec3fd898ddaba9fd5555782b86908d))
* change version to versions/schema-v2-1.13 ([78244f0](https://bitbucket.org/centraltechnology/centech-api/commits/78244f08083ea4cd52775040b6b64a59089d0009))
* CPI-507 forward x-intent-alias header to catalog service ([b10ebc0](https://bitbucket.org/centraltechnology/centech-api/commits/b10ebc05db3b319894b6f33e34e1ed65a1b06763))
* CPI-528 move query pickupLocations to extension ([f2c211a](https://bitbucket.org/centraltechnology/centech-api/commits/f2c211a3f98faec96a9f09f70cadd73351ebe470))
* CPI-538 add google key in env / refactor code ([d571136](https://bitbucket.org/centraltechnology/centech-api/commits/d571136e12d17b84d34962412b58b3b10b790755))
* error typescript add attributeCode key ([58bf3c2](https://bitbucket.org/centraltechnology/centech-api/commits/58bf3c23405ac1b31eaa14166a1c8068015a9979))
* error typescript on V2ConfigurableOption ([1247884](https://bitbucket.org/centraltechnology/centech-api/commits/1247884066fda2d97c35e1bae2f4864e11649a7d))
* Mutation v2SetShippingInformation's input ([ed03636](https://bitbucket.org/centraltechnology/centech-api/commits/ed036362e18b6bbe031d64db18eac4ad33b05e0d))
* PriceSummary wrong discount ([2bf3fa6](https://bitbucket.org/centraltechnology/centech-api/commits/2bf3fa6f26ac9db186c6ed4b13a63d780f5955ed))
* product flag v2 check categories is null ([671d5db](https://bitbucket.org/centraltechnology/centech-api/commits/671d5db063d131797631210f51276a8400b26cae))
* product transform check data is null ([219bb22](https://bitbucket.org/centraltechnology/centech-api/commits/219bb22720382eca0e7a69b581b74f522c87d5c1))
* set default ConfigurableProductOption type when cannot mapping type ([8bd8a4b](https://bitbucket.org/centraltechnology/centech-api/commits/8bd8a4beaad140d90f59b6dcca378f46ab39a5f5))
* sort options of configurable product V2 ([d9a0eb7](https://bitbucket.org/centraltechnology/centech-api/commits/d9a0eb7eb5f131df417ba55747db848b8453fdff))
* v2DeliveryOptionByPostcode is return empty ([56503d4](https://bitbucket.org/centraltechnology/centech-api/commits/56503d45123d02d6c5ded251165f7a3c7b6e935b))
* V2DeliveryOptionByPostcode use default postcode every request ([0cefe8d](https://bitbucket.org/centraltechnology/centech-api/commits/0cefe8d9800e38f3b2ec506a47a39c2f5d5d3a49))
* **Cache:** add missing cache on `V1/product/salerule/getoverlay` ([439e950](https://bitbucket.org/centraltechnology/centech-api/commits/439e950d8e9f170ec2521d1d1883098ef376ff8a))
* `V2ProductSearchFilterResult.options` return `V2ProductSearchFilterNormalResultOption` ([e551feb](https://bitbucket.org/centraltechnology/centech-api/commits/e551feb1abfa3022b2b1e2c765ba10a7f5f93bd2))
* `whiteListFilterConfig` error when bu is not `cds` ([013eb4a](https://bitbucket.org/centraltechnology/centech-api/commits/013eb4a09d9213107568bf8692961cc727f547d9))
* add `company` on `cart.billing_address` ([a091af5](https://bitbucket.org/centraltechnology/centech-api/commits/a091af5d7db35b6ac876786c04d601a02bace3a5))
* add `created_at` to `V2Review` ([243af13](https://bitbucket.org/centraltechnology/centech-api/commits/243af13cb9d2954d9f7579967c2b78787abfbb63))
* add `morgan` to log incoming request ([8cffd37](https://bitbucket.org/centraltechnology/centech-api/commits/8cffd371553e47a8e7536d73e73923cc377bc992))
* add enum shipping method and get from shipping method code ([c8b6f60](https://bitbucket.org/centraltechnology/centech-api/commits/c8b6f60a505e27d33b83be20cec08cea201a1e46))
* add estimateShippingMethods query V3 ffor guest and customer case ([c5862c1](https://bitbucket.org/centraltechnology/centech-api/commits/c5862c16709212a822c5e5f791419be3425e8fe3))
* add key on response option ([21adefd](https://bitbucket.org/centraltechnology/centech-api/commits/21adefdb49d91615b890aa45a15c13d30496d27b))
* change `V2DeliveryOptionByPostcodeInput.postcode` as optional and sent `0` to mdc as default ([bbc814c](https://bitbucket.org/centraltechnology/centech-api/commits/bbc814ce5ba497a117a72419b11b6fb0ac5d4d05))
* change rule_id to ID type ([785aed1](https://bitbucket.org/centraltechnology/centech-api/commits/785aed1b26c126b4dde125b1e3755dcf6c38a43a))
* change type of `V2ProductSearchFilterRangeResultOption.value` to float ([0e4b258](https://bitbucket.org/centraltechnology/centech-api/commits/0e4b258abf37c2b8e40208dece2fad87d01afa65))
* check body of request not null ([8b3fbdb](https://bitbucket.org/centraltechnology/centech-api/commits/8b3fbdb7976a61d34246a2d84829ecfd5c650f5b))
* CPI-493 add url media to image ([3bc7835](https://bitbucket.org/centraltechnology/centech-api/commits/3bc7835149ad7775560175b3079b89547ad5aa56))
* **PaymentService:** add status error when can’t repayment ([e08bd04](https://bitbucket.org/centraltechnology/centech-api/commits/e08bd04bf05ac54a723d4d0159a5b27077139293))
* CPI-465 add logic sort ConfigurableProduct by discount(percentage), createdAt ([eec61d0](https://bitbucket.org/centraltechnology/centech-api/commits/eec61d0efac78244d41a84ff968e0d4fa0da50f2))
* fallback product type `virtual` on resolver ([92ce15e](https://bitbucket.org/centraltechnology/centech-api/commits/92ce15e0a94c1ebdbd15599ed321cf2d6f3495ce))
* force `is3ds` true when BU is CDS ([9995cb8](https://bitbucket.org/centraltechnology/centech-api/commits/9995cb83dccd0cd440b69370eca3c3be50ff06a8))
* handle field is null on product v2 ([eeff11e](https://bitbucket.org/centraltechnology/centech-api/commits/eeff11e69ce8a1243dc1a2ca036879a749ec9f95))
* handle product is null from catalog service / change type store config / change key name - url key of brand ([1540b02](https://bitbucket.org/centraltechnology/centech-api/commits/1540b0219d52ee531497bc3e98eb9a4c3ff8d139))
* inc version on version query ([b71a2e7](https://bitbucket.org/centraltechnology/centech-api/commits/b71a2e7c81866785df8e1919b7f1d2242f086d7f))
* move transformer file to `schemav2/transformer` ([da75005](https://bitbucket.org/centraltechnology/centech-api/commits/da75005040571ec83baa90805769ab151e51e619))
* product search filter range - map label ([4444681](https://bitbucket.org/centraltechnology/centech-api/commits/4444681c85eda8ae52bd5011bb849dc01ad53eaf))
* product search v2 improve filter input and response ([f70fc29](https://bitbucket.org/centraltechnology/centech-api/commits/f70fc29b9268b63d853c8bc90c5c4edb8fad4c6b))
* remove unuse package ([741df30](https://bitbucket.org/centraltechnology/centech-api/commits/741df303f305a44fb83776944f36c7eeabe2e834))
* remove unused graphql type ([8eb6b7f](https://bitbucket.org/centraltechnology/centech-api/commits/8eb6b7fd12dd4f0e0cdf381e2681a01f8c379481))
* schema v2 brand required id, name, url key ([88174cb](https://bitbucket.org/centraltechnology/centech-api/commits/88174cbb4f62bab4bf9188eafb3a98fc352b9240))
* type couponRuleFragment and throw when assignCouponCampaign is error ([044d567](https://bitbucket.org/centraltechnology/centech-api/commits/044d567ee3e7b6540dfd303b1557b37b32563c8c))
* update version schema ([18561d6](https://bitbucket.org/centraltechnology/centech-api/commits/18561d6b753bb99d24366c48c5ce9efa8ba5a6f5))
* **Cart:** Fix incomplete address data in the `shipping_assignments` field ([ca7e2e2](https://bitbucket.org/centraltechnology/centech-api/commits/ca7e2e2c8924743a0bdb9434fb92d3d9d665f04a))
* **Coupon:** POWH-3573 Hotfix add to_date in Coupon Schema ([7020e68](https://bitbucket.org/centraltechnology/centech-api/commits/7020e686690c281cfb38057ad4dba25adbe15492))
* **DeliveryOption:** Rename DeliveryOption input and response interfaces ([c836ca8](https://bitbucket.org/centraltechnology/centech-api/commits/c836ca826e4f007e8c98dd9e30334e42159d5f4e))
* **MyCoupon:** POWH-1929 Fix route MDC My Coupon ([29b34a2](https://bitbucket.org/centraltechnology/centech-api/commits/29b34a2b0994512343e8d0e147defca29a61ba45))
* **PaymentService:** incorrect field for checking before make a repayment ([a84dbe6](https://bitbucket.org/centraltechnology/centech-api/commits/a84dbe69d73c355a22c4cb3859030066971ae0c8))
* **SchemaV2:** `ConfigurableOption.label` by `store_id` ([687fde3](https://bitbucket.org/centraltechnology/centech-api/commits/687fde3b621398c56ec343b4a75dc3e580b088e3))
* **SchemaV2:** add missing type `productCount` on `V2ProductSearchFilterNormalResultOption` ([405b18c](https://bitbucket.org/centraltechnology/centech-api/commits/405b18c670515efcf10ad0a063db91bb0b68e676))
* **SchemaV2:** change version number to schema-v2-1.3 ([77340fb](https://bitbucket.org/centraltechnology/centech-api/commits/77340fb4bae4d7a9c6cdc1d78bf921a55a2c6a26))
* **SchemaV2:** createAt using datetime type ([10574a0](https://bitbucket.org/centraltechnology/centech-api/commits/10574a0d230d5780a72d3307c8b82b4caeddc5fa))
* throw error when `url` on `product` query is empty ([01c411f](https://bitbucket.org/centraltechnology/centech-api/commits/01c411f4c3e1e6965a854d980b681e16fdc04997))


### Features

* CPI-518 Report portal integration ([6f7dbd3](https://bitbucket.org/centraltechnology/centech-api/commits/6f7dbd3af5efba57339f7e5b3dc6857e295db8f1))
* CPI-538 add query postcodeByLatLng / support lat lng input in v2DeliveryOptionByPostcode ([e49c49a](https://bitbucket.org/centraltechnology/centech-api/commits/e49c49a384cb74418d204240a7ab360d7b99db50))
* **MyCoupon:** POWH-1929 API My Coupon Page ([7a5dada](https://bitbucket.org/centraltechnology/centech-api/commits/7a5dada71324c02e9fdff4230a8cd5498d1e0936))
* **MyCoupon:** POWH-1929 API My Coupon Page ([3c31861](https://bitbucket.org/centraltechnology/centech-api/commits/3c3186103f906fcc243f8aed604f324a85e8e1cb))
* **product:** Create product schema V2 ([9099c3e](https://bitbucket.org/centraltechnology/centech-api/commits/9099c3e9bb4165d82bd61243c9b95d202755eab2))
* **VVIP:** add ids and need_assistance ([e4fca06](https://bitbucket.org/centraltechnology/centech-api/commits/e4fca062b9ed3bd7538277c453c49b7c7c5165d8))
* **VVIP:** add name field ([ba8e265](https://bitbucket.org/centraltechnology/centech-api/commits/ba8e265179fe8c57e9c2a4d708a5b70ed6bd7fc5))
* **VVIP:** edit type to int ([cde7bf7](https://bitbucket.org/centraltechnology/centech-api/commits/cde7bf774ee63bfeab199f4693e97b114317dd08))
* add query pickupLocations ([dbc3afc](https://bitbucket.org/centraltechnology/centech-api/commits/dbc3afc23cd2b9e72e38867f93cdda40ec0ab3ab))
* add query storePickupLocationsAvailable extension ([5816699](https://bitbucket.org/centraltechnology/centech-api/commits/581669940d606966c218428ba38c6dbabde64a58))
* add query storePickupLocationsAvailable extension ([14a8e34](https://bitbucket.org/centraltechnology/centech-api/commits/14a8e345d90c326746e20e3b913b6f9ba10e0574))
* **VVIP:** POWH-3561 Add VVIP API ([b04979f](https://bitbucket.org/centraltechnology/centech-api/commits/b04979fe817038a1660775da5fa057c294da7717))
* change `v2DeliveryOptionByPostcode` to api v2 ([42dad3e](https://bitbucket.org/centraltechnology/centech-api/commits/42dad3e73cc3cd943fffc9bb95b624d3d1b375e9))
* CPI-491 Add v2SetShippingInformation Mutation ([31fcb66](https://bitbucket.org/centraltechnology/centech-api/commits/31fcb667572a5e942c9079dbb83ed5dc0613c046))
* CPI-491 Add v2SetShippingInformation Mutation ([c44f1f9](https://bitbucket.org/centraltechnology/centech-api/commits/c44f1f9326c3905aed3e2aeb4ca84fc37cddd511))
* CPI-491 Add v2SetShippingInformation Mutation ([441cf93](https://bitbucket.org/centraltechnology/centech-api/commits/441cf938bd0694f7820687c5dca206e7edf02138))
* CPI-492 Add v2PackageOptions Query ([d97afc2](https://bitbucket.org/centraltechnology/centech-api/commits/d97afc210f8388dc6731a0d257bf9ef719645ed7))
* CPI-492 Add v2PackageOptions Query ([be0f19d](https://bitbucket.org/centraltechnology/centech-api/commits/be0f19ddfc5e3017700dc914996821cbf77edc60))
* **Coupon:** POWH-1929 Add API Coupon List Campaign ([c7fbd96](https://bitbucket.org/centraltechnology/centech-api/commits/c7fbd96074d4aa70f03b9ff4b695d007e6a8f236))
* **DeliveryOption:** Create DeliveryOptionResolver ([37b3132](https://bitbucket.org/centraltechnology/centech-api/commits/37b3132508da61a30685e623ab6c713e98bae9a2))
* **MyCoupon:** POWH-1929 API My Coupon Page ([4cfce6f](https://bitbucket.org/centraltechnology/centech-api/commits/4cfce6fbc154bcf20249c5f167787455f95e94b9))





## [1.73.7](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.73.6...versions/1.73.7) (2020-09-22)


### Bug Fixes

* OTP will Always require on new card [TOL-7022] ([cace652](https://bitbucket.org/centraltechnology/centech-api/commits/cace6525191a9dcccfe4f65745892b808f889601))





## [1.73.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.73.5...versions/1.73.6) (2020-09-22)


### Bug Fixes

* **v2PackageOptions:** change schema product.item_id to ID ([e335eec](https://bitbucket.org/centraltechnology/centech-api/commits/e335eecb416ad840d92a3870cea2c13b2ce3c495))





## [1.73.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.73.4...versions/1.73.5) (2020-09-21)


### Bug Fixes

* convert bu to lower case ([c1c5e7c](https://bitbucket.org/centraltechnology/centech-api/commits/c1c5e7cbace99cc39dab4cd3931d1c1a4b14dd12))





## [1.73.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.73.3...versions/1.73.4) (2020-09-21)


### Bug Fixes

* add PaymentService on OFM  ([d913193](https://bitbucket.org/centraltechnology/centech-api/commits/d9131938cad1dfd94b30ffafbd21118e3f5ddab6))





## [1.73.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.73.2...versions/1.73.3) (2020-09-21)

**Note:** Version bump only for package @central-tech/api





## [1.73.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.73.1...versions/1.73.2) (2020-09-21)


### Bug Fixes

* **v2PackageOptions:** product.item_id change to array ([674b9a7](https://bitbucket.org/centraltechnology/centech-api/commits/674b9a75c5e77fb5ca4dbb7a43ec25689746e616))





## [1.73.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.73.0...versions/1.73.1) (2020-09-21)


### Bug Fixes

* query `search` add field `homepage_new` and fix new flag ([37216ea](https://bitbucket.org/centraltechnology/centech-api/commits/37216ea742acb628460dd4044ad1b0c0b3ba92ba))





# [1.73.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.72.5...versions/1.73.0) (2020-09-21)


### Features

* **Product:** POWH-3591 Add Field `overlay_position` in product fragment ([0157f9c](https://bitbucket.org/centraltechnology/centech-api/commits/0157f9ca93a327cda93ed8900d6eb89561b3e432))





## [1.72.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.72.4...versions/1.72.5) (2020-09-18)


### Bug Fixes

* query `cards` add sort and field created_at ([155db85](https://bitbucket.org/centraltechnology/centech-api/commits/155db85be1e9407485ea4dc6983c3a5938a94f4b))





## [1.72.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.72.3...versions/1.72.4) (2020-09-18)

**Note:** Version bump only for package @central-tech/api





## [1.72.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.72.2...versions/1.72.3) (2020-09-18)


### Bug Fixes

* **ExpressServer:** add keepAliveTimeout on express ([38f5d96](https://bitbucket.org/centraltechnology/centech-api/commits/38f5d9626bb3badf48a30c3125cf30c5f90e6016))





## [1.72.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.72.1...versions/1.72.2) (2020-09-18)


### Bug Fixes

* remove default getThumbnailUrl link & add brand.id in operation ([77d4d45](https://bitbucket.org/centraltechnology/centech-api/commits/77d4d4541e3063a26920b9dc856823dd21593fdd))





## [1.72.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.72.0...versions/1.72.1) (2020-09-17)

**Note:** Version bump only for package @central-tech/api





# [1.72.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.71.2...versions/1.72.0) (2020-09-17)


### Bug Fixes

* dataLake: searchSuggestionKeywords => searchSuggestionTerms ([41c1c27](https://bitbucket.org/centraltechnology/centech-api/commits/41c1c27ff1168014b8bbc0716cf0ba0b6795069f))
* disable `setCommits` on sentry ([46fbd80](https://bitbucket.org/centraltechnology/centech-api/commits/46fbd80b02e39f73df4b8492c4ed5a70ac303459))


### Features

* add Dockerfile on root repo for build with yarn.lock ([d2d3d56](https://bitbucket.org/centraltechnology/centech-api/commits/d2d3d569cf9bc765e6eb12a28b07a55a885c3aff))





## [1.71.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.71.1...versions/1.71.2) (2020-09-17)


### Bug Fixes

* [v2SuggestSearch, v2TrendSearch] => change word  to , add require validate, default cacahe ([b7ad67c](https://bitbucket.org/centraltechnology/centech-api/commits/b7ad67cc691a50f2ca31351d4f4a2c9916e10f46))
* update `@sentry/node` to `5.23.0` ([2e14c22](https://bitbucket.org/centraltechnology/centech-api/commits/2e14c227e307e610325d3303f5f93fd4e01a694c))





## [1.71.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.71.0...versions/1.71.1) (2020-09-17)


### Bug Fixes

* **PaymentService:** change OTP logic to only > 10k total on TOPS ([83b5be8](https://bitbucket.org/centraltechnology/centech-api/commits/83b5be82c892774bdd798412b66a673ad8b2dd8a))





# [1.71.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.70.0...versions/1.71.0) (2020-09-16)


### Bug Fixes

* cache on user-agent and x-request-id header ([cb67c46](https://bitbucket.org/centraltechnology/centech-api/commits/cb67c460ca14a847e9d540cb66874e519be19b53))


### Features

* CPI-565 OMF support field on mutation `setPaymentInfo` ([2d1424e](https://bitbucket.org/centraltechnology/centech-api/commits/2d1424e55dbbc8c64c85b75bf381db862a153db1))





# [1.70.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.69.1...versions/1.70.0) (2020-09-16)


### Bug Fixes

* v2SuggestSearch: add size(limit) payload, add v2TrendingSearch query ([7ccd502](https://bitbucket.org/centraltechnology/centech-api/commits/7ccd502e5c9212a9fdec02b2cc44bac777b2707a))
* **PaymentService:** is 3ds must in bool ([62fe19b](https://bitbucket.org/centraltechnology/centech-api/commits/62fe19b89374c510f9a6f8842071d1c90edbc039))
* add error info when validate `encrypted_card_data` ([6882562](https://bitbucket.org/centraltechnology/centech-api/commits/68825622da7239bbf956fd8f695f3181f1a7fbc6))
* CPI-564 add field on `AddressInputCustomAttributes` ([5d30fde](https://bitbucket.org/centraltechnology/centech-api/commits/5d30fde39172e0cac7f99285494bba92ccfae99a))
* CPI-570 `setPaymentInformation` get cart ([98b6f1f](https://bitbucket.org/centraltechnology/centech-api/commits/98b6f1f101386ad20a3afcaba677ab7a1db298c3))


### Features

* CPI-570 TOPS - custom CVV and OTP ([9cdb07f](https://bitbucket.org/centraltechnology/centech-api/commits/9cdb07f05229193631df6788c0d9d1273331d6f9))





## [1.69.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.69.0...versions/1.69.1) (2020-09-16)

**Note:** Version bump only for package @central-tech/api





# [1.69.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.68.4...versions/1.69.0) (2020-09-16)


### Bug Fixes

* SuggestSearchResolvers => resolve suggestionKeywords, trendingKeywords ([dd3393a](https://bitbucket.org/centraltechnology/centech-api/commits/dd3393aa19f26568c151a468f06790a7e7c4c6f0))


### Features

* CPI-563 v2SuggestSearch - products, categories, suggestionKeywords, trendingKeywords ([1c8fca0](https://bitbucket.org/centraltechnology/centech-api/commits/1c8fca03c96218a33530abbe63b6f56a18b784fd))
* CPI-564 support field on mutation `setPaymentInfo` ([3d0de0d](https://bitbucket.org/centraltechnology/centech-api/commits/3d0de0dc173d0e6210b0bb8e8bcbd50e4d87321f))





## [1.68.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.68.3...versions/1.68.4) (2020-09-15)


### Bug Fixes

* **BaseRESTDataSource:** add http header `User-agent` to MDC ([8afa9e7](https://bitbucket.org/centraltechnology/centech-api/commits/8afa9e7d039a873f1ff74de7090c321577e80778))





## [1.68.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.68.2...versions/1.68.3) (2020-09-14)


### Bug Fixes

* **RBS:** add force OTP on RBS ([021c939](https://bitbucket.org/centraltechnology/centech-api/commits/021c939c6e80fac7ff1e784f93f7e22c1b1eefc4))





## [1.68.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.68.1...versions/1.68.2) (2020-09-14)


### Bug Fixes

* **SchemaV2:** change logic to find Parent Product using `sku` instead of `urlKey` ([7a7f91f](https://bitbucket.org/centraltechnology/centech-api/commits/7a7f91f5d70f6b1033d0b8d286dc35b919a03914))
* **SchemaV2:** remove non-use param ([ce16b4c](https://bitbucket.org/centraltechnology/centech-api/commits/ce16b4cf63fe07b7d58664449d8e7dafb910c604))





## [1.68.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.68.0...versions/1.68.1) (2020-09-11)


### Bug Fixes

* remove `authorization` key on request used ([148644b](https://bitbucket.org/centraltechnology/centech-api/commits/148644bec18e3fd315f69f9c2b8f70e12e18843e))





# [1.68.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.67.0...versions/1.68.0) (2020-09-11)


### Bug Fixes

* add missing `request_id` on sentry tag ([4e27f58](https://bitbucket.org/centraltechnology/centech-api/commits/4e27f58a5788581716479ce1cdc2bc78e2b5a56e))





# [1.67.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.66.3...versions/1.67.0) (2020-09-11)


### Features

* Add DeliveryOptionUseCase unit test ([1fab1fd](https://bitbucket.org/centraltechnology/centech-api/commits/1fab1fdf026da55adefe77a42bb7db32bb78d095))
* CPI-517 Add sonarqube and fix bugs from analyess ([b68631d](https://bitbucket.org/centraltechnology/centech-api/commits/b68631d1b3cfd24ff14d32f2dd2a0ee4827b8e94))





## [1.66.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.66.2...versions/1.66.3) (2020-09-10)


### Bug Fixes

* **VVIP:** POWH-3592 Fix API vipWithToken ([c2f4196](https://bitbucket.org/centraltechnology/centech-api/commits/c2f419628bdf92af305478fe5bc7b59d3446488f))





## [1.66.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.66.1...versions/1.66.2) (2020-09-10)


### Bug Fixes

* **rbs:** add preFilterAggregationConfig on rbs ([5fe1a58](https://bitbucket.org/centraltechnology/centech-api/commits/5fe1a582f6fd234ed090dc7399a8710b4d3112b2))





## [1.66.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.66.0...versions/1.66.1) (2020-09-10)


### Bug Fixes

* `v2ProductBySKU` filter product by sku ([586f34a](https://bitbucket.org/centraltechnology/centech-api/commits/586f34af4aaaae29236e40b94bdede483973b22a))
* filter `IV2ProductSearchFilterRangeResultOption` when is default vaule ([ef16543](https://bitbucket.org/centraltechnology/centech-api/commits/ef1654339132909bd0514ec9d50e80b892a2f921))
* remove filter product by sku ([b813e14](https://bitbucket.org/centraltechnology/centech-api/commits/b813e14a3166833351ffdc24054eee2353eaa429))





# [1.66.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.65.2...versions/1.66.0) (2020-09-09)


### Bug Fixes

* CPI-549 add metadata to query: urlRewrite ([fcacfb0](https://bitbucket.org/centraltechnology/centech-api/commits/fcacfb006c1c9bfa4fc053cbd4b8d103da5ed62d))


### Features

* CPI-562 add overall_rating in `LEGACY_SEARCH` ([e4b25be](https://bitbucket.org/centraltechnology/centech-api/commits/e4b25bebaf5ed2d57167542f71913135bb079679))





## [1.65.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.65.1...versions/1.65.2) (2020-09-09)


### Bug Fixes

* **Tops:** add Payment Service extension ([ff50c8b](https://bitbucket.org/centraltechnology/centech-api/commits/ff50c8be4fa738e924aa7bdab4914c434a1581d6))





## [1.65.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.65.0...versions/1.65.1) (2020-09-08)


### Bug Fixes

* **VVIP:** POWH-3592 Add Field `t1No` in vipValidate ([d55b379](https://bitbucket.org/centraltechnology/centech-api/commits/d55b379ea60de27e2531154996451481ef52933f))





# [1.65.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.64.1...versions/1.65.0) (2020-09-08)


### Features

* **VVIP:** POWH-3592 Add JWT in Vip Validate ([4dc4cd4](https://bitbucket.org/centraltechnology/centech-api/commits/4dc4cd40702386ccb29cc116b5356fe12e26ecfa))
* **VVIP-CMS:** Add need_assistance and interest graphql ([5ac3cca](https://bitbucket.org/centraltechnology/centech-api/commits/5ac3cca8ba215ced6ec310cc87500021f6ee8557))





## [1.64.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.64.0...versions/1.64.1) (2020-09-08)


### Bug Fixes

* **tops:** add missing file config/tops.extension.ts ([082653d](https://bitbucket.org/centraltechnology/centech-api/commits/082653d7f247a61f4f3583d14b31652f8679c8d7))





# [1.64.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.63.3...versions/1.64.0) (2020-09-08)


### Bug Fixes

* **cart_price_rule_overlays:** with configurable product on PLP page ([eb38812](https://bitbucket.org/centraltechnology/centech-api/commits/eb38812cc51af98437c23ed5cd4494a977b78375))
* query `brandDetail` change `product_collections` schema ([d74211b](https://bitbucket.org/centraltechnology/centech-api/commits/d74211bedc0381b11c8f51ca83b5a3a99d435a96))
* store request cache options on each datasource ([cf1407d](https://bitbucket.org/centraltechnology/centech-api/commits/cf1407df24b0e040209c8ea0ab9fe3e0d5d9157a))


### Features

* CPI-558 add requestUsage in sentry error logging ([513ad60](https://bitbucket.org/centraltechnology/centech-api/commits/513ad60d0dc4ae03761cfe502147bcfe7a3677d4))





## [1.63.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.63.2...versions/1.63.3) (2020-09-07)


### Bug Fixes

* add t1No input to datasource ([d94af95](https://bitbucket.org/centraltechnology/centech-api/commits/d94af953d00c3a7c0f7be50c740a491c92e6434f))





## [1.63.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.63.1...versions/1.63.2) (2020-09-07)


### Bug Fixes

* import on linux system ([a39c346](https://bitbucket.org/centraltechnology/centech-api/commits/a39c346fac328ab4a9a405ab8f030a1b7ff6ec59))





## [1.63.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.63.0...versions/1.63.1) (2020-09-07)


### Bug Fixes

* error on request log ([55c4fc3](https://bitbucket.org/centraltechnology/centech-api/commits/55c4fc3a7f3193607fcf3cf5b5df7fe600358281))





# [1.63.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.62.0...versions/1.63.0) (2020-09-07)


### Bug Fixes

* CPI-528 change type `allowSts` to boolean ([05627aa](https://bitbucket.org/centraltechnology/centech-api/commits/05627aa3c1d06079db0b76ec754b87f8518451bd))
* CPI-528 force type `allowIspu` to boolean ([57f03fe](https://bitbucket.org/centraltechnology/centech-api/commits/57f03fef15e7082bda70e94de5e76f10d2d713f5))
* response ttl & comment ([f5357b8](https://bitbucket.org/centraltechnology/centech-api/commits/f5357b86cfa08215c08f3f434ffd2be7eb683be3))


### Features

* request usage extension ([581f287](https://bitbucket.org/centraltechnology/centech-api/commits/581f2879ac473f4dd03dbdc4437e266d1564ddc3))





# [1.62.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.61.3...versions/1.62.0) (2020-09-07)


### Features

* **VVIP:** add t1No variable ([540f279](https://bitbucket.org/centraltechnology/centech-api/commits/540f279d392485bfa7df09d36fa1cb2f7e02476a))





## [1.61.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.61.2...versions/1.61.3) (2020-09-03)

**Note:** Version bump only for package @central-tech/api





## [1.61.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.61.1...versions/1.61.2) (2020-09-03)

**Note:** Version bump only for package @central-tech/api





## [1.61.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.61.0...versions/1.61.1) (2020-09-02)


### Bug Fixes

* Mutation v2SetShippingInformation's input ([ed03636](https://bitbucket.org/centraltechnology/centech-api/commits/ed036362e18b6bbe031d64db18eac4ad33b05e0d))





# [1.61.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.60.0...versions/1.61.0) (2020-09-02)


### Bug Fixes

* CPI-528 move query pickupLocations to extension ([f2c211a](https://bitbucket.org/centraltechnology/centech-api/commits/f2c211a3f98faec96a9f09f70cadd73351ebe470))
* CPI-538 add google key in env / refactor code ([d571136](https://bitbucket.org/centraltechnology/centech-api/commits/d571136e12d17b84d34962412b58b3b10b790755))


### Features

* add query pickupLocations ([dbc3afc](https://bitbucket.org/centraltechnology/centech-api/commits/dbc3afc23cd2b9e72e38867f93cdda40ec0ab3ab))
* add query storePickupLocationsAvailable extension ([5816699](https://bitbucket.org/centraltechnology/centech-api/commits/581669940d606966c218428ba38c6dbabde64a58))
* add query storePickupLocationsAvailable extension ([14a8e34](https://bitbucket.org/centraltechnology/centech-api/commits/14a8e345d90c326746e20e3b913b6f9ba10e0574))
* CPI-538 add query postcodeByLatLng / support lat lng input in v2DeliveryOptionByPostcode ([e49c49a](https://bitbucket.org/centraltechnology/centech-api/commits/e49c49a384cb74418d204240a7ab360d7b99db50))





# [1.60.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.59.8...versions/1.60.0) (2020-09-02)


### Bug Fixes

* add cache ttl for CS urlKey ([ddd950a](https://bitbucket.org/centraltechnology/centech-api/commits/ddd950a67b4f96452aef1e472ed201c31732890e))
* change cache to `defaultCache` ([5c73118](https://bitbucket.org/centraltechnology/centech-api/commits/5c731184fa3acaf2b6de6a78e2a0f271ab378b91))


### Features

* **VVIP:** add ids and need_assistance ([e4fca06](https://bitbucket.org/centraltechnology/centech-api/commits/e4fca062b9ed3bd7538277c453c49b7c7c5165d8))
* **VVIP:** add name field ([ba8e265](https://bitbucket.org/centraltechnology/centech-api/commits/ba8e265179fe8c57e9c2a4d708a5b70ed6bd7fc5))
* **VVIP:** edit type to int ([cde7bf7](https://bitbucket.org/centraltechnology/centech-api/commits/cde7bf774ee63bfeab199f4693e97b114317dd08))





## [1.59.8](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.59.7...versions/1.59.8) (2020-08-28)


### Bug Fixes

* product transform check data is null ([219bb22](https://bitbucket.org/centraltechnology/centech-api/commits/219bb22720382eca0e7a69b581b74f522c87d5c1))





## [1.59.7](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.59.6...versions/1.59.7) (2020-08-28)


### Bug Fixes

* add support select redis db using `REDIS_DB` env ([475a5d5](https://bitbucket.org/centraltechnology/centech-api/commits/475a5d538dc9d90a976d5ef0ff503bf3b466c260))
* bypass `mergeGuestCart` when not send `guest_token` ([4de100a](https://bitbucket.org/centraltechnology/centech-api/commits/4de100adf519ab70ee4cd67600fa0f276a7b8855))





## [1.59.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.59.5...versions/1.59.6) (2020-08-27)


### Bug Fixes

* change tracing to false ([0625a48](https://bitbucket.org/centraltechnology/centech-api/commits/0625a4837444a1e92a4fd6f1fda441a821fd1818))





## [1.59.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.59.4...versions/1.59.5) (2020-08-27)


### Bug Fixes

* change type on ConfigExtensionAttribute. google_tag_manager_cookies ([57532f9](https://bitbucket.org/centraltechnology/centech-api/commits/57532f9d42ec3fd898ddaba9fd5555782b86908d))





## [1.59.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.59.3...versions/1.59.4) (2020-08-26)


### Bug Fixes

* V2DeliveryOptionByPostcode use default postcode every request ([0cefe8d](https://bitbucket.org/centraltechnology/centech-api/commits/0cefe8d9800e38f3b2ec506a47a39c2f5d5d3a49))





## [1.59.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.59.2...versions/1.59.3) (2020-08-26)


### Bug Fixes

* add `socialLoginV2` extension to CDS ([59f52cd](https://bitbucket.org/centraltechnology/centech-api/commits/59f52cd8e15eb03c2fb430c0e3844ed2e5ca77ce))
* allow header `x-intent-alias`  ([ab41012](https://bitbucket.org/centraltechnology/centech-api/commits/ab4101208efb6243ffa529afc4b231985b7442da))





## [1.59.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.59.1...versions/1.59.2) (2020-08-26)


### Bug Fixes

* set default ConfigurableProductOption type when cannot mapping type ([8bd8a4b](https://bitbucket.org/centraltechnology/centech-api/commits/8bd8a4beaad140d90f59b6dcca378f46ab39a5f5))





## [1.59.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.59.0...versions/1.59.1) (2020-08-26)


### Bug Fixes

* add `google_tag_manager_cookie` in store config extension attr ([aaff242](https://bitbucket.org/centraltechnology/centech-api/commits/aaff2428977bcf42a916382e594c6b3d154ab0e8))
* CPI-507 forward x-intent-alias header to catalog service ([b10ebc0](https://bitbucket.org/centraltechnology/centech-api/commits/b10ebc05db3b319894b6f33e34e1ed65a1b06763))





# [1.59.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.58.2...versions/1.59.0) (2020-08-26)


### Features

* **VVIP:** POWH-3561 Add VVIP API ([b04979f](https://bitbucket.org/centraltechnology/centech-api/commits/b04979fe817038a1660775da5fa057c294da7717))





## [1.58.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.58.1...versions/1.58.2) (2020-08-24)


### Bug Fixes

* **Cache:** add missing cache on `V1/product/salerule/getoverlay` ([439e950](https://bitbucket.org/centraltechnology/centech-api/commits/439e950d8e9f170ec2521d1d1883098ef376ff8a))
* **Coupon:** POWH-3573 Hotfix add to_date in Coupon Schema ([7020e68](https://bitbucket.org/centraltechnology/centech-api/commits/7020e686690c281cfb38057ad4dba25adbe15492))





## [1.58.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.58.0...versions/1.58.1) (2020-08-24)


### Bug Fixes

* add enum allow return and allow express in product flag ([bae22fd](https://bitbucket.org/centraltechnology/centech-api/commits/bae22fd21f3e91c6dae155dbe997fd073971946c))
* v2DeliveryOptionByPostcode is return empty ([56503d4](https://bitbucket.org/centraltechnology/centech-api/commits/56503d45123d02d6c5ded251165f7a3c7b6e935b))





# [1.58.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.57.4...versions/1.58.0) (2020-08-21)


### Features

* CPI-491 Add v2SetShippingInformation Mutation ([31fcb66](https://bitbucket.org/centraltechnology/centech-api/commits/31fcb667572a5e942c9079dbb83ed5dc0613c046))
* CPI-491 Add v2SetShippingInformation Mutation ([c44f1f9](https://bitbucket.org/centraltechnology/centech-api/commits/c44f1f9326c3905aed3e2aeb4ca84fc37cddd511))
* CPI-491 Add v2SetShippingInformation Mutation ([441cf93](https://bitbucket.org/centraltechnology/centech-api/commits/441cf938bd0694f7820687c5dca206e7edf02138))
* CPI-492 Add v2PackageOptions Query ([d97afc2](https://bitbucket.org/centraltechnology/centech-api/commits/d97afc210f8388dc6731a0d257bf9ef719645ed7))
* CPI-492 Add v2PackageOptions Query ([be0f19d](https://bitbucket.org/centraltechnology/centech-api/commits/be0f19ddfc5e3017700dc914996821cbf77edc60))





## [1.57.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.57.3...versions/1.57.4) (2020-08-21)


### Bug Fixes

* error typescript add attributeCode key ([58bf3c2](https://bitbucket.org/centraltechnology/centech-api/commits/58bf3c23405ac1b31eaa14166a1c8068015a9979))





## [1.57.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.57.2...versions/1.57.3) (2020-08-21)


### Bug Fixes

* error typescript on V2ConfigurableOption ([1247884](https://bitbucket.org/centraltechnology/centech-api/commits/1247884066fda2d97c35e1bae2f4864e11649a7d))





## [1.57.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.57.1...versions/1.57.2) (2020-08-21)


### Bug Fixes

* add attributeCode on V2ConfigurableOption and V2ProductOption ([4c72ed6](https://bitbucket.org/centraltechnology/centech-api/commits/4c72ed63b9ab74711bf37fef46dd39789671be5e))
* attribute check is null ([35b1e3f](https://bitbucket.org/centraltechnology/centech-api/commits/35b1e3feedae68f0cf99bc8e258305f89d4f6dd6))





## [1.57.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.57.0...versions/1.57.1) (2020-08-20)


### Bug Fixes

* **SchemaV2:** add missing type `productCount` on `V2ProductSearchFilterNormalResultOption` ([405b18c](https://bitbucket.org/centraltechnology/centech-api/commits/405b18c670515efcf10ad0a063db91bb0b68e676))





# [1.57.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.56.4...versions/1.57.0) (2020-08-20)


### Bug Fixes

* **SchemaV2:** createAt using datetime type ([10574a0](https://bitbucket.org/centraltechnology/centech-api/commits/10574a0d230d5780a72d3307c8b82b4caeddc5fa))
* `V2ProductSearchFilterResult.options` return `V2ProductSearchFilterNormalResultOption` ([e551feb](https://bitbucket.org/centraltechnology/centech-api/commits/e551feb1abfa3022b2b1e2c765ba10a7f5f93bd2))
* `whiteListFilterConfig` error when bu is not `cds` ([013eb4a](https://bitbucket.org/centraltechnology/centech-api/commits/013eb4a09d9213107568bf8692961cc727f547d9))
* add `created_at` to `V2Review` ([243af13](https://bitbucket.org/centraltechnology/centech-api/commits/243af13cb9d2954d9f7579967c2b78787abfbb63))
* add enum beauty and only at central in product flag v2 ([b8ce6e4](https://bitbucket.org/centraltechnology/centech-api/commits/b8ce6e48196b5e82c98da4dc81bf0a22d40b924a))
* add enum shipping method and get from shipping method code ([c8b6f60](https://bitbucket.org/centraltechnology/centech-api/commits/c8b6f60a505e27d33b83be20cec08cea201a1e46))
* add estimateShippingMethods query V3 ffor guest and customer case ([c5862c1](https://bitbucket.org/centraltechnology/centech-api/commits/c5862c16709212a822c5e5f791419be3425e8fe3))
* add fallback type `VIRTUAL` return simple product ([ba8ee69](https://bitbucket.org/centraltechnology/centech-api/commits/ba8ee690b9829ef82aad22aeeb1fb48f3c2e01d4))
* add level field in breadcrumb ([37876b0](https://bitbucket.org/centraltechnology/centech-api/commits/37876b08fb96486baf3b81740ecd191c44897642))
* change `V2DeliveryOptionByPostcodeInput.postcode` as optional and sent `0` to mdc as default ([bbc814c](https://bitbucket.org/centraltechnology/centech-api/commits/bbc814ce5ba497a117a72419b11b6fb0ac5d4d05))
* change type of `V2ProductSearchFilterRangeResultOption.value` to float ([0e4b258](https://bitbucket.org/centraltechnology/centech-api/commits/0e4b258abf37c2b8e40208dece2fad87d01afa65))
* change version to versions/schema-v2-1.13 ([78244f0](https://bitbucket.org/centraltechnology/centech-api/commits/78244f08083ea4cd52775040b6b64a59089d0009))
* CPI-465 add logic sort ConfigurableProduct by discount(percentage), createdAt ([eec61d0](https://bitbucket.org/centraltechnology/centech-api/commits/eec61d0efac78244d41a84ff968e0d4fa0da50f2))
* fallback product type `virtual` on resolver ([92ce15e](https://bitbucket.org/centraltechnology/centech-api/commits/92ce15e0a94c1ebdbd15599ed321cf2d6f3495ce))
* handle field is null on product v2 ([eeff11e](https://bitbucket.org/centraltechnology/centech-api/commits/eeff11e69ce8a1243dc1a2ca036879a749ec9f95))
* handle product is null from catalog service / change type store config / change key name - url key of brand ([1540b02](https://bitbucket.org/centraltechnology/centech-api/commits/1540b0219d52ee531497bc3e98eb9a4c3ff8d139))
* inc version on version query ([b71a2e7](https://bitbucket.org/centraltechnology/centech-api/commits/b71a2e7c81866785df8e1919b7f1d2242f086d7f))
* move transformer file to `schemav2/transformer` ([da75005](https://bitbucket.org/centraltechnology/centech-api/commits/da75005040571ec83baa90805769ab151e51e619))
* PriceSummary wrong discount ([2bf3fa6](https://bitbucket.org/centraltechnology/centech-api/commits/2bf3fa6f26ac9db186c6ed4b13a63d780f5955ed))
* product flag v2 check categories is null ([671d5db](https://bitbucket.org/centraltechnology/centech-api/commits/671d5db063d131797631210f51276a8400b26cae))
* product search filter range - map label ([4444681](https://bitbucket.org/centraltechnology/centech-api/commits/4444681c85eda8ae52bd5011bb849dc01ad53eaf))
* product search v2 improve filter input and response ([f70fc29](https://bitbucket.org/centraltechnology/centech-api/commits/f70fc29b9268b63d853c8bc90c5c4edb8fad4c6b))
* remove unuse package ([741df30](https://bitbucket.org/centraltechnology/centech-api/commits/741df303f305a44fb83776944f36c7eeabe2e834))
* remove unused graphql type ([8eb6b7f](https://bitbucket.org/centraltechnology/centech-api/commits/8eb6b7fd12dd4f0e0cdf381e2681a01f8c379481))
* schema v2 brand required id, name, url key ([88174cb](https://bitbucket.org/centraltechnology/centech-api/commits/88174cbb4f62bab4bf9188eafb3a98fc352b9240))
* sort options of configurable product V2 ([d9a0eb7](https://bitbucket.org/centraltechnology/centech-api/commits/d9a0eb7eb5f131df417ba55747db848b8453fdff))
* update version schema ([18561d6](https://bitbucket.org/centraltechnology/centech-api/commits/18561d6b753bb99d24366c48c5ce9efa8ba5a6f5))
* **DeliveryOption:** Rename DeliveryOption input and response interfaces ([c836ca8](https://bitbucket.org/centraltechnology/centech-api/commits/c836ca826e4f007e8c98dd9e30334e42159d5f4e))
* **SchemaV2:** `ConfigurableOption.label` by `store_id` ([687fde3](https://bitbucket.org/centraltechnology/centech-api/commits/687fde3b621398c56ec343b4a75dc3e580b088e3))
* **SchemaV2:** change version number to schema-v2-1.3 ([77340fb](https://bitbucket.org/centraltechnology/centech-api/commits/77340fb4bae4d7a9c6cdc1d78bf921a55a2c6a26))


### Features

* change `v2DeliveryOptionByPostcode` to api v2 ([42dad3e](https://bitbucket.org/centraltechnology/centech-api/commits/42dad3e73cc3cd943fffc9bb95b624d3d1b375e9))
* **DeliveryOption:** Create DeliveryOptionResolver ([37b3132](https://bitbucket.org/centraltechnology/centech-api/commits/37b3132508da61a30685e623ab6c713e98bae9a2))
* **product:** Create product schema V2 ([9099c3e](https://bitbucket.org/centraltechnology/centech-api/commits/9099c3e9bb4165d82bd61243c9b95d202755eab2))
* **Product:** add enum to filter input and add filter criteria response in product search v2 ([8950980](https://bitbucket.org/centraltechnology/centech-api/commits/89509802514db8ef1d5d5c4b4548412e1577ef35))





## [1.56.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.56.3...versions/1.56.4) (2020-08-19)

**Note:** Version bump only for package @central-tech/api





## [1.56.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.56.2...versions/1.56.3) (2020-08-18)


### Bug Fixes

* **MyCoupon:** POWH-1929 Fix route MDC My Coupon ([29b34a2](https://bitbucket.org/centraltechnology/centech-api/commits/29b34a2b0994512343e8d0e147defca29a61ba45))





## [1.56.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.56.1...versions/1.56.2) (2020-08-17)


### Bug Fixes

* **PaymentService:** incorrect field for checking before make a repayment ([a84dbe6](https://bitbucket.org/centraltechnology/centech-api/commits/a84dbe69d73c355a22c4cb3859030066971ae0c8))





## [1.56.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.56.0...versions/1.56.1) (2020-08-17)


### Bug Fixes

* CPI-493 add url media to image ([3bc7835](https://bitbucket.org/centraltechnology/centech-api/commits/3bc7835149ad7775560175b3079b89547ad5aa56))





# [1.56.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.55.7...versions/1.56.0) (2020-08-17)


### Bug Fixes

* add key on response option ([21adefd](https://bitbucket.org/centraltechnology/centech-api/commits/21adefdb49d91615b890aa45a15c13d30496d27b))
* change rule_id to ID type ([785aed1](https://bitbucket.org/centraltechnology/centech-api/commits/785aed1b26c126b4dde125b1e3755dcf6c38a43a))
* **PaymentService:** add status error when can’t repayment ([e08bd04](https://bitbucket.org/centraltechnology/centech-api/commits/e08bd04bf05ac54a723d4d0159a5b27077139293))
* check body of request not null ([8b3fbdb](https://bitbucket.org/centraltechnology/centech-api/commits/8b3fbdb7976a61d34246a2d84829ecfd5c650f5b))
* type couponRuleFragment and throw when assignCouponCampaign is error ([044d567](https://bitbucket.org/centraltechnology/centech-api/commits/044d567ee3e7b6540dfd303b1557b37b32563c8c))


### Features

* CPI-493 add query and mutation coupon campaign ([6b1b2ae](https://bitbucket.org/centraltechnology/centech-api/commits/6b1b2aec9280819de7e28338ce6e94b64415ff6b))





## [1.55.7](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.55.6...versions/1.55.7) (2020-08-17)


### Bug Fixes

* add estimateShippingMethodsV3 for fe ([35bfb9a](https://bitbucket.org/centraltechnology/centech-api/commits/35bfb9a714a3fa1d9b6213abd1154bfbda8762d6))





## [1.55.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.55.5...versions/1.55.6) (2020-08-16)


### Bug Fixes

* cartPriceRule ([040c785](https://bitbucket.org/centraltechnology/centech-api/commits/040c785f34f37423ea21e380ad565e1ccde1bbc3))





## [1.55.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.55.4...versions/1.55.5) (2020-08-14)


### Bug Fixes

* add extension price rule overlay ([69f87e2](https://bitbucket.org/centraltechnology/centech-api/commits/69f87e250986b34b144eb0a67af6a1f515d6e3aa))





## [1.55.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.55.3...versions/1.55.4) (2020-08-14)

**Note:** Version bump only for package @central-tech/api





## [1.55.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.55.2...versions/1.55.3) (2020-08-14)

**Note:** Version bump only for package @central-tech/api





## [1.55.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.55.1...versions/1.55.2) (2020-08-14)


### Bug Fixes

* add cart_price_rule_overlays in product search ([25cf608](https://bitbucket.org/centraltechnology/centech-api/commits/25cf6084e842ebe49da7dd38e4079af92fd224d3))





## [1.55.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.55.0...versions/1.55.1) (2020-08-13)


### Bug Fixes

* cart_price_rule_overlays break test ([efe763a](https://bitbucket.org/centraltechnology/centech-api/commits/efe763afa751f1f33aad217d6c2dee4135b0ddf4))
* cart_price_rule_overlays return empty array when empty ([b446f10](https://bitbucket.org/centraltechnology/centech-api/commits/b446f1083f73c2e60750c0e67ae4552da0b83541))





# [1.55.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.54.1...versions/1.55.0) (2020-08-13)


### Bug Fixes

* change type of overlay id to ID ([71895e0](https://bitbucket.org/centraltechnology/centech-api/commits/71895e080446b744bac3e32ed7254b3c6ed6a369))
* CPI-494 product orverlay require id ([122f3c0](https://bitbucket.org/centraltechnology/centech-api/commits/122f3c0aebf404c46380802e45c1f3b7fd6aa55f))


### Features

* CPI-494 add cart_price_rule_overlays field ([75a1195](https://bitbucket.org/centraltechnology/centech-api/commits/75a119583eddea7f7f57071c64a9390eedd0a270))
* CPI-494 overlay change display_priority to int / add id field ([d269e36](https://bitbucket.org/centraltechnology/centech-api/commits/d269e3688ab138cbfc401681799f862eef1e072c))





## [1.54.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.54.0...versions/1.54.1) (2020-08-13)


### Bug Fixes

* add `ApplicationError` on `loginT1` ([8f0c5f5](https://bitbucket.org/centraltechnology/centech-api/commits/8f0c5f5dc6b0bf2c2ab64c1e4f69ba45a622db53))
* add log extra on sentry ([307cc2a](https://bitbucket.org/centraltechnology/centech-api/commits/307cc2a0ecf4a2210eeeb9cc6f14aedd01aaaa73))
* CPI-490 add promotion code field ([08ca760](https://bitbucket.org/centraltechnology/centech-api/commits/08ca76012249f3831ea66f729ce550628be605f5))
* remove `fingerprint` from sentry ([89044d2](https://bitbucket.org/centraltechnology/centech-api/commits/89044d22b1c3a69c49488b860382cadfa290030a))
* update sentry ([55cc4f4](https://bitbucket.org/centraltechnology/centech-api/commits/55cc4f4878ab6a7ef96e85c596ea8ac4101ba6b5))
* **PaymentService:** support guest on repayment ([9fc90ea](https://bitbucket.org/centraltechnology/centech-api/commits/9fc90ea37a3b9cadaacdac1227471cde8cf123df))





# [1.54.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.53.2...versions/1.54.0) (2020-08-11)


### Features

* **Coupon:** POWH-1929 Add API Coupon List Campaign ([c7fbd96](https://bitbucket.org/centraltechnology/centech-api/commits/c7fbd96074d4aa70f03b9ff4b695d007e6a8f236))
* **MyCoupon:** POWH-1929 API My Coupon Page ([7a5dada](https://bitbucket.org/centraltechnology/centech-api/commits/7a5dada71324c02e9fdff4230a8cd5498d1e0936))
* **MyCoupon:** POWH-1929 API My Coupon Page ([4cfce6f](https://bitbucket.org/centraltechnology/centech-api/commits/4cfce6fbc154bcf20249c5f167787455f95e94b9))
* **MyCoupon:** POWH-1929 API My Coupon Page ([3c31861](https://bitbucket.org/centraltechnology/centech-api/commits/3c3186103f906fcc243f8aed604f324a85e8e1cb))





## [1.53.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.53.1...versions/1.53.2) (2020-08-06)


### Bug Fixes

* force `is3ds` true when BU is CDS ([9995cb8](https://bitbucket.org/centraltechnology/centech-api/commits/9995cb83dccd0cd440b69370eca3c3be50ff06a8))





## [1.53.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.53.0...versions/1.53.1) (2020-08-06)


### Bug Fixes

* add `morgan` to log incoming request ([8cffd37](https://bitbucket.org/centraltechnology/centech-api/commits/8cffd371553e47a8e7536d73e73923cc377bc992))





# [1.53.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.52.0...versions/1.53.0) (2020-07-30)


### Features

* **FlashSale:** POWH-3438 [Flash sale enhancement] Display price with ??? baht for upcoming flash sale items ([0bdfacc](https://bitbucket.org/centraltechnology/centech-api/commits/0bdfacc565ecc1f05765c3016516208b3c56c128))





# [1.52.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.51.0...versions/1.52.0) (2020-07-23)


### Bug Fixes

* add `company` on `cart.billing_address` ([a091af5](https://bitbucket.org/centraltechnology/centech-api/commits/a091af5d7db35b6ac876786c04d601a02bace3a5))
* throw error when `url` on `product` query is empty ([01c411f](https://bitbucket.org/centraltechnology/centech-api/commits/01c411f4c3e1e6965a854d980b681e16fdc04997))


### Features

* **cache:** Create clearDataSourceCache mutation ([61437c1](https://bitbucket.org/centraltechnology/centech-api/commits/61437c1f85449b62492187aa8b2fc3a55f2530d4))





# [1.51.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.50.1...versions/1.51.0) (2020-07-20)


### Bug Fixes

* **Bank:** Add base image url prefix ([efef130](https://bitbucket.org/centraltechnology/centech-api/commits/efef1301da746eaac41dfdde086d6bf39ad11dc0))


### Features

* **PaymentService:** add `repayment` mutation ([9ce6a59](https://bitbucket.org/centraltechnology/centech-api/commits/9ce6a595beb8b5af412746629ef42c98296d5a3b))





## [1.50.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.50.0...versions/1.50.1) (2020-07-17)


### Bug Fixes

* **Bank:** Create MagentoBankDataSource ([b8de5a6](https://bitbucket.org/centraltechnology/centech-api/commits/b8de5a66bed9e79b527a9510df0007699b7c73cc))





# [1.50.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.49.0...versions/1.50.0) (2020-07-15)


### Features

* **Newrelic:** add env `NEW_RELIC_NAME` ([62f1547](https://bitbucket.org/centraltechnology/centech-api/commits/62f1547b832218bd6242b2907033780bc80c2e16))





# [1.49.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.48.7...versions/1.49.0) (2020-07-15)


### Features

* **HDL:** POWH-3384 Add Query getShippingSlotInfoHdl ([8f37adc](https://bitbucket.org/centraltechnology/centech-api/commits/8f37adcda7e1c2502dd93a15347170143adec111))





## [1.48.7](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.48.6...versions/1.48.7) (2020-07-13)


### Bug Fixes

* **Cart:** fix missing filed on custom_attributes ([4ec754b](https://bitbucket.org/centraltechnology/centech-api/commits/4ec754bf24aa387534b9e347c2bfd6289d340a38))





## [1.48.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.48.5...versions/1.48.6) (2020-07-13)


### Bug Fixes

* **Cart:** add missing field on `Cart.billing_address` ([790ae74](https://bitbucket.org/centraltechnology/centech-api/commits/790ae74fef84bb225f1a4696b60efa9146b0a9b2))
* **ProductByUrl:** fix error when product not found ([551823e](https://bitbucket.org/centraltechnology/centech-api/commits/551823ed9dd031b3a4b4392b6721f1f00cc11154))





## [1.48.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.48.4...versions/1.48.5) (2020-07-07)


### Bug Fixes

* **Cart:** Fix incomplete address data in the `shipping_assignments` field ([ca7e2e2](https://bitbucket.org/centraltechnology/centech-api/commits/ca7e2e2c8924743a0bdb9434fb92d3d9d665f04a))





## [1.48.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.48.3...versions/1.48.4) (2020-07-07)


### Bug Fixes

* **Extension:** `productBrandByCustomAttributeOption` break product data ([23ceb1d](https://bitbucket.org/centraltechnology/centech-api/commits/23ceb1ded563e744fedcd3ed01271d15dbda0abb))





## [1.48.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.48.2...versions/1.48.3) (2020-07-06)


### Bug Fixes

* **OrderDetail:** POWH-3312 Fix Fetch Shipment Tracking ([4f4bfbc](https://bitbucket.org/centraltechnology/centech-api/commits/4f4bfbcc572612315c58ee926119ef0f198181e9))





## [1.48.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.48.1...versions/1.48.2) (2020-07-06)


### Bug Fixes

* **cart:** fix brand missing a checkout page ([ae4c3da](https://bitbucket.org/centraltechnology/centech-api/commits/ae4c3dadee8d44a3a5e101a3d4cd2e066ce8678b))





## [1.48.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.48.0...versions/1.48.1) (2020-07-06)

**Note:** Version bump only for package @central-tech/api





# [1.48.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.47.6...versions/1.48.0) (2020-07-06)


### Features

* facebook login ([80b8900](https://bitbucket.org/centraltechnology/centech-api/commits/80b8900e09ee80c3e3065c74fcd8ad3420527d42))





## [1.47.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.47.5...versions/1.47.6) (2020-07-03)

**Note:** Version bump only for package @central-tech/api





## [1.47.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.47.4...versions/1.47.5) (2020-07-03)


### Bug Fixes

* **cart:** fix incorrect marketplace_seller_option data source ([e88b2e8](https://bitbucket.org/centraltechnology/centech-api/commits/e88b2e834dc35d2665330ab9d081a02c2ffe0586))





## [1.47.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.47.3...versions/1.47.4) (2020-07-01)


### Bug Fixes

* **Cart:** fix price fields missing ([d5ab020](https://bitbucket.org/centraltechnology/centech-api/commits/d5ab02052bd21ca5f8e047197c163bf0b31870d0))





## [1.47.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.47.2...versions/1.47.3) (2020-07-01)


### Bug Fixes

* **PaymentOffileDetail:** change `amount` to `float` ([c40ce37](https://bitbucket.org/centraltechnology/centech-api/commits/c40ce37f185b6e10ef4594f69170f4ccf490d38d))





## [1.47.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.47.1...versions/1.47.2) (2020-06-26)


### Bug Fixes

* **allowedHeaders:** change allowedHeaders from `*` to array ([100532b](https://bitbucket.org/centraltechnology/centech-api/commits/100532b65d4c5bdb931485ee45447062ec0f3c83))





## [1.47.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.47.0...versions/1.47.1) (2020-06-25)


### Bug Fixes

* **T1:** add missing field `max_allowed_points` ([98a94a6](https://bitbucket.org/centraltechnology/centech-api/commits/98a94a660c66552fb8c72f23708c28d2090ad3c5))





# [1.47.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.46.3...versions/1.47.0) (2020-06-25)


### Features

* **Cart:** POWH-3320 Add field `is_split_quote` for check cart merge ([6812fef](https://bitbucket.org/centraltechnology/centech-api/commits/6812fef96ac139be6c097edbe864f8123a76c429))





## [1.46.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.46.2...versions/1.46.3) (2020-06-24)


### Bug Fixes

* **PaymentService:** BankTransfer can not checkout ([b029613](https://bitbucket.org/centraltechnology/centech-api/commits/b029613c49e3f3d141f3d048edc7c2ef23236c75))





## [1.46.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.46.1...versions/1.46.2) (2020-06-24)


### Bug Fixes

* **cart:** `cart.billing_address.var_id` missing ([a6e729d](https://bitbucket.org/centraltechnology/centech-api/commits/a6e729d34b788ce21977a0c43f517a0066ef3f8b))
* **PaymentService:** add missing mutation `createCard` [CPI-361, CDS-5974] ([3a82193](https://bitbucket.org/centraltechnology/centech-api/commits/3a8219388b07fab7edc5d4ea909ecabaf761d58f))





## [1.46.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.46.0...versions/1.46.1) (2020-06-24)


### Bug Fixes

* **PaymentService:** add encrypt logic on `paymentOffline` ([ce2574e](https://bitbucket.org/centraltechnology/centech-api/commits/ce2574eb93c4e13c30a75819df3622cda8c4d45a))
* **PaymentService:** remove validate card on BankTransfer ([ff6b9e9](https://bitbucket.org/centraltechnology/centech-api/commits/ff6b9e9c85c38907dbdd820a4ff0607bf20c19b9))





# [1.46.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.45.5...versions/1.46.0) (2020-06-24)


### Bug Fixes

* **cart:** `address_input.custom_attributes` missing ([c1ae8fc](https://bitbucket.org/centraltechnology/centech-api/commits/c1ae8fcba5865b7550a4fba91afcd6c9795c48ee))
* **PaymentService:** add paymentOfflineQuery ([8f240a9](https://bitbucket.org/centraltechnology/centech-api/commits/8f240a989d4de58964a4e6632cd38ad7fa165d5d))


### Features

* **PaymentService:** add payment offline ([c7b456f](https://bitbucket.org/centraltechnology/centech-api/commits/c7b456ff40a80cb2119f6d016e16b831103c2679))





## [1.45.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.45.4...versions/1.45.5) (2020-06-23)


### Bug Fixes

* **payment:** `payment_service_installment_plans.interest_type` missing ([b37057b](https://bitbucket.org/centraltechnology/centech-api/commits/b37057b982fd7e45864595356414709316b1e748))





## [1.45.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.45.3...versions/1.45.4) (2020-06-23)


### Bug Fixes

* **cart:** `billing_address.custom_attributes` missing ([e0a707d](https://bitbucket.org/centraltechnology/centech-api/commits/e0a707d659e15c32bf994530bc75e4567b3179d3))





## [1.45.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.45.2...versions/1.45.3) (2020-06-22)


### Bug Fixes

* **Cart:** add `billing_address.extension_attributes.full_tax_request` ([7465adb](https://bitbucket.org/centraltechnology/centech-api/commits/7465adbeac62cd1c0fa7d7096543e51a1bd1d0d1))
* **Payment:** payment_service_installment_plans missing ([54c27c7](https://bitbucket.org/centraltechnology/centech-api/commits/54c27c7e5d8f97526fc78bcb5ed416f12245dae3))





## [1.45.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.45.1...versions/1.45.2) (2020-06-19)

**Note:** Version bump only for package @central-tech/api





## [1.45.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.45.0...versions/1.45.1) (2020-06-18)


### Bug Fixes

* **CartBillingAddress:** add `customer_id` ([5517ac5](https://bitbucket.org/centraltechnology/centech-api/commits/5517ac5de65667eecd709375a64ec35ff64410fb))
* **PlaceOrder:** add cds payload ([794dc5c](https://bitbucket.org/centraltechnology/centech-api/commits/794dc5ce63d09004e5184248b52a95347ad2cf74))





# [1.45.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.44.6...versions/1.45.0) (2020-06-18)


### Bug Fixes

* change restoreShippingAssignment to admin datasource ([8c97295](https://bitbucket.org/centraltechnology/centech-api/commits/8c9729546d01cf8cb9e8400d5d1eb6f6e18da61a))


### Features

* **Cart:** POWH-3313 Add API Unmerge Cart ([3b87695](https://bitbucket.org/centraltechnology/centech-api/commits/3b8769567467f978717b39af33c027b0faf2d76f))





## [1.44.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.44.5...versions/1.44.6) (2020-06-18)


### Bug Fixes

* **Category:** type on `include_in_menu` and `is_active` in `sub_category` ([68f274f](https://bitbucket.org/centraltechnology/centech-api/commits/68f274fdfaa3b27349d3d86aa3b44d374960110b))
* **payment:** add missing field `is_payment_promotion_locked` ([b57ce6d](https://bitbucket.org/centraltechnology/centech-api/commits/b57ce6d4af91f19345743de6ed420cdba0afbb35))
* remove facebook app secret CPI-219 ([6be1129](https://bitbucket.org/centraltechnology/centech-api/commits/6be1129e929235ae2c4ab8edf0e7de4c590bc348))





## [1.44.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.44.4...versions/1.44.5) (2020-06-10)


### Bug Fixes

* **Newrelic:** error when run in local ([3ffd0d4](https://bitbucket.org/centraltechnology/centech-api/commits/3ffd0d4fd933e9d0ce333c1b36e87deca8ec28ed))
* **PaymentService:** add bin lookup ([80f0d1c](https://bitbucket.org/centraltechnology/centech-api/commits/80f0d1ca3decf0f56a447cf50301310b76406a39))





## [1.44.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.44.3...versions/1.44.4) (2020-06-09)


### Bug Fixes

* **Config:** add `paymentService` to cds extension ([dbd8a2b](https://bitbucket.org/centraltechnology/centech-api/commits/dbd8a2b13fc51532e7cde28ecdc8eb15f8ac47b7))





## [1.44.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.44.2...versions/1.44.3) (2020-06-08)


### Bug Fixes

* **Newrelic:** remove `ApplicationError` from newrelic ([03aca9c](https://bitbucket.org/centraltechnology/centech-api/commits/03aca9c34c531432d3e50b6e76eb899b1e6a657f))
* **Tokeniztion:** POWH-3202 Fix a.map is not function ([6f09a19](https://bitbucket.org/centraltechnology/centech-api/commits/6f09a1965dc3c986388a2a155b4da5858dcc1044))





## [1.44.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.44.1...versions/1.44.2) (2020-06-04)


### Bug Fixes

* **PaymentService:** can not set default card `CPI-358` ([cb732fd](https://bitbucket.org/centraltechnology/centech-api/commits/cb732fd0549ede9f46390ac890a23c7c6f5f64e8))





## [1.44.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.44.0...versions/1.44.1) (2020-06-04)


### Bug Fixes

* **cs2:** fixed uppercase store send to cs2 ([fae2689](https://bitbucket.org/centraltechnology/centech-api/commits/fae268981a1c09248056cc001cfe44968cd9a11e))
* **cs2:** log request to cs2 ([558b683](https://bitbucket.org/centraltechnology/centech-api/commits/558b68307e6cb70b800f39c321b6a6147f1eeff8))
* **extension:** rbs missing extension file ([5fb3a76](https://bitbucket.org/centraltechnology/centech-api/commits/5fb3a764b1c64d9a7ce9f10c2c78ce1fecd39a91))





# [1.44.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.43.6...versions/1.44.0) (2020-06-02)


### Bug Fixes

* **PaymentService:** add missing field on card ([1509c6a](https://bitbucket.org/centraltechnology/centech-api/commits/1509c6a791bb2a405f36d17a8008d8bb5a5d4fd7))
* add missing mutations ([94c0af3](https://bitbucket.org/centraltechnology/centech-api/commits/94c0af38a77a303314864cdfd3fbcc189b445031))


### Features

* **PaymentService:** add `deleteCard` mutation [CPI-356, POWH-3225] ([c3b6ab2](https://bitbucket.org/centraltechnology/centech-api/commits/c3b6ab22f17b9d87bfc9c88fbffd07dbfa741206))
* **PaymentService:** add `setDeaultCard` mutation and set default card when has only one card [CPI-358, POWH-3233] ([3325d79](https://bitbucket.org/centraltechnology/centech-api/commits/3325d7957daa7e7813870dd7a3cb6018a392250f))
* **PaymentService:** not remove old card when place order [CPI-357, POWH-3234] ([346b30a](https://bitbucket.org/centraltechnology/centech-api/commits/346b30a98e981b5cfc4c4eca5c7f2399bdaccf89))





## [1.43.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.43.5...versions/1.43.6) (2020-06-01)


### Bug Fixes

* **Consent:** POWH-3248 Fix Consent in Thx Register ([319e100](https://bitbucket.org/centraltechnology/centech-api/commits/319e100e1985317e7ae24f7e7b0852e8bbcc7248))





## [1.43.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.43.4...versions/1.43.5) (2020-06-01)


### Bug Fixes

* **TrackOrder:** POWH-3246 Fix Tracking Detail not show ([d00dcfb](https://bitbucket.org/centraltechnology/centech-api/commits/d00dcfb1fef327f4a00a8041e76c4bcdcf77e2f5))





## [1.43.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.43.3...versions/1.43.4) (2020-05-28)


### Bug Fixes

* **Consent:** Check the wrong status ([488d25c](https://bitbucket.org/centraltechnology/centech-api/commits/488d25ca26b28589c2eb14dc38a76c16eed60505))





## [1.43.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.43.2...versions/1.43.3) (2020-05-28)


### Bug Fixes

* **Shipment Tracking:** replace suffix( `POWH100000-1` >  `POWH1000001` ) when split order ([24ff525](https://bitbucket.org/centraltechnology/centech-api/commits/24ff5253f1dd52ef45a084745201c80b88d34fe3))





## [1.43.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.43.1...versions/1.43.2) (2020-05-26)


### Bug Fixes

* **Consent:** change ref-id prefix `cart-id` to `cart-ID` (https://cenergy.atlassian.net/wiki/spaces/PDPA/pages/1768949971/Consent+service+API+-+cg-passport+API) ([72e5944](https://bitbucket.org/centraltechnology/centech-api/commits/72e594493099fe80bc1082780bce65e8cc69f4cb))





## [1.43.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.43.0...versions/1.43.1) (2020-05-25)


### Bug Fixes

* **consent:** need_reaccept_consents always true when user should not to accept marketing consent ([b16ce3f](https://bitbucket.org/centraltechnology/centech-api/commits/b16ce3f268363477a6e224304e8c99c722eb1fb7))
* **SplitOrder:** use `payment_service_fullpayment` when payment is empty ([487fe2b](https://bitbucket.org/centraltechnology/centech-api/commits/487fe2b576671596aa905503d54026e0bd295526))





# [1.43.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.42.1...versions/1.43.0) (2020-05-22)


### Features

* **consent:** add no reaccept consent for ssp ([e1ff458](https://bitbucket.org/centraltechnology/centech-api/commits/e1ff458db3bd7902de19fa44d4ec636ab0b283da))





## [1.42.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.42.0...versions/1.42.1) (2020-05-22)

**Note:** Version bump only for package @central-tech/api





# [1.42.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.41.2...versions/1.42.0) (2020-05-21)


### Bug Fixes

* **Consent:** fix get lang from `locale` ([74fec56](https://bitbucket.org/centraltechnology/centech-api/commits/74fec56a8091f469d430bf735f323cb0385042e6))


### Features

* **Consent:** add consnet mutation ([4d3757c](https://bitbucket.org/centraltechnology/centech-api/commits/4d3757c4000c0c3c8075392d59da5133367847a1))





## [1.41.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.41.1...versions/1.41.2) (2020-05-21)

**Note:** Version bump only for package @central-tech/api





## [1.41.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.41.0...versions/1.41.1) (2020-05-21)

**Note:** Version bump only for package @central-tech/api





# [1.41.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.40.0...versions/1.41.0) (2020-05-20)


### Bug Fixes

* **Consent:** add prefix on guest token in Consent service [CPI-352] ([89bf472](https://bitbucket.org/centraltechnology/centech-api/commits/89bf472509558bade22cb961c996ce55b29d2feb))


### Features

* **Order:** add extension `orderShipmentTracking` [CPI-349, POWH-3129] ([847fa90](https://bitbucket.org/centraltechnology/centech-api/commits/847fa907623b32eac4719933d0a5e4d227e9cad5))





# [1.40.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.39.3...versions/1.40.0) (2020-05-18)


### Features

* **SocialLogin:** add Social extension on dataSource social `V2` ([65f51d9](https://bitbucket.org/centraltechnology/centech-api/commits/65f51d997d4c351031b5c09186ae839bdce8ed3c))





## [1.39.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.39.2...versions/1.39.3) (2020-05-18)


### Bug Fixes

* **csv2:** return [] when product has no reviews ([86473d7](https://bitbucket.org/centraltechnology/centech-api/commits/86473d7a07eb6dc51b7608bdd69da1ca273d7fdb))





## [1.39.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.39.1...versions/1.39.2) (2020-05-18)


### Bug Fixes

* **csv2:** suggestion_promotions & config option label & reviews rating missing field ([e17d642](https://bitbucket.org/centraltechnology/centech-api/commits/e17d64263e4dfeb1e03ade523f08dfd2097d68d4))
* **review:** default review detail to no_detail ([c699261](https://bitbucket.org/centraltechnology/centech-api/commits/c69926178b4c3f7a34995d623d2df2c5396deb00))





## [1.39.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.39.0...versions/1.39.1) (2020-05-15)


### Bug Fixes

* **PDPA:** POWH-3162 Add Send Consent API in lazyRegister ([ea37de8](https://bitbucket.org/centraltechnology/centech-api/commits/ea37de8464efbd86d81d129ff4924cfb7b7a5471))





# [1.39.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.38.7...versions/1.39.0) (2020-05-15)


### Bug Fixes

* **cs2:** brand is mapped incorrectly ([bcc9880](https://bitbucket.org/centraltechnology/centech-api/commits/bcc98804d8b36f0afe1680bbc5352903358090c7))
* **cs2:** overlay image always null ([7b0b79d](https://bitbucket.org/centraltechnology/centech-api/commits/7b0b79d2d9cf2ee2e5e54659c367fc4c006f79a9))
* **search:** fix cs v2 search missing keyword variables ([7361380](https://bitbucket.org/centraltechnology/centech-api/commits/7361380c0e33b4f243febe73297034bb0f1b7caf))


### Features

* **searchSuggestions:** fetch terms from datalake ([b91cbca](https://bitbucket.org/centraltechnology/centech-api/commits/b91cbca0e4cb59fff90ad7fd6549c80ed1b58c12))


### Reverts

* Revert "fix(build): remove generate cs v2 schema" ([aabdb03](https://bitbucket.org/centraltechnology/centech-api/commits/aabdb031fa06d5e9b565cd98645233e92d7ad2d3))





## [1.38.7](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.38.6...versions/1.38.7) (2020-05-13)


### Bug Fixes

* **Consent:** remove prefix member on dataSource ([bd900a3](https://bitbucket.org/centraltechnology/centech-api/commits/bd900a3da32d696b9260fb2f5bb194074665cb19))





## [1.38.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.38.5...versions/1.38.6) (2020-05-13)


### Bug Fixes

* **cartMini:** cartMini return type set incorrectly ([798f541](https://bitbucket.org/centraltechnology/centech-api/commits/798f541f49f62c21ea33d9e24440739c25d617ac))





## [1.38.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.38.4...versions/1.38.5) (2020-05-11)


### Bug Fixes

* **Split Order:** change default to fullpaymentredirect ([eac490d](https://bitbucket.org/centraltechnology/centech-api/commits/eac490dc3b531ff73c49cf42f8db93e783c9c769))
* add default payment method with `payment_service_fullpayment` when paymenth is empty ([8526db7](https://bitbucket.org/centraltechnology/centech-api/commits/8526db759cf53aae51f58a41a2a9c929ce3d518b))
* change to use childrenIds input ([f230d0a](https://bitbucket.org/centraltechnology/centech-api/commits/f230d0ae5c0d5d536e4a915d3f3dabbce7327f6a))





## [1.38.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.38.3...versions/1.38.4) (2020-05-11)


### Bug Fixes

* children cart on guest ([3d2f3b2](https://bitbucket.org/centraltechnology/centech-api/commits/3d2f3b2f0ca482a40152410b77dc71bf1991a948))





## [1.38.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.38.2...versions/1.38.3) (2020-05-08)


### Bug Fixes

* filter payment_service_installment key when don’t have installment plans ([6767a44](https://bitbucket.org/centraltechnology/centech-api/commits/6767a441cb49047308643704c13155043768dc0a))





## [1.38.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.38.1...versions/1.38.2) (2020-05-08)


### Bug Fixes

* change to use childrenIds input ([6c575cf](https://bitbucket.org/centraltechnology/centech-api/commits/6c575cf290b03deecd4dc3b3d987f93b16a93d27))
* **Payment:** add splitOrdersIntersectionPayment extension ([575f6b0](https://bitbucket.org/centraltechnology/centech-api/commits/575f6b069e6c20bfc757c39e7d5906796c8a403c))
* cmsBlockIdentifier will be optional ([02b74e7](https://bitbucket.org/centraltechnology/centech-api/commits/02b74e79146dd5f2f52590b78921a01eaa69fe51))





## [1.38.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.38.0...versions/1.38.1) (2020-05-08)


### Bug Fixes

* **build:** remove generate cs v2 schema ([546b261](https://bitbucket.org/centraltechnology/centech-api/commits/546b261c0a6f263cb5ff01b909eb07e1d29f2bc0))





# [1.38.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.37.6...versions/1.38.0) (2020-05-07)


### Bug Fixes

* **Consent:** POWH-3119 Fix `need_reaccept_consents` check last status ([f58083a](https://bitbucket.org/centraltechnology/centech-api/commits/f58083aa06ce3bfa7df560e254d1c4a2f0b14438))


### Features

* support shipping & delivery method ([621ab8c](https://bitbucket.org/centraltechnology/centech-api/commits/621ab8cb958e516001ec8d42bbc9779c9c06347d))





## [1.37.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.37.5...versions/1.37.6) (2020-05-01)


### Bug Fixes

* **package:** build fail ([cf94f5d](https://bitbucket.org/centraltechnology/centech-api/commits/cf94f5d918bcd037d90a0bfa8195ceea62facaff))





## [1.37.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.37.4...versions/1.37.5) (2020-04-30)


### Bug Fixes

* add split order support with child_payments input ([9c51ccd](https://bitbucket.org/centraltechnology/centech-api/commits/9c51ccd612920126a30fd3086a913fa2cbba05dc))
* change to use payment_service_methods to handle payment service ([9cfe2e8](https://bitbucket.org/centraltechnology/centech-api/commits/9cfe2e8cbe58bc51d7a91b88a2947e39cee623d7))
* error when use cod with paymentService extension ([dcde152](https://bitbucket.org/centraltechnology/centech-api/commits/dcde152ff33e66bf7210e222d89b3827e65adf8f))
* missing param on authorizePayment ([4a39e47](https://bitbucket.org/centraltechnology/centech-api/commits/4a39e474ef9a5dc04812007664a26ec644d3d6c2))





## [1.37.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.37.3...versions/1.37.4) (2020-04-28)


### Bug Fixes

* paymentService on guest ([0f922aa](https://bitbucket.org/centraltechnology/centech-api/commits/0f922aa9dc056f047d0c4de504c2029c0eb51f87))





## [1.37.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.37.2...versions/1.37.3) (2020-04-28)


### Bug Fixes

* **catalogServiceFilterByFlashDeal:** add transform to reslover ([41b8694](https://bitbucket.org/centraltechnology/centech-api/commits/41b86940bcabe8a89b11bcf0189a0fce341a3b3f))
* product custom attr get ([41fb3ad](https://bitbucket.org/centraltechnology/centech-api/commits/41fb3ad05dcf7ccd5c5bbe741c4bc4c1e7b44c7f))





## [1.37.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.37.1...versions/1.37.2) (2020-04-28)


### Bug Fixes

* **PDPA:** POWH-3106 Fix `need_reaccept_consents` return wrong ([35e06df](https://bitbucket.org/centraltechnology/centech-api/commits/35e06df780854a603dbf9e96f0f75a17c814ed95))





## [1.37.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.37.0...versions/1.37.1) (2020-04-27)


### Bug Fixes

* Cannot read property 'is_store_card' of undefined on pwb ([2c2bc19](https://bitbucket.org/centraltechnology/centech-api/commits/2c2bc196de8f04363a29beb813e537f26ca3d856))





# [1.37.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.36.0...versions/1.37.0) (2020-04-24)


### Bug Fixes

* add CPI-337 to paymentService extension ( single saved card on `pwb` ) ([b1d6005](https://bitbucket.org/centraltechnology/centech-api/commits/b1d60050a753a7d94d31953559d27d6b1a718b17))
* move payment service response type to opeation ([4993cb3](https://bitbucket.org/centraltechnology/centech-api/commits/4993cb392b4411f2ff165abc42dcafe932c81cf3))
* use 3ds only new card ([4524815](https://bitbucket.org/centraltechnology/centech-api/commits/4524815bd8e33672e95a3ae1d4a06c72d226e86a))


### Features

* add `paymentTokenization` extension ([d9845f3](https://bitbucket.org/centraltechnology/centech-api/commits/d9845f33d2d2c17d9d037ef66db6d62686a07824))





# [1.36.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.35.1...versions/1.36.0) (2020-04-24)


### Bug Fixes

* add remove accept_consents from payload of setPaymentInformation ([838833f](https://bitbucket.org/centraltechnology/centech-api/commits/838833ffd1bd69e953879406757413cc905687be))


### Features

* **PDPA:** POWH-3062 Add createCustomerConsent ([aeba645](https://bitbucket.org/centraltechnology/centech-api/commits/aeba6453388a12042dc38d760bec422428119f4d))
* **PDPA:** POWH-3062 PDPA Consent Privacy Policy ([8f2edef](https://bitbucket.org/centraltechnology/centech-api/commits/8f2edefb18ec1741d0de675fb9031167fd9aee41))





## [1.35.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.35.0...versions/1.35.1) (2020-04-17)


### Bug Fixes

* **build-docker:** remove apollo-datasource-graphql ([2476464](https://bitbucket.org/centraltechnology/centech-api/commits/24764641d425dce9316c8c0967e2604437b0c716))





# [1.35.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.34.2...versions/1.35.0) (2020-04-17)


### Features

* **product:** fetch product & child product from catalog service v2 ([02a773b](https://bitbucket.org/centraltechnology/centech-api/commits/02a773b4931ab9b20362b29f803f1cd3f79e642f))
* add `catalogServiceV2` ([4d010d6](https://bitbucket.org/centraltechnology/centech-api/commits/4d010d6f0a0ae0b62aa5619e6ce997f44e1060f5))





## [1.34.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.34.1...versions/1.34.2) (2020-04-13)

**Note:** Version bump only for package @central-tech/api





## [1.34.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.34.0...versions/1.34.1) (2020-04-08)


### Bug Fixes

* **Build:** missing type `region_id` ([cfa9d11](https://bitbucket.org/centraltechnology/centech-api/commits/cfa9d115b254c5805bc53a3799a0410d4e3cdd4a))





# [1.34.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.13...versions/1.34.0) (2020-04-08)


### Bug Fixes

* add region_id on product review ([cb0e4e9](https://bitbucket.org/centraltechnology/centech-api/commits/cb0e4e92a87006d3f31aa10893226aa6d1a30a03))
* add reviewQuery for use in product review [CPI-314] ([33d08d6](https://bitbucket.org/centraltechnology/centech-api/commits/33d08d6082bc2348282adce79b60d5b9a87acced))
* **build:** build folder not cleanup when building new one ([54292b1](https://bitbucket.org/centraltechnology/centech-api/commits/54292b1f6fa33e79826f3e7e6ade5e6f53a8edd6))
* **build:** stacktrace not map to original file when build with NewrelicWebpackPlugin ([3b2070a](https://bitbucket.org/centraltechnology/centech-api/commits/3b2070a51323111b7dce03c372b69a8dee9a8610))


### Features

* **logging:** display error on console ([7a15a90](https://bitbucket.org/centraltechnology/centech-api/commits/7a15a907e83556b61d2084440dbd814145c92c79))
* **MagentoDataSource:** debug log req/res http style ([45d206c](https://bitbucket.org/centraltechnology/centech-api/commits/45d206cee222f0a62747e82f0291f8beb607c91a))
* **MagentoDataSource:** simplify log with only status, method, url and response time ([339126e](https://bitbucket.org/centraltechnology/centech-api/commits/339126ec124097a38eec3f1d81d35fae31ff31fc))





## [1.33.13](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.12...versions/1.33.13) (2020-03-26)


### Bug Fixes

* **FlashSales:** convert input utc ([2a67f4d](https://bitbucket.org/centraltechnology/centech-api/commits/2a67f4da5b2114460f939f9e60ba531ad3765646))
* **FlashSales:** hide display price ([3eb0724](https://bitbucket.org/centraltechnology/centech-api/commits/3eb072481106e273e13660270a17b8344be4d4b7))





## [1.33.12](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.11...versions/1.33.12) (2020-03-26)


### Bug Fixes

* disable playground on prod ([2c17ec9](https://bitbucket.org/centraltechnology/centech-api/commits/2c17ec912024d15024fd77bd22f4a4f21df5400d))
* **MagentoDataSource:** cms throw error when status is 304 ([9cc3d5b](https://bitbucket.org/centraltechnology/centech-api/commits/9cc3d5bdc5e1dcf49e20f90b478ef9fea94d49bf))
* **MagentoDataSource:** customer, cart-guest, cart not send auth header properly ([3683ab2](https://bitbucket.org/centraltechnology/centech-api/commits/3683ab26855ddefa471cbae9585d3eda5c5baa18))
* **newsletter:** error without gender ([9a1ea9a](https://bitbucket.org/centraltechnology/centech-api/commits/9a1ea9a30bc9fd3f38a9c581a79e6da30d18682d))
* **Refactor:** change class name of cms datasource ([be315a8](https://bitbucket.org/centraltechnology/centech-api/commits/be315a8855fe1f1e9c2aa5360de43e0e620d4ed6))
* **SearchTerms:** ProductItem.price must be float ([c99a552](https://bitbucket.org/centraltechnology/centech-api/commits/c99a5525265144ff705fced81141a6db499c7aef))
* **sentry:** group issue by fingerprint ([db3f3cb](https://bitbucket.org/centraltechnology/centech-api/commits/db3f3cbb78ddbdd8ebf1beab65fd6183d2d72167))


### Reverts

* Revert "updated build webpack -> babel" ([6240404](https://bitbucket.org/centraltechnology/centech-api/commits/624040496468697cd1217ed858d51354dd02f474))
* Revert "removed webpack" ([b79d3ae](https://bitbucket.org/centraltechnology/centech-api/commits/b79d3aeb37a5411b428e5a1de504e9aafc9faceb))





## [1.33.11](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.10...versions/1.33.11) (2020-03-23)

**Note:** Version bump only for package @central-tech/api





## [1.33.10](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.9...versions/1.33.10) (2020-03-23)

**Note:** Version bump only for package @central-tech/api





## [1.33.9](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.8...versions/1.33.9) (2020-03-20)


### Bug Fixes

* type on ICategoryResolvers ([49e8cda](https://bitbucket.org/centraltechnology/centech-api/commits/49e8cda1c808f824761f54b19173b060cceddd56))





## [1.33.8](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.7...versions/1.33.8) (2020-03-20)


### Bug Fixes

* add `extension_attributes` and `custom_attributes` on category type ([92a7fd9](https://bitbucket.org/centraltechnology/centech-api/commits/92a7fd95fd3b9689be5092c0b3e28228e63b03e3))





## [1.33.7](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.6...versions/1.33.7) (2020-03-16)


### Bug Fixes

* **Sentry:** don’t send breadcrumb when base_url is empty ([bc39665](https://bitbucket.org/centraltechnology/centech-api/commits/bc396653eb21226da824bd80fafec816c4e44039))





## [1.33.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.5...versions/1.33.6) (2020-03-16)


### Bug Fixes

* add ignore error 404 and 401 ([cadf4eb](https://bitbucket.org/centraltechnology/centech-api/commits/cadf4ebc4625abddf36ee6aca855d68bf8800fb2))
* add source map for typescript file ([053b738](https://bitbucket.org/centraltechnology/centech-api/commits/053b73801075a14617b2dc45468cb055a9b6a961))
* change type of RegionByPostCode ([2e4c70d](https://bitbucket.org/centraltechnology/centech-api/commits/2e4c70d6ba98610250e64ff4b2b87ae26ace060d))
* ignore http request BREADCRUMBS on `metadata.google.internal` & `169.254.169.254` ([1980fbe](https://bitbucket.org/centraltechnology/centech-api/commits/1980fbe2a830a691faf8b42bc5574560a1360d53))
* **Redis:** bypass redis when redis is not reachable ([ea70fc3](https://bitbucket.org/centraltechnology/centech-api/commits/ea70fc3fc883f67610d6b3aa4bab49dc16a5b608))





## [1.33.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.4...versions/1.33.5) (2020-03-13)

**Note:** Version bump only for package @central-tech/api





## [1.33.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.3...versions/1.33.4) (2020-03-13)

**Note:** Version bump only for package @central-tech/api





## [1.33.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.2...versions/1.33.3) (2020-03-12)


### Bug Fixes

* removed soi from address ([9e20e0c](https://bitbucket.org/centraltechnology/centech-api/commits/9e20e0cc3621df657b3e54e3fad18c6a016fe33a))





## [1.33.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.1...versions/1.33.2) (2020-03-12)

**Note:** Version bump only for package @central-tech/api





## [1.33.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.33.0...versions/1.33.1) (2020-03-12)

**Note:** Version bump only for package @central-tech/api





# [1.33.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.32.9...versions/1.33.0) (2020-03-11)


### Features

* **Sentry:** add sentry upload source-map script ([bc80261](https://bitbucket.org/centraltechnology/centech-api/commits/bc80261ed6d264663767f687398e3e71c72edff7))
* **Sentry:** upload sourcemap with webpack plugin ([a0d1b8d](https://bitbucket.org/centraltechnology/centech-api/commits/a0d1b8d676efef8be92e878f540aaf1df7dde553))
* **Sentry:** use `APP_ENV` instead of `NODE_ENV` ([cceea17](https://bitbucket.org/centraltechnology/centech-api/commits/cceea17ce441eaedfc4b81c517e41d48a3bb879b))





## [1.32.9](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.32.8...versions/1.32.9) (2020-03-11)


### Bug Fixes

* **Customer:** gender bug on api ([4908d86](https://bitbucket.org/centraltechnology/centech-api/commits/4908d86b4e6c97af0d439f326f2979f6dc6455b6))





## [1.32.8](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.32.7...versions/1.32.8) (2020-03-11)


### Bug Fixes

* **Customer:** has default lang `storeCode` or `th` ([7fc054c](https://bitbucket.org/centraltechnology/centech-api/commits/7fc054c499c4a72b3d6fc70a779c68da3773363d))
* **Product:** review image ([34e4899](https://bitbucket.org/centraltechnology/centech-api/commits/34e489986e3c0fa7a69dc9b08f1cd679531113a2))





## [1.32.7](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.32.6...versions/1.32.7) (2020-03-10)


### Bug Fixes

* **Review Image:** from `extension_attributes` of review item ([c5d91ca](https://bitbucket.org/centraltechnology/centech-api/commits/c5d91ca704625b256ad702071f4d6945f3275076))





## [1.32.6](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.32.5...versions/1.32.6) (2020-03-06)


### Bug Fixes

* update customer Resolver ([15c4ee9](https://bitbucket.org/centraltechnology/centech-api/commits/15c4ee9c19838b723221d5766f5ff3e41338b110))
* **Customer:** input UpdateInputCustomer ([48660d6](https://bitbucket.org/centraltechnology/centech-api/commits/48660d644ffc29f7aadfe9c3eedac3e70388df02))





## [1.32.5](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.32.4...versions/1.32.5) (2020-03-05)


### Bug Fixes

* change default value to `{}` ([7422a08](https://bitbucket.org/centraltechnology/centech-api/commits/7422a08c7de714a293e8dac9322eca685d348897))
* **Customer:** convert gender enum ([15c017f](https://bitbucket.org/centraltechnology/centech-api/commits/15c017f9f6ce66fff7581c76cb7fe70ae3e530e8))
* **Customer:** field Resolver ([0695fca](https://bitbucket.org/centraltechnology/centech-api/commits/0695fca0c9d0b2c473e04ff13e41c585cd582724))
* **Product:** get `special_price` from product root level ([5bf4be4](https://bitbucket.org/centraltechnology/centech-api/commits/5bf4be493a42bc14b06bb63f79ca8cd15a9e727e))





## [1.32.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.32.3...versions/1.32.4) (2020-03-05)


### Bug Fixes

* **Order:** POWH-2792 Fix field MKT Info ([03bc034](https://bitbucket.org/centraltechnology/centech-api/commits/03bc0347154f0f46ece4fe578121cccea1b09b72))





## [1.32.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.32.2...versions/1.32.3) (2020-03-04)


### Bug Fixes

* **Cart:** add missing field on cart.model ([0700d2d](https://bitbucket.org/centraltechnology/centech-api/commits/0700d2d34a6618c63c9596dbd501cbace0de2ef7))





## [1.32.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.32.1...versions/1.32.2) (2020-03-04)


### Bug Fixes

* **OrderDetail:** POWH-2792 add field mkt_info ([5470b70](https://bitbucket.org/centraltechnology/centech-api/commits/5470b70fcc463f5e76b4fe38c7cf456dddd133af))





## [1.32.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.32.0...versions/1.32.1) (2020-03-03)

**Note:** Version bump only for package @central-tech/api





# [1.32.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.31.0...versions/1.32.0) (2020-03-03)


### Features

* change `gender` to ENUM [CPI-267] ([1c78e64](https://bitbucket.org/centraltechnology/centech-api/commits/1c78e64026d1dbc7dbe63fa3a7039c4021fbc74f))
* Support profile data when register [CPI-266] ([ba233da](https://bitbucket.org/centraltechnology/centech-api/commits/ba233da3d91038d3ebc7d8bf678118f0cdd56003))





# [1.31.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.30.3...versions/1.31.0) (2020-03-02)


### Bug Fixes

* **Review:** add missing Images ([f80e3a8](https://bitbucket.org/centraltechnology/centech-api/commits/f80e3a8a8da5207ab93244e2da29c645ed51fa42))


### Features

* throw error when register with duplicate email ([4234c42](https://bitbucket.org/centraltechnology/centech-api/commits/4234c42f440527f6b0ab697328df14de497d8e67))





## [1.30.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.30.2...versions/1.30.3) (2020-03-02)


### Bug Fixes

* ignore newrelic request on sentry ([7a87c04](https://bitbucket.org/centraltechnology/centech-api/commits/7a87c048102fb3ed7ee19531248069cd5cc4c15c))
* **Sentry:** captureException with originalError instead ([a998be0](https://bitbucket.org/centraltechnology/centech-api/commits/a998be063abfc6568b4dda46560cb6e628c5f613))





## [1.30.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.30.1...versions/1.30.2) (2020-03-02)


### Bug Fixes

* **Review:**  missing input images ([d3b57c0](https://bitbucket.org/centraltechnology/centech-api/commits/d3b57c0ded5e1aa580e3b58359433e71f62cac20))





## [1.30.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.30.0...versions/1.30.1) (2020-03-02)


### Bug Fixes

* add bodyParser limit 10mb ([0edbf82](https://bitbucket.org/centraltechnology/centech-api/commits/0edbf822dff2e7b1f58ab363065cfec96b31448e))
* add delete image mutation on core-api ([e6e98c9](https://bitbucket.org/centraltechnology/centech-api/commits/e6e98c9dce6e9a91ffee65dfe9c284912fc0c0ee))
* check extension_attributes before get free_items_qty on cart ([857f4a3](https://bitbucket.org/centraltechnology/centech-api/commits/857f4a3546beb4a52104da085a261dd0176cec3c))
* throw error when mdc return 200 with empty response ([d7ac333](https://bitbucket.org/centraltechnology/centech-api/commits/d7ac333ac7559ce0f4604fc0edac38494f970080))





# [1.30.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.29.2...versions/1.30.0) (2020-02-28)


### Bug Fixes

* move `BtsOrderStatus` to `OrderExtensionAttributes` ([8031032](https://bitbucket.org/centraltechnology/centech-api/commits/8031032cab7bfae18440cbcb51cafc89eb03db6e))





## [1.29.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.29.1...versions/1.29.2) (2020-02-28)


### Bug Fixes

* add missing `bts_order_status` in orderItem ([0d42b4d](https://bitbucket.org/centraltechnology/centech-api/commits/0d42b4de456a0dc6445eb7d0b6c61959ba82456d))
* run core-api local ([b3dcd7e](https://bitbucket.org/centraltechnology/centech-api/commits/b3dcd7e96c79ac6b2a527ceb942b14bc59e0b84c))





## [1.29.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.29.0...versions/1.29.1) (2020-02-26)


### Bug Fixes

* **Newrelic:** add space in app name before env ([b81de84](https://bitbucket.org/centraltechnology/centech-api/commits/b81de84d1eea36fb02b58586c723cefbfe1811af))





# [1.29.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.28.0...versions/1.29.0) (2020-02-26)


### Features

* **Order:** add `Order.children` with splitOrders extension ([e1f0907](https://bitbucket.org/centraltechnology/centech-api/commits/e1f090799e474bcf1cdab1cddeedf19d73529e63))





# [1.28.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.27.4...versions/1.28.0) (2020-02-26)


### Bug Fixes

* newrelic app name with NODE_ENV ([544f1c6](https://bitbucket.org/centraltechnology/centech-api/commits/544f1c654202dbe18fda6f7cf82094b9dd420cc1))


### Features

* add consent service ([57e4617](https://bitbucket.org/centraltechnology/centech-api/commits/57e461716abb6f051354bc2ca6bcbe787b270d8d))





## [1.27.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.27.3...versions/1.27.4) (2020-02-25)

**Note:** Version bump only for package @central-tech/api





## [1.27.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.27.2...versions/1.27.3) (2020-02-25)

**Note:** Version bump only for package @central-tech/api





## [1.27.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.27.1...versions/1.27.2) (2020-02-24)


### Bug Fixes

* prevent httpCache when no redis ([970a094](https://bitbucket.org/centraltechnology/centech-api/commits/970a0949412ac17fccf7dbd9b3796a7ab3f906ef))





## [1.27.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.27.0...versions/1.27.1) (2020-02-24)

**Note:** Version bump only for package @central-tech/api





# [1.27.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.26.4...versions/1.27.0) (2020-02-24)


### Features

* **Cart Mini:** add extension overide items_qty calculate by `tems_qty - freeItemQty` ([44cf9dc](https://bitbucket.org/centraltechnology/centech-api/commits/44cf9dcdc36cfc4c118f77ebf7539d47a07ba07a))
* **Review:** can upload with base64 ([0300b19](https://bitbucket.org/centraltechnology/centech-api/commits/0300b1959dcb87a57fb2bae16fd67ea0480f5ef3))
* add isReview on type product ([6ec6c85](https://bitbucket.org/centraltechnology/centech-api/commits/6ec6c85ecaa98f9a2acc0fb68585d5a57bf1503a))





## [1.26.4](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.26.3...versions/1.26.4) (2020-02-20)


### Bug Fixes

* **Error Format:** in response when responseBody is string ([41ab725](https://bitbucket.org/centraltechnology/centech-api/commits/41ab725c9814e63d2824e4b961fa620a9809a104))
* **Wishlist:** can update with custom_attributes ([278e55d](https://bitbucket.org/centraltechnology/centech-api/commits/278e55df391522959d2217f9abf2266ecb9b69bd))
* **Wishlist:** can’t add duplicate ([ceb6235](https://bitbucket.org/centraltechnology/centech-api/commits/ceb6235c55d808ea1da573f00df10388cce31ffa))





## [1.26.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.26.2...versions/1.26.3) (2020-02-20)


### Bug Fixes

* remove newrelic on lamda ([13be2a3](https://bitbucket.org/centraltechnology/centech-api/commits/13be2a3980a947bbb1fa49582882f7e5c5f372db))





## [1.26.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.26.1...versions/1.26.2) (2020-02-19)

**Note:** Version bump only for package @central-tech/api





## [1.26.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.26.0...versions/1.26.1) (2020-02-19)


### Features

* **Address** improve customer address ([#166](https://bitbucket.org/centraltechnology/centech-api/pull-requests/166))
* **SDK:** expose x-api-version for fetch lib to cache in fe ([#169](https://bitbucket.org/centraltechnology/centech-api/pull-requests/169))






# [1.26.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.25.0...versions/1.26.0) (2020-02-18)


### Bug Fixes

* **CDS:** add missing extension ([99db206](https://bitbucket.org/centraltechnology/centech-api/commits/99db2061d180e0babdade0ee0678728182708ed6))
* update error format on newrelic ([3f5ab4d](https://bitbucket.org/centraltechnology/centech-api/commits/3f5ab4d4b690659b15292e98eeff35d19619c392))


### Features

* **Wishlist:** add product configurable support ([a7aea37](https://bitbucket.org/centraltechnology/centech-api/commits/a7aea370165257e78944305ed65822867eff81a0))





# [1.25.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.24.0...versions/1.25.0) (2020-02-18)


### Features

* add version to query ([536b5a5](https://bitbucket.org/centraltechnology/centech-api/commits/536b5a575363cddec12296b97cabdafa979b7a61))
* **newrelic:** add newrelic to core-api ([b5bf0f2](https://bitbucket.org/centraltechnology/centech-api/commits/b5bf0f263c3aeb48f162b3412ab53e18d5e90ea9))





# [1.24.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.23.3...versions/1.24.0) (2020-02-17)


### Features

* **Order:** add field customer_email ([893b73b](https://bitbucket.org/centraltechnology/centech-api/commits/893b73b21488e2bd9cede51e5a2bcef93eb26ea2))





## [1.23.3](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.23.2...versions/1.23.3) (2020-02-14)


### Bug Fixes

* **OrderItem:** POWH-2408 fix `line_items` is null ([f5e3529](https://bitbucket.org/centraltechnology/centech-api/commits/f5e352971aba9182582d1c3fd3a53637a89a3f32))





## [1.23.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.23.1...versions/1.23.2) (2020-02-13)


### Bug Fixes

* error raw without format message ([2584aad](https://bitbucket.org/centraltechnology/centech-api/commits/2584aaddbfa401b6e7ecd0e2e447a8593097eb26))





## [1.23.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.23.0...versions/1.23.1) (2020-02-13)


### Bug Fixes

* error raw without format message ([34e18ef](https://bitbucket.org/centraltechnology/centech-api/commits/34e18efe550745438f90ae6cf5a7593f863eabfe))
* replace error with RegExp ([ea0548a](https://bitbucket.org/centraltechnology/centech-api/commits/ea0548a33fe5626729a079f634aa941c4f51bd0f))





# [1.23.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.22.2...versions/1.23.0) (2020-02-13)


### Bug Fixes

* error when selectedOrder is null ([2427823](https://bitbucket.org/centraltechnology/centech-api/commits/242782333f8fe605bef7029d2cf4f184de668c67))
* wishlist error when filters is empty array ([bbd3867](https://bitbucket.org/centraltechnology/centech-api/commits/bbd38679bd7a46447c1a51a0be061ae4cd68aa9c))


### Features

* **Wishlist:** create when empty by `wishListCreateWhenEmpty` extension ([0392e2a](https://bitbucket.org/centraltechnology/centech-api/commits/0392e2a29dd65b71fdcf333f66c093c4ae031152))





## [1.22.2](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.22.1...versions/1.22.2) (2020-02-12)

**Note:** Version bump only for package @central-tech/api





## [1.22.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.22.0...versions/1.22.1) (2020-02-12)


### Bug Fixes

* **WishList:** don’t send custom_attributes when custom_attributes is empty ([6fd1175](https://bitbucket.org/centraltechnology/centech-api/commits/6fd117555ec9876ec7399e415d2d350938c974e9))





# [1.22.0](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.21.1...versions/1.22.0) (2020-02-11)


### Features

* add orderByEmail query ([a0efe28](https://bitbucket.org/centraltechnology/centech-api/commits/a0efe28374da3135a3399f00bbb14a04b27e5b3b))





## [1.21.1](https://bitbucket.org/centraltechnology/centech-api/compare/versions/1.21.0...versions/1.21.1) (2020-02-11)

**Note:** Version bump only for package @central-tech/api





# 1.21.0 (2020-02-10)


### Features

* add extension_attributes in TotalSegment ([96e9f12](https://bitbucket.org/centraltechnology/centech-api/commits/96e9f12e67551d23600aba1d88faadc472af931e))
* add free_shipping_offer in cart ([1117f4c](https://bitbucket.org/centraltechnology/centech-api/commits/1117f4c31155411e070b89d011247f87294b5e47))



# 1.20.0 (2020-02-07)



# 1.19.0 (2020-02-06)


### Bug Fixes

* categoru tree query and add test ([73993a0](https://bitbucket.org/centraltechnology/centech-api/commits/73993a0eba82e63fbb015ec10be69699fd3c9ef8))
* test and refactor ([9f49739](https://bitbucket.org/centraltechnology/centech-api/commits/9f497393ea85eb3849a5293f1f90d63e4406561b))


### Features

* **Product:** add marketPlace subfield ([9d45a04](https://bitbucket.org/centraltechnology/centech-api/commits/9d45a0487b610aa4c434a6e836e7cc40fb0cb3b1))
* **WishListItem:** has custom_attributes on create & get ([1458ac7](https://bitbucket.org/centraltechnology/centech-api/commits/1458ac787bfef1564e58e45717ea86d714fc2929))



## 1.18.1 (2020-02-06)


### Bug Fixes

* **Product:** fix type on ProductsExtensionAttributesBrandExtensionAttributes ([6e6ea6a](https://bitbucket.org/centraltechnology/centech-api/commits/6e6ea6a81c9915d2e45bd3cf5ddb2a1b4480a6a7))



# 1.18.0 (2020-02-06)


### Bug Fixes

* **Product:** fix brand in product.extension_attributes ([7b02135](https://bitbucket.org/centraltechnology/centech-api/commits/7b02135d847806b3b55dcffd19f29e574f382deb))
* transform for brand extension ([4b48089](https://bitbucket.org/centraltechnology/centech-api/commits/4b48089f578d605777989a59f04fb2fce3dcafaf))


### Features

* **categoriesTree:** add new query and operation categoriesTree ([d8f78fb](https://bitbucket.org/centraltechnology/centech-api/commits/d8f78fb2a2ad56b4be49a0273aa228872cd4de8a))



# 1.17.0 (2020-01-31)


### Bug Fixes

* **Cart:** add test case for multiple coupon all invalid ([88ad026](https://bitbucket.org/centraltechnology/centech-api/commits/88ad026a0824eab78b5ce9cdffa20ec5d226a2b3))
* **CouponCode:** fix single coupon cannot split ([bd59fd8](https://bitbucket.org/centraltechnology/centech-api/commits/bd59fd8a50a48b311be4a2e5069254a946c9f430))



# 1.16.0 (2020-01-30)


### Features

* **CMSBlock:** Add new query CMSBlock by using identifier and store_id ([6c46288](https://bitbucket.org/centraltechnology/centech-api/commits/6c462880ec59132c0de715c319d2adf2e18ab432))
* **SalableStockBySku:** add storeSalableStockBySku for check stock ([b8b170e](https://bitbucket.org/centraltechnology/centech-api/commits/b8b170ed04a01ecaf54553bcc935bf178c30d8a7))



# 1.15.0 (2020-01-29)


### Features

* **Order:** POWH-2408 add line_item in orderItemExtensionAttributes ([2568cde](https://bitbucket.org/centraltechnology/centech-api/commits/2568cde396b9a4d9f9347ec74d159b5ec698a856))



# 1.14.0 (2020-01-29)


### Bug Fixes

* **Order:** fixed api order package status ([ea8f844](https://bitbucket.org/centraltechnology/centech-api/commits/ea8f84477ac0f1ffcf3d4e6d4b685948b317bb2a))


### Features

* **Cart:** add updateAllocateStore mutation ([7ca7ea6](https://bitbucket.org/centraltechnology/centech-api/commits/7ca7ea6dec47e0391ff179d1ffbb043e9e6dd527))
* **CartItem:** has `options` field in common schema ([217ac81](https://bitbucket.org/centraltechnology/centech-api/commits/217ac81198b86060aa405abe30995bce8ab4eaa6))
* **CouponCode:** add return data for valid multiple coupon ([417755d](https://bitbucket.org/centraltechnology/centech-api/commits/417755d2af4bb54b251a80e48fedcf4d51d84c71))
* **Store:** add inventory_stock on StoreLocator ([5524077](https://bitbucket.org/centraltechnology/centech-api/commits/55240778b5957d73a2effd25f88c6b078290c6aa))



## 1.13.2 (2020-01-24)



## 1.13.1 (2020-01-24)


### Bug Fixes

* product util sort not correct ([c43f72d](https://bitbucket.org/centraltechnology/centech-api/commits/c43f72d686b5e84e65c570fc72c2b5d751c92cf8))



# 1.13.0 (2020-01-20)


### Bug Fixes

* **TWD:** change cms to `cmsV2` ([e1c1bce](https://bitbucket.org/centraltechnology/centech-api/commits/e1c1bceeb53e94a087eb4d07c151b6d100c9a2bf))


### Features

* **extension:** multishipping ([83e2e15](https://bitbucket.org/centraltechnology/centech-api/commits/83e2e153f8714f34a86ccecfd26688de2ccd27a6))
* **Extension:** add to cart with `allocated_store_id` to create line item ([e345d06](https://bitbucket.org/centraltechnology/centech-api/commits/e345d066b8e94ffce6f7cefd8f8a0f9ce0239e30))



# 1.12.0 (2020-01-17)


### Bug Fixes

* **Product:** add type_id unknown on empty type_id ([9afaadf](https://bitbucket.org/centraltechnology/centech-api/commits/9afaadf011cfd2c0296cb6da065a970d1c7a2cb3))
* **Promotion:** change `qty_from` on `TierPricePromotionExtension` to Optional ([3ec980a](https://bitbucket.org/centraltechnology/centech-api/commits/3ec980a0bf21c47ce99fab681d85570b0ceab9a1))


### Features

* **PricePerStore:** change input `postcode` to `retailerId` ([a2a9cb4](https://bitbucket.org/centraltechnology/centech-api/commits/a2a9cb41c930b5dcb38a9a42b889dcb107bcb384))



## 1.11.1 (2020-01-16)


### Bug Fixes

* **Product:** Change seller field model ([032cbc5](https://bitbucket.org/centraltechnology/centech-api/commits/032cbc576cdb3ef4eae8663c9a960d718952267b))
* **Product:** Change seller field model ([98f101d](https://bitbucket.org/centraltechnology/centech-api/commits/98f101d9b229ed7f3f36453c6b6c66742d65b580))



# 1.11.0 (2020-01-16)


### Bug Fixes

* **Core API:** add active field for use-cmsBlock ([bbdc98c](https://bitbucket.org/centraltechnology/centech-api/commits/bbdc98c497923fca67c223b62cc5170c70d2dd65))
* correct typename from Freeitem to FreeItem ([78e07d1](https://bitbucket.org/centraltechnology/centech-api/commits/78e07d18d4761a04c54aa8160207fe9d674a0c17))


### Features

* Add marketplace.seller to Product type ([991a18f](https://bitbucket.org/centraltechnology/centech-api/commits/991a18f8087f8e1b15fd7363c8983f0c32f60b2d))
* **Cart:** add cart extension attribute free_items, free_item_added. ([8256d45](https://bitbucket.org/centraltechnology/centech-api/commits/8256d4551d8f5e9476c09fb1634700c3ab48113d))
* add product type in extension attribute freeItem. ([4d3f749](https://bitbucket.org/centraltechnology/centech-api/commits/4d3f749416d35f6775fdf426174c716470b6cfcb))



# 1.8.0 (2020-01-13)


### Bug Fixes

* format on error to fill out error message with parameter ([c3c081f](https://bitbucket.org/centraltechnology/centech-api/commits/c3c081f4eb81156582b3d852b50c42f463965d7c))


### Features

* **Product:** add seller_url_key ([241c94e](https://bitbucket.org/centraltechnology/centech-api/commits/241c94e6640862d40b30929178f9a4d622f48cbb))



# 1.7.0 (2020-01-10)


### Bug Fixes

* **Test:** update config ([179c53b](https://bitbucket.org/centraltechnology/centech-api/commits/179c53b828a3f8b1edc37e43e1b967fb6f0b0728))



## 1.5.1 (2020-01-09)


### Features

* **Price Per Store:** add query `retailerByPostcode` ([6ff100e](https://bitbucket.org/centraltechnology/centech-api/commits/6ff100e11419789a98e485f3fba259f4c5ab4f21))
* **Price Per Store:** change response base on new api on `mdc` ([fd66d38](https://bitbucket.org/centraltechnology/centech-api/commits/fd66d38f1330efb062650f28c0b26cc2bf7cedf3))



# 1.4.0 (2020-01-02)





# [1.20.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.19.0...v1.20.0) (2020-02-07)


### Bug Fixes

* categoru tree query and add test ([73993a0](https://bitbucket.org/centraltechnology/centech-api/commits/73993a0eba82e63fbb015ec10be69699fd3c9ef8))
* test and refactor ([9f49739](https://bitbucket.org/centraltechnology/centech-api/commits/9f497393ea85eb3849a5293f1f90d63e4406561b))
* transform for brand extension ([4b48089](https://bitbucket.org/centraltechnology/centech-api/commits/4b48089f578d605777989a59f04fb2fce3dcafaf))


### Features

* **categoriesTree:** add new query and operation categoriesTree ([d8f78fb](https://bitbucket.org/centraltechnology/centech-api/commits/d8f78fb2a2ad56b4be49a0273aa228872cd4de8a))





# [1.19.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.18.1...v1.19.0) (2020-02-06)


### Features

* **Product:** add marketPlace subfield ([9d45a04](https://bitbucket.org/centraltechnology/centech-api/commits/9d45a0487b610aa4c434a6e836e7cc40fb0cb3b1))
* **WishListItem:** has custom_attributes on create & get ([1458ac7](https://bitbucket.org/centraltechnology/centech-api/commits/1458ac787bfef1564e58e45717ea86d714fc2929))





## [1.18.1](https://bitbucket.org/centraltechnology/centech-api/compare/v1.18.0...v1.18.1) (2020-02-06)


### Bug Fixes

* **Product:** fix type on ProductsExtensionAttributesBrandExtensionAttributes ([6e6ea6a](https://bitbucket.org/centraltechnology/centech-api/commits/6e6ea6a81c9915d2e45bd3cf5ddb2a1b4480a6a7))





# [1.18.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.17.0...v1.18.0) (2020-02-06)


### Bug Fixes

* **Product:** fix brand in product.extension_attributes ([7b02135](https://bitbucket.org/centraltechnology/centech-api/commits/7b02135d847806b3b55dcffd19f29e574f382deb))





# [1.17.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.16.0...v1.17.0) (2020-01-31)


### Bug Fixes

* **Cart:** add test case for multiple coupon all invalid ([88ad026](https://bitbucket.org/centraltechnology/centech-api/commits/88ad026a0824eab78b5ce9cdffa20ec5d226a2b3))
* **CouponCode:** fix single coupon cannot split ([bd59fd8](https://bitbucket.org/centraltechnology/centech-api/commits/bd59fd8a50a48b311be4a2e5069254a946c9f430))
* **Order:** fixed api order package status ([ea8f844](https://bitbucket.org/centraltechnology/centech-api/commits/ea8f84477ac0f1ffcf3d4e6d4b685948b317bb2a))





# [1.16.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.15.0...v1.16.0) (2020-01-30)


### Features

* **CMSBlock:** Add new query CMSBlock by using identifier and store_id ([6c46288](https://bitbucket.org/centraltechnology/centech-api/commits/6c462880ec59132c0de715c319d2adf2e18ab432))
* **SalableStockBySku:** add storeSalableStockBySku for check stock ([b8b170e](https://bitbucket.org/centraltechnology/centech-api/commits/b8b170ed04a01ecaf54553bcc935bf178c30d8a7))





# [1.15.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.14.0...v1.15.0) (2020-01-29)


### Features

* **Order:** POWH-2408 add line_item in orderItemExtensionAttributes ([2568cde](https://bitbucket.org/centraltechnology/centech-api/commits/2568cde396b9a4d9f9347ec74d159b5ec698a856))





# [1.14.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.13.2...v1.14.0) (2020-01-29)


### Features

* **Cart:** add updateAllocateStore mutation ([7ca7ea6](https://bitbucket.org/centraltechnology/centech-api/commits/7ca7ea6dec47e0391ff179d1ffbb043e9e6dd527))
* **CartItem:** has `options` field in common schema ([217ac81](https://bitbucket.org/centraltechnology/centech-api/commits/217ac81198b86060aa405abe30995bce8ab4eaa6))
* **CouponCode:** add return data for valid multiple coupon ([417755d](https://bitbucket.org/centraltechnology/centech-api/commits/417755d2af4bb54b251a80e48fedcf4d51d84c71))
* **Store:** add inventory_stock on StoreLocator ([5524077](https://bitbucket.org/centraltechnology/centech-api/commits/55240778b5957d73a2effd25f88c6b078290c6aa))





## [1.13.2](https://bitbucket.org/centraltechnology/centech-api/compare/v1.13.1...v1.13.2) (2020-01-24)

**Note:** Version bump only for package @central-tech/api





## [1.13.1](https://bitbucket.org/centraltechnology/centech-api/compare/v1.13.0...v1.13.1) (2020-01-24)


### Bug Fixes

* product util sort not correct ([c43f72d](https://bitbucket.org/centraltechnology/centech-api/commits/c43f72d686b5e84e65c570fc72c2b5d751c92cf8))





# [1.13.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.12.0...v1.13.0) (2020-01-20)


### Bug Fixes

* **TWD:** change cms to `cmsV2` ([e1c1bce](https://bitbucket.org/centraltechnology/centech-api/commits/e1c1bceeb53e94a087eb4d07c151b6d100c9a2bf))


### Features

* **extension:** multishipping ([83e2e15](https://bitbucket.org/centraltechnology/centech-api/commits/83e2e153f8714f34a86ccecfd26688de2ccd27a6))
* **Extension:** add to cart with `allocated_store_id` to create line item ([e345d06](https://bitbucket.org/centraltechnology/centech-api/commits/e345d066b8e94ffce6f7cefd8f8a0f9ce0239e30))





# [1.12.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.11.1...v1.12.0) (2020-01-17)


### Bug Fixes

* **Product:** add type_id unknown on empty type_id ([9afaadf](https://bitbucket.org/centraltechnology/centech-api/commits/9afaadf011cfd2c0296cb6da065a970d1c7a2cb3))
* **Promotion:** change `qty_from` on `TierPricePromotionExtension` to Optional ([3ec980a](https://bitbucket.org/centraltechnology/centech-api/commits/3ec980a0bf21c47ce99fab681d85570b0ceab9a1))


### Features

* **PricePerStore:** change input `postcode` to `retailerId` ([a2a9cb4](https://bitbucket.org/centraltechnology/centech-api/commits/a2a9cb41c930b5dcb38a9a42b889dcb107bcb384))





## [1.11.1](https://bitbucket.org/centraltechnology/centech-api/compare/v1.11.0...v1.11.1) (2020-01-16)


### Bug Fixes

* **Core API:** add active field for use-cmsBlock ([bbdc98c](https://bitbucket.org/centraltechnology/centech-api/commits/bbdc98c497923fca67c223b62cc5170c70d2dd65))
* **Product:** Change seller field model ([032cbc5](https://bitbucket.org/centraltechnology/centech-api/commits/032cbc576cdb3ef4eae8663c9a960d718952267b))
* **Product:** Change seller field model ([98f101d](https://bitbucket.org/centraltechnology/centech-api/commits/98f101d9b229ed7f3f36453c6b6c66742d65b580))





# [1.11.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.10.0...v1.11.0) (2020-01-16)


### Bug Fixes

* **Product & Cart:** Change seller field and Add salable flag to cart item ([6ed55ae](https://bitbucket.org/centraltechnology/centech-api/commits/6ed55ae43e1985cb185880e68fa5465a283230f7))
* **StoreID:** Change Type store_id Int to ID ([1d3c916](https://bitbucket.org/centraltechnology/centech-api/commits/1d3c916e9c77f5ff6321685985dcae13c5ab633a))


### Features

* **Cart:** has total_price in cartItem ([82bd893](https://bitbucket.org/centraltechnology/centech-api/commits/82bd89386b807347fc1200068641e9bfed13816d))





# [1.10.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.9.0...v1.10.0) (2020-01-15)


### Bug Fixes

* **Context:** add referer field ([9f10a5b](https://bitbucket.org/centraltechnology/centech-api/commits/9f10a5b62aa504414cf2a1408a9db3ea3c272ee4))


### Features

* Add marketplace.seller to Product type ([991a18f](https://bitbucket.org/centraltechnology/centech-api/commits/991a18f8087f8e1b15fd7363c8983f0c32f60b2d))
* **Sentry:** add sentry ([18474c1](https://bitbucket.org/centraltechnology/centech-api/commits/18474c1012486d9110fd7fb95abb9f9a8887e8a2))





# [1.9.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.8.0...v1.9.0) (2020-01-14)


### Bug Fixes

* correct typename from Freeitem to FreeItem ([78e07d1](https://bitbucket.org/centraltechnology/centech-api/commits/78e07d18d4761a04c54aa8160207fe9d674a0c17))


### Features

* **Cart:** add cart extension attribute free_items, free_item_added. ([8256d45](https://bitbucket.org/centraltechnology/centech-api/commits/8256d4551d8f5e9476c09fb1634700c3ab48113d))
* add product type in extension attribute freeItem. ([4d3f749](https://bitbucket.org/centraltechnology/centech-api/commits/4d3f749416d35f6775fdf426174c716470b6cfcb))





# [1.8.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.7.0...v1.8.0) (2020-01-13)


### Bug Fixes

* catalog service migration ([961e8f5](https://bitbucket.org/centraltechnology/centech-api/commits/961e8f50d579c51b3d7dcc123c912a8dcaba2b39))
* format on error to fill out error message with parameter ([c3c081f](https://bitbucket.org/centraltechnology/centech-api/commits/c3c081f4eb81156582b3d852b50c42f463965d7c))
* **Test:** update config ([179c53b](https://bitbucket.org/centraltechnology/centech-api/commits/179c53b828a3f8b1edc37e43e1b967fb6f0b0728))


### Features

* **Product:** add seller_url_key ([241c94e](https://bitbucket.org/centraltechnology/centech-api/commits/241c94e6640862d40b30929178f9a4d622f48cbb))





# [1.7.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.6.0...v1.7.0) (2020-01-10)


### Bug Fixes

* fix product custom attribute ([8c85fce](https://bitbucket.org/centraltechnology/centech-api/commits/8c85fce519fc2a7a8d87575a43ccb0b93ce9a84a))





# [1.6.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.5.1...v1.6.0) (2020-01-10)


### Bug Fixes

* **Add Header:** X-Api-Version ([db601e2](https://bitbucket.org/centraltechnology/centech-api/commits/db601e2aa7540b481e776ac130e0212aa2da629d))
* **Product:** CPI-181 CPI-182 CPI-183 product price, product link, media gallery entry ([2e32c91](https://bitbucket.org/centraltechnology/centech-api/commits/2e32c9146123d90926254951bfacc2f7d20e8ffd))
* Add permission for wishlist, address, shipping address by id to use customer data from customer token. ([4261f7e](https://bitbucket.org/centraltechnology/centech-api/commits/4261f7edbf73d7dd9141568ec0f255dd8cf45fdf))


### Features

* **Product:** add sale_price min, max and sale price min, max ([9f46627](https://bitbucket.org/centraltechnology/centech-api/commits/9f46627777dda3777fa5969edbe8be1da1922b0d))





## [1.5.1](https://bitbucket.org/centraltechnology/centech-api/compare/v1.5.0...v1.5.1) (2020-01-09)

**Note:** Version bump only for package @central-tech/api





# [1.5.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.4.0...v1.5.0) (2020-01-09)


### Bug Fixes

* **Cart:** throw error when `isInValidCustomer` ([6925794](https://bitbucket.org/centraltechnology/centech-api/commits/69257949f6f852f85b34a0d5635a881c4dea5d79))


### Features

* **Price Per Store:** add query `retailerByPostcode` ([6ff100e](https://bitbucket.org/centraltechnology/centech-api/commits/6ff100e11419789a98e485f3fba259f4c5ab4f21))
* **Price Per Store:** change response base on new api on `mdc` ([fd66d38](https://bitbucket.org/centraltechnology/centech-api/commits/fd66d38f1330efb062650f28c0b26cc2bf7cedf3))
* **Product:** `type_id`, `link_type` and `linked_product_type` use `enum` type ([b7b8048](https://bitbucket.org/centraltechnology/centech-api/commits/b7b80486d62b1f9071cffa30eb4dd924b3faa905))
* **ProductQuery:** add new field 'product_tags'. use data from custom attribute and select from first child incase configurable product. ([4579509](https://bitbucket.org/centraltechnology/centech-api/commits/457950978de522385c714db2590a3dae7102ebef))





# [1.4.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.3.0...v1.4.0) (2020-01-02)


### Bug Fixes

* remove logs, remove string qoute ([afced2b](https://bitbucket.org/centraltechnology/centech-api/commits/afced2ba71b003f01bd24640aebf76c107df1ae4))


### Features

* auto generate cart, move guest_id from cart to cart fragment ([689c206](https://bitbucket.org/centraltechnology/centech-api/commits/689c206ad6e183ab64aa99f8fac40913d1290112))
* **Promotion:** add field `all_applicable_rules` on promotion ([ffc2e28](https://bitbucket.org/centraltechnology/centech-api/commits/ffc2e28ecfa13590ca50a40edd5b40166c31629a))





# [1.3.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.2.1...v1.3.0) (2020-01-02)


### Bug Fixes

* **ProductLink:** add condition for showing related product ([0db68ba](https://bitbucket.org/centraltechnology/centech-api/commits/0db68ba06101a0cb2fa44975825de7585efa8edd))
* **type input:** store_id not support String ([e996567](https://bitbucket.org/centraltechnology/centech-api/commits/e99656711003138d1b73d4b381bc3494d124907b))


### Features

* **AddToCart:** add schema to support add product configurable to cart ([d23e871](https://bitbucket.org/centraltechnology/centech-api/commits/d23e8710028f5cb04f53dbea116cb8dac3a75315))





## [1.2.1](https://bitbucket.org/centraltechnology/centech-api/compare/v1.2.0...v1.2.1) (2019-12-26)

**Note:** Version bump only for package @central-tech/api





# [1.2.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.1.1...v1.2.0) (2019-12-25)


### Bug Fixes

* add condition for image when return as 'no_selection' ([2b3b4c5](https://bitbucket.org/centraltechnology/centech-api/commits/2b3b4c52f655886c3ee966de8cce394a040400e6))
* fix type on  storeLocatorResolvers ([cdb75a4](https://bitbucket.org/centraltechnology/centech-api/commits/cdb75a480ae07ce722b3702e240558d7d9a7e858))


### Features

* add price_min, price_max, price_min,  pre select image, media_gallery_entries from first child product ([b146cee](https://bitbucket.org/centraltechnology/centech-api/commits/b146ceedb7e82dfbe2a8ca26cbcfe45c4a0b472e))





## [1.1.1](https://bitbucket.org/centraltechnology/centech-api/compare/v1.1.0...v1.1.1) (2019-12-25)

**Note:** Version bump only for package @central-tech/api





# [1.1.0](https://bitbucket.org/centraltechnology/centech-api/compare/v1.0.8...v1.1.0) (2019-12-25)


### Features

* **Magento DataSource:** add searchStore & getStoreById ([c7db605](https://bitbucket.org/centraltechnology/centech-api/commits/c7db605af0a85d65163a332fe196ed3838e18cfe))
* **PricePerStore:** add Store to `PricePerStore` ([43380ee](https://bitbucket.org/centraltechnology/centech-api/commits/43380ee9458add49e7a30f5ab29e968fb725d693))
* **Store Locator:** add `getStore(id: ID!)` ([9b3af53](https://bitbucket.org/centraltechnology/centech-api/commits/9b3af532b28bacc9d3305e4aa8fc97d553ca927b))





## [1.0.8](https://bitbucket.org/centraltechnology/centech-api/compare/v1.0.7...v1.0.8) (2019-12-23)


### Bug Fixes

* fix type of categories id [skip ci] ([a0332e9](https://bitbucket.org/centraltechnology/centech-api/commits/a0332e9ce2e5af2b9ded867e6f90ed48d6448ca7))





## [1.0.7](https://bitbucket.org/centraltechnology/centech-api/compare/v1.0.6...v1.0.7) (2019-12-19)

**Note:** Version bump only for package @central-tech/api





## [1.0.6](https://bitbucket.org/centraltechnology/centech-api/compare/v1.0.5...v1.0.6) (2019-12-19)


### Features

* **Stores Locator:** add store logo on store.custom_attributes [TW-65] ([ceec499](https://bitbucket.org/centraltechnology/centech-api/commits/ceec499263ca37df9a2151f90c7f61a1e1653b15))





## [1.0.5](https://bitbucket.org/centraltechnology/centech-api/compare/v1.0.4...v1.0.5) (2019-12-18)

**Note:** Version bump only for package @central-tech/api





## [1.0.4](https://bitbucket.org/centraltechnology/centech-api/compare/v1.0.3...v1.0.4) (2019-12-17)

**Note:** Version bump only for package @central-tech/api





## [1.0.3](https://bitbucket.org/centraltechnology/centech-api/compare/v1.0.2...v1.0.3) (2019-12-17)

**Note:** Version bump only for package @central-tech/api





## [1.0.2](https://bitbucket.org/centraltechnology/centech-api/compare/v1.0.1...v1.0.2) (2019-12-17)

**Note:** Version bump only for package @central-tech/api





## [1.0.1](https://bitbucket.org/centraltechnology/centech-api/compare/v1.0.0...v1.0.1) (2019-12-17)

**Note:** Version bump only for package @central-tech/api





# [1.0.0](https://bitbucket.org/centraltechnology/centech-api/compare/v0.1.1-alpha.2...v1.0.0) (2019-12-17)

**Note:** Version bump only for package @central-tech/api





## [0.1.1-alpha.2](https://bitbucket.org/centraltechnology/centech-api/compare/v0.1.1-alpha.1...v0.1.1-alpha.2) (2019-12-13)

**Note:** Version bump only for package @central-tech/api





## [0.1.1-alpha.1](https://bitbucket.org/centraltechnology/centech-api/compare/v0.1.1-alpha.0...v0.1.1-alpha.1) (2019-12-13)

**Note:** Version bump only for package @central-tech/api
