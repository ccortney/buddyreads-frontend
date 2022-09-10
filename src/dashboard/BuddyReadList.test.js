import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";
import BuddyReadList from "./BuddyReadList";

it("renders without crashing", function() {
  render(   
      <MemoryRouter>
        <UserProvider>
            <BuddyReadList 
            buddyReadList={[{
                id: 1, 
                bookId: "bookid1", 
                bookTitle: "bookTitle1", 
                createdBy: 1, 
                buddy: 2, 
                status: 'completed'
            }]} 
            type="completed"
            />
        </UserProvider>
      </MemoryRouter>     
  );
});