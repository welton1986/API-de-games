

var axiosConfig = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
}



function login(){

    var emailField = document.getElementById("email");
    var passwordField = document.getElementById("password");

    var email = emailField.value;
    var password = passwordField.value;

    axios.post("http://localhost:8080/auth",{
        email,
        password
    }).then(res => {
        var token = res.data.token;
        localStorage.setItem("token", token);
        axiosConfig.headers.Authorization = "Bearer" + localStorage.getItem("token");
        alert("Logadooo.")
    }).catch(err => {
        alert("Login incorreto....")
    })
}




function createGame(){
    var titleInput = document.getElementById("title"); // Pegando os elementos pelo Id
    var yearInput = document.getElementById("year");
    var priceInput = document.getElementById("price");

    var game = {
        title: titleInput.value,
        year: yearInput.value,  // Pegando os valores dos campos.
        price: priceInput.value
    }

    axios.post("http://localhost:8080/game",game, axiosConfig).then(response =>{ // Adicionando jogos .
        if(response.status == 200){
            alert("Game cadatrado.")
        }
    }).catch(err => {
        console.log(err);
    });
};

function deleteGame(listItem){
    var id = listItem.getAttribute("data-id"); // Deletando o game pelo Id .
    axios.delete("http://localhost:8080/game/" + id, axiosConfig).then(response => { 
        alert("Game deletado");
    }).catch(err => {
        console.log(err);
    });

}

function loadGame(listItem){ // Carregando os itens no formulario de games .
    
    var id = listItem.getAttribute("data-id");
    var title = listItem.getAttribute("data-title");
    var year = listItem.getAttribute("data-year");
    var price = listItem.getAttribute("data-price");

    document.getElementById("idEdit").value = id;
    document.getElementById("titleEdit").value = title;
    document.getElementById("yearEdit").value = year;
    document.getElementById("priceEdit").value = price;

}

function updateGame(){

    var idInput = document.getElementById("idEdit");
    var titleInput = document.getElementById("titleEdit"); // Pegando os elementos pelo Id
    var yearInput = document.getElementById("yearEdit");
    var priceInput = document.getElementById("priceEdit");

    var game = {
        title: titleInput.value,
        year: yearInput.value,  // Pegando os valores dos campos.
        price: priceInput.value
    }

    var id = idInput.value;


    axios.put("http://localhost:8080/game/" + id ,game, axiosConfig).then(response =>{ // Adicionando jogos .
        if(response.status == 200){
            alert("Game Atualizado.")
        }
    }).catch(err => {
        console.log(err);
    });

}


axios.get("http://localhost:8080/games", axiosConfig).then(response =>{
    var games = response.data;
    var list = document.getElementById("games");

    games.forEach(game =>{  //Percorre os elementos dentro do Array.
        var item = document.createElement("li");

        item.setAttribute("data-id", game.id);  // Setando atributos .
        item.setAttribute("data-title", game.title);
        item.setAttribute("data-year", game.year);
        item.setAttribute("data-price", game.price);

        item.innerHTML = game.id + " - " + game.year + " - " + game.title + " - $ " + game.price;

        var deleteBtn = document.createElement("button"); // Criando botão deletar .
        deleteBtn.innerHTML = "Deletar";
        deleteBtn.addEventListener("click", function(){ // Usando botão para deletar .
            deleteGame(item);
        });

        var editBtn = document.createElement("button");
        editBtn.innerHTML = "Editar"
        editBtn.addEventListener("click", function(){
            loadGame(item);
        })


        item.appendChild(deleteBtn);
        item.appendChild(editBtn);

        list.appendChild(item); // Adicionar um filho (item).
    })

}).catch(error =>{
    console.log(error);
});