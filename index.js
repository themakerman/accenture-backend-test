'use strict'

const port = 8010

const Sequelize = require('sequelize').Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/database.sqlite'
})

const app = require('./api/app')(sequelize)
app.listen(port, () => console.log(`App started and listening on port ${port}`))
