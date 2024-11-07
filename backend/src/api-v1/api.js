const path = require('path');

module.exports = function () {
    let operations = {
        GET
    };

    async function GET(req, res) {
        res.sendFile(path.join(__dirname, '../api.html'));
    }

    return operations;
};
