import { render } from "@testing-library/react";
import { UserProvider } from "../testUtils";
import { MemoryRouter } from "react-router";
import Posts from "./Posts";

const buddyRead = {
    id: 1, 
    createdBy: 1, 
    buddy: 2, 
    status: 'pending'
}

it("renders without crashing", function() {
    render(
        <MemoryRouter>
            <UserProvider>
                <Posts buddyRead={buddyRead}/>
            </UserProvider>
        </MemoryRouter>
    );
  });

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
        <UserProvider>
            <Posts buddyRead={buddyRead}/>
        </UserProvider>
    </MemoryRouter>
);;
  expect(asFragment()).toMatchSnapshot();
});