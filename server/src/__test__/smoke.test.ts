import { describe, expect, test } from "vitest";

// Sanity check to verify test environment is configured correctly
describe("Test environment", () => {
    test("spins up successfully", () => {
        expect(true).toBe(true);
    });
});
