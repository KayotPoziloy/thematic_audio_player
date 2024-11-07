const { authenticateToken, removeToken } = require("../../../middleware/auth.js");
module.exports = function () {
    let operations = {
        GET: [authenticateToken, GET]
    };

    async function GET(req, res) {
        removeToken(res);
        res.status(200).json({ error: null });
    }

    GET.apiDoc = {
        summary: 'Logout a user',
        description: 'Removes token from cookie',
        parameters: [],
        responses: {
            ...authenticateToken.responses,
            200: {
                description: 'Successful logout',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object', nullable: true },
                            }
                        },
                        examples: {
                            'Successful logout': {
                                value: {
                                    error: null
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    return operations;
}