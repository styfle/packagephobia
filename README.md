# Package Phobia

<a href="http://turnoff.us/geek/npm-install/"><img src="http://turnoff.us/image/en/npm-install.png" width=300 height=400 align="right" /></a>

⚖️ Find the cost of adding a new dev dependency to your project

## Prior Art

Inspired by [bundlephobia](https://github.com/pastelsky/bundlephobia) and [cost-of-modules](https://github.com/siddharthkp/cost-of-modules).

## How is this different?

- [Package Phobia](https://packagephobia.now.sh) reports the install size of a package.
- [Bundle Phobia](https://bundlephobia.com) reports the size after webpack bundles the package.
- [Cost Of Modules](https://github.com/siddharthkp/cost-of-modules) reports the size of your currently installed packages.

## What is the purpose?

The idea is to check the size of an npm package *before* you install it.

This is useful for comparing `devDependencies` without using up precious disk space.

A good use case might be comparing test harnesses ([tap](https://packagephobia.now.sh/result?p=tap) vs [tape](https://packagephobia.now.sh/result?p=tape)) or even bundlers ([webpack](https://packagephobia.now.sh/result?p=webpack) vs [browserify](https://packagephobia.now.sh/result?p=browserify)).

## What are the long term goals?

Ideally, this information could be listed on npmjs.com or npms.io.

Below are the relevant feature requests for each website.

- [npmjs request](https://github.com/npm/www/issues/197)
- [npms request](https://github.com/npms-io/npms-www/issues/219)

## NPM dependencies in the media

I'm not the first one to notice npm packages are snowballing into bloated dependencies of dependencies.

- [thomasfuchs](https://twitter.com/thomasfuchs/status/977541462199029760)
- [turnoff.us](http://turnoff.us/geek/npm-install/)
- [styfle](https://twitter.com/styfle/status/968180698149539841)
- [davej](https://github.com/npm/npm/issues/10361)
- [FredyC](https://github.com/yarnpkg/yarn/issues/2088)
- [tomitrescak](https://github.com/npm/npm/issues/12515)

## Authors

Developed by [ceriously.com](https://www.ceriously.com)
