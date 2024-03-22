# App

Gympass style app.

## RFs (Requisitos funcionais)

-[x] Deve ser possivel se cadastrar;
-[x] Deve ser possivel se autenticar;
-[x] Deve ser possivel obter o perfil de um suário logado;
-[x] Deve ser possivel obter o números de check-ins realizados pelo usuário logado;
-[ ] Deve ser possivel o usuário obter seu histórico de check-ins;
-[ ] Deve ser possivel o usuário buscar academias próximas;
-[ ] Deve ser possivel o usuário buscar academias pelo nome;
-[x] Deve ser possivel o usuário realizar check-in em uma academia;
-[ ] Deve ser possivel validar o check-in de um usuário;
-[x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negocio)

-[x] O usuário não deve poder se cadastrar com um e-mail duplicado;
-[x] O usuário não pode fazer 2 check-ins no mesmo dia;
-[x] O usuário não pode fazer check-in se não estiver perto da academia;
-[ ] O check-in só pode ser validado até 20 minutos após criado;
-[ ] O check-in só pode ser validado por administradores;
-[ ] A academia só pode ser cadastrada por administradores;

-

## RNFs (Regras nao-funcionais)

-[x] A senha do usuário precisa estar criptografada;
-[x] Os dados de aplicação precisam estar persistidos em um banco PostgreSQL;
-[ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
-[ ] O usuário deve ser identificado por um JWT (Json Web Token);
