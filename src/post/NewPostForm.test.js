import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NewPostForm from "./NewPostForm";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <NewPostForm 
            formData={{
                page: 1, 
                message: 'message'
            }}
        />
      </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
