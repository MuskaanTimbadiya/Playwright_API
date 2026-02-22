const { expect } = require('@playwright/test');

// returns a token from the booking API. Requires a Playwright APIRequestContext instance.
async function getAuthToken(reqContext) {
  if (!reqContext || typeof reqContext.post !== 'function') {
    throw new Error('getAuthToken requires a valid request context');
  }
  const response = await reqContext.post(`/auth`, {
    headers: { 'Content-Type': 'application/json' },
    data: { username: 'admin', password: 'password123' },
  });
  expect(response.ok()).toBeTruthy();
  const { token } = await response.json();
  return token;
}

module.exports = { getAuthToken };