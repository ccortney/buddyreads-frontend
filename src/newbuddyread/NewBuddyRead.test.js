import { render } from "@testing-library/react";
import NewBuddyRead from "./NewBuddyRead";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <NewBuddyRead />
        </UserProvider>
      </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter initialEntries={["/buddyreads/new"]}>
        <UserProvider>
            <Routes>
                <Route path="/buddyreads/new" element={<NewBuddyRead />} />
            </Routes>
        </UserProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});