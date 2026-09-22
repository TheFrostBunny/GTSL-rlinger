import {
  decode as base64Decode,
  encode as base64Encode,
} from "base64-arraybuffer";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export const serializeId = (apiType: string, id: string | number): string =>
  base64Encode(textEncoder.encode(`${apiType}\ni${id}`).buffer as ArrayBuffer);

export const deserializeId = (encodedId: string) => {
  const decodedId = textDecoder.decode(base64Decode(encodedId));

  const [apiType, id] = decodedId.split("\ni");
  return { apiType, id };
};

export const isId = (encodedId: string) => {
  const decodedId = textDecoder.decode(base64Decode(encodedId));

  return decodedId.includes("\ni");
};
