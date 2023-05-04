const { Pool } = require("pg")
const pool = new Pool({
    user: 'postgres',
    password: "CSJEzh076WnEPqB8aL8v",
    host: "containers-us-west-54.railway.app",
    port: 5620,
    database: "railway"

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