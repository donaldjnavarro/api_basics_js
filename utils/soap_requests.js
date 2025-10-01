import fetch from "node-fetch";

export class SoapClient {
  // Generic envelope wrapper
  wrapBody(innerXml) {
    return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    ${innerXml}
  </soap:Body>
</soap:Envelope>`;
  }

  // Core sender
  async send(url, innerXml, soapAction) {
    const body = this.wrapBody(innerXml); // wrap generic envelope automatically
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/xml; charset=utf-8", SOAPAction: soapAction },
      body,
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return res.text();
  }
}
