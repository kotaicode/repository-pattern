### Simply TINYURL service in node/expressjs

How to start running this
(assumes that you have mongodb installed. For eg. in mac, do `brew install mongodb` )

```
npm install
mkdir -p data
mongod --dbpath data &
npm start
```


There are two end points (by default at `localhost:3000`)

```
GET /:tiny
     accepts nothing
     redirects to the full-url corresponding to the tiny
POST /
     accepts json '{full_url: valid-url-to-be-tinified}'
     returns the new tinyUrl object
```

### Repo pattern

The goal is to show the repository pattern.
For that, please checkout the following files (in the same order)

1. [routes/tinyurls.js](routes/tinyurls.js)
2. [controllers/tinyurls.js](controllers/tinyurls.js)
3. [repos/tinyurls.js](repos/tinyurls.js)
4. [models/tinyurls.js](models/tinyurls.js)
