import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";
import InviteList from "./InviteList"


it("renders without crashing", function() {
  render(   
      <MemoryRouter>
        <UserProvider>
            <InviteList 
            pendingBuddyReads={[{
                id: 1, 
                bookId: "bookid1", 
                bookTitle: "bookTitle1", 
                createdBy: 1, 
                buddy: 2, 
                status: 'pending'
            }]} 
            buddyReadInvites={[{
                id: 2, 
                bookId: "bookid2", 
                bookTitle: "bookTitle2", 
                createdBy: 2, 
                buddy: 1, 
                status: 'pending'
            }]} 
            />
        </UserProvider>
      </MemoryRouter>     
  );
});