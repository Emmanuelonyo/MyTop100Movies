const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('MY TOP 100 MOVIES API', () => {
  let mongoServer;
  let response;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();    
    process.env.MONGODB_URI = `${mongoUri}/MyTop100Movies`;

    const initTask = {
        title: "Wednesday",
        genre: "Horror",
        releasedOn: "2023",
        rating: "81",
        image: "https:Wednesday.com"
    };

        response = await request(app).post('/api/v1/movies').send(initTask);

  }, 10000);

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.dropCollection("movies");
    await mongoose.connection.close();
    app.close();
  });

  describe('Retrieve all Movies /movies', () => {
    it('should return all Movie list', async () => {
      const res = await request(app).get('/api/v1/movies');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(
          expect.objectContaining({
            status: "success",
            message: "Movies retrieved successfully",
            data: expect.any(Object)
          }),
      
      );
    });
  });

  describe('Get Movie /movies/:id', () => {
    it('should return a specific TASK item', async () => {
      const res = await request(app).get(`/api/v1/movies/${response.body.data._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            status: "success",
            message: "Movies retrieved successfully",
            data: expect.any(Object)
        })
      );
    });
  });

  describe('POST /api/v1/movies', () => {
    it('should create a new TASK item', async () => {
      const task = {
        title: "The Monk",
        genre: "Animation",
        releasedOn: "2023",
        rating: "81",
        image: "https:themonk.com"
    };
      const res = await request(app).post('/api/v1/movies').send(task);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(
            expect.objectContaining({
                status: "success",
                message: "Movie added to list successfully",
                data: expect.any(Object)
            })
        );
    });
  });

  describe('PATCH /movies/:id', () => {
    it('should update a TASK item', async () => {
        const task = {
            title: "The Monk 1",
            genre: "Animation",
            releasedOn: "2023",
            rating: "81",
            image: "https:themonk.com"
        };
      const res = await request(app).patch(`/api/v1/movies/${response.body.data._id}`).send(task);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            status: "success",
            message: "Movies Updated successfully",
            data: expect.any(Object)
        })
      );
    });
  });


  describe('DELETE /movies/:id', () => {
    it('should delete a TASK item', async () => {
      const res = await request(app).delete(`/api/v1/movies/${response.body.data._id}`);
      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
    });
  });


});
