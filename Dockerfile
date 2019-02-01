FROM mhart/alpine-node:10.15.1 as build
WORKDIR /usr/app
COPY . .
RUN npm install --only=production
RUN mv node_modules prod_modules
RUN npm install
ENV NODE_ENV production
RUN npm run build

FROM mhart/alpine-node:base-10.15.1
RUN apk add --no-cache --virtual .build-deps alpine-sdk python
WORKDIR /usr/app
ENV NODE_ENV production
COPY --from=build /usr/app/prod_modules ./node_modules
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/package.json ./package.json
COPY --from=build /usr/app/static ./static
EXPOSE 3107
CMD node dist/server.js
