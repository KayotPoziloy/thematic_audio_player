const pool = require("../../../db.js");
const { authenticateToken } = require("../../../middleware/auth.js");

module.exports = function () {
    let operations = {
        GET: [authenticateToken, GET]
    };

    async function GET(req, res) {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id]);
        res.json({ error: null, id: user.rows[0].id, login: user.rows[0].login, name: user.rows[0].name, privilege: user.rows[0].privilege });
    }

    GET.apiDoc = {
        summary: 'Get user information',
        description: 'Returns information about the authenticated user',
        responses: {
            ...authenticateToken.responses,
            200: {
                description: 'User information returned successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object', nullable: true },
                                id: { type: 'integer' },
                                login: { type: 'string' },
                                name: { type: 'string' },
                                privilege: { type: 'integer' }
                            }
                        },
                        examples: {
                            'Admin': {
                                value: { error: null, id: 1, login: 'admin', name: 'admin', privilege: 5 }
                            },
                            'User': {
                                value: { error: null, id: 2, login: 'user', name: 'user', privilege: 4 }
                            }
                        }
                    }
                }
            }
        }
    };

    return operations;
};

