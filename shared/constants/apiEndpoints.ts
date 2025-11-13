const API_ENDPOINTS = {
    QUESTIONS: {
        RANDOM: "/api/questions/random",
        BY_ID_TEMPLATE: "/api/questions/:id",
        BY_ID: (id: number) => `/api/questions/${id}`,
        ALL: "/api/questions",
    },
};

export default API_ENDPOINTS;
