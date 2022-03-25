class Validator {
    
    constructor(){
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal', 
            'data-password-validate',        
        ]
    }

    // iniciar a validação de todos os campos
    validate(form) {

       
        // limpa todas as validações antigas
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length) {
            this.cleanValidations(currentValidations);
        }
        

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
    
    // método para validar se passou do máximo de caracteres
    maxlength(input, maxValue) {

        let inputLength = input.value.length;
    
        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
    
        if(inputLength > maxValue) {
          this.printMessage(input, errorMessage);
        }
    
      }
    // validar emails
    emailvalidate(input){
        
        let re = /\S+@\S+\.\S+/;
        let email = input.value;

    let errorMessage = `Insira um e-mail no padrão matheus@email.com`;

    if(!re.test(email)) {
      this.printMessage(input, errorMessage);
    }
}
    // valida se o campo tem apenas letras
    onlyletters(input){

        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números nem caracteres especiais`;

        if(!re.test(inputValue)){
        this.printMessage(input, errorMessage);
        }

    }

    
    // método para imprimir mensagens de erro na tela  
    printMessage(input, msg) {
      
    // checa os erros presentes no input
    let errorsQty = input.parentNode.querySelector('.error-validation');

    // imprimir erro só se não tiver erros
    if(errorsQty === null) {
      let template = document.querySelector('.error-validation').cloneNode(true);

      template.textContent = msg;
  
      let inputParent = input.parentNode;
  
      template.classList.remove('template');
  
      inputParent.appendChild(template);
    }

  }
   
    // verifica se o input é requirido
        required(input){
            let inputValue = input.value;

            if (inputValue === ''){
                let errorMessage = `Este campo é obrigatório`;

                this.printMessage(input, errorMessage);
        }
    }

    // verifica se os campos de senha são iguais
    equal(input, inputName){
        
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Senhas não correspondem`;

        if(input.value != inputToCompare.value){
            this.printMessage(input, errorMessage);
        }
    }

    // valida o campo de senha
    // aqui descobri um erro que se coloco a senha com "espaço" ela passa na validação
    passwordvalidate (input){
        // explorar string em um array
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++){
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
            uppercases++;    
            }else if(!isNaN(parseInt(charArr[i]))){
             numbers++;
            }
        }

        if(uppercases === 0 || numbers ===0){
          let errorMessage = `A senha precisa de um caractere maiúsculo e um número`;

          this.printMessage(input, errorMessage);
        }
    }
    
    // limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
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
