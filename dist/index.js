const express = require('express');
const app = express();
const { db } = require('./databaseManager');
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
    process.exit(0);
});
process.on('exit', function () {
    db.close(function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});
//# sourceMappingURL=index.js.map