import { Category } from "@shared/constants/constants";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

import HomePage from "./HomePage";

jest.mock("src/hooks/useQuestionsApi", () => ({
    useRandomQuestion: () => ({
        question: null,
        isLoading: false,
        error: null,
        refresh: jest.fn(),
    }),
}));

describe("HomePage Integration", () => {
    test("pressing a grid item updates the appropriate toggle state", async () => {
        const { UNSAFE_root } = render(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText(Category.PHILOSOPHY)).toBeTruthy();
        });

        const homePage = UNSAFE_root.children[0];
        const togglesBefore = homePage.props.children[3].props.toggles;

        expect(togglesBefore[Category.PHILOSOPHY]).toBe(true);

        const philosophyButton = screen.getByText(Category.PHILOSOPHY);

        fireEvent.press(philosophyButton);

        const togglesAfter = homePage.props.children[3].props.toggles;
        expect(togglesAfter[Category.PHILOSOPHY]).toBe(false);
    });
});
