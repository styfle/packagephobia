Thank you for considering contributing to Package Phobia!

The goal of this project can be found in the README.md so this document will focus on building, running, and testing the code.

## Getting Started

Open a terminal and execute the following to get the code:

```sh
git clone https://github.com/styfle/packagephobia
cd packagephobia

npm install
npm run build -s
npm run test -s
npm run prettier -s
```

This will do the following:

- clone the source code to your local machine
- change directory to your newly cloned code
- install the dependendencies which will show up in `node_modules` directory
- build the code, the output will be in the `dist` directory
- test the code, you'll want to do this periodically
- make the code pretty, you'll want to do this periodically w/commit hook

## Running the code

You will need to run `redis` either locally or in the cloud such as [redis labs](https://redislabs.com).

If you have docker, you can get started quickly with the following command.

```sh
docker run -p 6379:6379 redis
```

Now that the database is running, let's launch the app.

```sh
## required settings
export REDIS_HOST="localhost"
export REDIS_PORT="6379"
export REDIS_PASS="SomePass42"

# optional settings
export PORT="3000"
export NPM_REGISTRY_URL="https://registry.npmjs.com"

# launch node.js via npm
npm start
```

Now, the web app should be available at http://localhost:3000

## Deploying the code

Currently, the code is hosted on Zeit Now which makes it super easy to deploy

I run `npm run deploy` which will deploy and alias, however this alias is exclusive to my account.

So you can deploy a new instance by simply running `npx now --public`.

## Submitting a PR

Wow you're doing great! Before you submit a Pull Request, please create an issue so that we can discuss the problem you are solving. When we're all on the same page, make sure you test the code and prettify the code. And please add additional tests if possible.

```sh
npm run test
npm run prettier
```
