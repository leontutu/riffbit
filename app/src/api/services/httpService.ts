import httpClient from "../clients/httpClient";

/**
 * Service layer for questions API.
 * Provides a boundary where business logic, caching, or transformations could live.
 * Has little value at the moment but doesn't have any real maintenance cost so far either.
 */

const httpService = {
    questions: httpClient.questions,
    generation: httpClient.generation,
};

export default httpService;
