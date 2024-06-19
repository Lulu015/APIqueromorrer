require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', taskRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync({ force: true }).then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
