///////

var questions = [];
var resposta = new Object();
var clicked = false;

function new_question(descricao, foto, medico, caritativo, social){
  questions.push({
    descricao: descricao,
    foto: "background-image: url('images/" + foto +"')",
    medico: medico,
    caritativo: caritativo,
    social: social
  });
};

new_question(
  "Moça em cadeiras de rodas tentando subir numa calçada.",
  "situacao1.jpg",
  "Essa moça devia procurar um médico, pois deve haver um tratamento para que ela volte a andar.",
  "Que pena, essa moça está presa a uma cadeira de rodas e sofre para se locomover pela cidade.",
  "A sociedade pode eliminar todas as barreiras para que essa moça se locomova pela cidade.");

new_question(
  "Criança com deficiência intelectual chegando na escola levada pela família.",
  "situacao2.jpg",
  "Ela precisa estudar numa escola especial. Deve existir algum remédio para melhorar a cabeça dela.",
  "Ela precisa viver numa instituição onde sempre tenha alguém para cuidar dela.",
  "Ela precisa estudar numa escola convencional, junto com as demais crianças, com e sem deficiência.");

new_question(
  "Mãe conversando com a filha surda em libras.",
  "situacao3.jpg",
  "Deve haver uma operação ou um aparelho auditivo que vai ajudar essa menina.",
  "Deve ser muito difícil ter uma filha surda que sempre vai precisar de ajuda.",
  "Queria saber como elas conseguem se comunicar tão bem!");

new_question(
  "Mulher cega andando pelas ruas de uma cidade com cão-guia.",
  "situacao4.jpg",
  "Será que não há alguma nova tecnologia que possa ajudar essa mulher a enxergar normal, como todos nós?",
  "Como podem deixar essa mulher sair sozinha na rua? Ela precisa de alguém para auxiliá-la.",
  "Será que esta mulher precisa de ajuda para atravessar a rua? Vou perguntar.");

new_question(
  "Pessoas sem deficiência e uma com deficiência física e acompanhante numa piscina.",
  "situacao5.jpg",
  "O ambiente aquático é um ótimo espaço para reabilitação.",
  "Que bom que ele está acompanhado para que não corra riscos.",
  "Que piscina linda! Eles vão se divertir!");

var nQuestions = questions.length;

var descricao = $(".description");
var foto = $(".scenes");
var medico = $(".medico");
var caritativo = $(".caritativo");
var social = $(".social");

function initQuestion(){
  atual = i+1;
  anterior = i;
  $(".scenes").removeClass("situacao" + anterior);
  $(".scenes").addClass("situacao" + atual);
  descricao.focus();

  descricao.text(questions[i].descricao);
  foto.attr("style",questions[i].foto);
  medico.text(questions[i].medico);
  caritativo.text(questions[i].caritativo);
  social.text(questions[i].social);
  i++;
  clicked = false;
  return i;
}

///////

var feedback = $(".feedback");
var navTitle = $("nav h1");
var intro = $(".intro");
var quiz = $(".quiz")
var score = $(".score");
var alternative = $(".alternatives button");
var btnStart = $(".btn-start");

function initRea(){

  feedback.hide();
  quiz.hide();

  btnStart.on("click", function(){
    window.setTimeout(function(){
      intro.fadeOut();
      quiz.show();
      navTitle.fadeIn();
      // remove tabindex de logos após início
      $("nav *").attr("tabindex", "-1");
    }, 500);

    resposta.ra = $("#ra").val();
    resposta.dataInicio = Date();
  })
}

var maxColor = 255;
var colorByQuestion = Math.floor(maxColor/nQuestions);

var r = 0;
var g = 0;
var b = 0;
score.css("background-color", "rgb("+r+","+g+","+b+")");

function changeColor(r = r, g = g, b = b){
  score.css("background-color", "rgb("+r+","+g+","+b+")");
};

function showFeedback(){

  resposta.dataTermino = Date();

  if(r/colorByQuestion == 1){
    var valueCaritativo = r/colorByQuestion + " situação"
  } else {
    var valueCaritativo = r/colorByQuestion + " situações"
  }

  if(g/colorByQuestion == 1){
    var valueMedico = g/colorByQuestion + " situação"
  } else {
    var valueMedico = g/colorByQuestion + " situações"
  }

  if(b/colorByQuestion == 1){
    var valueSocial = b/colorByQuestion + " situação"
  } else {
    var valueSocial = b/colorByQuestion + " situações"
  }

  feedback.fadeIn();
  feedback.css("background-color","rgb("+r+","+g+","+b+")");
  $(".feedbackMedico span").text(valueMedico);
  $(".feedbackCaritativo span").text(valueCaritativo);
  $(".feedbackSocial span").text(valueSocial);

  submitResponse(resposta);
};

function checkClick() {
  window.setTimeout(function(){

    if (clickCounter < nQuestions) {
      randomOrder();
      initQuestion();
      score.css("box-shadow","0 0 0 20px rgba("+r+","+g+","+b+", .5)");

    } else {
      var delay = 750;
      alternative.unbind();
      score.css("box-shadow","0 0 0 2500px rgba("+r+","+g+","+b+", 1)");
      window.setTimeout(function(){
        showFeedback();
        window.setTimeout(function(){
          quiz.remove();
        }, delay)
      }, delay);
    }

  }, 500);
  clickCounter++;
}
var clickCounter = 0;

/// Ordem randômica de questões

function randomOrder(){
  var random = Math.random();
  var aMedico = $(".alternatives .medico");
  var aCaritativo = $(".alternatives .caritativo");
  var aSocial = $(".alternatives .social");

  if(random <= 0.16){
    aMedico.css("order","3");
    aCaritativo.css("order","1");
    aSocial.css("order","2");
  } else if(random > 0.16 && random <= 0.32){
    aMedico.css("order","2");
    aCaritativo.css("order","1");
    aSocial.css("order","3");
  } else if(random > 0.32 && random <= 0.48){
    aMedico.css("order","2");
    aCaritativo.css("order","3");
    aSocial.css("order","1");
  } else if(random > 0.48 && random <= 0.64){
    aMedico.css("order","1");
    aCaritativo.css("order","3");
    aSocial.css("order","2");
  } else if(random > 0.64 && random <= 0.8){
    aMedico.css("order","3");
    aCaritativo.css("order","2");
    aSocial.css("order","1");
  } else {
    aMedico.css("order","1");
    aCaritativo.css("order","2");
    aSocial.css("order","3");
  }
};

///////

function submitResponse(obj) {
  $.ajax({
    type: "POST",
    url: "submit",
    data: obj
  });
}

///////

initRea();

var i = 0;
initQuestion();

alternative.on("click", function(){
  if (!clicked) {
    clicked = true;
    score.css("box-shadow","none");
    $(this).blur();

    opcao = "";
    if($(this).hasClass("medico")){
      g = g + colorByQuestion;
      opcao = "medico";
    } else if($(this).hasClass("caritativo")){
      r = r + colorByQuestion;
      opcao = "caritativo";
    } else if($(this).hasClass("social")){
      b = b + colorByQuestion;
      opcao = "social"
    }
    changeColor(r, g, b);

    switch(clickCounter) {
    case 0:
        resposta.pergunta1 = opcao;
        break;
    case 1:
        resposta.pergunta2 = opcao;
        break;
    case 2:
        resposta.pergunta3 = opcao;
        break;
    case 3:
        resposta.pergunta4 = opcao;
        break;
    case 4:
        resposta.pergunta5 = opcao;
        break;
    }

    checkClick();
  }
});


////
