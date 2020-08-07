// Copyright 2020 justjavac. All rights reserved. MIT license.
// Copyright 2008 Fair Oaks Labs, Inc. All Rights Reserved. BSD-3-Clauselicense.

/**
 * Read IEEE754 floating point numbers from a array.
 * @param buffer the buffer
 * @param offset offset into the buffer
 * @param isLE is little endian?
 * @param mLen mantissa length
 * @param nBytes number of bytes
 */
export default function read(
  buffer: Uint8Array,
  offset: number,
  isLE: boolean,
  mLen: number,
  nBytes: number,
): number {
  let e: number;
  let m: number;
  const eLen: number = nBytes * 8 - mLen - 1;
  const eMax: number = (1 << eLen) - 1;
  const eBias: number = eMax >> 1;
  let nBits: number = -7;
  let i: number = isLE ? nBytes - 1 : 0;
  const d: number = isLE ? -1 : 1;
  let s: number = buffer[offset + i];

  i += d;

  e = s & ((1 << -nBits) - 1);
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << -nBits) - 1);
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
}
