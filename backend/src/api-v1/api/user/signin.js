const bcrypt = require("bcrypt");
const pool = require("../../../db.js");
const { createToken } = require("../../../middleware/auth.js");
module.exports = function () {
    let operations = {
        POST
    };

    async function POST(req, res) {
        const { login, password } = req.body;
        if (typeof login != 'string' || typeof password != 'string') res.status(400).json({ error: { error_code: 0, msg: "login or password not in body" } });
        const user = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
        if (user.rows.length > 0) {
            const match = await bcrypt.compare(password, user.rows[0].password);
            if (match) {
                const token = createToken(res, {
                    id: user.rows[0].id,
                    login: user.rows[0].login,
                    privilege: user.rows[0].privilege,
                    timeStart: (+new Date())
                });
                res.status(200).json({ error: null, token });
            } else {
                res.status(400).json({ error: { error_code: 0, msg: "Неверный пароль" } });
            }
        } else {
            res.status(400).json({ error: { error_code: 0, msg: "Пользователь не найден" } });
        }
    }

    POST.apiDoc = {
        summary: 'Sign in a user',
        description: 'Authenticates the user, writes the JWT token to a cookie and returns it.',
        parameters: [],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            login: { type: 'string' },
                            password: { type: 'string' }
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
                                token: { type: 'string' }
                            }
                        },
                        examples: {
                            'return token': {
                                value: { error: null, token: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiJKb2huIEdvbGQiLCJhZG1pbiI6dHJ1ZX0K.LIHjWCBORSWMEibq-tnT8ue_deUqZx1K0XxCOXZRrBI" }
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
                            'User not found': {
                                value: {
                                    error: { error_code: 0, msg: "Пользователь не найден" }
                                }
                            },
                            'Incorrect password': {
                                value: {
                                     error: { error_code: 0, msg: "Неверный пароль" }
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