
const methodOverride = require('method-override')
const cors = require('cors')
const express = require('express')


const app = express();
const log = console.log;

log('Servidor iniciado')

let port = process.env.PORT || 4500;

let users = [{
   email:'elbarto@hotmail.com',
   name:'Bart-Simpsons',
   pass:'kowabonga'
},
{
   email:'elhomo@hotmail.com',
   name:'Homero-Simpsons',
   pass:'douh'
},
{
   email:'margo@hotmail.com',
   name:'Marge-Simpsons',
   pass:'mmmmmh'
},
]; 

//app.use(cors());
app.use(methodOverride());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.get("/users", (req, res)=>{
   res.send(users);
});

app.get("/user/:email", (req, res)=>{
   let emailUser = users.map((user,i)=>{
      if (user[i].email == req.params.email){
         return user[i]
      }
   })
   res.send(emailUser);
});

app.get("/user/:names", (req, res)=>{
   let nameUsers = [];
   nameUsers = users.map((user,i)=>{   
      if (user[i].name == req.params.names){
         nameUsers.push(user[i])
      }
   res.send(nameUsers);
})
});      

app.post("/user/create/", (req, res)=>{
   let newUser = {
      email: req.body.mail,
      name: req.body.name,
      pass: req.body.pass
   }
   if (newUser.mail in users == true){
      res.send('Ese mail ya esta siendo usado')
   }else{
      users.push(newUser);
      res.send("usuario creado");
   }
});

app.delete("/user/delete/:email", (req, res)=>{
    users.forEach((user,i)=>{
      if (user.email == req.params.email){
         delete users[i]
      }
   });
   res.send('usuario Eliminado')
});


app.put("/user/modify/:mail/:nuevomail", (req, res)=>{
   users.forEach((user,i)=>{
      if (user.email == req.params.email){
         users[i].mail = req.params.nuevomail
      }
   });
   res.send('email Modificado')
});




 app.listen(port, ()=>{
    log("start server");
});

