const API_ENDPOINTS = {
    QUESTIONS: {
        RANDOM: "/api/questions/random",
        RANDOM_CATEGORIZED: (categoryIds: number[]) =>
            `/api/questions/random-categorized?categoryIds=${categoryIds.join(",")}`,
        RANDOM_CATEGORIZED_TEMPLATE: "/api/questions/random-categorized",
        BY_ID: (id: number) => `/api/questions/${id}`,
        BY_ID_TEMPLATE: "/api/questions/:id",
        ALL: "/api/questions",
    },
    GENERATION: {
        SIMILAR: (id: number) => `/api/generation/similar/${id}`,
        SIMILAR_TEMPLATE: "/api/generation/similar/:id",
        FOLLOWUP: (id: number) => `/api/generation/followup/${id}`,
        FOLLOWUP_TEMPLATE: "/api/generation/followup/:id",
    },
};

export default API_ENDPOINTS;
