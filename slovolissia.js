const words = [
    "лісок", "ягода", "трава", "листя", "гілка", "сосна", "берег", "камін",
    "хмара", "зоря", "нічка", "річка", "пісня", "думка", "книга", "школа",
    "зошит", "олень", "весна", "вогонь", "медок", "казка", "човен", "мрія",
    "сонце", "місто", "парта", "двері", "птахи", "земля", "свято", "лимон",
    "кавун", "слива", "груша", "пиріг", "сирок", "чайка", "маска", "фарба",
    "грибок", "дощик", "кущик", "озеро", "стежка", "кабан", "білка", "дятел",
    "чапля", "мишка", "борщ", "хліб", "каша", "юшка", "масло", "олія",
    "перець", "банан", "горіх", "мапа", "намет", "книга", "дзвін", "кошик",
    "ложка", "чашка", "ручка", "ніж", "замок", "вежа", "театр", "ринок",
    "пляж", "острів", "вітер", "холод", "тепло", "ранок", "вечір", "слово",
    "океан", "скала", "канал", "отава", "крига", "гроза", "туман", "мороз",
    "багаття", "криниця", "глина", "пісок", "комар", "павук", "бджола", "оса",
    "шлях", "потяг", "метро", "вагон", "гараж", "сарай", "млин", "завод",
    "музей", "офіс", "готель", "аптека", "кафе", "кухня", "ванна", "салон",
    "ківш", "бочка", "миска", "вилка", "келих", "чайник", "праска", "ковдра",
    "рушник", "сумка", "пакет", "нитка", "голка", "гудзик", "папір", "екран",
    "мило", "крем", "мазок", "лікар", "кухар", "актор", "суддя", "пілот",
    "козак", "юнак", "герой", "лідер", "спорт", "гравець", "матч", "раунд",
    "атака", "захист", "фінал", "старт", "урок", "іспит", "цифра", "буква"
];
const keyboardRows = [
    ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ї"],
    ["Ф", "І", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Є"],
    ["Enter", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "Backspace"]
];

const letterPattern = /^[А-ЩЬЮЯЄІЇҐ]$/;
const wordLength = 5;
const maxAttempts = 6;
const stateRank = { absent: 1, present: 2, correct: 3 };

const wordGrid = document.querySelector("#word-grid");
const keyboard = document.querySelector("#slovo-keyboard");
const message = document.querySelector("#game-message");
const answerHint = document.querySelector("#answer-hint");
const roundNumber = document.querySelector("#round-number");
const attemptCount = document.querySelector("#attempt-count");
const newRoundButton = document.querySelector("#new-round");
const showAnswerButton = document.querySelector("#show-answer");

let answer = "";
let currentGuess = "";
let currentRow = 0;
let round = 0;
let finished = false;
let keyStates = {};

function normalize(value) {
    return value.trim().toUpperCase().replace(/Ґ/g, "Г");
}

function pickAnswer() {
    const availableWords = words.filter((word) => normalize(word).length === wordLength);
    return normalize(availableWords[Math.floor(Math.random() * availableWords.length)]);
}

function renderGrid() {
    wordGrid.innerHTML = "";

    for (let row = 0; row < maxAttempts; row += 1) {
        for (let col = 0; col < wordLength; col += 1) {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.dataset.row = row;
            tile.dataset.col = col;
            wordGrid.appendChild(tile);
        }
    }
}

function renderKeyboard() {
    keyboard.innerHTML = "";

    keyboardRows.forEach((row) => {
        const rowElement = document.createElement("div");
        rowElement.className = "keyboard-row";
        rowElement.style.setProperty("--key-count", row.length);

        row.forEach((key) => {
            const button = document.createElement("button");
            const label = key === "Backspace" ? "⌫" : key === "Enter" ? "Enter" : key;
            const state = keyStates[key] || "";

            button.type = "button";
            button.className = `key-button ${key.length > 1 ? "wide" : ""} ${state}`.trim();
            button.textContent = label;
            button.dataset.key = key;
            button.addEventListener("click", () => handleKey(key));
            rowElement.appendChild(button);
        });

        keyboard.appendChild(rowElement);
    });
}

function setMessage(text, tone = "") {
    message.className = `game-message ${tone}`.trim();
    message.textContent = text;
}



function getTile(row, col) {
    return wordGrid.querySelector(`[data-row="${row}"][data-col="${col}"]`);
}

function updateCurrentRow() {
    for (let col = 0; col < wordLength; col += 1) {
        const tile = getTile(currentRow, col);
        const letter = currentGuess[col] || "";

        tile.textContent = letter;
        tile.classList.toggle("filled", Boolean(letter));
    }
}

function pushLetter(letter) {
    if (finished || currentGuess.length >= wordLength) return;

    currentGuess += letter;
    updateCurrentRow();

    const tile = getTile(currentRow, currentGuess.length - 1);
    tile.classList.remove("bump");
    window.requestAnimationFrame(() => tile.classList.add("bump"));
}

function popLetter() {
    if (finished || !currentGuess) return;

    currentGuess = currentGuess.slice(0, -1);
    updateCurrentRow();
}

function scoreGuess(guess) {
    const answerLetters = answer.split("");
    const guessLetters = guess.split("");
    const result = Array(wordLength).fill("absent");
    const remaining = {};

    guessLetters.forEach((letter, index) => {
        if (letter === answerLetters[index]) {
            result[index] = "correct";
            answerLetters[index] = null;
        }
    });

    answerLetters.forEach((letter) => {
        if (!letter) return;
        remaining[letter] = (remaining[letter] || 0) + 1;
    });

    guessLetters.forEach((letter, index) => {
        if (result[index] === "correct") return;
        if (remaining[letter] > 0) {
            result[index] = "present";
            remaining[letter] -= 1;
        }
    });

    return result;
}

function rememberKeyState(letter, state) {
    const previous = keyStates[letter];
    if (!previous || stateRank[state] > stateRank[previous]) {
        keyStates[letter] = state;
    }
}

function shakeRow() {
    for (let col = 0; col < wordLength; col += 1) {
        const tile = getTile(currentRow, col);
        tile.classList.remove("shake");
        window.requestAnimationFrame(() => tile.classList.add("shake"));
    }
}

function submitGuess() {
    if (finished) return;

    if (currentGuess.length !== wordLength) {
        setMessage(`Потрібно ${wordLength} літер`, "warning");
        shakeRow();
        return;
    }

    const result = scoreGuess(currentGuess);

    result.forEach((state, index) => {
        const tile = getTile(currentRow, index);
        tile.classList.remove("filled");
        tile.classList.add(state);
        rememberKeyState(currentGuess[index], state);
    });

    if (currentGuess === answer) {
        finished = true;
        renderKeyboard();
        return;
    }

    currentRow += 1;
    currentGuess = "";

    if (currentRow >= maxAttempts) {
        finished = true;
        setMessage(`Слово було: ${answer}`, "warning");
        answerHint.textContent = "Натисни нове слово, щоб відігратися.";
    } else {
        setMessage("Наступна спроба");
    }

    renderKeyboard();
}

function handleKey(key) {
    if (key === "Enter") {
        submitGuess();
        return;
    }

    if (key === "Backspace") {
        popLetter();
        return;
    }

    if (letterPattern.test(key)) {
        pushLetter(key);
    }
}

function startRound() {
    answer = pickAnswer();
    currentGuess = "";
    currentRow = 0;
    finished = false;
    keyStates = {};
    round += 1;

    renderGrid();
    renderKeyboard();
    setMessage(`Введи слово з ${wordLength} літер`);
}

function showAnswer() {
    finished = true;
    setMessage(`Відповідь: ${answer}`, "warning");
    answerHint.textContent = "Таємницю відкрито. Можна почати новий раунд.";
    updateTopbar();
}

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey) return;

    if (event.key === "Enter") {
        handleKey("Enter");
        return;
    }

    if (event.key === "Backspace") {
        handleKey("Backspace");
        return;
    }

    const key = normalize(event.key);
    if (letterPattern.test(key)) {
        handleKey(key);
    }
});

newRoundButton.addEventListener("click", startRound);
showAnswerButton.addEventListener("click", showAnswer);

startRound();
