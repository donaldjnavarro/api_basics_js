import fetch from "node-fetch";

export class SoapClient {
    // core sender
    async send(url, body, soapAction) {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "text/xml; charset=utf-8", SOAPAction: soapAction },
            body,
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.text();
    }

    // convenience method example: Add two numbers
    async add(url, intA, intB) {
        const body = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Add xmlns="http://tempuri.org/">
      <intA>${intA}</intA>
      <intB>${intB}</intB>
    </Add>
  </soap:Body>
</soap:Envelope>`;
        return this.send(url, body, "http://tempuri.org/Add");
    }
}
