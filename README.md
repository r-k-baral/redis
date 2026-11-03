# One Product, One Redis Example

This small MVC app demonstrates one thing: **Redis can remember a MongoDB result so the next fetch is faster.** It contains one GET route and one demo product.

## Start

1. Start Docker Desktop and wait until it is running.
2. In this project folder, run:

   ```sh
   docker compose up -d
   npm install
   npm run seed
   npm start
   ```

3. Open [http://localhost:3000/product](http://localhost:3000/product) twice.

The first response says `"cache":"MISS"` because the app fetched the product from MongoDB and saved a copy in Redis. The second says `"cache":"HIT"` because it used the copy in Redis.

## The Redis part

`src/services/productService.js` contains the whole cache example:

1. `GET product:demo` asks Redis for the saved product.
2. If Redis returns a value, return it and report `HIT`.
3. If Redis has no value, fetch one product from MongoDB.
4. `SET product:demo ... EX 60` saves it in Redis for 60 seconds, then reports `MISS`.

MongoDB remains the original data store. Redis holds a temporary JSON copy. The TTL (`EX 60`) means Redis removes that copy after 60 seconds; a later request will fetch from MongoDB again.

## Files

- `src/models/Product.js` — the MongoDB product shape
- `src/routes/productRoutes.js` — the single `GET /product` route
- `src/controllers/productController.js` — handles the HTTP request and response
- `src/services/productService.js` — checks Redis, then MongoDB on a miss
- `src/seed.js` — puts one sample product in MongoDB and clears its Redis key
- `scripts/benchmark.js` — compares repeated direct MongoDB reads with cached Redis reads

Optional benchmark, with MongoDB and Redis running:

```sh
npm run benchmark
```

It reports average time for 100 sequential reads through each path. This is only a simple local demonstration; timings vary by machine.
