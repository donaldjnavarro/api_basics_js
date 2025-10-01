import { GraphQLClient } from "../utils/graphql_requests.js";

const client = new GraphQLClient("https://countries.trevorblades.com/");
const query = `
  query ($code: ID!) {
    country(code: $code) {
      name
      capital
      currency
    }
  }
`;

try {
  const response = await client.query(query, { code: "US" });
  console.log("GraphQL response response.data.country:", response.data.country);
} catch (err) {
  console.error(err.message);
}
