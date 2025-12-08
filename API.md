# API

If you intend to use this API, set your `User-Agent` to identify your app, and then add that same identifier to the list below

For example, set your `User-Agent: "example.com (some other app information)"`, and then add `example.com` to the list. Make your entry link to where the user agent is specified.

If you forget to set a `User-Agent`, you will likely be blocked.

## Users

Current websites using this API:

- https://badgen.net
- https://cnpmjs.org
- https://npm.taobao.org
- https://bestofjs.org
- https://socket.dev
- [picocolors-size-benchmark](https://github.com/alexeyraspopov/picocolors/pull/76)
- [dependencies-dashboard](https://github.com/shakib1729/dependencies-dashboard-main)
- [https://jsgrids.statico.io](https://github.com/statico/jsgrids/commit/bb8069627d4d9a9b158ffb6324054399ef8d0433)

## Endpoints

- v1: `GET /api.json`
- v2: `GET /v2/api.json`

You can use the npm package name and version (cached for up to one week):

[`https://packagephobia.com/api.json?p=satori@0.4.3`](https://packagephobia.com/api.json?p=satori@0.4.3)

Or just the npm package name, which will automatically use the latest version (cached for thirty seconds):

[`https://packagephobia.com/api.json?p=satori`](https://packagephobia.com/api.json?p=satori)

> This caching is done using a [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) header, see [`server.ts`](https://github.com/styfle/packagephobia/blob/main/src/server.ts).

### Example response from v1

```json
{
  "publishSize":3686131,
  "installSize":8724612
}
```

### Example response from v2

```json
{
  "name": "satori",
  "version": "0.4.3",
  "publish": {
    "bytes": 3686131,
    "files": 19,
    "pretty": "3.52 MB",
    "color": "#007EC6"
  },
  "install": {
    "bytes": 8724612,
    "files": 297,
    "pretty": "8.32 MB",
    "color": "#DFB317"
  }
}
```
