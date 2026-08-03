import { describe, expect, it } from "vitest";
import * as tokens from "./generated/tokens.js";

describe("generated tokens", () => {
  it("exports at least one token", () => {
    expect(Object.keys(tokens).length).toBeGreaterThan(0);
  });
});