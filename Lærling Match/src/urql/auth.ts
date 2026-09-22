
import {
  type AuthConfig,
  type AuthUtilities,
} from "@urql/exchange-auth";

export type GetAccessToken = () => Promise<string | undefined>;

export type AuthState = {
  token: string;
  expirationDate: Date;
};

const getJwtExpiration = (token: string): Date => {
  try {
    const [, payload = ""] = token.split(".");
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const normalized =
      base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const parsed = JSON.parse(atob(normalized)) as { exp?: number };
    return new Date((parsed.exp ?? 0) * 1000);
  } catch {
    return new Date(0);
  }
};

const getAuthState = async (
  getAccessToken: GetAccessToken
): Promise<AuthState | undefined> => {
  const token = await getAccessToken();
  if (!token) {
    return undefined;
  }

  return {
    token,
    expirationDate: getJwtExpiration(token),
  };
};

export interface CreateAuthConfigOptions {
  getAccessToken: GetAccessToken;
}

export const createAuthConfig =
  ({ getAccessToken }: CreateAuthConfigOptions) =>
  async (utils: AuthUtilities): Promise<AuthConfig> => {
    const state = await getAuthState(getAccessToken);
    if (!state) {
      return {
        addAuthToOperation: (operation) => operation,
        refreshAuth: () => Promise.resolve(),
        didAuthError: () => false,
        willAuthError: () => false,
      };
    }

    return {
      addAuthToOperation(operation) {
        if (!state.token) {
          return operation;
        }

        return utils.appendHeaders(operation, {
          Authorization: `Bearer ${state.token}`,
        });
      },
      refreshAuth: async () => {
        Object.assign(state, await getAuthState(getAccessToken));
      },
      didAuthError(error) {
        return error.graphQLErrors.some(
          (e) => e.extensions?.__typename === "NotAuthenticatedError"
        );
      },
      willAuthError: () => {
        if (!state.token) {
          return true;
        }

        // Assume we're still authenticated if we're not online
        if (!navigator.onLine) {
          return false;
        }

        if (state.expirationDate < new Date()) {
          return true;
        }

        return false;
      },
    };
  };
