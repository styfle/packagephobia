# Package Phobia

[![dependency](https://david-dm.org/styfle/packagephobia.svg)](https://david-dm.org/styfle/packagephobia)
[![devDependency](https://david-dm.org/styfle/packagephobia/dev-status.svg)](https://david-dm.org/styfle/packagephobia#info=devDependencies)
[![travis](https://travis-ci.org/styfle/packagephobia.svg?branch=master)](https://travis-ci.org/styfle/packagephobia)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<a href="http://turnoff.us/geek/npm-install/"><img src="http://turnoff.us/image/en/npm-install.png" width=300 height=400 align="right" /></a>


- ⚖️ Find the cost of adding a new dev dependency to your project
- 🕗 Save yourself time and disk space with this web app
- 📈 Detect javascript bloat over time with a chart
- 🛡️ Get a badge/shield for your README
- 🆕 Fetch size as json to integrate your tool

## What is the purpose?

Package Phobia reports the size of an npm package *before* you install it.

This is useful for inspecting potential `devDependencies` without using up precious disk space or waiting minutes for `npm install`. Ain't nobody got time for dat.

## [Demo](https://packagephobia.now.sh)

A good use case might be comparing test runners, web frameworks, or even bundlers. Click one of the links below to see Package Phobia in action!

- Test Harnesses: [tap](https://packagephobia.now.sh/result?p=tap) vs [tape](https://packagephobia.now.sh/result?p=tape)
- Web Frameworks: [express](https://packagephobia.now.sh/result?p=express) vs [micro](https://packagephobia.now.sh/result?p=micro)
- JavaScript Bundlers: [webpack](https://packagephobia.now.sh/result?p=webpack) vs [browserify](https://packagephobia.now.sh/result?p=browserify)
- Task Runners: [grunt](https://packagephobia.now.sh/result?p=grunt) vs [gulp](https://packagephobia.now.sh/result?p=gulp)
- Site Generators: [gatsby](https://packagephobia.now.sh/result?p=gatsby) vs [hexo](https://packagephobia.now.sh/result?p=hexo)
- Type Checkers: [typescript](https://packagephobia.now.sh/result?p=typescript) vs [flow-bin](https://packagephobia.now.sh/result?p=flow-bin)
- Linters: [eslint](https://packagephobia.now.sh/result?p=eslint) vs [jslint](https://packagephobia.now.sh/result?p=jslint)
- Command Line Interfaces: [@angular/cli](https://packagephobia.now.sh/result?p=%40angular%2Fcli) vs [@babel/cli](https://packagephobia.now.sh/result?p=%40babel%2Fcli)
- Platforms: [nw](https://packagephobia.now.sh/result?p=nw) vs [electron](https://packagephobia.now.sh/result?p=electron)

## Prior Art

Package Phobia is inspired by [Bundle Phobia](https://github.com/pastelsky/bundlephobia) and [Cost Of Modules](https://github.com/siddharthkp/cost-of-modules).

## How is this different?

- [Package Phobia](https://packagephobia.now.sh) reports the install size of a package.
- [Bundle Phobia](https://bundlephobia.com) reports the size after webpack bundles the package.
- [Cost Of Modules](https://github.com/siddharthkp/cost-of-modules) reports the size of your currently installed packages.

## What are the long term goals?

Ideally, this information could be listed on npmjs.com, npms.io, or bundlephobia.com.

Below are the relevant feature requests for each website.

- [GitHub issue for bundlephobia.com](https://github.com/pastelsky/bundlephobia/issues/40)
- [GitHub issue for npmjs.com](https://github.com/npm/www/issues/197)
- [GitHub issue for npms.io](https://github.com/npms-io/npms-www/issues/219)
- [GitHub issue for staticgen.com](https://github.com/netlify/staticgen/issues/359)
- [GitHub issue for cost-of-modules](https://github.com/siddharthkp/cost-of-modules/issues/50)

Hopefully, this would lead to publishers taking notice of their bloated packages such as the following:

- [micro is not micro](https://github.com/zeit/micro/issues/234)
- [ava is not minimal](https://github.com/avajs/ava/issues/1622)
- [typescript has doubled in size since v2.0.0](https://github.com/Microsoft/TypeScript/issues/23339)
- [bundlesize is 10x larger after npm install since v0.14.0](https://github.com/siddharthkp/bundlesize/issues/213)

## npm dependencies in the media

I'm not the first one to notice npm packages are snowballing into bloated dependencies of dependencies.

- [thomasfuchs](https://twitter.com/thomasfuchs/status/977541462199029760)
- [devrant](https://devrant.com/rants/760537/heaviest-objects-in-the-universe)
- [turnoff.us](http://turnoff.us/geek/npm-install/)
- [styfle](https://twitter.com/styfle/status/968180698149539841)
- [davej](https://github.com/npm/npm/issues/10361)
- [FredyC](https://github.com/yarnpkg/yarn/issues/2088)
- [tomitrescak](https://github.com/npm/npm/issues/12515)

## Author

Developed by [ceriously.com](https://www.ceriously.com)
