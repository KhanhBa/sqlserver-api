const express = require('express');
const app = express();
app.use(express.json());
const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);
app.listen(3000, () => console.log('Server started on port 3000'));