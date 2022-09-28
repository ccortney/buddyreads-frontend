import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NewPost from "./NewPost";

const formData = {
    page: 1, 
    message: 'message1'
}

const formErrors = []

it("renders without crashing", function() {
    render(
        <MemoryRouter>
            <NewPost formErrors={formErrors} formData={formData}/>
        </MemoryRouter>
    );
  });

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
        <NewPost formErrors={formErrors} formData={formData}/>
    </MemoryRouter>
);;
  expect(asFragment()).toMatchSnapshot();
});