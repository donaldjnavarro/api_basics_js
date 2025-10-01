import { SoapClient } from "../utils/soap_requests.js";
import xml2js from "xml2js";

const client = new SoapClient();

/**
 * Example SOAP request for a POST
 */
const url = "http://www.dneonline.com/calculator.asmx";
try {
  const addOperationXml = `
    <Add xmlns="http://tempuri.org/">
      <intA>5</intA>
      <intB>3</intB>
    </Add>`;

  const responseXml = await client.send(url, addOperationXml, "http://tempuri.org/Add");
  const result = await xml2js.parseStringPromise(responseXml, { explicitArray: false, ignoreAttrs: true });
  console.log("SOAP response (AddResult):", result["soap:Envelope"]["soap:Body"]["AddResponse"]["AddResult"]);
} catch (err) {
  console.error(err.message);
}
