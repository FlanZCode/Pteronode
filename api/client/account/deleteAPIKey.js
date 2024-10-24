async function deleteAPIKey(apiKey, baseUrl, identifier) {
    const fullUrl = `${baseUrl}/api/client/account/api-keys/${identifier}/`;
    try {
        const response = await fetch(fullUrl, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
        });
        if (response.status === 204) {
            return { success: true };
        } else if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { deleteAPIKey };
