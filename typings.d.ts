interface x5crypt {
  x5u?:        string
  x5c?:        string[]
  x5t?:        string
  'x5t#S256'?: string
}

export interface JWK extends x5crypt {
  // RFC 7517
  kty:      string
  use?:     string
  key_ops?: string[]
  alg?:     string
  kid?:     string

  // more properties by key type
  [key: string]: any
}

export interface JwtHeader extends x5crypt {
  alg:   string
  jku?:  string
  jwk?:  JWK
  kid?:  string
  typ?:  string
  cty?:  string
  crit?: string[]
}

export interface JwtClaims {
  // RFC 7519
  iss?: string
  sub?: string
  aud?: string[]|string
  exp?: number
  nbf?: number
  iat?: number
  jti?: string
}

export declare function jwt_decode(
  token: string,
  options?: { header?: false|undefined }
): JwtClaims;

export declare function jwt_decode(
  token: string,
  options: { header: true }
): JwtHeader;

export declare function jwt_decode<T>(
  token: string,
  options?: { header?: boolean }
): T;


export declare class InvalidTokenError extends Error {
  constructor(message: string);
}

export declare class InvalidCharacterError extends Error {
  constructor(message: string);
}
