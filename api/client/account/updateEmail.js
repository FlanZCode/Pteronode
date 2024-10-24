async function updateEmail(apiKey, baseUrl, email, password) {
    const fullUrl = `${baseUrl}/api/client/account/email/`;
    try {
        const response = await fetch(fullUrl, {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            "body": JSON.stringify({ 
                "email": email,
                "password": password
            })
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

module.exports = { updateEmail };
