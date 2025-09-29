import { sendSoapRequest } from "../../utils/request.js";
import fetch from "node-fetch";
import xml2js from "xml2js";

const valA = 2;
const valB = 7;

const url = "http://www.dneonline.com/calculator.asmx";
const body = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Add xmlns="http://tempuri.org/">
      <intA>${valA}</intA>
      <intB>${valB}</intB>
    </Add>
  </soap:Body>
</soap:Envelope>`;

console.log(`Sending calculator request to add ${valA} + ${valB}`);
const response = await sendSoapRequest(url, body, "http://tempuri.org/Add");
const result = await xml2js.parseStringPromise(response, { explicitArray: false, ignoreAttrs: true });
console.log("Response sum:", result["soap:Envelope"]["soap:Body"]["AddResponse"]["AddResult"]);
