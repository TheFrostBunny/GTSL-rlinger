/**
 * These configurations are set in the server by replacing the keys defined
 * in index.html, which are exposed to the global Window object. The
 * replacements should ONLY be made in the index.html file, as they are used
 * here to define defaults for other environments (such as local development).
 */

interface ServerConfig {
  appName: string;
  contactEmail?: string;
  contactPhone?: string;
  environment: string;
  graphQlHttpUri: string;
  graphQlWsUri: string;
  auth0Domain: string;
  auth0ClientId: string;
  auth0Audience: string;
  oldAppUrl: string;
  oldAppName: string;
  muiXPremiumLicenseKey: string;
}

// Define types for the global Window object
interface CustomWindow extends Window {
  serverConfig: ServerConfig;
}

// The configuration before replacements which reflects the replacement values
// in index.html
const preReplaceConfig: ServerConfig = {
  appName: "__APP_NAME__",
  contactEmail: "__CONTACT_EMAIL__",
  contactPhone: "__CONTACT_PHONE__",
  environment: "__ENVIRONMENT__",
  graphQlHttpUri: "__GRAPH_QL_HTTP_URI__",
  graphQlWsUri: "__GRAPH_QL_WS_URI__",
  auth0Domain: "__AUTH0_DOMAIN__",
  auth0ClientId: "__AUTH0_CLIENT_ID__",
  auth0Audience: "__AUTH0_AUDIENCE__",
  oldAppUrl: "__OLD_APP_URL__",
  oldAppName: "__OLD_APP_NAME__",
  muiXPremiumLicenseKey: "__MUI_X_PREMIUM_LICENSE_KEY__",
};

// The default configuration for local development
const defaultConfig: ServerConfig = {
  appName: import.meta.env.VITE_NAME ?? "Norseye",
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? undefined,
  contactPhone: import.meta.env.VITE_CONTACT_PHONE ?? undefined,
  environment:
    import.meta.env.VITE_ENVIRONMENT ??
    (import.meta.env.PROD ? "production" : "development"),
  graphQlHttpUri:
    import.meta.env.VITE_GRAPH_QL_HTTP_URI ?? "http://localhost:5000/graphql",
  graphQlWsUri:
    import.meta.env.VITE_GRAPH_QL_WS_URI ?? "ws://localhost:5000/graphql",
  auth0Domain: import.meta.env.VITE_AUTH0_DOMAIN ?? "__MISSING__",
  auth0ClientId: import.meta.env.VITE_AUTH0_CLIENT_ID ?? "__MISSING__",
  auth0Audience: import.meta.env.VITE_AUTH0_AUDIENCE ?? "__MISSING__",
  oldAppUrl: import.meta.env.VITE_OLD_APP_URL ?? "https://app.sealog.no",
  oldAppName: import.meta.env.VITE_OLD_APP_NAME ?? "Sealog",
  muiXPremiumLicenseKey:
    import.meta.env.VITE_MUI_X_PREMIUM_LICENSE_KEY ?? "__MISSING__",
};

// Assume the global window object is of this new type
declare const window: CustomWindow;

// Load the global configuration
export const serverConfig = window.serverConfig;

const assignConfig = <T extends keyof ServerConfig>(key: T) => {
  if (serverConfig[key] === preReplaceConfig[key]) {
    serverConfig[key] = defaultConfig[key];
  }

  if (serverConfig[key] === "__MISSING__") {
    throw new Error(`The configuration key ${key} is missing.`);
  }
};

// Apply default values for replacements that have not been set
for (const key of Object.keys(serverConfig) as Array<keyof ServerConfig>) {
  assignConfig(key);
}
