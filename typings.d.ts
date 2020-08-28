export declare function jwt_decode(
  token: string,
  options?: { header?: boolean }
): string;

export declare class InvalidTokenError extends Error {
  constructor(message: string);
}

export declare class InvalidCharacterError extends Error {
  constructor(message: string);
}
