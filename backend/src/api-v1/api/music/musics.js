const pool = require("../../../db.js");
const { authenticateToken } = require("../../../middleware/auth.js");

module.exports = function () {
    let operations = {
        POST: [authenticateToken, POST]
    };

    async function POST(req, res) {
        const { id } = req.body;
        if (typeof id != 'number') res.status(400).json({ error: { error_code: 0, msg: "id not in body" } });
        const musics = await pool.query(`SELECT * FROM music WHERE playlist_id = $1`, [id]);
        res.status(200).json({ error: null, musics: musics.rows });
    }

    POST.apiDoc = {
        summary: 'Get music tracks from a specific playlist',
        description: 'Retrieves all music tracks associated with a given playlist ID.',
        parameters: [],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' }
                        }
                    }
                }
            }
        },
        responses: {
            ...authenticateToken.responses,
            200: {
                description: 'List of music tracks retrieved successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'null' },
                                musics: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            playlist_id: { type: 'integer' },
                                            name: { type: 'string' },
                                            author: { type: 'string' },
                                            filename: { type: 'string' },
                                            tag: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        },
                        examples: {
                            'Successful post': {
                                value: { "error": null, "musics": [{ "id": 1, "playlist_id": 1, "name": "Седая ночь", "author": "Юрий Шатунов", "filename": "audio.mp3", "tag": "{}" }] }
                            }
                        }
                    }
                }
            },
            400: {
                description: 'Invalid request',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'object',
                                    properties: {
                                        error_code: { type: 'integer' },
                                        msg: { type: 'string' }
                                    }
                                }
                            }
                        },
                        examples: {
                            'Id not in body': {
                                value: { error: { error_code: 0, msg: "id not in body" } }
                            }
                        }
                    }
                }
            }
        }
    }
    return operations;
}