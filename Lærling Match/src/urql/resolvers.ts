import type { ResolveInfo } from "@urql/exchange-graphcache";
import { serializeId } from "../utils/ids";
import { getWebBrowserLocale } from "../utils/locale";
import type { Locale } from "../utils/locale";
import { roundTo } from "../utils/number";

// This is needed as a workaround for the introspection thinking that the
// resolver is a function that returns input and output, but it should
// really just be a function that returns output.
// TODO: look into this
interface FakeOutput {
  input: any;
  output: any;
}

export const toDate = (
  parent: any,
  _args: any,
  _cache: any,
  info: ResolveInfo
): FakeOutput => new Date(parent[info.fieldName]) as unknown as FakeOutput;

export const toDecimals =
  (decimals: number) =>
  (parent: any, _args: any, _cache: any, info: ResolveInfo): FakeOutput =>
    roundTo(parent[info.fieldName], decimals) as unknown as FakeOutput;

export const resolveById = <T extends string>(
  apiType: T,
  id: string | number
) => ({
  __typename: apiType,
  id: typeof id === "string" ? id : serializeId(apiType, id),
});

export const idToOutput = <T extends string>(apiType: T, id: string | number) =>
  typeof id === "number" ? serializeId(apiType, id) : id;

export const idsToOutput = <T extends string>(
  apiType: T,
  ids: string | number | Readonly<Array<string | number>>
) =>
  Array.isArray(ids)
    ? (ids as Readonly<Array<string | number>>).map((id) =>
        idToOutput(apiType, id)
      )
    : [idToOutput(apiType, ids as string | number)];

export const getLocale = (): Locale => {
  const serializedSettings = localStorage.getItem("user-interface-settings");
  if (serializedSettings) {
    const settings = JSON.parse(serializedSettings);
    if (settings.locale) {
      return settings.locale;
    }
  }

  return getWebBrowserLocale();
};
