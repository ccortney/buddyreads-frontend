import { render } from "@testing-library/react";
import DashBoard from "./Dashboard";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";


it("renders without crashing", function() {
  render(   
      <MemoryRouter>
        <UserProvider>
            <DashBoard />
        </UserProvider>
      </MemoryRouter>     
  );
});

it("matches snapshot with no buddy reads", function() {
  const { asFragment } = render(      
    <MemoryRouter>
        <UserProvider>
            <DashBoard />
        </UserProvider>
    </MemoryRouter>    );
  expect(asFragment()).toMatchSnapshot();
});
