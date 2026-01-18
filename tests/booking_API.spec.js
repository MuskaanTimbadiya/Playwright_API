//https://restful-booker.herokuapp.com/apidoc/index.html

const baseURL = 'https://restful-booker.herokuapp.com';
const { test, expect, request } = require('@playwright/test');
let reqContext;
test.beforeAll('Health check', async () => {
    reqContext = await request.newContext();
    const response = await reqContext.get(`${baseURL}/ping`);
    expect(response.status()).toBe(201);
    expect(await response.text()).toBe('Created');
});

test.afterAll(async () => {
  await reqContext.dispose();
});

test('Get Booking ids', async () => {
    const Response = await reqContext.get(`${baseURL}/booking`);
    expect(Response.status()).toBe(200);
    console.log(await Response.json());
    let bookingids= await Response.json().bookingid;
    console.log(bookingids);
});

test('Get Booking ids by firstname and lastname', async () => {
    const Response = await reqContext.get(`${baseURL}/booking?firstname=sally&lastname=brown`);
    expect(Response.status()).toBe(200);
    console.log(await Response.json());
});

test('Get Booking ids by checkin and checkout', async () => {
    const Response = await reqContext.get(`${baseURL}/booking?checkin=2014-03-13&checkout=2014-05-21`);
    expect(Response.status()).toBe(200);
    console.log(await Response.json());
});

test('Get Booking by booking id ', async () => {
    const Response = await reqContext.get(`${baseURL}/booking/1`,{
      headers: {
        'Accept': 'application/json'
      }
    });
    expect(Response.status()).toBe(200);
    console.log(await Response.json());
});

test('Create Booking', async () => {
    const Response = await reqContext.post(`${baseURL}/booking`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: {
            "firstname": "James",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }
    });
    expect(Response.status()).toBe(200);
    console.log(await Response.json());
    expect((await Response.json()).booking.firstname).toBe("James");
    expect((await Response.json()).booking.lastname).toBe("Brown");
    expect((await Response.json()).booking.totalprice).toBe(111);
    expect((await Response.json()).booking.depositpaid).toBe(true);
    expect((await Response.json()).booking.bookingdates.checkin).toBe("2018-01-01");
    expect((await Response.json()).booking.bookingdates.checkout).toBe("2019-01-01");
    expect((await Response.json()).booking.additionalneeds).toBe("Breakfast");
});

async function getAuthToken() {
    const Response = await reqContext.post(`${baseURL}/auth`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "username": "admin",
            "password": "password123"
        }
    });
    expect(Response.status()).toBe(200);
    const respBody = await Response.json();
    return respBody.token;
}

test('Update Booking', async () => {
    const token = await getAuthToken();
    const Response = await reqContext.put(`${baseURL}/booking/1`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
        },
        data: {
            "firstname": "James",
            "lastname": "Brown",
            "totalprice": 222,
            "depositpaid": false,
            "bookingdates": {
                "checkin": "2026-01-01",
                "checkout": "2026-01-12"
            },
            "additionalneeds": "Lunch"
        }
    });
    expect(Response.status()).toBe(200);
    console.log(await Response.json());
    expect((await Response.json()).firstname).toBe("James");
    expect((await Response.json()).lastname).toBe("Brown");
    expect((await Response.json()).totalprice).toBe(222);
    expect((await Response.json()).depositpaid).toBe(false);
    expect((await Response.json()).bookingdates.checkin).toBe("2026-01-01");
    expect((await Response.json()).bookingdates.checkout).toBe("2026-01-12");
    expect((await Response.json()).additionalneeds).toBe("Lunch");
});

test('Partial Update Booking', async () => {
    const token = await getAuthToken();
    const Response = await reqContext.patch(`${baseURL}/booking/1`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`,
            'Authorization': `Basic YWRtaW46cGFzc3dvcmQxMjM=]`
        },
        data: {
            "firstname": "Jim",
            "lastname": "Brownie"
        }
    });
    expect(Response.status()).toBe(200);
    console.log(await Response.json());
    expect((await Response.json()).firstname).toBe("Jim");
    expect((await Response.json()).lastname).toBe("Brownie");
});

test('Delete Booking', async () => {
    const token = await getAuthToken();
    const Response = await reqContext.delete(`${baseURL}/booking/1`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`,
            'Authorization': `Basic YWRtaW46cGFzc3dvcmQxMjM=]`
        }
    });
    expect(Response.status()).toBe(201);
    console.log('Booking Deleted Successfully');
    expect(await Response.text()).toBe('Created');
});