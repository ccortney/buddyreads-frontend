import { render } from "@testing-library/react";
import BuddyReadForm from "./BuddyReadForm";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <BuddyReadForm 
            formData={{
                buddy: "buddy@email.com"
            }}
        />
      </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
