import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import CME from "../components/CME"; // Assuming your component file is named CME.js

describe("CME Component", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders loading state initially", async () => {
    render(<CME />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders error state if fetching data fails", async () => {
    mock.onGet().reply(500); // Mocking a server error
    render(<CME />);
    await waitFor(() => {
      expect(screen.getByText("Failed to fetch CME data")).toBeInTheDocument();
    });
  });

  it("renders fetched data properly", async () => {
    const responseData = [
      {
        time21_5: "2023-04-29T03:16Z",
        latitude: 25.0,
        longitude: -15.0,
        halfAngle: 30,
        speed: 550,
        type: "C",
        associatedCMEID: "2023-04-29T03:16Z",
        note: "Some note",
        catalog: "SWRC_CATALOG",
      },
      // Add more sample data as needed
    ];
    mock.onGet().reply(200, responseData);
    render(<CME />);
    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    // Check if data is rendered correctly
    expect(screen.getByText("2023-04-29T03:16Z")).toBeInTheDocument();
    expect(screen.getByText("25.0")).toBeInTheDocument();
    expect(screen.getByText("-15.0")).toBeInTheDocument();
    // Add more assertions for other data fields
  });

  it("updates data when start date is changed", async () => {
    const responseData = [
      {
        time21_5: "2023-04-29T03:16Z",
        latitude: 25.0,
        longitude: -15.0,
        halfAngle: 30,
        speed: 550,
        type: "C",
        associatedCMEID: "2023-04-29T03:16Z",
        note: "Some note",
        catalog: "SWRC_CATALOG",
      },
      // Add more sample data as needed
    ];
    mock.onGet().reply(200, responseData);
    render(<CME />);
    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    // Change start date
    fireEvent.change(screen.getByLabelText("Start Date:"), {
      target: { value: "2023-04-01" },
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });
    
    // Add assertions to check if updated data is rendered correctly
  });

  // Write similar tests for other functionalities like changing end date, handling different scenarios, etc.
});
