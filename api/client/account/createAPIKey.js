async function createAPIKey(apiKey, baseUrl, description, allowedIps) {
    const fullUrl = `${baseUrl}/api/client/account/api-keys/`;
    try {
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "description": description,
                "allowed_ips": allowedIps
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = { createAPIKey };
