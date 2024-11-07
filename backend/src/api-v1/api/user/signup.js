const bcrypt = require("bcrypt");
const pool = require("../../../db.js");
module.exports = function () {
    let operations = {
        POST
    };

    async function POST(req, res) {
        const { login, password, name } = req.body;
        if (typeof login != 'string' || typeof password != 'string' || typeof name != 'string') res.status(400).json({ error: { error_code: 0, msg: "login, password or name not in body" } });
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await pool.query("INSERT INTO users (login, password, name, privilege) VALUES ($1, $2, $3, 1) RETURNING *", [login, hashedPassword, name]);
            res.status(200).json({ error: null });
        } catch (err) {
            if (err.code === '23505') {
                res.status(400).json({ error: { error_code: 1, msg: "Логин уже использован" } });
            } else {
                res.status(400).json({ error: { error_code: +err.code, msg: "Ошибка при регистрации" } });
            }
        }
    }

    POST.apiDoc = {
        summary: 'Register a new user',
        description: 'Adds a new user to the user database',
        parameters: [],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            login: { type: 'string' },
                            password: { type: 'string' },
                            name: { type: 'string' }
                        }
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Successful login',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object', nullable: true },
                            }
                        },
                        examples: {
                            'Successful login': {
                                value: {
                                    error: null
                                }
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
                            'Login already used': {
                                value: {
                                    error: { error_code: 1, msg: "Логин уже использован" }
                                }
                            },
                            'Error during registration': {
                                value: {
                                    error: { error_code: 12345, msg: "Ошибка при регистрации" }
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