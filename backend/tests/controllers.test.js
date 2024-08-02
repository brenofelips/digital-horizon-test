import request from 'supertest';
import app from '../src/server';
import jwt from 'jsonwebtoken';
import User from '../src/models/userModel'

describe('Message Controller', () => {
  let token;
  let idUser;

  beforeAll(async () => {
    const user = await User.findOne({ username: "plesmatest" })
    idUser = user._id;
    token = jwt.sign({ id: 'testUserId' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  test('should create a new message', async () => {
    const response = await request(app)
      .post('/api/messages')
      .send({ title: 'Test Title', description: 'Test Description', userId: idUser })
      .set('Authorization', `${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Title');
    expect(response.body.description).toBe('Test Description');
  });

  test('should get messages', async () => {
    const expected = await request(app)
      .post('/api/messages')
      .send({ title: 'Test Title', description: 'Test Description', userId: idUser })
      .set('Authorization', `${token}`);

    const response = await request(app).get(`/api/messages/`).set('Authorization', `${token}`);

    expect(response.statusCode).toBe(200)
    expect(expected.title).toBe(response.body.title)
    expect(expected.description).toBe(response.body.description)
    expect(expected.userId).toBe(response.body.userId)


  });

  test("should edit message", async () => {
    const message = await request(app)
      .post('/api/messages')
      .send({ title: 'Test Title', description: 'Test Description', userId: idUser })
      .set('Authorization', `${token}`);

    expect(message.statusCode).toBe(201);
    expect(message.body.title).toBe('Test Title');
    expect(message.body.description).toBe('Test Description');


    const newMessage = await request(app)
      .put(`/api/messages/${message.body._id}`)
      .send({ title: 'Test New Title', description: 'Test New Description', userId: idUser })
      .set('Authorization', `${token}`);

    expect(newMessage.statusCode).toBe(200);
    expect(newMessage.body.title).toBe('Test New Title');
    expect(newMessage.body.description).toBe('Test New Description');
  })

  test("should delete message", async () => {
    const message = await request(app)
      .post('/api/messages')
      .send({ title: 'Test Title', description: 'Test Description', userId: idUser })
      .set('Authorization', `${token}`);

    expect(message.statusCode).toBe(201);
    expect(message.body.title).toBe('Test Title');
    expect(message.body.description).toBe('Test Description');

    const deletedMessage = await request(app)
      .delete(`/api/messages/${message.body._id}`)
      .set('Authorization', `${token}`)

    expect(deletedMessage.statusCode).toBe(200)
    expect(deletedMessage.body.message).toBe("Message deleted")
  })

  test("should valid if token is invalid", async () => {
    const response = await request(app)
      .post('/api/messages')
      .send({ title: 'Test Title', description: 'Test Description', userId: idUser })
      .set('Authorization', `${token} test`);

    expect(response.body.error).toBe("Token is not valid")
  })
});

describe("User Controller", () => {
  test("should list user", async () => {
    const user = await request(app).get('/api/users/all')
    const usr = user.body.user.find(item => item.username === "userTest")

    expect(usr.username).toBe("userTest")
    expect(usr.email).toBe("userTest@gmail.com")
  })

  test("should login user", async () => {
    const user = await request(app).get('/api/users/all')
    const usr = user.body.user.find(item => item.username === "userTest")

    expect(usr.username).toBe("userTest")
    expect(usr.email).toBe("userTest@gmail.com")

    const response = await request(app).post("/api/users/login").send({ username: usr.username, password: "admin1234" })
    expect(response.body.token).toBeTruthy()
  })
})


