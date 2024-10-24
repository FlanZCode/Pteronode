const { disable2FA } = require('./api/client/account/disable2FA.js');
const { getDetails2FA } = require('./api/client/account/getDetails2FA.js');
const { getDetails } = require('./api/client/account/getDetails.js');
const { enable2FA } = require('./api/client/account/post2FA.js');
const { getServers } = require('./api/client/getServers.js');
const { updateEmail } = require('./api/client/account/updateEmail.js');
const { updatePassword } = require('./api/client/account/updatePassword.js');
const { getAPIKeys } = require('./api/client/account/getAPIKeys.js');
const { createAPIKey } = require('./api/client/account/createAPIKey.js');
const { deleteAPIKey } = require('./api/client/account/deleteAPIKey.js');

class PteronodeClient {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async getServers() {
        try {
            return await getServers(this.apiKey, this.baseUrl);
        } catch (error) {
            throw error;
        }
    } 

    async account() {
        return {
            getDetails: async () => {
                const details = await getDetails(this.apiKey, this.baseUrl);
                return {
                    getId: () => details.id,
                    isAdmin: () => details.admin,
                    getUsername: () => details.username,
                    getEmail: () => details.email,
                    getFirstName: () => details.first_name,
                    getLastName: () => details.last_name,
                    getLanguage: () => details.language,
                    ...details
                };
            },
            getDetails2FA: async () => {
                return await getDetails2FA(this.apiKey, this.baseUrl);
            },
            enable2FA: async (code) => {
                return await enable2FA(this.apiKey, this.baseUrl, code);
            },
            disable2FA: async (password) => {
                return await disable2FA(this.apiKey, this.baseUrl, password);
            },
            updateEmail: async (email, password) => {
                return await updateEmail(this.apiKey, this.baseUrl, email, password);
            },
            updatePassword: async (currentPassword, newPassword, confirmedPassword) => {
                return await updatePassword(this.apiKey, this.baseUrl, currentPassword, newPassword, confirmedPassword);
            },
            getAPIKeys: async (identifier) => {
                const APIKeys = await getAPIKeys(this.apiKey, this.baseUrl, identifier);
                return {
                    getList: () => APIKeys.key_list,
                    getIdentifier: () => APIKeys.identifier,
                    getDescription: () => APIKeys.description,
                    getAllowedIps: () => APIKeys.allowed_ips,
                    getLastUpdateAt: () => APIKeys.last_update_at,
                    getCreatedAt: () => APIKeys.created_at,
                };
            },
            createAPIKey: async (description, allowedIps) => {
                return await createAPIKey(this.apiKey, this.baseUrl, description, allowedIps);
            },
            deleteAPIKey: async (identifier) => {
                return await deleteAPIKey(this.apiKey, this.baseUrl, identifier);
            }
        };
    }
}

class PteronodeApplication {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
}

module.exports = { PteronodeClient, PteronodeApplication };
