import { render } from "@testing-library/react";
import Like from "./Like";
import { UserProvider } from "../testUtils";
import { MemoryRouter } from "react-router";

const post = {
    id: 1,
    buddyreadId: 1, 
    userId: 1, 
    page: 1, 
    message: 'message1'
}

it("renders without crashing", function() {
    render(
        <MemoryRouter>
            <UserProvider>
                <Like post={post}/>
            </UserProvider>
        </MemoryRouter>
    );
  });

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
        <UserProvider>
            <Like post={post}/>
        </UserProvider>
    </MemoryRouter>
);;
  expect(asFragment()).toMatchSnapshot();
});
