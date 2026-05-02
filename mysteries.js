const wordsBank = [
    "ЕНЦИКЛОПЕДІЯ", "ВЕЛОСИПЕДИСТ", "МАТЕМАТИКА", "КОНДИТЕРСЬКА", "ІЛЮСТРАЦІЯ", "ХОЛОДИЛЬНИК", "КЛАВІАТУРА", "ТЕЛЕВІЗОР", "АВТОМОБІЛЬ", "КОМП'ЮТЕР",
    "РЯТУВАЛЬНИК", "ВЕТЕРИНАРІЯ", "ГІМНАСТИКА", "БАСКЕТБОЛІСТ", "ЕКСКАВАТОР", "МОРОЗИВО", "МАГНІТОФОН", "АРХІТЕКТУРА", "БУДІВЕЛЬНИК", "ЛАБОРАТОРІЯ",
    "ПРОГРАМУВАННЯ", "УБОЛІВАЛЬНИК", "ВЕНТИЛЯТОР", "ДИРИЖАБЛЬ", "ЕВАКУАТОР", "БІБЛІОТЕКАР", "СТОМАТОЛОГІЯ", "МАНДРІВНИК", "ПЕРЕХРЕСТЯ", "ПІДРУЧНИК",
    "ТРАНСПОРТ", "КОЛЕКЦІОНЕР", "ДИСТАНЦІЯ", "ВИХОВАТЕЛЬ", "АБОНЕМЕНТ", "КАНЦЕЛЯРІЯ", "СКОЛОПЕНДРА", "УМИВАЛЬНИК", "ФОТОГРАФІЯ", "САЛАМАНДРА",
    "БАРРАКУДА", "ЕКСКУРСІЯ", "АКРОБАТИКА", "ЧЕМПІОНАТ", "ПЕРЕМОЖЕЦЬ", "РЮКЗАЧОК", "ХРЕСТОМАТІЯ", "ЧЕРЕПАХА", "МАРМЕЛАД", "ГАЗИРОВКА",
    "БУТЕРБРОД", "НЕКТАРИН", "ПОДОРОЖ", "ЗАЛІЗНИЦЯ", "МЕТЕОРИТ", "БЛИСКАВКА", "СОНЯШНИК", "КАРУСЕЛЬ", "ПРИГОДА", "ТЕЛЕГРАМА",
    "ГЕРБАРІЙ", "ТЕРИТОРІЯ", "КОЛЕКЦІЯ", "ВАНТАЖІВКА", "АПЕЛЬСИН", "ВЕРТОЛІТ", "ГАЛАКТИКА", "ЕСКАЛАТОР", "ІЛЮЗІОНІСТ", "ОРКЕСТР",
    "СУПУТНИК", "ФЕСТИВАЛЬ", "ХМАРОЧОС", "ЦИСТЕРНА", "КВАДРОЦИКЛ", "КРОСІВКИ", "МАРАФОН", "ОЛІМПІАДА", "РАКЕТКА", "СКАКАЛКА",
    "ТРЕНУВАННЯ", "ГАРДЕРОБ", "ДЗЕРКАЛО", "ЕЛЕКТРОНІКА", "ІНСТРУМЕНТ", "КАСТРУЛЯ", "ОБКЛАДИНКА", "ПИЛОСОС", "РАДІАТОР", "СВІТИЛЬНИК",
    "ФОРТОЧКА", "ЧЕМОДАН", "ЖУРНАЛІСТ", "ЗВАРЮВАЛЬНИК", "ОХОРОНЕЦЬ", "ПРОГРАМІСТ", "АВТОБУС", "КОМБАЙН", "КАНІКУЛИ", "ЩОДЕННИК",
    "ЗАКЛАДКА", "ВОСЬМИНІГ", "ОРАНГУТАНГ", "ДИНОЗАВР", "ХАМЕЛЕОН", "БРОНЕНОСЕЦЬ", "ВОЛЕЙБОЛ", "ВАРЕНИКИ", "МАКАРОНИ", "АЕРОДРОМ",
    "ВИКЛАДАЧ", "ГОРИЗОНТ", "ДЕКОРАЦІЯ", "ЕЛЕКТРИКА", "ЖУРАВЕЛЬ", "ЗАВІРЮХА", "ІНТЕРНЕТ", "КАРНАВАЛ", "ЛАБІРИНТ", "МЕХАНІЗМ",
    "НАВІГАТОР", "ОКЕАНАРІУМ", "ПАРАШУТ", "СКАФАНДР", "ТЕЛЕГРАФ", "УНІВЕРСИТЕТ", "ФАНТАЗІЯ", "ХАРАКТЕР", "ЦЕНТИНЕР", "БАРАБАНЩИК",
    "ВІКТОРИНА", "ГЕОГРАФІЯ", "ДИНАМІКА", "ЕКОЛОГІЯ", "ЄДИНОРІГ", "ЖЕРЕБКУВАННЯ", "ЗНАМЕННИК", "ІЄРОГЛІФ", "КАЛЕЙДОСКОП", "ЛОКОМОТИВ",
    "МЕТЕОРОЛОГ", "НАТЮРМОРТ", "ОБЕРЕЖНІСТЬ", "ПЕРГАМЕНТ", "РЕДАКТОР", "СИНТЕЗАТОР", "ТЕРМОМЕТР", "ФОЛЬКЛОР", "ХРОНОМЕТР", "ЦИФЕРБЛАТ",
    "ШТУКАТУР", "ЕВАКУАЦІЯ", "ЯРМАРКА", "ГРАМОТНІСТЬ", "ДОКУМЕНТ", "ЕВОЛЮЦІЯ", "ІНТЕРВ'Ю", "ЛІКАРНЯ", "МУЗИКАНТ", "НАСЛІДОК",
    "СВЯТКУВАННЯ", "УСМІШКА", "ХУДОЖНИК", "ЦУКЕРКА", "ШОКОЛАД", "ЕНЕРГІЯ", "АДМІРАЛ", "БОГАТИР", "ГОСПОДАР", "ДОПОМОГА",
    "АСТРОНОМІЯ", "ВІДЕОІГРИ", "ГІДРОЛОГ", "ДЕМОКРАТІЯ", "ЕКСПОЗИЦІЯ", "ЖУЙКА", "ЗАБАВКА", "ІНФОРМАЦІЯ", "КАТАСТРОФА", "ЛІТЕРАТУРА",
    "МЕТАЛУРГІЯ", "НАТУРАЛІСТ", "ОГОЛОШЕННЯ", "ПАНОРАМА", "РЕВОЛЮЦІЯ", "СВІТЛОФОР", "ТЕЛЕГРАФІСТ", "УЯВЛЕННЯ", "ФАРМАЦЕВТ", "ХІРУРГІЯ",
    "ЦЕРЕМОНІЯ", "ШАХМАТИСТ", "ЕКСПЕДИЦІЯ", "ЮВЕЛІР", "АЕРОПОРТ", "БЛАГОРОДСТВО", "ВЛАСНИК", "ГРОМАДЯНИН", "ДИСЦИПЛІНА", "ЕФЕКТИВНІСТЬ"
];
let currentWord = "";
let timer;
let timeLeft = 60;
let foundWords = [];

const display = document.getElementById('word-display');
const timerEl = document.getElementById('timer');
const input = document.getElementById('player-input');
const list = document.getElementById('words-list');
const count = document.getElementById('word-count');
const nextBtn = document.getElementById('next-word-btn');

function startGame() {
    clearInterval(timer);
    
    // Отримуємо налаштований час
    const selectedTime = document.querySelector('input[name="time-limit"]:checked').value;
    timeLeft = parseInt(selectedTime);
    
    foundWords = [];
    list.innerHTML = "";
    count.textContent = "0";
    input.value = "";
    input.disabled = false;
    input.focus();
    
    currentWord = wordsBank[Math.floor(Math.random() * wordsBank.length)];
    display.textContent = currentWord;
    
    updateTimerDisplay();
    startTimer();
}

function updateTimerDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            input.disabled = true;
            display.textContent = "ЧАС ВИЙШОВ";
        }
    }, 1000);
}

function handleInput() {
    const word = input.value.toUpperCase().trim();
    if (!word) return;

    const isValid = word.length >= 3 && !foundWords.includes(word) && canBeFormed(word, currentWord);

    if (isValid) {
        foundWords.push(word);
        const div = document.createElement('div');
        div.className = 'found-word-item';
        div.textContent = word;
        list.prepend(div);
        count.textContent = foundWords.length;
        input.value = "";
    } else {
        // Ефект помилки
        input.classList.add('error-shake');
        setTimeout(() => input.classList.remove('error-shake'), 400);
    }
}

function canBeFormed(target, source) {
    let sourceLetters = source.split('');
    for (let char of target) {
        let index = sourceLetters.indexOf(char);
        if (index === -1) return false;
        sourceLetters.splice(index, 1);
    }
    return true;
}

nextBtn.addEventListener('click', startGame);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleInput();
});