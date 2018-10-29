const Knex = require('knex');

const knex = connect();

function connect () {
  const config = {
    user: "",         //your user name
    password: "",     //your password
    database: "",     //your database name
    host: ""，        //your host
    ssl: true
  };

  // Connect to the database
  const knex = Knex({
    client: 'pg',
    connection: config
  });

  return knex;
}


//example to create a table called 'visits' with knex
knex.schema.createTable('visits', (table) => {
    table.increments(); //id auto increments
    table.timestamp('timestamp'); 
    table.string('userIp');
  })
	.then(() => {
	  console.log(`Successfully created 'visits' table.`);
	  return knex.destroy(); //I don't know why destroy. 
	})
	.catch((err) => {
	  console.error(`Failed to create 'visits' table:`, err);
	  if (knex) {     //if table already existed, destroy.
	    knex.destroy();
	  }
});


module.exports = knex;




