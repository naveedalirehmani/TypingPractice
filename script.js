
const quoteField = document.querySelector('.quotation');
const authorField = document.querySelector('.author');
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const error = document.querySelector('.error');
const speed = document.querySelector('.speed')
const acuracy = document.querySelector('.acuracy')
let start,wpm;

async function getQuotation (){
    let response = await fetch("https://api.quotable.io/random");
    let quotation  = await response.json();
    
    authorField.innerHTML = `Author : ${quotation.author}.`
    const questionArray = quotation.content.split("")
    const totalWords = quotation.content.split(' ');
    quoteField.innerHTML = quotation.content;
    
    input.onkeyup = (e)=>{
        const answerArray = input.value.split('');
        quoteField.innerHTML = "";
        let count = 0;
        questionArray.forEach((element)=>{
            if(count >= answerArray.length){
                const span = document.createElement('span');
                span.classList.add('white');
                span.innerHTML = element;
                quoteField.appendChild(span)
            }else if(element == answerArray[count]){
                const span = document.createElement('span');
                span.classList.add('green')
                span.style.backgroundColor = "green";
                span.innerHTML = element;
                quoteField.appendChild(span)
            }else if (element != answerArray[count]){
                const span = document.createElement('span');
                span.classList.add('red')
                span.style.backgroundColor = "red";
                span.innerHTML = element;
                quoteField.appendChild(span)
            }
            count++;
        })
        if(questionArray.length == answerArray.length){
            const errors = document.querySelectorAll('.red');
            let elapsedTime = new Date()-start;
            wpm = 60*(totalWords.length/Math.trunc(elapsedTime/1000));
            speed.innerHTML = `${wpm.toFixed(2)} Wpm`;
            error.innerHTML = `${errors.length} Errors`;
            let accuracy = (100/questionArray.length)*(questionArray.length-errors.length);
            console.log( accuracy.toFixed(2))
            acuracy.innerHTML = `${accuracy.toFixed(2)}% Accuracy`
            }
    }

  };

btn.onclick = ()=>{
    acuracy.innerHTML = "--";
    error.innerHTML = "0";
    speed.innerHTML = "Wpm";
    input.value="";
    start = new Date();
    getQuotation();
}
window.addEventListener('keyup',(e)=>{
    if(e.keyCode == 13) {
        acuracy.innerHTML = "--";
        error.innerHTML = "0";
        speed.innerHTML = "Wpm";
        start = new Date();
        input.value="";
       getQuotation();
    }
})
  