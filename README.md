# API-de-games

Esta API é utilizada para buscar , adicionar , atualizar e deletar uma lista de games , fins didaticos.
## Endpoints
### Get /games
Este endpoint é responsavel por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso esta resposta acontesça , você vai receber a listagem de todos os games .

Exemplo de resposta.
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
##### Falha na autenticação! 401
Caso essa resposta aconteça , isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos , token invalido , token expirado.

Exemplo de resposta.
```
"err": "Token invalido"

```



### Post /auth
Este endpoint é responsável por fazer o processo de login.
#### Parametros
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema , com o seu determinado e-mail.

Exemplo:

```
{
"email": "welton@welton.com",
"password": "1234"

}
```

#### Respostas
##### OK! 200
Caso esta resposta acontesça , você vai receber o token JWT para conseguir acessar endpoints protegidos na API .

Exemplo de resposta.
```
 {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3ZWx0b25Ad2VsdG9uLmNvbSIsImlhdCI6MTY0MTgyODIxMywiZXhwIjoxNjQyMDAxMDEzfQ.DEqQ-IFPANF2-9q89HqcM11QR4cFq1dbIUYb93Y5Iqg"
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça , isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos , senha ou e-mail incorretos.

Exemplo de resposta.
```
{err:"Credenciais invalidas"}

```
