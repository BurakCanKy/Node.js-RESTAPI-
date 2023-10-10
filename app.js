import express from "express";

const app = express();
app.use(express.json());

const users = [

    {id: 1, name: "Burak"},
    {id: 2, name: "Can"},
    {id: 3, name: "Kaya"},

]

app.get('/listUsers', (req, res) => {

    res.send(users);

})

app.get('/user/:id', (req, res) => {

    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) res.send("Bulunamadi");
    res.send(user);

})

app.post('/addUser',(req,res) => {

    if(req.body.name.length < 3)
    {
        res.send("3 karakterden daha uzun bir isim giriniz.");
        return;
    }

    const user = {
        id: users.length + 1,
        name: req.body.name,
    }

    users.push(user);
    res.send(user);
})

app.put('/updateUser/:id', (req, res) => {

    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) res.send("Bulunamadi");

    user.name = req.body.name;
    res.send(user);
})

app.delete('/deleteUser/:id',(req,res) => {

    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) res.send("Bulunamadi");

    users.pop(user);
    res.send(user);
})



const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Application running on port: ' ,port);
});