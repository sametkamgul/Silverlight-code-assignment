# Getting Started with Silverlight

## install dependencies

-   for both client and server you should install dependencies before you start
    `npm i` or `npm install`

## available scripts

## server

-   server uses `Wappalyzer`package to retrieve information about website

-   server can be started as development/production mode by
    `npm run dev` or `npm run start`

-   sample json output get request: `http://localhost:3001/api?url=https://www.epctex.com`

```
{
  "pages": 2,
  "urls": [
    "https://www.epctex.com/",
    "https://epctex.com/"
  ],
  "technologies": [
    "Node.js",
    "Chakra UI",
    "React",
    "Next.js",
    "Emotion",
    "Nginx",
    "Hotjar",
    "Google Analytics",
    "Preact",
    "HSTS",
    "Webpack",
    "PWA",
    "Open Graph",
    "Module Federation"
  ]
}
```

-   possible server responses

```
http 200: results are sent. json data would be returned
http 400: bad request. empty json would be returned
http 404: resource are not found: empty json would be returned
```

## client

-   client can be started by
    `npm run start` or `npm run build`

-   related tests could be started by
    `npm run test`

## software features

-   regex check for url on both backend and frontend
-   data is stored on localstorage

## TODO

-   frontend error showing in the component itself(Analyzing... and View More section) for cases like: fetch is sent but no response(timeout, server issues)
-   multiple url request at the same time
-   more test coverage
-   maybe current components should be divided to more sub components?
