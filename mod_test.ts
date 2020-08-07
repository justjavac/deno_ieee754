import {
  assertEquals,
  assert,
} from "https://deno.land/std@0.63.0/testing/asserts.ts";

import * as ieee754 from "./mod.ts";

const EPSILON: number = 0.00001;

Deno.test("read float", (): void => {
  const val: number = 42.42;
  const buf: Uint8Array = Uint8Array.of(0x42, 0x29, 0xae, 0x14);
  const num = ieee754.read(buf, 0, false, 23, 4);
  assert(Math.abs(num - val) < EPSILON);
});

Deno.test("write float", (): void => {
  const val: number = 42.42;
  const buf: Uint8Array = new Uint8Array(4);
  ieee754.write(buf, val, 0, false, 23, 4);
  assertEquals(Array.from(buf), [0x42, 0x29, 0xae, 0x14]);
});

Deno.test("read double", (): void => {
  const val: number = 42.42;
  const buf: Uint8Array = Uint8Array.of(
    0x40,
    0x45,
    0x35,
    0xC2,
    0x8F,
    0x5C,
    0x28,
    0xF6,
  );
  const num = ieee754.read(buf, 0, false, 52, 8);
  assertEquals(42.42, num);

  assert(Math.abs(num - val) < EPSILON);
});

Deno.test("write double", (): void => {
  const val: number = 42.42;
  const buf: Uint8Array = new Uint8Array(8);
  ieee754.write(buf, val, 0, false, 52, 8);
  assertEquals(
    Array.from(buf),
    [0x40, 0x45, 0x35, 0xC2, 0x8F, 0x5C, 0x28, 0xF6],
  );
});
