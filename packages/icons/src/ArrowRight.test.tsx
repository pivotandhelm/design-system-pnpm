import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArrowRight } from "./ArrowRight";

describe("ArrowRight", () => {
  it("renders an accessible labelled SVG", () => {
    render(<ArrowRight aria-label="Continue" />);

    expect(screen.getByLabelText("Continue").tagName).toBe("svg");
  });
});
