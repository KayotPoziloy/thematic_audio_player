const { authenticateToken } = require("../../../../middleware/auth.js");
const fs = require('fs');

module.exports = function () {
    let operations = {
        GET: [authenticateToken, GET]
    };

    async function GET(req, res) {
        // https://dev.to/gleidsonleite/symphony-in-bytes-mastering-audio-streaming-with-nodejs-2ipf
        const filename = req.params.filename;
        const filePath = `./music/${filename}`;
        fs.stat(filePath, (err, stats) => {
            if (err) {
                return res.status(404).send({ error: { error_code: 404, msg: 'File not found' } });
            }

            const { range } = req.headers;
            if (!range) {
                const head = {
                    'Content-Length': stats.size,
                    'Content-Type': 'audio/mpeg',
                };
                res.writeHead(200, head);

                const stream = fs.createReadStream(filePath);
                stream.pipe(res);
                stream.on('error', (err) => res.status(500).json({ error: { error_code: 500, msg: err } }));
                return;
            }

            const positions = range.replace(/bytes=/, '').split('-');
            const start = parseInt(positions[0], 10);
            const total = stats.size;
            const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            const chunksize = end - start + 1;

            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${total}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'audio/mpeg',
            });

            const stream = fs.createReadStream(filePath, { start, end });
            stream.pipe(res);
            stream.on('error', (err) => res.status(500).json({ error: { error_code: 501, msg: err } }));
        });
    }

    GET.apiDoc = {
        summary: 'Stream an audio file',
        description: 'Streams an audio file and supports range requests for partial content.',
        parameters: [
            {
                name: 'filename',
                in: 'path',
                required: true,
                schema: {
                    type: 'string'
                }
            }
        ],
        responses: {
            ...authenticateToken.responses,
            200: {
                description: 'Audio file streamed successfully',
                content: {
                    'audio/mpeg': {
                        schema: {
                            type: 'string',
                            format: 'binary'
                        }
                    }
                }
            },
            206: {
                description: 'Partial content streamed successfully',
                content: {
                    'audio/mpeg': {
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
                        },
                        examples: {
                            'File not found': {
                                value: { error: { error_code: 404, msg: 'File not found' } }
                            }
                        }
                    }
                }
            },
            500: {
                description: 'Internal server error',
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
                            'Stream error': {
                                value: { error: { error_code: 500, msg: "err" } }
                            },
                            'Stream error in range': {
                                value: { error: { error_code: 501, msg: "err" } }
                            }
                        }
                    }
                }
            }
        }
    }
    return operations;
}