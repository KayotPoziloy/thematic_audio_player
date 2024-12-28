const path = require('path');
const multer = require('multer');
const SharpMulter = require("sharp-multer");
const { authenticateToken } = require("../../../middleware/auth.js");

const storage = SharpMulter({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../files'));
    },
    filename: function (originalname, options, req) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(originalname);
        req._filename = `_h${uniqueSuffix}${ext}`;
        return `_h${uniqueSuffix}${ext}`;
    },

    imageOptions: {
        fileFormat: "jpg",
        quality: 80,
        resize: { width: 2048, height: 240 },
    }
});

const upload = multer({ storage });

module.exports = function () {
    let operations = {
        POST: [authenticateToken, upload.single('file'), POST]
    };

    function POST(req, res) {
        console.log(req._filename);
        res.status(200).json({ error: null });
    }

    POST.apiDoc = {
        description: 'Upload a file',
        requestBody: {
            content: {
                'multipart/form-data': {
                    schema: {
                        type: "object",
                        properties: {
                            file: {
                                type: "string",
                                format: "binary"
                            }
                        }
                    }
                }
            }
        },
        responses: {
            ...authenticateToken.responses,
            200: {
                description: 'File uploaded successfully.',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object', nullable: true },
                            }
                        }
                    }
                }
            },
            400: {
                description: 'Bad Request',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object' }
                            }
                        }
                    }
                },
            },
            500: {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'object' }
                            }
                        }
                    }
                }
            }
        }
    };

    return operations;
}