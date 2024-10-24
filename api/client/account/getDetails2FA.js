async function getDetails2FA(apiKey, baseUrl) {
    const fullUrl = `${baseUrl}/api/client/account/two-factor/`;
    try {
        const response = await fetch(fullUrl, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            }
        });
        const data = await response.json();
        const imageURL = data.data.image_url_data;
        return imageURL;
    } catch (error) {
        throw error;
    }
}

module.exports = { getDetails2FA };
