import { render, screen, cleanup } from "@testing-library/react";
import DetailPage from "../../pages/DetailPage";

afterEach(() => {
    cleanup();
});

test("Detail page should render back button", () => {
    render(<DetailPage />);
    const detailPage = screen.getByTestId("detail-page");
    expect(detailPage).toHaveTextContent("< back");
});

test("Detail page should not render currrent-url", () => {
    render(<DetailPage />);
    const detailPage = screen.getByTestId("current-url");
    expect(detailPage).toBeInTheDocument();
    expect(detailPage).toHaveTextContent("");
});

test("Detail page should render pages", () => {
    render(<DetailPage />);
    const detailPage = screen.getByTestId("pages");
    expect(detailPage).toBeInTheDocument();
    expect(detailPage).toHaveTextContent("");
});

test("Detail page should render technologies", () => {
    render(<DetailPage />);
    const detailPage = screen.getByTestId("technologies");
    expect(detailPage).toBeInTheDocument();
    expect(detailPage).toHaveTextContent("");
});

