class Validator {
    
    constructor(){
        this.validations = [
            'data-min-length',
        ]
    }

    // iniciar a validação de todos os campos
    validate(form) {

        //pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //console.log(inputs);

        // transformo uma HTMLCollection -> array
        let inputsArray = [...inputs];
        
        // loop nos inputs e validação mediante aos atributos encontrados
        inputsArray.forEach(function(input){

            // fazer validação de acordo com o atributo do input
            for(let i = 0; this.validations.length > i; i++){
                if (input.getAttribute(this.validations[i]) != null){
                    
                    // limpa string para saber o método
                    let method = this.validations[i].replace("data-", "").replace("-", "");
                    
                    // valor do input
                    let value = input.getAttribute(this.validations[i]);

                    // invoca o método
                    this[method](input,value);

                }
            }
        }, this);
    }
    // método para validar se tem um mínimo de caracteres
    minlength(input, minValue) {
        
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
          }
    }

    printMessage(input, msg) {
        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;
        
        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);
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
