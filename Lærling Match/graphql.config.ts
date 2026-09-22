import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env.local") });

export default {
  schema: process.env.VITE_GRAPH_QL_HTTP_URI ?? "http://localhost:5000/graphql",
  documents: "src/**/*.graphql",
  extensions: {
    codegen: {
      allowPartialOutputs: true,
      schema:
        process.env.VITE_GRAPH_QL_HTTP_URI ?? "http://localhost:5000/graphql",
      documents: "src/**/*.graphql",
      overwrite: true,
      watch: false,
      generates: {
        "src/generated/graphql.tsx": {
          plugins: [
            "typescript",
            "typescript-operations",
            "typescript-urql",
            "typescript-urql-graphcache",
          ],
          config: {
            urqlNext: true,
            immutableTypes: true,
          },
        },
        "src/generated/introspection.tsx": {
          plugins: ["urql-introspection"],
        },
      },
    },
  },
};
