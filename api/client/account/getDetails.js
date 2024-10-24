async function getDetails(apiKey, baseUrl) {
    const fullUrl = `${baseUrl}/api/client/account/`;
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
        const accountDetails = data.attributes
        return {
            id: accountDetails.id,
            admin: accountDetails.admin,
            username: accountDetails.username,
            email: accountDetails.email,
            first_name: accountDetails.first_name,
            last_name: accountDetails.last_name,
            language: accountDetails.language,
        };
    } catch (error) {
        throw error;
    }
}

module.exports = { getDetails };
