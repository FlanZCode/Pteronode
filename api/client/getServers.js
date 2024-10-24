async function getServers(apiKey, baseUrl) {
    const fullUrl = `${baseUrl}/api/client/`;
    try {
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        const serverNames = data.data.map(server => server.attributes.name);
        return serverNames;
    } catch (error) {
        throw error;
    }
}

module.exports = { getServers };
