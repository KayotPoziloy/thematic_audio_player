const pool = require("../../../db.js");
const { adminToken } = require("../../../middleware/auth.js");

module.exports = function () {
    let operations = {
        POST: [adminToken, POST],
        PUT: [adminToken, PUT],
        DELETE: [adminToken, DELETE],
    };

    async function POST(req, res) {
        const { playlist_id, name, author, filename, tag } = req.body;

        if (!playlist_id || typeof playlist_id !== 'number' || typeof name !== 'string' || typeof author !== 'string' || typeof filename !== 'string' || typeof tag !== 'string') {
            return res.status(400).json({ error: { error_code: 0, msg: "Invalid input data" } });
        }

        try {
            JSON.parse(tag);
            const result = await pool.query("INSERT INTO music (playlist_id, name, author, filename, tag) VALUES ($1, $2, $3, $4, $5) RETURNING *", [playlist_id, name, author, filename, tag]);
            res.status(200).json({ error: null, music: result.rows[0] });
        } catch (err) {
            res.status(400).json({ error: { error_code: err.code || 1, msg: "Error creating music" } });
        }
    }

    async function PUT(req, res) {
        const { id, playlist_id, name, author, filename, tag } = req.body;

        if (!id || typeof id !== 'number' || (playlist_id && typeof playlist_id !== 'number') || (name && typeof name !== 'string') || (author && typeof author !== 'string') || (filename && typeof filename !== 'string') || (tag && typeof tag !== 'string')) {
            return res.status(400).json({ error: { error_code: 0, msg: "Invalid input data" } });
        }

        try {
            let updates = [];
            let values = [];

            if (playlist_id) {
                updates.push(`playlist_id = $${updates.length + 1}`);
                values.push(playlist_id);
            }

            if (name) {
                updates.push(`name = $${updates.length + 1}`);
                values.push(name);
            }

            if (author) {
                updates.push(`author = $${updates.length + 1}`);
                values.push(author);
            }

            if (filename) {
                updates.push(`filename = $${updates.length + 1}`);
                values.push(filename);
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
            const result = await pool.query(`UPDATE music SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`, values);

            if (result.rowCount === 0) {
                return res.status(404).json({ error: { error_code: 0, msg: "Music not found" } });
            }

            res.status(200).json({ error: null, music: result.rows[0] });
        } catch (err) {
            res.status(400).json({ error: { error_code: err.code || 1, msg: "Error updating music" } });
        }
    }

    async function DELETE(req, res) {
        const { id } = req.body;

        if (!id || typeof id !== 'number') {
            return res.status(400).json({ error: { error_code: 0, msg: "Invalid ID" } });
        }

        try {
            const result = await pool.query("DELETE FROM music WHERE id = $1 RETURNING *", [id]);

            if (result.rowCount === 0) {
                return res.status(404).json({ error: { error_code: 0, msg: "Music not found" } });
            }

            res.status(200).json({ error: null, msg: "Music deleted successfully", deletedMusic: result.rows[0] });
        } catch (err) {
            res.status(500).json({ error: { error_code: err.code || 1, msg: "Error deleting music" } });
        }
    }


    DELETE.apiDoc = {
        summary: 'Delete music',
        description: 'Delete music by id',
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
                            'Music error': {
                                value: {
                                     error: { error_code: 0, msg: "Error while update music" }
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
                            playlist_id: { type: 'number' },
                            name: { type: 'string' },
                            author: { type: 'string' },
                            filename: { type: 'string' },
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
                            'Id not in body': {
                                value: {
                                    error: { error_code: 0, msg: "Invalid input data" }
                                }
                            },
                            'Music error': {
                                value: {
                                     error: { error_code: 0, msg: "Error while update music" }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    POST.apiDoc = {
        summary: 'Create music',
        description: 'Creates an empty music',
        parameters: [],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            playlist_id: { type: 'number' },
                            name: { type: 'string' },
                            author: { type: 'string' },
                            filename: { type: 'string' },
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
                            'Music error': {
                                value: {
                                     error: { error_code: 0, msg: "Error while creating music" }
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
