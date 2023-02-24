import { render, screen, cleanup } from "@testing-library/react";
import Pagination from "../Pagination";

afterEach(() => {
    cleanup();
});

test("Pagination should be empty", () => {
    render(<Pagination data={[]} />);
    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("Analyzing Targets");
});

test("Pagination should render values", () => {
    render(<Pagination data={[1, 2, 3]} />);
    const pagination = screen.getByTestId("pagination").childNodes[1];
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("123");
});
