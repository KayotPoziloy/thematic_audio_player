const fs = require('fs');
const path = require('path');

module.exports = function () {
    let operations = {
        GET
    };

    async function GET(req, res) {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../../../files', filename);

        try {
            if (fs.existsSync(filePath)) {
                res.sendFile(filePath);
            } else {
                console.log(filePath);
                return res.status(404).send({ error: { error_code: 404, msg: 'File not found' } });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: { error_code: 500, msg: 'Internal Server Error' } });
        }
    }

    GET.apiDoc = {
        description: 'Retrieve a file by filename',
        parameters: [
            {
                name: 'filename',
                in: 'path',
                required: true,
                description: 'The name of the file to retrieve',
                schema: {
                    type: 'string'
                }
            }
        ],
        responses: {
            200: {
                description: 'File retrieved successfully',
                content: {
                    'image/jpeg': {
                        schema: {
                            type: 'string',
                            format: 'binary'
                        }
                    }
                }
            },
            404: {
                description: 'File not found',
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
                        }
                    }
                }
            },
            500: {
                description: 'Internal Server Error',
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
                        }
                    }
                }
            }
        }
    };

    return operations;
}