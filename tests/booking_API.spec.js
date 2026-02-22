//https://restful-booker.herokuapp.com/apidoc/index.html

const { test, expect, request } = require('@playwright/test');
const { getEnv } = require('../config/config');
const { getAuthToken } = require('../utils/auth');
const { createContext } = require('../utils/request');
const bookingPayload = require('../data/bookingPayload.json');

// environment configuration provides the baseURL for the current test run
const { baseURL } = getEnv();
let reqContext;

test.describe('Booking API suite', () => {
    test.beforeAll('Health check', async () => {
        reqContext = await createContext(request, baseURL);
        const response = await reqContext.get('/ping');
        expect(response.ok()).toBeTruthy();
        expect(await response.text()).toBe('Created');
    });

    test.afterAll(async () => {
        if (reqContext) await reqContext.dispose();
    });

    test('Create Booking', async () => {
        const Response = await reqContext.post(`/booking`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: bookingPayload
        });
        expect(Response.status()).toBe(200);
        const respJson = await Response.json();
        console.log(respJson);
        expect(respJson.booking.firstname).toBe("James");
        expect(respJson.booking.lastname).toBe("Brown");
        expect(respJson.booking.totalprice).toBe(111);
        expect(respJson.booking.depositpaid).toBe(true);
        expect((await Response.json()).booking.bookingdates.checkin).toBe("2018-01-01");
        expect((await Response.json()).booking.bookingdates.checkout).toBe("2019-01-01");
        expect((await Response.json()).booking.additionalneeds).toBe("Breakfast");
    });

    test('Get Booking ids', async () => {
        const Response = await reqContext.get(`/booking`);
        expect(Response.ok()).toBeTruthy();
        const body = await Response.json();
        console.log(body);
    });

    test('Get Booking by ID', async () => {
        const Response = await reqContext.get(`/booking/1`, {
            headers: { 'Accept': 'application/json' }
        });
        expect(Response.ok()).toBeTruthy();
        console.log(await Response.json());
    });

    test('Update Booking', async () => {
        const token = await getAuthToken(reqContext);
        const updated = {
            firstname: 'James',
            lastname: 'Brown',
            totalprice: 222,
            depositpaid: false,
            bookingdates: { checkin: '2026-01-01', checkout: '2026-01-12' },
            additionalneeds: 'Lunch'
        };
        const Response = await reqContext.put(`/booking/1`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            },
            data: updated
        });
        expect(Response.ok()).toBeTruthy();
        const body = await Response.json();
        console.log(body);
        expect(body).toMatchObject(updated);
    });

    test('Partial Update Booking', async () => {
        const token = await getAuthToken(reqContext);
        const Response = await reqContext.patch(`/booking/1`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            },
            data: { firstname: 'Jim', lastname: 'Brownie' }
        });
        expect(Response.ok()).toBeTruthy();
        const body = await Response.json();
        console.log(body);
        expect(body.firstname).toBe('Jim');
        expect(body.lastname).toBe('Brownie');
    });

    test('Delete Booking', async () => {
        const token = await getAuthToken(reqContext);
        const Response = await reqContext.delete(`/booking/1`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }
        });
        expect(Response.ok()).toBeTruthy();
        console.log('Booking Deleted Successfully');
        expect(await Response.text()).toBe('Created');
    });

});