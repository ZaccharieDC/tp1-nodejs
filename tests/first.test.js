const request = require('supertest');

test('Login test', async () => {
    const res = await request('http://127.0.0.1:3000/login')
    .post('/the/route/to/test')
    .send({
        firstName: 'oui-oui',
        password: 'xoxo',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('some data present in the body');
});