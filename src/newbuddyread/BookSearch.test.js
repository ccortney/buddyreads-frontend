import { render } from "@testing-library/react";
import BookSearch from "./BookSearch";

it("matches snapshot", function () {
  const { asFragment } = render(<BookSearch />);
  expect(asFragment()).toMatchSnapshot();
});
