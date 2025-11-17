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
};

export default API_ENDPOINTS;
