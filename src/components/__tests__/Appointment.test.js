import {
  render,
  getByText,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getAllByTestId,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react";

import Appointment from "../Appointment";
import Application from "../Application";
import axios from "axios";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await screen.findByText("Archie Cohen");

    // 3. Find the appointment with "Archie Cohen".
    const appointment = getAllByTestId(container, "appointment").find((appt) =>
      queryByText(appt, "Archie Cohen")
    );

    // 4. Click the "Delete" button on that appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 5. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // 6. Click the "Confirm" button on the confirmation dialog.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 7. Check that the "Deleting" indicator is shown.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 8. Wait until the "Add" button appears again.
    await waitFor(() => getByAltText(appointment, "Add"));

    // 9. Check that Monday has "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);

    // 1. Wait for the appointment to be visible.
    await screen.findByText("Archie Cohen");

    // 2. Locate the existing appointment.
    const appointment = getAllByTestId(container, "appointment").find((appt) =>
      queryByText(appt, "Archie Cohen")
    );

    // 3. Click the "Edit" button on the appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Change the name input to "Lydia Miller-Jones".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 5. Click the "Save" button.
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the "Saving" indicator is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Wait until the element with the new name is displayed.
    await screen.findByText("Lydia Miller-Jones");

    // 8. Check that the DayListItem with the text "Monday" still shows "1 spot remaining".
    const day = getAllByTestId(container, "day").find((d) =>
      queryByText(d, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    // 2. Wait for data to load
    await screen.findByText("Archie Cohen");

    // 3. Find the first empty appointment
    const appointment = getAllByTestId(container, "appointment").find((appt) =>
      queryByAltText(appt, "Add")
    );

    // 4. Click the "Add" button
    fireEvent.click(getByAltText(appointment, "Add"));

    // 5. Fill in the form
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click Save
    fireEvent.click(getByText(appointment, "Save"));

    // 7. "Saving" indicator appears
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Wait for error
    await screen.findByText("Could not book appointment."); // Text from Error component

    // 9. Assert error is shown
    expect(
      getByText(appointment, "Could not book appointment.")
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    // 2. Wait for data to load
    await screen.findByText("Archie Cohen");

    // 3. Find the first empty appointment
    const appointment = getAllByTestId(container, "appointment").find((appt) =>
      queryByText(appt, "Archie Cohen")
    );

    // 4. Click the "Delete" button
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 5. Fill in the form
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // 6. Click confirm
    fireEvent.click(getByText(appointment, "Confirm"));

    // 7. "Deleting" indicator appears
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 8. Wait for error
    await screen.findByText("Could not cancel appointment."); // Text from Error component
    

    // 9. Assert error is shown
    expect(
      getByText(appointment, "Could not cancel appointment.")
    ).toBeInTheDocument();
  });
});
