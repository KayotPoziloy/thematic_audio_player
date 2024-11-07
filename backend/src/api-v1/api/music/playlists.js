const pool = require("../../../db.js");
const { authenticateToken } = require("../../../middleware/auth.js");

module.exports = function () {
    let operations = {
        GET: [authenticateToken, GET]
    };

    async function GET(req, res) {
        const playlists = await pool.query(`SELECT * FROM playlist`);
        res.status(200).json({ error: null, playlists: playlists.rows });
    }

    GET.apiDoc = {
        summary: 'Get all playlists',
        description: 'Retrieves a list of all playlists from the database.',
        responses: {
            ...authenticateToken.responses,
            200: {
                description: 'List of playlists returned successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object', nullable: true },
                                playlists: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            name: { type: 'string' },
                                            tag: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        },
                        examples: {
                            'Successfully get': {
                                value: { "error": null, "playlists": [{ "id": 1, "name": "game 1", "tag": "{}" }] }
                            }
                        }
                    }
                }
            }
        }
    };

    return operations;
}
