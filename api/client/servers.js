async function getServers(apiKey, baseUrl) {
    const fullUrl = `${baseUrl}/api/client/`;
    try {
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`
            }
        });
        const data = await response.json();
        const serverNames = data.data.map(server => server.attributes.name);
        return serverNames;
    } catch (error) {
        throw error;
    }
}

async function Server(apiKey, baseUrl, name) {
    const fullUrl = `${baseUrl}/api/client/`;
    try {
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`
            }
        });
        const data = await response.json();
        const foundServer = data.data.find(server => server.attributes.name === name);
        if (!foundServer) {
            throw new Error(`Server with name "${name}" not found`);
        }
        return {
            ...foundServer,
            getObject() {
                return foundServer.object || null;
            },
            getAttributes() {
                return foundServer.attributes || null;
            },
            isServerOwner() {
                return foundServer.attributes.server_owner;
            },
            getIdentifier() {
                return foundServer.attributes.identifier || null;
            },
            getInternalId() {
                return foundServer.attributes.internal_id || null;
            },
            getUUID() {
                return foundServer.attributes.uuid || null;
            },
            getName() {
                return foundServer.attributes.name || null;
            },
            getNode() {
                return foundServer.attributes.node || null;
            },
            isNodeUnderMaintenance() {
                return foundServer.attributes.is_node_under_maintenance;
            },
            getSftpDetails() {
                return foundServer.attributes.sftp_details || null;
            },
            getSftpIp() {
                return foundServer.attributes.sftp_details.ip || null;
            },
            getSftpPort() {
                return foundServer.attributes.sftp_details.port || null;
            },
            getDescription() {
                return foundServer.attributes.description || null;
            },
            getLimits() {
                return foundServer.attributes.limits || null;
            },
            getLimitMemory() {
                if(foundServer.attributes.limits.memory === 0) {
                    return "Unlimited";
                }
                return foundServer.attributes.limits.memory || null;
            },
            getLimitSwap() {
                if(foundServer.attributes.limits.swap === 0) {
                    return "Disabled"
                }
                if(foundServer.attributes.limits.swap === -1) {
                    return "Unlimited"
                }
                return foundServer.attributes.limits.swap || null;
            },
            getLimitDisk() {
                if(foundServer.attributes.limits.disk === 0) {
                    return "Unlimited"
                }
                return foundServer.attributes.limits.disk || null;
            },
            getLimitIo() {
                return foundServer.attributes.limits.io || null;
            },
            getLimitCpu() {
                if(foundServer.attributes.limits.cpu === 0) {
                    return "Unlimited"
                }
                return foundServer.attributes.limits.cpu || null;
            },
            getThreads() {
                if(foundServer.attributes.limits.threads === null) {
                    return "All threads"
                }
                return foundServer.attributes.limits.threads;
            },
            isOomDisabled() {
                return foundServer.attributes.limits.oom_disabled;
            },
        };
    } catch (error) {
        throw error;
    }
}

module.exports = { getServers, Server };
