import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";
import { NoUserProvider } from "../testUtils";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
          <NoUserProvider>
            <SignupForm />
          </NoUserProvider>
      </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
