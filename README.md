# deno_ieee754

[![tag](https://img.shields.io/github/release/justjavac/deno_ieee754)](https://github.com/justjavac/deno_ieee754/releases)
[![Build Status](https://github.com/justjavac/deno_ieee754/workflows/ci/badge.svg?branch=master)](https://github.com/justjavac/deno_ieee754/actions)
[![license](https://img.shields.io/github/license/justjavac/deno_ieee754)](https://github.com/justjavac/deno_ieee754/blob/master/LICENSE)

Parse IEEE754 floating point numbers for Deno.

## Usage

```ts
import * as ieee754 from "https://deno.land/x/ieee754/mod.ts";
// or
// import read from "https://deno.land/x/ieee754/read.ts";
// import write from "https://deno.land/x/ieee754/write.ts";

const buf: Uint8Array = Uint8Array.of(0x42, 0x29, 0xae, 0x14);
const f64 = ieee754.read(buf, 0, false, 52, 8);
console.log(f64); // 42.42

const EPSILON = 0.00001;
const f32 = ieee754.read(buf, 0, false, 23, 4);
console.log(Math.abs(f32 - 42.42) < EPSILON); // true
```

Use with number array:

```ts
const arr: number[] = [1, 2, 3]; // a number array
const buf = Uint8Array.from(arr); // convert to `Uint8Array`
const num = ieee754.read(buf, 0, false, 23, 4);
```

## APIs

**read**:

```ts
/**
 * Read IEEE754 floating point numbers from a array.
 * @param buffer the buffer
 * @param offset offset into the buffer
 * @param isLE is little endian?
 * @param mLen mantissa length
 * @param nBytes number of bytes
 */
function read(
  buffer: Uint8Array,
  offset: number,
  isLE: boolean,
  mLen: number,
  nBytes: number,
): number;
```

**write**:

```ts
/**
 * Write IEEE754 floating point numbers to a array.
 * @param buffer the buffer
 * @param value value to set
 * @param offset offset into the buffer
 * @param isLE is little endian?
 * @param mLen mantissa length
 * @param nBytes number of bytes
 */
function write(
  buffer: Uint8Array,
  value: number,
  offset: number,
  isLE: boolean,
  mLen: number,
  nBytes: number,
): void;
```

### License

[deno_ieee754](https://github.com/justjavac/deno_ieee754) is released under the
MIT License. See the bundled [LICENSE](./LICENSE) file for details.
