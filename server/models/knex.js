const Knex = require('knex');
const Config = require('../config');

const knex = connect();

function connect () {
  const config = {
    user: `${Config.development.username}`,
    password: `${Config.development.password}`,
    database: `${Config.development.database}`,
    host: `${Config.development.host}`,
    ssl: true
  };

  // Connect to the database
  const knex = Knex({
    client: 'pg',
    connection: config
  });

  return knex;
}


knex.schema.createTable('visits', (table) => {
    table.increments();
    table.timestamp('timestamp');
    table.string('userIp');
  })
	.then(() => {
	  console.log(`Successfully created 'visits' table.`);
	  return knex.destroy();
	})
	.catch((err) => {
	  console.error(`Failed to create 'visits' table:`, err);
	  if (knex) {
	    knex.destroy();
	  }
});


module.exports = knex;




