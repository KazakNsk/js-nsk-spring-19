
 //  поля ввода
 //коментарии я делал для себя самого, чтобы не запутаться окончательно.

const text = document.getElementById('text');
const textElem = document.getElementById('textElem');
const inputElem = document.getElementById('inputElem');
const redAlarm = document.getElementById('redAlarm');
const gJ = document.getElementById('goodJob');
const button = document.getElementById('start');
const timerElem = document.getElementById('timerElem');
const yourSpeed = document.getElementById('speed');

redAlarm.style.color = 'red';
gJ.style.color = 'green';

text.style.display = 'none';
inputElem.style.display = 'none';
timerElem.style.display = 'none';
yourSpeed.style.display = 'none';


 // состояние нашего приложения
const state = {
    text:"",
    wordNumber: 0
};

let words; // массив слов, который будем "раскрашивать" в правильный/неправильный.

let good = false; // правильно ли окончательное слово

let counterKey = 0; // счетчик букв


// вопрос :начать заного?
function replay (){
    if (confirm('Начать заного?')){
                counterKey = 0;
                inputElem.value = '';
                textElem.innerText = state.text;
                state.wordNumber = 0;
                gJ.innerText = "";
                redAlarm.innerText = "";
                inputElem.style.background = 'white';
                good = false;
                    text.style.display = 'none';
                    inputElem.style.display = 'none';
                    timerElem.style.display = 'none';
                    yourSpeed.style.display = 'none';
                    button.style.display = 'block';
                    
    }
    else{
        alert('ну тогда всё.')
        text.style.display = 'none';
        inputElem.style.display = 'none';
        timerElem.style.display = 'none';
        yourSpeed.style.display = 'none';
    }
}

// рандомизатор
function makePhrases() { 
    let words1 = ["Товарищи,", "С другой стороны,", "Равным образом,", "Не следует, однако, забывать, что", "Таким образом,", "Повседневная практика показывает, что", "Позвольте Вам напомнить, что", "В целом, конечно,"];
    let words2 = ["реализация намеченных плановых заданий", "рамки и место обучения кадров", "постоянный количественный рост и сфера нашей активности", "сложившаяся структура организации", "новая модель организационной деятельности", "дальнейшее развитие различных форм деятельности", "внедрение современных подходов", "оптимизация основных целей"];
    let words3 = ["играет важную роль в формировании",  "требуют от нас анализа", "требуют определения и уточнения", "способствует подготовке и реализации", "обеспечивает широкому кругу (специалистов) участие в формировании", "позволяет выполнить важные задания по разработке", "выявляет срочную потребность"];
    let words4 = ["существенных финансовых и административных условий", "дальнейших направлений развития", "системы массового участия", "позиций, занимаемых участниками в отношении поставленных задач", "новых предложений", "направлений прогрессивного развития", "экономических и неэкономических факторов и перспектив"];
   
    let rand1 = Math.floor(Math.random() * words1.length);
    let rand2 = Math.floor(Math.random() * words2.length);
    let rand3 = Math.floor(Math.random() * words3.length);
    let rand4 = Math.floor(Math.random() * words4.length);
    let phrase = words1[rand1] + " " + words2[rand2] +
           " " + words3[rand3] + " " + words4[rand4] + ".";
    return phrase;
    }
 



// отображение текста через кнопку
button.onclick = function() {
    text.style.display = 'block';  
    button.style.display = 'none'; 
    inputElem.style.display = 'block';
    textElem.style.display = 'inline';
    timerElem.style.display = 'block';
    yourSpeed.style.display = 'block';
    state.text = makePhrases();
    textElem.innerText = state.text;
    

    words = state.text.split(" ");


    // таймер
    let timer = Math.round(state.text.length*0.5);
    let time = 0;

    timerElem.innerText = "Оставшееся время: " + timer;
    yourSpeed.innerText = "Твоя скорость символов в минуту: " + 0;


    const timerId = setTimeout(function tick(){
        timer--;
        ++time;
        if (timer < 0){
            timerElem.innerText = "Время кончилось";
            clearTimeout(timerId);
            setTimeout(()=>replay(),600);
        }
        else if (textElem.innerText === ""){
            timerElem.innerText = "Жми пробел! Ты успел!";
           clearTimeout(timerId);
        }
        else if (timer >= 0){
            timerElem.innerText = "Оставшееся время: " + timer;
            yourSpeed.innerText = "Твоя скорость символов в минуту: " + Math.round(counterKey/(time/60));
            timerId = setTimeout(tick,1000);
        }
    },1000);

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


inputElem.addEventListener('keyup', function(e) { 
    if ((e.key=== ' ') && (textElem.innerText === "") && good){
        replay();
    }
    if ((e.key === ' ') && good) {
        inputElem.value = '';
        counterKey = counterKey + words[state.wordNumber].length + 1;
        state.wordNumber++;
        good = false;
    }
});




