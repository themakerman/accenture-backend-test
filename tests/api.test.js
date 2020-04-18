// 'use strict'
//
// const request = require('supertest')
// const assert = require('chai').assert
//
// const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database(':memory:')
//
// const app = require('../api/app')(db)
// const buildSchemas = require('../src/schemas')
//
// const testRideData = [
//   {
//     start_lat: 80,
//     start_long: 120,
//     end_lat: 88,
//     end_long: 110,
//     rider_name: 'Mervin Tan',
//     driver_name: 'Driver Lim',
//     driver_vehicle: 'SGX8888H'
//   }
// ]
//
// describe('API tests', () => {
//   before((done) => {
//     db.serialize((err) => {
//       if (err) {
//         return done(err)
//       }
//
//       buildSchemas(db)
//
//       done()
//     })
//   })
//
//   describe('GET /health', () => {
//     it('should return health', (done) => {
//       request(app)
//         .get('/health')
//         .expect('Content-Type', /text/)
//         .expect(200, done)
//     })
//   })
//
//   describe('POST /rides', () => {
//     it('should create ride with no validation error', (done) => {
//       createRide(app, testRideData[0], done)
//     })
//     it('should create ride with validation error on invalid start latitude', (done) => {
//       const rideData = Object.assign({}, testRideData[0])
//       rideData.start_lat = -91
//       createRide(app, rideData, done, 'VALIDATION_ERROR')
//     })
//     it('should create ride with validation error on invalid end latitude', (done) => {
//       const rideData = Object.assign({}, testRideData[0])
//       rideData.end_lat = -91
//       createRide(app, rideData, done, 'VALIDATION_ERROR')
//     })
//     it('should create ride with validation error on missing rider name', (done) => {
//       const rideData = Object.assign({}, testRideData[0])
//       delete rideData.rider_name
//       createRide(app, rideData, done, 'VALIDATION_ERROR')
//     })
//     it('should create ride with validation error on missing driver name', (done) => {
//       const rideData = Object.assign({}, testRideData[0])
//       delete rideData.driver_name
//       createRide(app, rideData, done, 'VALIDATION_ERROR')
//     })
//     it('should create ride with validation error on missing driver vehicle', (done) => {
//       const rideData = Object.assign({}, testRideData[0])
//       delete rideData.driver_vehicle
//       createRide(app, rideData, done, 'VALIDATION_ERROR')
//     })
//     after((done) => {
//       deleteRides(app, done)
//     })
//   })
//
//   describe('GET /rides', () => {
//     before((done) => {
//       createRide(app, testRideData[0], done)
//     })
//     before((done) => {
//       createRide(app, testRideData[0], done)
//     })
//     before((done) => {
//       createRide(app, testRideData[0], done)
//     })
//     it('should retrieve rides', (done) => {
//       request(app)
//         .get('/rides')
//         .expect('Content-Type', /json/)
//         .expect(200, (err, result) => {
//           assert.isNull(err)
//           assert.isNotNull(result)
//           assert.isNotNull(result.body)
//           assert.isNotNull(result.body[0])
//           done()
//         })
//     })
//     it('should retrieve rides with pagination information (page 1 out of 2)', (done) => {
//       request(app)
//         .get('/rides')
//         .query({
//           page: 1,
//           page_size: 2
//         })
//         .expect('Content-Type', /json/)
//         .expect(200, (err, result) => {
//           assert.isNull(err)
//           assert.isNotNull(result)
//           assert.isNotNull(result.body)
//           assert.strictEqual(result.body.length, 2)
//           done()
//         })
//     })
//     it('should retrieve rides with pagination information (page 2 out of 2)', (done) => {
//       request(app)
//         .get('/rides')
//         .query({
//           page: 2,
//           page_size: 2
//         })
//         .expect('Content-Type', /json/)
//         .expect(200, (err, result) => {
//           assert.isNull(err)
//           assert.isNotNull(result)
//           assert.isNotNull(result.body)
//           assert.strictEqual(result.body.length, 1)
//           done()
//         })
//     })
//     after((done) => {
//       deleteRides(app, done)
//     })
//   })
//
//   describe('GET /rides/:id', () => {
//     let createdRide = null
//     before((done) => {
//       createRide(app, testRideData[0], (err, ride) => {
//         createdRide = ride[0]
//         done()
//       })
//     })
//     it('should retrieve ride by ride ID', (done) => {
//       request(app)
//         .get(`/rides/${createdRide.rideID}`)
//         .expect('Content-Type', /json/)
//         .expect(200, (err, result) => {
//           assert.isNull(err)
//           assert.isNotNull(result)
//           assert.isNotNull(result.body)
//           assert.isNotNull(result.body[0])
//           assert.strictEqual(result.body[0].rideID, createdRide.rideID)
//           done()
//         })
//     })
//     it('should return rides not found error with invalid ride ID', (done) => {
//       request(app)
//         .get('/rides/20')
//         .expect('Content-Type', /json/)
//         .expect(200, (err, result) => {
//           assert.isNull(err)
//           assert.isNotNull(result)
//           assert.isNotNull(result.body)
//           assert.isNotNull(result.body.error_code)
//           assert.strictEqual(result.body.error_code, 'RIDES_NOT_FOUND_ERROR')
//           done()
//         })
//     })
//     it('sql injection attempt at ride ID should return rides not found error', (done) => {
//       request(app)
//         .get(`/rides/${encodeURI('2 OR 1=1')}`)
//         .expect('Content-Type', /json/)
//         .expect(200, (err, result) => {
//           assert.isNull(err)
//           assert.isNotNull(result)
//           assert.isNotNull(result.body)
//           assert.isNotNull(result.body.error_code)
//           assert.strictEqual(result.body.error_code, 'RIDES_NOT_FOUND_ERROR')
//           done()
//         })
//     })
//     after((done) => {
//       deleteRides(app, done)
//     })
//   })
// })
//
// function createRide (app, sendData, done, errorType) {
//   request(app)
//     .post('/rides')
//     .send(sendData)
//     .expect('Content-Type', /json/)
//     .expect(200, (err, result) => {
//       assert.isNull(err)
//       assert.isNotNull(result)
//       assert.isNotNull(result.body)
//       switch (errorType) {
//         case 'VALIDATION_ERROR':
//           assert.isNull(err)
//           assert.isNotNull(result)
//           assert.isNotNull(result.body)
//           assert.isNotNull(result.body.error_code)
//           assert.strictEqual(result.body.error_code, 'VALIDATION_ERROR')
//           break
//         case 'RIDES_NOT_FOUND_ERROR':
//           assert.isNull(err)
//           assert.isNotNull(result)
//           assert.isNotNull(result.body)
//           assert.isNotNull(result.body.error_code)
//           assert.strictEqual(result.body.error_code, 'RIDES_NOT_FOUND_ERROR')
//           break
//         default:
//           assert.isNotNull(result.body[0])
//       }
//       done(err, result.body)
//     })
// }
//
// function deleteRides (app, done) {
//   db.run('DELETE FROM rides', (err, rows) => {
//     if (err) console.error(err)
//     done()
//   })
// }
