const { Pool } = require("pg")
const pool = new Pool({
    DATABASE_URL:'postgresql://postgres:CSJEzh076WnEPqB8aL8v@containers-us-west-54.railway.app:5620/railway',
    PGDATABASE:"railway",
    PGHOST:'containers-us-west-54.railway.app',
    PGPASSWORD:'CSJEzh076WnEPqB8aL8v',
    PGPORT:5620,
    PGUSER:'postgres'
})

// const pool = new Pool({
//     user: 'postgres',
//     password: "OmEKxMvLtd4glG3nCb9x",
//     host: "containers-us-west-155.railway.app",
//     port: 7026,
//     database: "railway"
// })

pool.connect((err) => {
    if (!err) {
        console.log("Connect To SQL");
    } else {
        console.log(err);
    }
})





module.exports = pool