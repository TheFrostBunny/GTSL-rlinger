import fs from "fs";

const file = "./src/generated/graphql.tsx";

if (!fs.existsSync(file)) {
  console.log(
    "\x1b[33m⚠ \x1b[0mSkipped fix-graphql-generate: src/generated/graphql.tsx was not generated"
  );
  process.exit(0);
}

fs.readFile(file, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let result = data;

  // Replace cacheExchange with offlineExchange
  if (result.includes("cacheExchange")) {
    result = result.replaceAll(/cacheExchange/g, "offlineExchange");
    console.log(
      "\x1b[32m✔ \x1b[0mReplaced GraphCacheConfig type from cacheExchange to offlineExchange"
    );
  } else {
    console.log(
      "\x1b[33m⚠ \x1b[0mGraphCacheConfig type is offlineExchange. This check can probably be removed now"
    );
  }

  fs.writeFile(file, result, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
});
