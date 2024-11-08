import { expect, test } from 'vitest';
import got from 'got';

const client = got.extend({
    prefixUrl: 'http://localhost:3000',
    responseType: 'json',
    throwHttpErrors: false,
});

test('[VALID] POST /signup', async () => {
    const res = await client.post('signup', {
        json: {
            email: 'testman@mail.com',
            password: 'password',
            username: 'testman'
        },
        responseType: 'json'
    });

    const data = res.body;
    expect(res.statusCode).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('email');
    expect(data).to.not.have.property('password');
});

test('[INVALID] POST /login', async () => {
    const res = await client.post('login', {
        json: {
            email: 'failure',
            password: 'failure'
        },
        responseType: 'json'
    });

    const data = res.body;
    expect(res.statusCode).toBe(404);
    expect(data).to.not.have.property('id');
    expect(data).to.not.have.property('token');
    expect(data).to.not.have.property('password');
});
