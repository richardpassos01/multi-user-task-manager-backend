const { application } = require('../config');
const app = require('./app');

app.listen(application.port, () => {
    console.log(`Server running on port ${application.port}`);
});
