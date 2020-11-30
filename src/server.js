const { PORT } = require('./common/config');
const app = require('./app');
const runDb = require('./common/db');

runDb(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
