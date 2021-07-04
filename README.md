# Prezado Recrutador,

Este código abarca o desafio de back-end para a Morada, a proposta é que seja uma api simples e de fácil leitura, que retorna um pdf customizado  
de valores baseado em uma requisição com o id do empreendimento, as informações estão hospedadas em um banco de dados não-relacional (MongoDB), cujo os Schemas poderão  
ser encontrados na pasta "models".  

As tecnologias utilizadas foram as requisitadas pelo desafio: Node.JS + Express, MongoDB + Mongoose, com o apoio de algumas bibliotecas (Como PDFKit e crypto)

## Também utilizei Jest + Supertest para os testes das rotas, o script de teste pode ser ativado com "npm run test", conforme o exemplo:

[![TEST](https://i.ibb.co/dWPw8VG/TEST.png)](https://imgbb.com/)  

## Git Flow

Todas as features e alterações foram realizadas na branch "Staging" e feito o devido merge na "Master" após os testes das funcionalidades

## Documentação

Todos os endpoints (locais e hospedados na núvem) podem ser encontrados na documentação oficial da api:

https://morada-pdf-documenter.vercel.app/


## Exemplo rápido

Um exemplo rápido de pdf gerado pela api e hospedado em cloud, no heroku:

https://morada-pdf-api.herokuapp.com/pdf/valores/60e221be514e602aa4512a86

## Considerações finais

Primeiramente, muito grato por essa janela de oportunidade, fico disponível para qualquer dúvida, e na esperança de que essa api seja meu passaporte para o foguete da Morada.

Lucas Passos.
