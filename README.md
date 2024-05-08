APIS USERS

PETICIONES PROTEGIDAS POR TOKEN

PARAMS
{
"nombre" : "Tatiana Flores",
"edad" : "28",
"email" : "prueba2019.20@gmail.com",
"password": "123456789"
}

GET http://localhost:3010/api/users
POST http://localhost:3010/api/users
PUT http://localhost:3010/api/users/:id
DELETE http://localhost:3010/api/users/:id

APIS USERS

PARAMS
{
"nombre" : "Tatiana Flores",
"edad" : "28",
"email" : "prueba2019.20@gmail.com",
"password": "123456789"
}

API SESSION

POST http://localhost:3010/api/auth/login
{
"email" : "demitri2019.20@gmail.com",
"password": "123456789"
}

POST http://localhost:3010/api/auth/logout
AUTHORIZATION BEARER TOKEN :token