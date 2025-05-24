//  We import our helper functions from the react-testing-library
//  The render function allows us to render Components
import {
  getAllByTestId,
  findByText,
  fireEvent,
  queryByText,
  render,
  getByText,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { prettyDOM } from "@testing-library/react";

// We import the component that we are testing
import Application from "../Application";

// afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { queryByText, getByText, findByText } = render(<Application />);

    await findByText("Monday");

    fireEvent.click(getByText("Tuesday"));
    expect(queryByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    //render the application
    const { container, debug } = render(<Application />);

    //wait until name is displayed
    await findByText(container, "Archie Cohen");

    //get first appointment in container
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    //click add
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await findByText(appointment, "Lydia Miller-Jones");

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
});
