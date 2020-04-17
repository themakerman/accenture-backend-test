const assert = require('chai').assert

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

const buildSchemas = require('../../src/schemas')

const rideModel = require('../../models/teacher')(db)

const testRideData = [
  {
    start_lat: 80,
    start_long: 120,
    end_lat: 88,
    end_long: 110,
    rider_name: 'Mervin Tan',
    driver_name: 'Driver Lim',
    driver_vehicle: 'SGX8888H'
  }
]

describe('Model > Ride tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err)
      }

      buildSchemas(db)

      done()
    })
  })
  describe('Create ride', () => {
    it('should return newly created ride', async () => {
      try {
        const newRide = await rideModel.createRide(testRideData[0].start_lat, testRideData[0].start_long, testRideData[0].end_lat, testRideData[0].end_long, testRideData[0].rider_name, testRideData[0].driver_name, testRideData[0].driver_vehicle)
        assert.isNotNull(newRide)
        assert.isNotNull(newRide[0])
        assert.isNotNull(newRide[0].riderName)
        assert.strictEqual(newRide[0].riderName, testRideData[0].rider_name)
        assert.strictEqual(newRide[0].driverName, testRideData[0].driver_name)
        assert.strictEqual(newRide[0].driverVehicle, testRideData[0].driver_vehicle)
      } catch (err) {
        assert.isNull(err)
      }
    })
    it('should return server error', async () => {
      try {
        await rideModel.createRide()
      } catch (err) {
        assert.isNotNull(err)
        assert.isNotNull(err.message)
        assert.strictEqual(err.message, '{"error_code":"SERVER_ERROR","message":"Unknown error"}')
      }
    })
  })
})
