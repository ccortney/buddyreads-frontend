import { render } from "@testing-library/react";
import { UserProvider } from "../testUtils";
import { MemoryRouter } from "react-router";
import PostList from "./PostList";

const posts = [{
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
}]

const progress = {
    currentUserProgress: 5, 
    buddyProgress: 10
}

it("renders without crashing", function() {
    render(
        <MemoryRouter>
            <UserProvider>
                <PostList posts={posts} progress={progress}/>
            </UserProvider>
        </MemoryRouter>
    );
  });

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
        <UserProvider>
            <PostList posts={posts} progress={progress}/>
        </UserProvider>
    </MemoryRouter>
);;
  expect(asFragment()).toMatchSnapshot();
});