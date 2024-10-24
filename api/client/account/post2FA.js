async function enable2FA(apiKey, baseUrl, code) {
    const fullUrl = `${baseUrl}/api/client/account/two-factor/`;
    try {
        const response = await fetch(fullUrl, {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            "body": JSON.stringify({ "code": code })
        });
        if (response.ok) {
            const data = await response.json();
            const tokens = data.attributes.tokens;
            return tokens;
        } else {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { enable2FA };
