import fetch from "node-fetch";

export async function sendSoapRequest(url, body, soapAction) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
            "SOAPAction": soapAction
        },
        body
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    console.log(`Sending request to Soap API: ${url}`)
    return res.text();
}

export async function sendRestRequest(url, options = {}) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return res.json();
}
