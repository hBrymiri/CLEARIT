// Install helmet using npm
// npm install helmet

const express = require('express');
const helmet = require('helmet');

const app = express();

// Use helmet to set Content-Security-Policy
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'https://cdnjs.cloudflare.com'],
    styleSrc: ["'self'", 'https://cdnjs.cloudflare.com'],
    objectSrc: ["'none'"]
  }
}));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});