const request = require('supertest');
let token = ''

test('Login test', async () => {
    const res = await request(apiUrl)
    .post('/login')
    .send({
        firstName: 'oui-oui',
        password: 'xoxo',
    })

    expect(res.statusCode).toEqual(200);

    token = res.body.token
});

test('Login with bad pwd test', async () => {
    const res = await request(apiUrl)
    .post('/login')
    .send({
        firstName: 'oui-oui',
        password: 'xyml',
    });

    console.log(res.text)
    expect(res.statusCode).toEqual(200);
});

test('Login with bad firstname test', async () => {
    const res = await request(apiUrl)
    .post('/login')
    .send({
        firstName: 'ha-ha',
        password: 'xoxo',
    });

    console.log(res.text)
    expect(res.statusCode).toEqual(200);
});

test('Login with missing data test', async () => {
    const res = await request(apiUrl)
    .post('/login')
    .send({
        firstName: 'oui-oui',
        password: '',
    });

    console.log(res.text)
    expect(res.statusCode).toEqual(200);
});

test('Get users with token', async () => {
    const res = await request(apiUrl)
    .get('/users')
    .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toEqual(200);
});

test('Get users without token', async () => {
    const res = await request(apiUrl)
    .get('/users')

    console.log(res.text)
    expect(res.statusCode).toEqual(200);
});

test('Insert user without pwd', async () => {
    const res = await request(apiUrl)
    .post('/users')
    .set('Authorization', `Bearer ${token}`)
    .send({
        firstName: 'nan-nan',
        lastName: 'zebi',
        role: 'ADMIN'
    });

    console.log(res.text)
    expect(res.statusCode).toEqual(200);
});

test('Inset user with pwd < 8', async () => {
    const res = await request(apiUrl)
    .post('/users')
    .set('Authorization', `Bearer ${token}`)
    .send({
        firstName: 'nan-nan',
        lastName: 'zebi',
        password: 'xymail',
        role: 'ADMIN'
    });

    console.log(res.text)
    expect(res.statusCode).toEqual(200);
});

test('Inset user with correct data', async () => {
    const res = await request(apiUrl)
    .post('/users')
    .set('Authorization', `Bearer ${token}`)
    .send({
        firstName: 'nan-nan',
        lastName: 'zebi',
        password: 'xymailuaize',
        role: 'ADMIN'
    });

    expect(res.statusCode).toEqual(200);
});

test('Full test', async () => {
    let res = await request(apiUrl)
    .post('/login')
    .send({
        firstName: 'oui-oui',
        password: 'xoxo',
    })

    expect(res.statusCode).toEqual(200);

    const tok = res.body.token

    res = await request(apiUrl)
    .get('/users')
    .set('Authorization', `Bearer ${tok}`)

    expect(res.statusCode).toEqual(200);
});