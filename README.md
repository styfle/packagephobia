# Package Phobia

<a href="http://turnoff.us/geek/npm-install/"><img src="http://turnoff.us/image/en/npm-install.png" width=300 height=400 align="right" /></a>

⚖️ Find the cost of adding a new dev dependency to your project

Inspired by [bundlephobia](https://github.com/pastelsky/bundlephobia) and [cost-of-modules](https://github.com/siddharthkp/cost-of-modules).

**NOTE: This is currenlty a work in progress...let me know if you find this useful [@styfle](https://twitter.com/styfle)**

## How is this different?

- Package Phobia reports the install size of a package.
- Bundle Phobia reports the size after webpack bundles the code.
- Cost Of Modules reports the size of your currently installed packages.

## What is the purpose?

The idea is to check the size of an npm package before you install it. This is useful for comparing `devDependencies` without using up disk space. A good use case might be comparing test harnesses (ava vs tape) or even bundlers (webpack vs browserify).

## Relevant Jokes

- [Baggage](https://twitter.com/thomasfuchs/status/977541462199029760)
- [Out of this world](http://turnoff.us/geek/npm-install/)

## Authors

Developed by [ceriously.com](https://www.ceriously.com)
