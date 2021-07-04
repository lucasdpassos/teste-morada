const request = require('supertest')
const app = require('../server')

describe("sample test", () => {
   it("should get ping route", async () => {
       const res = await request(app).get('/api/ping')
       expect(res.statusCode).toEqual(200)
   }
)})
describe("sample test", () => {
   it("should get assets route", async () => {
       const res = await request(app).get('/api/assets')
       expect(res.statusCode).toEqual(200)
   }
)})
describe("sample test", () => {
   it("should get asset pdf by id", async () => {
       const res = await request(app).get('/pdf/valores/60e221be514e602aa4512a86')
       expect(res.statusCode).toEqual(200)
   }
)})

