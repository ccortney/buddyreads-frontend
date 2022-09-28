import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";
import { NoUserProvider } from "../testUtils";

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <NoUserProvider>
        <LoginForm />
      </NoUserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
