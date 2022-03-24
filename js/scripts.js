class Validator {
    
    constructor(){
        this.validations = [

        ]
    }

    // iniciar a validação de todos os campos
    validate(form) {

        //pegar os inputs
        let inputs = form.getElementsByTagName('input');

        console.log(inputs);

        // transformo uma HTMLCollection -> array
        let inputsArray = [...inputs];
        
        // loop nos inputs e validação mediante aos atributos encontrados
        inputsArray.forEach(function(input){

        });
    }
}

/* Resgatando os elementos */
let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit"); 

let validator = new Validator();

// evento que dispara as validações
//Dando função para o botao registrar
submit.addEventListener('click', function(e){ 

    e.preventDefault();

    validator.validate(form);


});
