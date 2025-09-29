import fetch from "node-fetch";
import xml2js from "xml2js";

const valA = 2;
const valB = 7;

const url = "http://www.dneonline.com/calculator.asmx";
const soapBody = `<?xml version="1.0" encoding="utf-8"?>
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


console.log(`SOAP API: ${url}`);
console.log(`Sending calculator request to add ${valA} + ${valB}`);

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "text/xml; charset=utf-8",
    "SOAPAction": "http://tempuri.org/Add"
  },
  body: soapBody
})
  .then(res => res.text())
  .then(str => xml2js.parseStringPromise(str, { explicitArray: false, ignoreAttrs: true }))
  .then(result => {
    const sum = result["soap:Envelope"]["soap:Body"]["AddResponse"]["AddResult"];
    console.log(`Response sum: ${sum}`);
  })
  .catch(err => console.error(err));
