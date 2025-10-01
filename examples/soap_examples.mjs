import { SoapClient } from "../utils/soap_requests.js";
import xml2js from "xml2js";

const client = new SoapClient();
const url = "http://www.dneonline.com/calculator.asmx";

try {
  const responseXml = await client.add(url, 5, 3);
  const result = await xml2js.parseStringPromise(responseXml, { explicitArray: false, ignoreAttrs: true });
  console.log("Sum:", result["soap:Envelope"]["soap:Body"]["AddResponse"]["AddResult"]);
} catch (err) {
  console.error(err.message);
}
