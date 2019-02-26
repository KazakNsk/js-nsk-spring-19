
 //  поля ввода
 //коментарии я делал для себя самого, чтобы не запутаться окончательно.

const text = document.getElementById('text');
const textElem = document.getElementById('textElem');
const inputElem = document.getElementById('inputElem');
const redAlarm = document.getElementById('redAlarm');
const gJ = document.getElementById('goodJob');
const button = document.getElementById('start');

redAlarm.style.color = 'red';
gJ.style.color = 'green';

text.style.display = 'none';
inputElem.style.display = 'none';



 // состояние нашего приложения
const state = {
    text:"",
    wordNumber: 0
};

let words; // массив слов, который будем "раскрашивать" в правильный/неправильный.

let good = false; // правильно ли окончательное слово


// отображение текста через кнопку
button.onclick = function() {
    text.style.display = 'block';  
    button.style.display = 'none'; 
    inputElem.style.display = 'block';
    textElem.style.display = 'inline';
    state.text = "Я запоздал с этой работой потому что ленюсь, рандомизатор и таймер добавлю позже.";
    textElem.innerText = state.text;
    words = state.text.split(" ");
};



 // обработчик нажания на клавиши и введенный пользователем текст с сохраненным ранее
 


 inputElem.addEventListener("input",function(){
    let afterTheWord = words.slice(state.wordNumber + 1).join(" "); //"отрезаем" слово от строки
    textElem.innerText = afterTheWord;

    let letsInput = words[state.wordNumber].split(""); // сплитим по букве
    let bad = false;

    let spreader = ["","",""]; // распределяет на [правильный, оставшийся текст, неправильный] 


    letsInput.forEach((item, i) => {    // смотрим при каждой букве на input и сравниваем с текущим словом
        if ((item === this.value[i]) && !bad) {
            spreader[0] += item;
        } else {
            bad = true;
            (this.value[i] === undefined) ? spreader[1] += item : spreader[2] += item;
        }
    });

    gJ.innerText = words.slice(0, state.wordNumber).join(' ') + ' ' + spreader[0]; 
    redAlarm.innerText = spreader[2];
    textElem.innerText = spreader[1] + ' ' + afterTheWord;

    (redAlarm.innerText === '') ?  inputElem.style.background = 'white' : inputElem.style.background = 'red';

    if (this.value === words[state.wordNumber]) {
        good = true; 
        };
     if (this.value.length-1 > words[state.wordNumber].length){  // проверка на input после верного слова
         good = false;
     }
});

inputElem.addEventListener('keyup', function(e) {  // переходим на следующее слово
    if (e.key=== ' ' && (textElem.innerText === "") && good){
        if (confirm('начать заного?')){
        inputElem.value = '';
        textElem.innerText = state.text;
        state.wordNumber = 0;
        gJ.innerText = "";
        good = false;
        }
    }
    if ((e.key === ' ') && good) {
        inputElem.value = '';
        state.wordNumber++;
        good = false;
    }
});