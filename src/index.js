const express = require('express');
const db = require('./db');

db.raw('select 1 + 1')
  .then(_ => console.log('Database running'))
  .catch(err => {
    console.error('Database down:', err);
    process.exit(-1);
  });

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/slashApi/auth.route'));

// routers here

app.listen(port, () => {
  console.log(`Listening port ${port}`);
});
