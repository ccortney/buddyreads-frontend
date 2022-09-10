import { render } from "@testing-library/react";
import ErrorAlert from "./ErrorAlert";

it("renders without crashing", function() {
  render(<ErrorAlert />);
});

it("matches snapshot for error", function() {
    let severity = 'error'
    let messages = ["Everything is broken", "Run for the hills"];
    const { asFragment } = render(<ErrorAlert severity={severity} messages={messages} />);
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot for success", function() {
    let severity = 'success'
    let messages = ["Everything is awesome!"];
    const { asFragment } = render(<ErrorAlert severity={severity} messages={messages} />);
    expect(asFragment()).toMatchSnapshot();
});
