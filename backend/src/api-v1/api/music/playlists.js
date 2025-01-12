const pool = require("../../../db.js");
const { adminToken } = require("../../../middleware/auth.js");

module.exports = function () {
    let operations = {
        GET,
        POST: [adminToken, POST],
        PUT: [adminToken, PUT],
        DELETE: [adminToken, DELETE],
    };

    async function GET(req, res) {
        const playlists = await pool.query(`SELECT * FROM playlist`);
        res.status(200).json({ error: null, playlists: playlists.rows });
    }

    async function POST(req, res) {
        const { name, tag } = req.body;
        if (typeof name != 'string' || typeof tag != 'string') res.status(400).json({ error: { error_code: 0, msg: "name or tag not in body" } });

        try {
            JSON.parse(tag);
            await pool.query("INSERT INTO playlist (name, tag) VALUES ($1, $2) RETURNING *", [name, tag]);
            res.status(200).json({ error: null });
        } catch (err) {
            res.status(400).json({ error: { error_code: +err.code, msg: "Error while creating playlist" } });
        }
    }

    async function PUT(req, res) {
        const { id, name, tag } = req.body;

        if (!id || typeof id !== 'number' || (name && typeof name !== 'string') || (tag && typeof tag !== 'string')) {
            return res.status(400).json({ error: { error_code: 0, msg: "Invalid input data" } });
        }
    
        try {
            let updates = [];
            let values = [];
    
            if (name) {
                updates.push(`name = $${updates.length + 1}`);
                values.push(name);
            }
    
            if (tag) {
                JSON.parse(tag);
                updates.push(`tag = $${updates.length + 1}`);
                values.push(tag);
            }
    
            if (updates.length === 0) {
                return res.status(400).json({ error: { error_code: 0, msg: "No fields to update" } });
            }
    
            values.push(id);
            const result = await pool.query(`UPDATE playlist SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`, values);
            
            if (result.rowCount === 0) {
                return res.status(404).json({ error: { error_code: 0, msg: "Playlist not found" } });
            }
    
            res.status(200).json({ error: null, playlist: result.rows[0] });
        } catch (err) {
            res.status(400).json({ error: { error_code: err.code || 1, msg: "Error while update playlist" } });
        }
    }

    async function DELETE(req, res) {
        const { id } = req.body;
    
        if (!id || typeof id !== 'number') {
            return res.status(400).json({ error: { error_code: 0, msg: "Invalid ID" } });
        }
    
        try {
            const result = await pool.query("DELETE FROM playlist WHERE id = $1 RETURNING *", [id]);
    
            if (result.rowCount === 0) {
                return res.status(404).json({ error: { error_code: 0, msg: "Playlist not found" } });
            }
    
            res.status(200).json({ error: null, msg: "Playlist deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: { error_code: err.code || 1, msg: "Ошибка при удалении playlist" } });
        }
    }

    DELETE.apiDoc = {
        summary: 'Delete playlist',
        description: 'Delete playlist by id',
        parameters: [],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' }
                        }
                    }
                }
            }
        },
        responses: {
            ...adminToken.responses,
            200: {
                description: 'Successful delete',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object', nullable: true },
                            }
                        },
                        examples: {
                            'return token': {
                                value: { error: null }
                            }
                        }
                    }
                }
            },
            400: {
                description: 'Invalid credentials',
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
                                value: {
                                    error: { error_code: 0, msg: "Invalid input data" }
                                }
                            },
                            'Playlist error': {
                                value: {
                                     error: { error_code: 0, msg: "Error while update playlist" }
                                }
                            }
                        }
                    }
                }
            }
        }
    };


    PUT.apiDoc = {
        summary: 'Update playlist',
        description: 'Update name or tag playlist',
        parameters: [],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            tag: { type: 'string' }
                        }
                    }
                }
            }
        },
        responses: {
            ...adminToken.responses,
            200: {
                description: 'Successful update',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object', nullable: true },
                            }
                        },
                        examples: {
                            'return token': {
                                value: { error: null }
                            }
                        }
                    }
                }
            },
            400: {
                description: 'Invalid credentials',
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
                            'Id or name or tag not in body': {
                                value: {
                                    error: { error_code: 0, msg: "Invalid input data" }
                                }
                            },
                            'Playlist error': {
                                value: {
                                     error: { error_code: 0, msg: "Error while update playlist" }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    POST.apiDoc = {
        summary: 'Create playlist',
        description: 'Creates an empty playlist',
        parameters: [],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            tag: { type: 'string' }
                        }
                    }
                }
            }
        },
        responses: {
            ...adminToken.responses,
            200: {
                description: 'Successful create',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object', nullable: true },
                            }
                        },
                        examples: {
                            'return token': {
                                value: { error: null }
                            }
                        }
                    }
                }
            },
            400: {
                description: 'Invalid credentials',
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
                            'Name or tag not in body': {
                                value: {
                                    error: { error_code: 0, msg: "name or tag not in body" }
                                }
                            },
                            'Playlist error': {
                                value: {
                                     error: { error_code: 0, msg: "Error while creating playlist" }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    GET.apiDoc = {
        summary: 'Get all playlists',
        description: 'Retrieves a list of all playlists from the database.',
        responses: {
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
