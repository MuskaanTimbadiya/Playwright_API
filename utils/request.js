// Simple helper to create a Playwright API request context with default headers
// and common error handling. Can be extended for retries, logging, etc.

const { expect } = require('@playwright/test');

async function createContext(requestOrFixture, baseURL) {
  // Playwright's `request` import has newContext; the test fixture object does not.
  if (requestOrFixture && typeof requestOrFixture.newContext === 'function') {
    const ctx = await requestOrFixture.newContext({ baseURL });
    ctx.on('response', async (response) => {
      if (response.status() >= 400) {
        console.error(`HTTP ${response.status()} - ${response.url()}`);
      }
    });
    return ctx;
  }
  // otherwise assume the object is already an APIRequestContext
  return requestOrFixture;
}

module.exports = { createContext };
