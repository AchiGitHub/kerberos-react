const express = require('express');
const { sso } = require('node-expose-sspi');

const app = express();

app.use(sso.auth());

app.use((req, res) => {
    res.json({
        sso: req.sso.user.displayName
    })
});

app.listen(3002, () => console.log('Server Started on port 3000'))