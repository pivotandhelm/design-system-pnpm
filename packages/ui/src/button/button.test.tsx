import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders and handles activation", () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Continue</Button>);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Continue"
      })
    );

    expect(onClick).toHaveBeenCalledOnce();
  });
});
