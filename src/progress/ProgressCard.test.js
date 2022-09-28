import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProgressCard from "./ProgressCard"

const buddyRead = {
    id: 1, 
    createdBy: 1, 
    buddy: 2, 
    status: 'pending'
}

const user = {
    id: 10, 
    firstName: 'first', 
    lastName: 'last'
}

const bookData = {
    pageCount: 100
}

it("renders without crashing", function() {
    render(
        <MemoryRouter>
                <ProgressCard 
                    user={user}
                    progress={5}
                    color="secondary.main"
                    percent={100}
                    isCurrentUser={false}
                    rating={2}
                    ratingOpen={false}
                    bookData={bookData}
                    buddyRead={buddyRead}
                    />
        </MemoryRouter>
    );
  });

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
        <ProgressCard 
            user={user}
            progress={5}
            color="secondary.main"
            percent={100}
            isCurrentUser={false}
            rating={2}
            ratingOpen={false}
            bookData={bookData}
            buddyRead={buddyRead}
        />
    </MemoryRouter>
);;
  expect(asFragment()).toMatchSnapshot();
});