const { getServers, Server } = require('./api/client/servers.js');

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

    async server(name) {
        try {
            return await Server(this.apiKey, this.baseUrl, name);
        } catch (error) {
            throw error;
        }
    }
}

class PteronodeApplication {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
}

module.exports = { PteronodeClient, PteronodeApplication };
