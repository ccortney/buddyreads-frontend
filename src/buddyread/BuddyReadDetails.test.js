import { render } from "@testing-library/react";
import BuddyReadDetails from "./BuddyReadDetails";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <BuddyReadDetails />
        </UserProvider>
      </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter initialEntries={["/buddyreads/2"]}>
        <UserProvider>
            <Routes>
                <Route path="/buddyreads/:id" element={<BuddyReadDetails />} />
            </Routes>
        </UserProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});