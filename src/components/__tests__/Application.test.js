//  We import our helper functions from the react-testing-library
//  The render function allows us to render Components
import { fireEvent, queryByText, render } from "@testing-library/react";

// We import the component that we are testing
import Application from "../Application";

// afterEach(cleanup);

describe("Application", () => {

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { queryByText, getByText,findByText } = render(<Application />);

  await findByText("Monday");

  fireEvent.click(getByText("Tuesday"));
  expect(queryByText("Leopold Silvers")).toBeInTheDocument();
});

})