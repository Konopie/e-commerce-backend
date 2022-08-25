const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const seedAll = require('./seeds')

// import sequelize connection

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
  seedAll();
})
