import { render } from "@testing-library/react";
import { UserProvider } from "../testUtils";
import { MemoryRouter } from "react-router";
import Progress from "./Progress"

const buddyRead = {
    id: 1, 
    createdBy: 1, 
    buddy: 2, 
    status: 'pending'
}

const buddy = {
    id: 10, 
    firstName: 'first', 
    lastName: 'last'
}

const progress = {
    currentUserProgress: 5, 
    buddyProgress: 10
}

const bookData = {
    pageCount: 100
}

const rating = {
    currentUserRating: 5, 
    buddyRating: 2
}

it("renders without crashing", function() {
    render(
        <MemoryRouter>
            <UserProvider>
                <Progress 
                    buddyRead={buddyRead} 
                    progress={progress} 
                    bookData={bookData}
                    buddy={buddy}
                    rating={rating}
                    />
            </UserProvider>
        </MemoryRouter>
    );
  });

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
        <UserProvider>
            <Progress 
                buddyRead={buddyRead} 
                progress={progress} 
                bookData={bookData}
                buddy={buddy}
                rating={rating}
                />       
            </UserProvider>
    </MemoryRouter>
);;
  expect(asFragment()).toMatchSnapshot();
});