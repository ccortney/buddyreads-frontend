import { render } from "@testing-library/react";
import { UserProvider } from "../testUtils";
import { MemoryRouter } from "react-router";
import Post from "./Post";

const post = {
    id: 1,
    buddyreadId: 1, 
    userId: 1, 
    user: {
        id: 1, 
        firstName: 'First', 
        lastName: 'Last'
    }, 
    page: 1, 
    message: 'message1'
}

const progress = {
    currentUserProgress: 5, 
    buddyProgress: 10
}

it("renders without crashing", function() {
    render(
        <MemoryRouter>
            <UserProvider>
                <Post post={post} progress={progress}/>
            </UserProvider>
        </MemoryRouter>
    );
  });

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
        <UserProvider>
            <Post post={post} progress={progress}/>
        </UserProvider>
    </MemoryRouter>
);;
  expect(asFragment()).toMatchSnapshot();
});