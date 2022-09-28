import { render } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";


it("renders without crashing", function() {
  render(   
      <MemoryRouter>
        <UserProvider>
            <Sidebar />
        </UserProvider>
      </MemoryRouter>     
  );
});