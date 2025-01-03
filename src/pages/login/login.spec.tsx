import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginPage } from "./Login";
describe("Login Page", () => {
  it("should reder with required fields", () => {
    render(<LoginPage />);
    //getBy -> throws an error
    //queryBy -> returns null
    //findBy -> Async
    expect(screen.getByText(/Sign in /));
  });
});
