# Documentation Style Reference

## Core Principles
- **Brief over verbose**: Documentation should provide value without cluttering code
- **Trust the reader**: Don't document what's obvious from the code itself
- **Modern conventions**: Follow current TypeScript/JavaScript idioms

## Four-Tier System

### 1. Module-Level Documentation
- **Placement**: After imports
- **Content**: Brief overview of the module's purpose and key responsibilities
- **When**: Every source file gets one

```typescript
import { Something } from "./somewhere";

/**
 * Brief description of what this module does.
 * One or two sentences about key responsibilities or data sources.
 */
```

### 2. Function Documentation (TSDoc)
- **When**: All exported functions
- **Content**: What the function does, parameters, return values
- **Style**: Concise, focus on the contract not implementation

```typescript
/**
 * Retrieves a specific question by its ID.
 * @param id - The unique identifier
 * @returns Promise resolving to the question, or undefined if not found
 */
export async function fetchQuestion(id: number): Promise<Question | undefined> {
    // implementation
}
```

### 3. No Documentation for Obvious Code
- Self-explanatory variable names
- Clear function logic
- Standard patterns (constructors, getters, etc.)
- Types that explain themselves

### 4. Line Comments for Non-Trivial Logic
- **When**: Something is non-obvious or needs explanation of "why"
- **Style**: Short, focused on the reasoning

```typescript
// Normalize to UTC to avoid timezone comparison issues
const normalizedDate = new Date(date.toUTCString());
```

## Test Documentation
- **Default**: No documentation
- **Exception**: Complex test setup, edge cases, or non-obvious assertions
- **Style**: Brief line comment explaining the "why"

```typescript
// Edge case: CSV parser treats empty strings differently than undefined
it("handles empty question text", () => {
```

## Files That Don't Need Documentation
- Entry points (server.ts, app.ts) when trivially simple
- Config files (tsconfig, eslint, prettier, etc.)
- Test setup files that follow standard patterns
