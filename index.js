const { connectToDatabase, app } = require('./server');

const port = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
