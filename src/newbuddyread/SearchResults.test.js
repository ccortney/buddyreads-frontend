import { render } from "@testing-library/react";
import SearchResults from "./SearchResults";

it("renders without crashing", function() {
    render(<SearchResults />);
  });

it("matches snapshot", function () {
  const { asFragment } = render(<SearchResults />);
  expect(asFragment()).toMatchSnapshot();
});
