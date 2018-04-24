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
```

This will do the following:

- clone the source code to your local machine
- change directory to your newly cloned code
- install the dependendencies which will show up in `node_modules` directory
- build the code, the output will be in the `dist` directory
- test the code, you'll want to do this periodically

## Running the code

Open a terminal and execute the following to run the code:

```sh
export REDIS_HOST="redis.example.com"
export REDIS_PORT="6380"
export REDIS_PASS="password123"
export PORT="3000" # optional
npm start
```

This will do the following:

- assign environment variables for redis, the main database
- start the server on http://localhost:3000

## Deploying the code

Currently, the code is hosted on Zeit Now which makes it super easy to deploy

I run `npm run deploy` which will deploy and alias, however this alias is exclusive to my account.

So you can deploy a new instance by simply running `npx now --public`.
