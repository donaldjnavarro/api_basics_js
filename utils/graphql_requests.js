import { RestClient } from "./rest_requests.js";

export class GraphQLClient {
    constructor(url) {
        this.url = url;
        this.rest = new RestClient({ "Content-Type": "application/json" });
    }

    async query(query, variables = {}) {
        return this.rest.post(this.url, { query, variables });
    }
}
