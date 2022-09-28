import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProgressForm from "./ProgressForm"

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <ProgressForm 
            showForm={true}
            formData={{
                page: 1, 
            }}
            formErrors={[]}
        />
      </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
