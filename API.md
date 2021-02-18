# API

## Users

- https://badgen.net
- https://cnpmjs.org
- https://npm.taobao.org
- https://bestofjs.org

## Endpoints

- v1: `GET /api.json`
- v2: `GET /v2/api.json`

You can use the npm package name and version (cached for one week):

[`https://packagephobia.com/api.json?p=next@10.0.7`](https://packagephobia.com/api.json?p=next@10.0.7)

Or just the npm package name, which will automatically use the latest version (cached for thirty seconds):

[`https://packagephobia.com/api.json?p=next`](https://packagephobia.com/api.json?p=next)

> This caching is done using a [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) header, see [`server.ts`](https://github.com/styfle/packagephobia/blob/main/src/server.ts).

### Example response from v1

```json
{
  "publishSize":22119916,
  "installSize":68883262
}
```

### Example response from v2

```json
{
  "name": "next",
  "version": "10.0.7",
  "publish": {
    "bytes": 22119916,
    "files": 1052,
    "pretty": "21.1 MB",
    "color": "#DFB317"
  },
  "install": {
    "bytes": 68883262,
    "files": 7440,
    "pretty": "65.7 MB",
    "color": "#FE7D37"
  }
}
```
