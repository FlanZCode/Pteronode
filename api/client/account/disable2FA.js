async function disable2FA(apiKey, baseUrl, password) {
    const fullUrl = `${baseUrl}/api/client/account/two-factor/`;
    try {
        const response = await fetch(fullUrl, {
            "method": "DELETE",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            "body": JSON.stringify({ "password": password })
        });
        if (response.status === 204) {
            return { success: true };
        } else if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { disable2FA };
