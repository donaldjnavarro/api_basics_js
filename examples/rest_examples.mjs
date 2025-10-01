import { RestClient } from "../utils/rest_requests.js";

const client = new RestClient();

/**
 * Example REST request with JSON response
 */
const json_api = "https://jsonplaceholder.typicode.com/posts/1";
try {
    const data = await client.get(json_api);
    console.log("REST response for JSON (data.title):", data.title);
} catch (err) {
    console.error("Error in REST request for JSON response:", err.message);
}

/**
 *  Example REST request with plain text (non-JSON) response
 */
const text_api = "https://httpbin.org/robots.txt";
(async () => {
    try {
        // GET request with explicit responseType = "text"
        // Default is "json", so this shows how to handle non-JSON APIs
        const data = await client.get(text_api, "text");

        // 'data' contains the raw response as a string
        console.log("REST response for text:", data.slice(0, 200));

    } catch (err) {
        // Catch HTTP errors or network issues
        console.error("Error in REST request for text response:", err.message);
    }
})();
