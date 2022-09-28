import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";
import RatingDialog from "./RatingDialog";

const buddyRead = {
    id: 1, 
    createdBy: 1, 
    buddy: 2, 
    status: 'pending'
}


const bookData = {
    title: 'book title'
}

it("renders without crashing", function() {
  render(
    <MemoryRouter>
        <UserProvider>
            <RatingDialog 
                ratingOpen={true}
                bookData={bookData}
                buddyRead={buddyRead}
                rating={2}
            />
        </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <RatingDialog 
                    ratingOpen={true}
                    bookData={bookData}
                    buddyRead={buddyRead}
                    rating={2}
                />
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});


