<img src="https://packagephobia.now.sh/logo.svg" width=40 height=40 align="left" />

# Package Phobia

[![dependency](https://badgen.now.sh/david/dep/styfle/packagephobia)](https://david-dm.org/styfle/packagephobia)
[![devDependency](https://badgen.now.sh/david/dev/styfle/packagephobia)](https://david-dm.org/styfle/packagephobia?type=dev)
[![lgtm](https://badgen.net/lgtm/grade/javascript/g/styfle/packagephobia)](https://lgtm.com/projects/g/styfle/packagephobia/)
[![travis](https://badgen.now.sh/travis/styfle/packagephobia)](https://travis-ci.org/styfle/packagephobia)
[![code style: prettier](https://badgen.now.sh/badge/code%20style/prettier/ff69b4)](https://github.com/prettier/prettier)

<a href="https://turnoff.us/geek/npm-install/"><img src="https://turnoff.us/image/en/npm-install.png" width=300 height=400 align="right" /></a>

- ⚖️ Find the cost of adding a new dependency to your project
- 🕗 Save yourself time and disk space with this web app
- 📈 Detect javascript bloat over time with a chart
- 🛡️ Get a badge/shield for your README
- 📡 Fetch size from json API to integrate into any tool

*...as seen on [npm weekly](https://medium.com/npm-inc/87f3bd77529#1883) and [ponyfoo weekly](https://ponyfoo.com/weekly/111/how-css-works-integration-testing-angular-6-optimizing-react-and-the-future-of-javascript) and [habr](https://habr.com/company/zfort/blog/354060/) and [rwpod](https://www.rwpod.com/posts/2018/04/23/podcast-06-16.html) and [wolf report](https://michael-wolfenden.github.io/2018/04/20/april-20th-2018/) and [the changelog](https://changelog.com/news/find-the-cost-of-adding-a-new-dependency-to-your-project-gbj6) and all over twitter*

## What is the purpose?

Package Phobia reports the size of an npm package *before* you install it.

This is useful for inspecting potential `dependencies` or `devDependencies` without using up precious disk space or waiting minutes for `npm install`. Ain't nobody got time for dat.

Results are saved so the first person might wait a bit to view package size, but everyone else gets to see the results instantly!

## [Demo](https://packagephobia.now.sh)

A good use case might be comparing test runners, web frameworks, or even bundlers. Click one of the links below to see Package Phobia in action!

- Test Harnesses: [tap](https://packagephobia.now.sh/result?p=tap) vs [tape](https://packagephobia.now.sh/result?p=tape)
- Web Frameworks: [express](https://packagephobia.now.sh/result?p=express) vs [micro](https://packagephobia.now.sh/result?p=micro)
- JavaScript Bundlers: [webpack](https://packagephobia.now.sh/result?p=webpack) vs [rollup](https://packagephobia.now.sh/result?p=rollup)
- Task Runners: [grunt](https://packagephobia.now.sh/result?p=grunt) vs [gulp](https://packagephobia.now.sh/result?p=gulp)
- HTTP Requests: [request](https://packagephobia.now.sh/result?p=request) vs [node-fetch](https://packagephobia.now.sh/result?p=node-fetch)
- Glob Patterns: [glob](https://packagephobia.now.sh/result?p=glob) vs [tiny-glob](https://packagephobia.now.sh/result?p=tiny-glob)
- Arguments: [yargs](https://packagephobia.now.sh/result?p=yargs) vs [arg](https://packagephobia.now.sh/result?p=arg)
- Site Generators: [gatsby](https://packagephobia.now.sh/result?p=gatsby) vs [hexo](https://packagephobia.now.sh/result?p=hexo)
- Type Checkers: [typescript](https://packagephobia.now.sh/result?p=typescript) vs [flow-bin](https://packagephobia.now.sh/result?p=flow-bin)
- Linters: [eslint](https://packagephobia.now.sh/result?p=eslint) vs [jslint](https://packagephobia.now.sh/result?p=jslint)
- Color Formatters: [chalk](https://packagephobia.now.sh/result?p=chalk) vs [colorette](https://packagephobia.now.sh/result?p=colorette)
- Command Line Interfaces: [@angular/cli](https://packagephobia.now.sh/result?p=%40angular%2Fcli) vs [@babel/cli](https://packagephobia.now.sh/result?p=%40babel%2Fcli)
- Desktop Frameworks: [nw](https://packagephobia.now.sh/result?p=nw) vs [electron](https://packagephobia.now.sh/result?p=electron)
- Headless Browsers: [puppeteer](https://packagephobia.now.sh/result?p=puppeteer) vs [chrome-aws-lambda](https://packagephobia.now.sh/result?p=chrome-aws-lambda)
- Package Managers: [npm](https://packagephobia.now.sh/result?p=npm) vs [yarn](https://packagephobia.now.sh/result?p=yarn)

## Prior Art

Package Phobia is inspired by [Bundle Phobia](https://github.com/pastelsky/bundlephobia) and [Cost Of Modules](https://github.com/siddharthkp/cost-of-modules).

## How is this different?

- [Package Phobia](https://packagephobia.now.sh) **THIS TOOL** web app that reports the install size of a package over time.
- [Bundle Phobia](https://bundlephobia.com) web app that reports the size after webpack bundles the package over time.
- [Cost Of Modules](https://github.com/siddharthkp/cost-of-modules) cli that reports the size of your currently installed packages.
- [Badge Size](https://github.com/ngryman/badge-size) badge service that reports the gzip size of a single file from a package as svg.
- [Size Limit](https://github.com/ai/size-limit) cli that fails if the bundled (or non-bundled) size of your app is too large.
- [Bundle Size](https://github.com/siddharthkp/bundlesize) cli that fails CI if a file's size is too large.
- [Package Size](https://github.com/egoist/package-size) cli that compares the bundle size of multiple packages.
- [npm Size](https://github.com/egoist/npm-size) cli that compares the npm install size of multiple packages.
- [Require So Slow](https://github.com/ofrobots/require-so-slow) cli that traces the time of each `require` module in a node.js app.
- [Why Bundled?](https://github.com/d4rkr00t/whybundled) cli that uses webpack stats to show your number of imports and package size.
- [Do you even lift?](https://github.com/npm/do-you-even-lift) - cli that reports size after rollup bundles the package via npm team.
- [Import Cost](https://github.com/wix/import-cost) extension (and cli) that displays package size inline in the editor.
- [npm Download Size](https://github.com/arve0/npm-download-size) web app that reports the download size (network traffic) of a package.
- [npm Download Size cli](https://github.com/arve0/npm-download-size-cli) cli that reports the download size (network traffic) of a package.
- [Build Size](https://github.com/Daniel15/BuildSize) - GitHub App that comments on a PR with the size of your build artifacts
- [Pkg Size](http://pkgsize.com) - web app that displays package size and file count over time (static data only)

## Why is the size different than size on disk?

Did you install a package and compare the size on disk with the size reported on Package Phobia?

This number will likely be different because Package Phobia doesn't know anything about your hard drive so it can't predict how blocks are allocated.

Packages are known to contain many small `.js` files which can actually use up a lot of disk space, more than if there was one large, contiguous file.

See [this question](https://superuser.com/q/66825/27229) for more details.

## What are the long term goals?

Ideally, this information could be listed on npmjs.com, npms.io, or bundlephobia.com.

Below are the relevant feature requests for each website.

- [GitHub issue for bundlephobia.com](https://github.com/pastelsky/bundlephobia/issues/40)
- [GitHub issue for npmjs.com](https://github.com/npm/www/issues/197)
- [GitHub issue for npms.io](https://github.com/npms-io/npms-www/issues/219)
- [GitHub issue for staticgen.com](https://github.com/netlify/staticgen/issues/359)
- [GitHub issue for cost-of-modules](https://github.com/siddharthkp/cost-of-modules/issues/50)
- [GitHub issue for npm-cli](https://github.com/npm/npm/issues/20427)
- [GitHub issue for bundlesize](https://github.com/siddharthkp/bundlesize/issues/205)
- [GitHub issue for npmgraph.an](https://github.com/anvaka/npmgraph.an/issues/25)

Hopefully, this would lead to publishers taking notice of their bloated packages such as the following:

- [micro is not micro](https://github.com/zeit/micro/issues/234)
- [ava is not minimal](https://github.com/avajs/ava/issues/1622)
- [typescript has doubled in size since v2.0.0](https://github.com/Microsoft/TypeScript/issues/23339)
- [bundlesize is 10x larger after npm install since v0.14.0](https://github.com/siddharthkp/bundlesize/issues/213)
- [jquery@3.3.0 accidentally adds 300 dependencies](https://twitter.com/styfle/status/985955164573065217)
- [socket.io is 6x smaller](https://twitter.com/styfle/status/986224072882380802)
- [serve@7.0.0 is 3x smaller](https://twitter.com/styfle/status/1001901854417178624)
- [webpack-cli@3.0.0 is 4x smaller](https://twitter.com/styfle/status/1006605750981021697)
- [v8n@1.1.1 is 11x smaller](https://twitter.com/styfle/status/1022433043498364931)
- [now@13.0.0-canary.6 is 2x smaller](https://twitter.com/styfle/status/1064512498706116617)

## npm dependencies in the media

I'm not the first one to notice npm packages are snowballing into bloated dependencies of dependencies.

Below are some other users who comically point out this JS bloat.

- [thomasfuchs](https://twitter.com/thomasfuchs/status/977541462199029760)
- [ben_a_adams](https://twitter.com/ben_a_adams/status/979358943561609216)
- [devrant](https://devrant.com/rants/760537/heaviest-objects-in-the-universe)
- [turnoff.us](https://turnoff.us/geek/npm-install/)
- [styfle](https://twitter.com/styfle/status/968180698149539841)
- [davej](https://github.com/npm/npm/issues/10361)
- [FredyC](https://github.com/yarnpkg/yarn/issues/2088)
- [tomitrescak](https://github.com/npm/npm/issues/12515)
- [maybekatz](https://twitter.com/maybekatz/status/988893800054456320)
- [hichaelmart](https://twitter.com/hichaelmart/status/988882864270962688)
- [brad_frost](https://twitter.com/brad_frost/status/996014341592961025)
- [Bryan_Chapel](https://twitter.com/Bryan_Chapel/status/1002680482159648769)
- [getabitlit](https://twitter.com/getabitlit/status/1013524294394003456)
- [iamdevloper](https://twitter.com/iamdevloper/status/1013767672369242112)
- [rickhanlonii](https://twitter.com/rickhanlonii/status/1062319416107560961)

## Contributing

See [CONTRIBUTING.md](https://github.com/styfle/packagephobia/blob/master/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/styfle/packagephobia/blob/master/CODE_OF_CONDUCT.md) before you start writing any code

## Author

Developed by [ceriously.com](https://www.ceriously.com)
