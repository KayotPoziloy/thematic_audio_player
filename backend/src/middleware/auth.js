const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: { error_code: 2, msg: "Unauthorized" } });
        
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: { error_code: 3, msg: "Forbidden" } });
        req.user = user;
        next();
    });
}

authenticateToken.responses = {
    401: {
        description: 'Unauthorized access',
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
                    'Unauthorized': {
                        value: {
                            error: { error_code: 2, msg: "Unauthorized" }
                        }
                    }
                }
            }
        }
    },
    403: {
        description: 'Forbidden',
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
                    'Forbidden': {
                        value: {
                            error: { error_code: 3, msg: "Forbidden" }
                        }
                    }
                }
            }
        }
    }
};

function adminToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: { error_code: 4, msg: "Unauthorized" } });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: { error_code: 5, msg: "Forbidden" } });
        if (user.privilege < 5) return res.status(403).json({ error: { error_code: 6, msg: "Insufficient rights" } });
        req.user = user;
        next();
    });
}

adminToken.responses = {
    401: {
        description: 'Unauthorized access',
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
                    'Unauthorized': {
                        value: {
                            error: { error_code: 4, msg: "Unauthorized" }
                        }
                    }
                }
            }
        }
    },
    403: {
        description: 'Forbidden',
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
                    'Forbidden': {
                        value: {
                            error: { error_code: 5, msg: "Forbidden" }
                        }
                    },
                    'Insufficient rights': {
                        value: {
                            error: { error_code: 6, msg: "Insufficient rights" }
                        }
                    }
                }
            }
        }
    }
};
function createToken(res, info) {
    res.cookie('token', jwt.sign(info, process.env.JWT_SECRET));
    return jwt.sign(info, process.env.JWT_SECRET);
}
function removeToken(res) {
    res.clearCookie('token');
}


module.exports = { authenticateToken, adminToken, createToken, removeToken };
