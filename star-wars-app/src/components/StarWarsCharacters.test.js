import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import StarWarsCharacters from "./StarWarsCharacters";
import { getData as mockGetData } from "../api";

jest.mock("../api");

const response = {
  next: "test next",
  previous: "test previous",
  results: [{ name: "luke", url: "test" }]
};

test("renders the star wars data", async () => {
  mockGetData.mockResolvedValueOnce(response);
  const { getByText } = render(<StarWarsCharacters />);

  await wait(() => {
    expect(getByText(/luke/i));
    expect(mockGetData).toHaveBeenCalledTimes(1);
  });
});

test("Next Renders New Data", async () => {
  mockGetData.mockResolvedValue(response);

  const { getByText } = render(<StarWarsCharacters />);
  const nextButton = getByText(/next/i);

  await wait(() => {
    fireEvent.click(nextButton);
    expect(mockGetData).toHaveBeenCalledWith(response.next);
  });
});

test("Previous Renders New Data", async () => {
  mockGetData.mockResolvedValue(response);
  const { getByText } = render(<StarWarsCharacters />);
  const nextButton = getByText(/previous/i);

  await wait(() => {
    fireEvent.click(nextButton);
    expect(mockGetData).toHaveBeenCalledWith(response.previous);
  });
});
