

function checkInputs(inputs) {
  var filled = true;

  inputs.forEach(function(input) {

    if(input.value === "") {
      filled = false;
    }

  });

  return filled;

}

var text = document.getElementById("invalidEmail");

function errorMessage(){
  text.innerHTML = "Insira um endereço de e-mail válido.";
  text.style.color = "red";
  }

function validateEmail(email) {
  var emailPattern =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailPattern.test(email)
}

var inputs = document.querySelectorAll("input");
var button = document.querySelector("button");

inputs.forEach(function(input) {

  input.addEventListener("keyup", function() {
    let email = document.getElementById("email").value
    if (
      validateEmail(email) === true &&
      checkInputs(inputs)
    ) {
      button.disabled = false;
      text.innerHTML = ""
    } else {
      button.disabled = true;
      errorMessage()
    }
  });
});
