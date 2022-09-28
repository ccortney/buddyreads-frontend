import { render } from "@testing-library/react";
import BookModal from "./BookModal";

it("renders without crashing", function() {
  render(<BookModal open={true}/>);
});

it("matches snapshot", function() {
    const { asFragment } = render(<BookModal open={true}/>);
    expect(asFragment()).toMatchSnapshot();
});


