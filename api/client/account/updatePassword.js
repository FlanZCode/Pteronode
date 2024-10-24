async function updatePassword(apiKey, baseUrl, currentPassword, newPassword, confirmedPassword) {
    const fullUrl = `${baseUrl}/api/client/account/password/`;
    try {
        const response = await fetch(fullUrl, {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            "body": JSON.stringify({ 
                "current_password": currentPassword,
                "password": newPassword,
                "password_confirmation": confirmedPassword
            })
        });
        if (response.status === 204) {
            return { success: true };
        } else if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`${response.status} ${response.statusText} \n${response.json}`);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { updatePassword };
