// https://fakerestapi.azurewebsites.net/index.html

const { test, expect, request } = require('@playwright/test');
const { getEnv } = require('../config/config');
const { createContext } = require('../utils/request');

const { baseURL } = getEnv();

let reqContext;
test.beforeAll(async () => {
  reqContext = await createContext(request, baseURL);
});

test.afterAll(async () => {
  if (reqContext) await reqContext.dispose();
});

  test('Get all Activities', async () => {
    const response = await reqContext.get(`${baseURL}/Activities`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
  });

  test('Post an activity', async () => {
    const response = await reqContext.post(`${baseURL}/Activities`, {
      data: {
        id: 31,
        title: 'Activity 31',
        dueDate: '2026-01-18T12:00:41.758Z',
        completed: true,
      }
    });
    expect(response.status()).toBe(200);
    console.log(await response.json());
  });

  test('Get Activity by ID', async () => {
    const response = await reqContext.get(`${baseURL}/Activities/30`);
    expect(response.status()).toBe(200);
    console.log(await response.json());
  });

  test('Delete an activity', async () => {
    const response = await reqContext.delete(`${baseURL}/Activities/30`);
    expect(response.status()).toBe(200);
  });