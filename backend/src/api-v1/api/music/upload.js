const path = require('path');
const multer = require('multer');
const { adminToken } = require("../../../middleware/auth.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../music'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const base = path.basename(file.originalname, path.extname(file.originalname));
        const ext = path.extname(file.originalname);
        if (file.fieldname != 'file')
            return cb('fieldname != file');
        req.saved_filename = `_m ${ base } - ${ uniqueSuffix }${ ext }`;
        cb(null, req.saved_filename);
    }
});

const upload = multer({ storage });

module.exports = function () {
    let operations = {
        POST: [adminToken, upload.single('file'), POST]
    };

    function POST(req, res) {
        res.status(200).json({ error: null, filename: req.saved_filename });
    }

    POST.apiDoc = {
        description: 'Upload a music',
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
            ...adminToken.responses,
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
                                error: { type: 'string' }
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