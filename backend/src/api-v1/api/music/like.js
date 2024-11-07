const pool = require("../../../db.js");
const { authenticateToken } = require("../../../middleware/auth.js");

module.exports = function () {
    let operations = {
        GET: [authenticateToken, GET],
        PUT: [authenticateToken, PUT],
        DELETE: [authenticateToken, DELETE]
    };

    async function GET(req, res) {
        const likedMusic = await pool.query(` 
            SELECT music.* FROM music 
            JOIN likes ON music.id = likes.music_id 
            WHERE likes.user_id = $1`, [req.user.id]);

        res.status(200).json({ error: null, liked: likedMusic.rows });
    }

    GET.apiDoc = {
        summary: 'Get liked music',
        description: 'Retrieves all music liked by the authenticated user.',
        responses: {
            ...authenticateToken.responses,
            200: {
                description: 'List of liked music returned successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object', nullable: true },
                                liked: {
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
                            'Successful get': {
                                value: {
                                    "error": null,
                                    "playlists": [{ "id": 1, "name": "game 1", "tag": "{}" }]
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    async function PUT(req, res) {
        const { id } = req.body;
        if (typeof id != 'number') res.status(400).json({ error: { error_code: 0, msg: "id not in body" } });
        try {
            await pool.query("INSERT INTO likes (music_id, user_id) VALUES ($1, $2)", [id, req.user.id]);
            res.status(200).json({ error: null });
        } catch (err) {
            if (err.code === '23505') {
                res.status(400).json({ error: { error_code: 1, msg: "Уже есть лайк" } });
            } else {
                res.status(400).json({ error: { error_code: +err.code, msg: "Ошибка" } });
            }
        }
    }

    PUT.apiDoc = {
        summary: 'Like a music track',
        description: 'Adds a like for a specific music track by the authenticated user.',
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
                description: 'Like added successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object', nullable: true },
                            }
                        },
                        examples: {
                            'Successful like': {
                                value: {
                                    error: null
                                }
                            }
                        }
                    }
                }
            },
            400: {
                description: 'Error adding like',
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
                            },
                            'Already got a like': {
                                value: { error: { error_code: 1, msg: "Уже есть лайк" } }
                            },
                            'Error': {
                                value: { error: { error_code: 12345, msg: "Ошибка" } }
                            },
                        }
                    }
                }
            }
        }
    };

    async function DELETE(req, res) {
        const { id } = req.body;
        if (typeof id != 'number') res.status(400).json({ error: { error_code: 0, msg: "id not in body" } });
        await pool.query("DELETE FROM likes WHERE music_id = $1 AND user_id = $2", [id, req.user.id]);
        res.status(200).json({ error: null });
    }

    DELETE.apiDoc = {
        summary: 'Unlike a music track',
        description: 'Removes a like for a specific music track by the authenticated user.',
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
                description: 'Like removed successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object', nullable: true },
                            }
                        },
                        examples: {
                            'Successful unlike': {
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
