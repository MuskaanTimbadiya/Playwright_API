// Load environment variables from .env (if present)
  require('dotenv').config();

// simple configuration manager for environment-specific endpoints
const environments = {
  books: { baseURL: 'https://restful-booker.herokuapp.com' },
  activities: { baseURL: 'https://fakerestapi.azurewebsites.net/api/v1' },
};

function getEnv() {
  const name = process.env.TEST_ENV || 'books';
  return environments[name] || environments.books;
}

module.exports = { getEnv };
