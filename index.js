require("dotenv").config()
var express = require('express');
var app = express()
const uuid = require("uuid");
const fs = require("fs");
var cors = require('cors');
const upload = require("express-fileupload")
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(upload())
const pool = require("./db")
// const axios = require('axios');
app.use(express.static('public'));
const jwt = require('jsonwebtoken');
// const { cos } = require("mathjs");
const TOKEN = '69c65fbc9aeea59efdd9d8e04133485a09ffd78a70aff5700ed1a4b3db52d33392d67f12c1'
function autificationToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, TOKEN, (err, user) => {
        if (err) res.sendStatus(403)
    })
    next()
}

function testAllText(a,b,key) {
    console.log(key);
    if (a < key.length && key.length<b){
return true
    }else{
return false
    }
}
function testAllNumber(a, b, key) {
    if (a <key< b) {
        return true
    } else {
        return false
    }
}
function emailTest(params) {
    if(params.includes("@gmail.com") || params.includes("@mail.com") ){
        return true
    }else{
        return false
    }
}


// facebook
app.get('/facebook', (req, res) => {
    pool.query("SELECT * FROM facebook", (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.get('/facebook/:id', (req, res) => {
    pool.query("SELECT * FROM facebook where facebookid=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.post('/facebook', (req, res) => {
    const body = req.body
    pool.query("insert into facebook (email, parol) values ($1, $2)",
        [body.email, body.parol], (err, result) => {
            if (!err) {
                res.status(201).send("Created")
            } else {
                res.status(400).send(err)
            }
        })
})
app.delete('/facebook/:id', (req, res) => {
    pool.query("DELETE FROM facebook WHERE facebookid=$1", [req.params.id], (err, result) => {
        if (!err) {
            if (result.rowCount === 1) {
                res.status(200).send("Deleted")
            } else {
                res.status(400).send("Id not found")
            }
        } else {
            res.status(400).send(err)
        }
    })
})
app.put('/facebook/:id', (req, res) => {
    var datenew = new Date().toISOString()
    const body = req.body
    pool.query(`UPDATE facebook SET email=$1, parol=$2,  syschangedatutc=$4 WHERE facebookid=$3`,
        [body.email, body.parol, req.params.id, datenew], (err, result) => {
            if (!err) {
                if (result.rowCount === 1) {
                    res.status(200).send("Updated")
                } else {
                    res.status(400).send("Id not found")
                }
            } else {
                res.status(400).send(err)
            }
        })
})

// google
app.get('/google', (req, res) => {
    pool.query("SELECT * FROM google", (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.get('/google/:id', (req, res) => {
    pool.query("SELECT * FROM google where googleid=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.post('/google', (req, res) => {
    const body = req.body
    pool.query("insert into google (email, parol) values ($1, $2)",
        [body.email, body.parol], (err, result) => {
            if (!err) {
                res.status(201).send("Created")
            } else {
                res.status(400).send(err)
            }
        })
    // insert into google(region, city, street, house, building, flat) values('Ñàðàòîâñêàÿ îáëàñòü', 'Ñàðàòîâ', 'Ïðîñïåêò èì.Ñòîëûïèíà', 5, null, 1)
})
app.delete('/google/:id', (req, res) => {
    pool.query("DELETE FROM google WHERE googleid=$1", [req.params.id], (err, result) => {
        if (!err) {
            if (result.rowCount === 1) {
                res.status(200).send("Deleted")
            } else {
                res.status(400).send("Id not found")
            }
        } else {
            res.status(400).send(err)
        }
    })
})
app.put('/google/:id', (req, res) => {
    var datenew = new Date().toISOString()
    const body = req.body
    pool.query(`UPDATE google SET email=$1, parol=$2, syschangedatutc=$4 WHERE googleid=$3`,
        [body.email, body.parol, req.params.id, datenew], (err, result) => {
            if (!err) {
                if (result.rowCount === 1) {
                    res.status(200).send("Updated")
                } else {
                    res.status(400).send("Id not found")
                }
            } else {
                res.status(400).send(err)
            }
        })
})



// appleid
app.get('/apple', (req, res) => {
    pool.query("SELECT * FROM apple", (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.get('/apple/:id', (req, res) => {
    pool.query("SELECT * FROM apple where appleid=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.post('/apple', (req, res) => {
    const body = req.body
    pool.query("insert into apple (email, parol) values ($1, $2)",
        [body.email, body.parol], (err, result) => {
            if (!err) {
                res.status(201).send("Created")
            } else {
                res.status(400).send(err)
            }
        })
    // insert into apple(region, city, street, house, building, flat) values('Ñàðàòîâñêàÿ îáëàñòü', 'Ñàðàòîâ', 'Ïðîñïåêò èì.Ñòîëûïèíà', 5, null, 1)
})
app.delete('/apple/:id', (req, res) => {
    pool.query("DELETE FROM apple WHERE appleid=$1", [req.params.id], (err, result) => {
        if (!err) {
            if (result.rowCount === 1) {
                res.status(200).send("Deleted")
            } else {
                res.status(400).send("Id not found")
            }
        } else {
            res.status(400).send(err)
        }
    })
})
app.put('/apple/:id', (req, res) => {
    var datenew = new Date().toISOString()
    const body = req.body
    pool.query(`UPDATE apple SET email=$1, parol=$2,   syschangedatutc=$4 WHERE appleid=$3`,
        [body.email, body.parol, req.params.id, datenew], (err, result) => {
            if (!err) {
                if (result.rowCount === 1) {
                    res.status(200).send("Updated")
                } else {
                    res.status(400).send("Id not found")
                }
            } else {
                res.status(400).send(err)
            }
        })
})


// person
app.get('/person', (req, res) => {
    pool.query("SELECT * FROM person", (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.get('/person/:id', (req, res) => {
    pool.query("SELECT * FROM person where personid=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.post('/person', (req, res) => {
    const body = req.body
    pool.query("insert into person (email, fullname, phone, facebookid, googleid, appleid) values ($1, $2, $3, $4 ,$5,$6)",
        [body.email, body.fullname, body.phone, body.facebookid, body.googleid, body.appleid], (err, result)  => {
            if (!err) {
                res.status(201).send("Created")
            } else {
                res.status(400).send(err)
            }
        })
    // insert into person(region, city, street, house, building, flat) values('Ñàðàòîâñêàÿ îáëàñòü', 'Ñàðàòîâ', 'Ïðîñïåêò èì.Ñòîëûïèíà', 5, null, 1)
})
app.delete('/person/:id', (req, res) => {
    pool.query("DELETE FROM person WHERE personid=$1", [req.params.id], (err, result) => {
        if (!err) {
            if (result.rowCount === 1) {
                res.status(200).send("Deleted")
            } else {
                res.status(400).send("Id not found")
            }
        } else {
            res.status(400).send(err)
        }
    })
})
app.put('/person/:id', (req, res) => {
    var datenew = new Date().toISOString()
    const body = req.body
    pool.query(`UPDATE person SET email=$1,fullname=$2, phone=$3, facebookid=$4, googleid=$5, appleid=$6,syschangedatutc=$8 WHERE personid=$7`,
        [body.email,body.fullname, body.phone, body.facebookid, body.googleid, body.appleid,req.params.id, datenew], (err, result) => {
            if (!err) {
                if (result.rowCount === 1) {
                    res.status(200).send("Updated")
                } else {
                    res.status(400).send("Id not found")
                }
            } else {
                res.status(400).send(err)
            }
        })
})

//allmessage
app.get('/oldmessage', (req, res) => {
    pool.query("SELECT * FROM oldmessage", (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.get('/oldmessage/:id', (req, res) => {
    pool.query("SELECT * FROM oldmessage where messageid=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.post('/oldmessage', (req, res) => {
    const body = req.body
    pool.query("insert into oldmessage (personid, message) values ($1, $2)",
        [body.personid, body.message], (err, result) => {
            if (!err) {
                res.status(201).send("Created")
            } else {
                res.status(400).send(err)
            }
        })
    // insert into oldmessage(region, city, street, house, building, flat) values('Ñàðàòîâñêàÿ îáëàñòü', 'Ñàðàòîâ', 'Ïðîñïåêò èì.Ñòîëûïèíà', 5, null, 1)
})
app.delete('/oldmessage/:id', (req, res) => {
    pool.query("DELETE FROM oldmessage WHERE messageid=$1", [req.params.id], (err, result) => {
        if (!err) {
            if (result.rowCount === 1) {
                res.status(200).send("Deleted")
            } else {
                res.status(400).send("Id not found")
            }
        } else {
            res.status(400).send(err)
        }
    })
})
app.put('/oldmessage/:id', (req, res) => {
    var datenew = new Date().toISOString()
    const body = req.body
    pool.query(`UPDATE oldmessage SET personid=$1, message=$2,syschangedatutc=$4 WHERE messageid=$3`,
        [body.personid, body.message, req.params.id, datenew], (err, result) => {
            if (!err) {
                if (result.rowCount === 1) {
                    res.status(200).send("Updated")
                } else {
                    res.status(400).send("Id not found")
                }
            } else {
                res.status(400).send(err)
            }
        })
})



//KATALOG
app.get('/katalog', (req, res) => {
    pool.query("SELECT * FROM katalog", (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.get('/katalog/:id', (req, res) => {
    pool.query("SELECT * FROM katalog where katalogid=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.post('/katalog', (req, res) => {
    const body = req.body
    const { katalog_img } = req.files;
    var rendom = Math.floor(Math.random() * 10000000);
    var img2 = rendom + katalog_img.name.slice(katalog_img.name.lastIndexOf('.'));
    katalog_img.mv(__dirname + '/public/' + img2);
    pool.query("insert into katalog (katalog_name, katalog_img) values ($1, $2)",
        [body.katalog_name,img2], (err, result) => {
            if (!err) {
                res.status(201).send("Created")
            } else {
                res.status(400).send(err)
            }
        })
})
app.delete('/katalog/:id', (req, res) => {
    pool.query("SELECT * FROM katalog where katalogid=$1", [req.params.id], (err, result) => {
      if (result.rows.length>0) {
        if (!err) {
            fs.unlink(`./public/${result.rows[0].katalog_img}`, function (err) {
                if (err && err.code == 'ENOENT') {
                    console.info("File doesn't exist, won't remove it.");
                } else if (err) {
                    console.error("Error occurred while trying to remove file");
                } else {
                    console.info(`removed`);
                }
            });
        } else {
            res.status(400).send(err)
        }
      }
    })

    pool.query("DELETE FROM katalog WHERE katalogid=$1", [req.params.id], (err, result) => {
        if (!err) {
            if (result.rowCount === 1) {
              
                res.status(200).send("Deleted")
            } else {
                res.status(400).send("Id not found")
            }
        } else {
            res.status(400).send(err)
        }
    })
})
app.put('/katalog/:id', (req, res) => {

    pool.query("SELECT * FROM katalog where katalogid=$1", [req.params.id], (err, result) => {
        const { katalog_img }=req.files
        if (result.rows.length>0) {
          if (!err){
              katalog_img.mv(__dirname + '/public/' + result.rows[0].katalog_img);
          } else {
              res.status(400).send(err)
          }
        }
      })
    var datenew = new Date().toISOString()
    pool.query("SELECT * FROM katalog where katalogid=$1", [req.params.id], (err, result) => {
        if (result.rows.length>0) {
          if (!err) {
              fs.unlink(`./public/${result.rows[0].katalog_img}`, function (err) {
                  if (err && err.code == 'ENOENT') {
                      console.info("File doesn't exist, won't remove it.");
                  } else if (err) {
                      console.error("Error occurred while trying to remove file");
                  } else {
                      console.info(`removed`);
                  }
              });
          } else {
              res.status(400).send(err)
          }
        }
      })
    const body = req.body
    pool.query(`UPDATE katalog SET katalog_name=$1,  syschangedatutc=$3 WHERE katalogid=$2`,
        [body.katalog_name,  req.params.id, datenew], (err, result) => {
            if (!err) {
                if (result.rowCount === 1) {
                    res.status(200).send("Updated")
                } else {
                    res.status(400).send("Id not found")
                }
            } else {
                res.status(400).send(err)
            }
        })
})




// personkatalog

app.get('/personkatalog', (req, res) => {
    pool.query("SELECT * FROM personkatalog", (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.get('/personkatalog/:id', (req, res) => {
    pool.query("SELECT * FROM personkatalog where person_katalog_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})
app.post('/personkatalog', (req, res) => {
    const body = req.body
    pool.query("insert into personkatalog (katalogid, personid) values ($1, $2)",
        [body.katalogid, body.personid], (err, result) => {
            if (!err) {
                res.status(201).send("Created")
            } else {
                res.status(400).send(err)
            }
        })
    // insert into personkatalog(region, city, street, house, building, flat) values('Ñàðàòîâñêàÿ îáëàñòü', 'Ñàðàòîâ', 'Ïðîñïåêò èì.Ñòîëûïèíà', 5, null, 1)
})
app.delete('/personkatalog/:id', (req, res) => {
    pool.query("DELETE FROM personkatalog WHERE person_katalog_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            if (result.rowCount === 1) {
                res.status(200).send("Deleted")
            } else {
                res.status(400).send("Id not found")
            }
        } else {
            res.status(400).send(err)
        }
    })
})
app.put('/personkatalog/:id', (req, res) => {
    var datenew = new Date().toISOString()
    const body = req.body
    pool.query(`UPDATE personkatalog SET katalogid=$1, personid=$2,   syschangedatutc=$4 WHERE person_katalog_id=$3`,
        [body.katalogid, body.personid, req.params.id, datenew], (err, result) => {
            if (!err) {
                if (result.rowCount === 1) {
                    res.status(200).send("Updated")
                } else {
                    res.status(400).send("Id not found")
                }
            } else {
                res.status(400).send(err)
            }
        })
})






app.listen(PORT, function () {
    console.log(`Listening to Port ${PORT}`);
});