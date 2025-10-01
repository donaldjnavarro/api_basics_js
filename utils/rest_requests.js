import fetch from "node-fetch";

export class RestClient {
    constructor(defaultHeaders = {}) {
        this.defaultHeaders = defaultHeaders;
    }

    // core sender
    async send(url, options = {}, responseType = "json") {
        const res = await fetch(url, {
            ...options,
            headers: { ...this.defaultHeaders, ...options.headers },
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        if (responseType === "json") return res.json();
        if (responseType === "text") return res.text();
        if (responseType === "buffer") return res.arrayBuffer();
        throw new Error(`Unsupported responseType: ${responseType}`);
    }

    // convenience methods
    async get(url, responseType = "json") {
        return this.send(url, { method: "GET" }, responseType);
    }

    async post(url, data, responseType = "json") {
        return this.send(
            url,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            },
            responseType
        );
    }
}
