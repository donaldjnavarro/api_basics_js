import { RestClient } from "../utils/rest_requests.js";

const client = new RestClient();
const url = "https://jsonplaceholder.typicode.com/posts/1";

try {
    const data = await client.get(url);
    console.log("Post title:", data.title);
} catch (err) {
    console.error(err.message);
}
