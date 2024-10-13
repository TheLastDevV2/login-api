const express = require("express");
const bcrypt = require("bcrypt")

const app = express();

app.use(express.json())

console.log("server rodando")

const users = []

app.get("/users", (req, res) =>{

    res.json(users)

});

app.post("/users",  async (req, res) => {
    try{
        /*const salt = await bcrypt.genSalt();*/
        const hashedPassword = await bcrypt.hash(req.body.password, 10/*salt*/);
        const user = {name: req.body.name, password: hashedPassword};
        users.push(user)
        res.status(201).send(users);
    }
    catch{
        res.status(500).send();
    }

});

app.post("/users/login", async (req, res) => {
    const user = users.find(user => user.name = req.body.name);
    console.log(user);
    if (user == null) { 
        return res.status(400).send("Cannot find user");
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send("Sucess");
        } else{
            res.send("Not Allowed");
        }
    } catch {
        return  res.status(500).send();
    }
})


app.listen(3030);


//to run the server use npm run devStart