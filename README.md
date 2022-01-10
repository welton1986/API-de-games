# API-de-games

Esta API é utilizada para buscar , adicionar , atualizar e deletar uma lista de games , fins didaticos.
## Endpoints
### Get /games
Este endpoint é responsavel por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
```
 {
        "id": 23,
        "title": "Call of Duty",
        "year": 2019,
        "price": 60
    },
    {
        "id": 65,
        "title": "Sea of thieves",
        "year": 2018,
        "price": 40
    },
    {
        "id": 2,
        "title": "Minecraft",
        "year": 2012,
        "price": 20
    }

```
Caso esta resposta acontesça , você vai receber a listagem de todos os games .
##### Falha na autenticação! 401
Caso essa resposta aconteça , isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos , token invalido , token expirado.
