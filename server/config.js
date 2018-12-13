module.exports = {
    development: {
      username: "ghnffmvxkeuqoh",
      password: "76815dc8b006ee4441ff7d8fddb012abacb193ca018742ddd37bf4191266040f", //remember to put your own mysql password here
      database: "d7u1b727sb32et",
      host: "ec2-23-23-80-20.compute-1.amazonaws.com",
      port: "5432",
      dialect: "postgresql"
    },
    test: {
      username: "ghnffmvxkeuqoh",
      password: "76815dc8b006ee4441ff7d8fddb012abacb193ca018742ddd37bf4191266040f", //remember to put your own mysql password here
      database: "d7u1b727sb32et",
      host: "ec2-23-23-80-20.compute-1.amazonaws.com",
      port: "5432",
      dialect: "postgresql"
    },
    production:{
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.HOST,
      port: "5432",
      dialect: "postgresql"
    }
}