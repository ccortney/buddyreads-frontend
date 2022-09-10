import { render } from "@testing-library/react";
import Result from "./Result";

const bookInfo = {
    id: 1,
    volumeInfo: {
        title: 'title', 
        authors: ['author'], 
        publishedDate: '12/12/1912', 
        pageCount: 300
    }
}

it("renders without crashing", function() {
    render(<Result book = {bookInfo} />);
  });

it("matches snapshot", function () {
  const { asFragment } = render(<Result book = {bookInfo} />);
  expect(asFragment()).toMatchSnapshot();
});
