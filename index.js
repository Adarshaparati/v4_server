
const connectToDb = require('./db');
const { app } = require('./server');

const port = process.env.PORT || 5000;

connectToDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
