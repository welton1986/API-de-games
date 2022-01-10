
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");


const JWTsecret = "1234567890";


app.use(cors()); // Usando o cors para não bloquear requisição externa.
app.use(bodyParser.urlencoded({extended:false})); // Serve para buscar o conteudo do formulario.
app.use(bodyParser.json()); // Transforma em json.


function auth(req, res, next){
    const authToken = req.headers['authorization'];
    
    if(authToken != undefined){

        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token,JWTsecret,(err, data) =>{
            if(err){
                res.status(401);
                res.json ({err:"Token invalido"});

            }else{
                req.token = token;
                req.loggedUser = {id: data.id, email: data.emai};
                next()
            }
        });


        
    }else{
        res.status(401);
        res.json({err:"Token invalido."});
    }

}



var DB = {
    games: [
        {
            id:23,
            title:"Call of Duty",
            year:2019,
            price:60
        },

        {
            id:65,
            title:"Sea of thieves",
            year:2018,
            price:40
        },

        {
            id:2,
            title:"Minecraft",
            year:2012,
            price:20
        }
    ],

    users: [
        {
            id:1,
            name: "welton",
            email: "welton@welton.com",
            password: "1234"
        },

        {
            id:2,
            name: "Rosangela",
            email:"Rosangela@rosangela.com",
            password: "5678"    
        }
    ]
    

}





app.get("/games", auth,(req,res)=>{
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){ //Se não for um numero , res erro 400.
        res.sendStatus(400);
    }else{
        
        var id = parseInt(req.params.id);  // Convertendo para inteiro por no json ele e um texto.

        var game = DB.games.find(g => g.id == id); // Achar um game que tenha um id igual id .

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});

app.post("/game", auth,(req,res)=>{
    var {title, price, year} = req.body;
    
    DB.games.push({ // Adicionando um novo jogo no json de games

        id:100,
        title,
        price,
        year
    });

    res.sendStatus(200);
})

app.delete("/game/:id",auth,(req,res)=>{

    if(isNaN(req.params.id)){ //Se não for um numero , res erro 400.
        res.sendStatus(400);
    }else{
        
        var id = parseInt(req.params.id);  // Convertendo para inteiro por no json ele e um texto.

        var index = DB.games.findIndex(g => g.id == id); // Achar um game que tenha um id igual id .

        if (index == -1){  // Se o numero não existir recebe -1 e retorna o erro.
            res.statusCode(404);
        }else{
            DB.games.splice(index,1); // Deletando elemento pelo Id .
            res.sendStatus(200);
        }
    }

});

app.put("/game/:id",auth,(req,res)=>{

    if(isNaN(req.params.id)){ //Se não for um numero , res erro 400.
        res.sendStatus(400);
    }else{
        
        var id = parseInt(req.params.id);  // Convertendo para inteiro por no json ele e um texto.

        var game = DB.games.find(g => g.id == id); // Achar um game que tenha um id igual id .

        if(game != undefined){
            
            var {title, price, year} = req.body; // Pegando o corpo do json.

            if(title != undefined){ // Se title for diferente de undefined então title recebe novo title.
                game.title = title;
            }


            if(price != undefined){
                game.price = price;
            }


            if(year != undefined){
                game.year = year;
            }

            res.sendStatus(200);


        }else{
            res.sendStatus(404);
        }
    }

});


app.post("/auth",(req,res)=>{
    var {email,password} = req.body;

    if(email != undefined){

        var user = DB.users.find(u => u.email == email);

        if(user != undefined){

            if(user.password == password){

                jwt.sign({id: user.id , email: user.email}, JWTsecret,{expiresIn:"48h"},(err, token)=>{
                    if(err){
                        res.status(400);
                        res.json({err: "Falha interna"});

                    }else{

                        res.status(200);
                        res.json({token: token});
                        
                    }
                });

            }else {
                res.status = 401;
                res.json({err:"Credenciais invalidas"});
            }

        }else{
            res.status(404);
            res.json({err:"O E-mail enviado não existe na base de dados "});
        };


    }else{
        res.status (400);
        res.json({err: "O E-mail enviado é invalido"});
    }
});



app.listen(8080,()=>{
    console.log("API Rodando");
});


