import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginPage } from "./login";
describe("Login Page", () => {
  it("should reder with required fields", () => {
    render(<LoginPage />);
    //getBy -> throws an error
    //queryBy -> returns null
    //findBy -> Async
    expect(screen.getByText(/Sign in/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Remember me" })
    ).toBeInTheDocument();
    expect(screen.getByText("Forgot password")).toBeInTheDocument();
  });
});
