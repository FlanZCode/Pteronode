async function getAPIKeys(apiKey, baseUrl, identifier) {
    const fullUrl = `${baseUrl}/api/client/account/api-keys/`;
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
        const keyLocation = data.data;
        let foundKey = null;

        if (identifier) {
            foundKey = keyLocation.find(function(key) {
                return key.attributes && key.attributes.identifier === identifier;
            });
            if (!foundKey) {
                throw new Error(`No API key found with identifier: ${identifier}`);
            }
        }

        return {
            key_list: keyLocation,
            identifier: foundKey ? foundKey.attributes.identifier : null,
            description: foundKey ? foundKey.attributes.description : null,
            allowed_ips: foundKey ? foundKey.attributes.allowed_ips : null,
            last_used_at: foundKey ? foundKey.attributes.last_used_at : null,
            created_at: foundKey ? foundKey.attributes.created_at : null
        };
    } catch (error) {
        throw error;
    }
}

module.exports = { getAPIKeys };
