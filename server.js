const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('   mongodb://127.0.0.1:27017/registrationForm?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Save user data to MongoDB
  const newUser = new User({
    username,
    email,
    password,
  });

  newUser.save((err) => {
    if (err) {
      res.send('Error registering user');
    } else {
      res.send('User registered successfully');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
