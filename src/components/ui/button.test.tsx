import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./button";

describe("Button Component", () => {
  it("renders button with default variant", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
  });

  it("renders button with outline variant", () => {
    render(<Button variant="outline">Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-input");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("renders disabled button", () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });
});
