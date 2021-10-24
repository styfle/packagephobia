# Contributing

Thank you for considering contributing to Package Phobia!

The goal of this project can be found in the README.md so this document will focus on building, running, and testing the code.

## Getting Started

First, clone this repository.

```sh
git clone https://github.com/styfle/packagephobia
cd packagephobia
```

### Redis

You will need to run `redis` either locally or in the cloud such as [upstash.com](https://upstash.com/?ref=packagephobia).

If you have docker, you can get started quickly with the following command.

```sh
docker run -p 6379:6379 redis
```

### Env

Create a `.env` file in the root directory.

```
# required settings
REDIS_HOST="127.0.0.1"
REDIS_PORT="6379"
REDIS_PASS=""
GA_ID=""

# optional settings
export PORT="3000"
export NPM_REGISTRY_URL="https://registry.npmjs.com"
```

## Running the code

Install [Vercel](https://vercel.com/download) CLI

```sh
npm install -g vercel
```

Run the development environment

```sh
vercel dev
```

Now the web app should be available at http://localhost:3000


## Testing the code

Make sure the tests are passing.

```
npm test
```

## Deploying the code

Each PR is automatically deployed to [Vercel](https://vercel.com/?utm_source=packagephobia) via the [GitHub Integration](https://vercel.com/github).

If you want to deploy from the command line, you'll need to install [Vercel](https://vercel.com) CLI with `npm i -g vercel`.

Then you can simply run `vercel` to deploy.

## Submitting a PR

Wow you're doing great! Before you submit a Pull Request, please create an issue so that we can discuss the problem you are solving. When we're all on the same page, make sure you test the code and prettify the code. And please add additional tests if possible.

```sh
npm run test
npm run prettier
```
