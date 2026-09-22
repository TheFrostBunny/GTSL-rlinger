import {
  makeDefaultStorage,
  type DefaultStorage,
} from "@urql/exchange-graphcache/default-storage";
import {
  Client,
  CombinedError,
  errorExchange,
  fetchExchange,
  subscriptionExchange,
} from "urql";
import { authExchange } from "@urql/exchange-auth";
import { createClient as createWSClient } from "graphql-ws";
import { serverConfig } from "../serverConfig";
import type { SerializedEntries } from "@urql/exchange-graphcache";
import { createAuthConfig, type GetAccessToken } from "./auth";

const { writeData, ...storageMethods } = makeDefaultStorage({
  idbName: "sealog",
  maxAge: 14,
});

const excludedTypenames = [
  "ResourceControlLog",
  "AisLog",
  "SeaAreaEvent",
  "SeaAreaLog",
];
const excludedQueries = [
  "resourceControlLogs",
  "seaAreaEvents",
  "seaAreaStatisticsByMmsis",
];

// Override the write method so that we can exclude certain fields from being
// written to the cache
const storage: DefaultStorage = {
  writeData: async (delta: SerializedEntries) => {
    const filteredDelta: SerializedEntries = {};
    for (const [key, value] of Object.entries(delta)) {
      // Filter excluded typenames
      const typename = key.split(":")[0];
      if (!typename || excludedTypenames.includes(typename)) {
        continue;
      }

      // Filter excluded queries
      const query = key.match(/Query(?:\.|%2e)(\w+)\(?/)?.[1];
      if (query && excludedQueries.includes(query)) {
        continue;
      }

      filteredDelta[key] = value;
    }

    return writeData(filteredDelta);
  },
  ...storageMethods,
};

export const getStorageSize = async () => {
  const data = await storage.readData();
  // Return the size in approximation based on JSON string length
  return JSON.stringify(data).length - 2;
};

export const clearStorage = async () => {
  try {
    await storage.clear();
  } catch (e) {
    console.log("Cannot clear storage");
    console.error(e);
  }
};

interface CreateClientOptions {
  onError?: (error: CombinedError) => void;
  getAccessToken: GetAccessToken;
}

export const createClient = async ({
  onError,
  getAccessToken,
}: CreateClientOptions) => {
  const wsClient = createWSClient({
    url: serverConfig.graphQlWsUri,
    connectionParams: async () => {
      const token = await getAccessToken();
      if (!token) {
        return {};
      }

      return {
        Authorization: `Bearer ${token}`,
      };
    },
  });

  return new Client({
    url: serverConfig.graphQlHttpUri,
    requestPolicy: "cache-and-network",
    fetchOptions: {
      headers: {
        "GraphQL-preflight": "1",
      },
    },
    exchanges: [
      authExchange(createAuthConfig({ getAccessToken })),
      subscriptionExchange({
        forwardSubscription: (request) => {
          const input = { ...request, query: request.query || "" };
          return {
            subscribe: (sink) => ({
              unsubscribe: wsClient.subscribe(input, sink),
            }),
          };
        },
      }),
      errorExchange({
        onError(error) {
          onError?.(error);
        },
      }),
      fetchExchange,
    ],
  });
};
