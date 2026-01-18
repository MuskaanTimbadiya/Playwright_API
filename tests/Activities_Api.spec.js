//https://fakerestapi.azurewebsites.net/index.html

const baseURL = 'https://fakerestapi.azurewebsites.net/api/v1/';
const { test, expect, request } = require('@playwright/test');

test('Get all Activities', async ({ request }) => {
    const Response = await request.get(`${baseURL}/Activities`);
    expect(Response.status()).toBe(200);
    const body = await Response.json();
    console.log(body);
});

test('Post an activity', async ({ request }) => {
    const Response = await request.post(`${baseURL}/Activities`, {
        data: {
            "id": 31,
            "title": "Activity 31",
            "dueDate": "2026-01-18T12:00:41.758Z",
            "completed": true
        }
});
    expect(Response.status()).toBe(200);
    console.log(await Response.json());
});

test('Get Activity by ID', async ({ request }) => {
    const Response = await request.get(`${baseURL}/Activities/30`);
    expect(Response.status()).toBe(200);
    console.log(await Response.json());
});

test('Delete an activity', async ({ request }) => {
    const Response = await request.delete(`${baseURL}/Activities/30`);
    expect(Response.status()).toBe(200);
});