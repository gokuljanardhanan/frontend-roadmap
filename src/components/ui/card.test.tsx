import { render, screen } from "@testing-library/react";
import Card from "./card";

describe("Card Component", () => {
  it("Renders with default variant", () => {
    render(<Card>Click me</Card>);
    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("shadow-md");
  });
});
