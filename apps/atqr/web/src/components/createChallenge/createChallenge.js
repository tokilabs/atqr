"use strict";
exports.__esModule = true;
exports.challengeDto = void 0;
var api_1 = require("../../services/api");
var domain_1 = require("@atqr/domain");
// challenge attribute
var yourName = document.getElementById('seu-nome').innerHTML;
var yourEmail = document.getElementById('seu-email').innerHTML;
var deadlineString = document.getElementById('deadline').innerHTML;
var deadline = new Date(deadlineString);
var supervisorName = document.getElementById('nome-supervisor').innerHTML;
var supervisorEmail = document.getElementById('email-supervisor').innerHTML;
var goal = document.getElementById('descricao').innerHTML;
var priceString = document.getElementById('price').innerHTML;
var price = Number(priceString);
var emailAddress = new domain_1.EmailAddress(yourEmail);
var player = new domain_1.Player(yourName, emailAddress);
exports.challengeDto = {
    goal: goal,
    deadline: deadline,
    price: price,
    player: player,
    supervisorName: supervisorName,
    supervisorEmail: supervisorEmail
};
var challenge = await api_1.atqrApi.challenges.create(exports.challengeDto);
//page construction
var nextStepBtn = document.getElementById('proximo-passo-btn');
nextStepBtn.addEventListener('click', challenge);
var goalTitle = document.getElementById('main-title');
goalTitle.innerHTML = 'seu desafio ' + challenge.goal + ' foi criado';
//page challenge created
var resumeCreatedChallenge = document.getElementById('text');
resumeCreatedChallenge.innerHTML =
    'seu desafio é' +
        challenge.goal +
        'até a data' +
        challenge.deadline +
        '. Caso não cumpra com seu objetivo, será cobrado de você' +
        challenge.price +
        'reais';
// end page challenge created
