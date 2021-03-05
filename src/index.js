const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// routers here


app.listen(port, () => {
  console.log(`Listening port ${port}`);
});
