const wordThemes = {
    forest: {
        title: "Ліс",
        words: [
            "ягода", "галявина", "мох", "береза", "сосна", "ялина", "дуб", "струмок", "стежка", "листопад",
            "гриб", "лисичка", "опеньки", "шишка", "ліщина", "хаща", "болото", "пень", "гілка", "кущ",
            "роса", "туман", "корінь", "дупло", "папороть", "ожина", "чорниця", "суниця", "мурашник", "просіка"
        ]
    },
    animals: {
        title: "Тварини",
        words: [
            "вовк", "лисиця", "ведмідь", "заєць", "олень", "лось", "білка", "їжак", "рись", "кабан",
            "сова", "пугач", "дятел", "журавель", "чапля", "бобер", "видра", "борсук", "куниця", "тхір",
            "ящірка", "жаба", "вуж", "гадюка", "синиця", "ворона", "сокіл", "козуля", "єнот", "бабак"
        ]
    },
    food: {
        title: "Їжа",
        words: [
            "пиріг", "борщ", "варення", "мед", "сир", "хліб", "каша", "юшка", "млинці", "картопля",
            "яблуко", "груша", "слива", "кавун", "диня", "морква", "огірок", "помідор", "капуста", "часник",
            "печиво", "цукерка", "морозиво", "шоколад", "узвар", "чай", "какао", "вареники", "котлета", "салат"
        ]
    },
    objects: {
        title: "Предмети",
        words: [
            "ліхтар", "ключ", "мапа", "рюкзак", "мотузка", "намет", "компас", "книга", "дзеркало", "годинник",
            "свічка", "ножиці", "олівець", "зошит", "дзвін", "скриня", "кошик", "пляшка", "лопата", "молоток",
            "подушка", "ковдра", "чашка", "тарілка", "ложка", "пательня", "телефон", "камера", "парасоля", "рукавички"
        ]
    },
    places: {
        title: "Місця",
        words: [
            "замок", "печера", "село", "місто", "острів", "парк", "міст", "вежа", "школа", "музей",
            "театр", "ринок", "пляж", "гора", "річка", "озеро", "порт", "вокзал", "аеропорт", "стадіон",
            "бібліотека", "лабораторія", "маяк", "сад", "палац", "фортеця", "ферма", "площа", "станція", "водоспад"
        ]
    }
};

const alphabet = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ";
const letterPattern = /[АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ]/;
const nonLetterPattern = /[^АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ]/g;

const maskedWord = document.querySelector("#masked-word");
const roundMessage = document.querySelector("#round-message");
const letterBoard = document.querySelector("#letter-board");
const themeOptions = document.querySelector("#theme-options");
const themeName = document.querySelector("#theme-name");
const missCount = document.querySelector("#miss-count");
const missedLetters = document.querySelector("#missed-letters");
const customWordInput = document.querySelector("#custom-word");
const startCustomButton = document.querySelector("#start-custom");
const randomWordButton = document.querySelector("#random-word");
const revealWordButton = document.querySelector("#reveal-word");

let currentWord = "";
let guessedLetters = new Set();
let wrongLetters = new Set();
let selectedTheme = "forest";
let roundFinished = false;

function normalizeWord(value) {
    return value.trim().replace(/\s+/g, " ").toUpperCase();
}

function getWordLetters(word) {
    return [...new Set(word.replace(nonLetterPattern, "").split(""))];
}

function renderThemes() {
    themeOptions.innerHTML = Object.entries(wordThemes).map(([key, theme]) => `
        <div class="theme-option">
            <input type="radio" name="theme" id="theme-${key}" value="${key}" ${key === selectedTheme ? "checked" : ""}>
            <label for="theme-${key}">${theme.title}</label>
        </div>
    `).join("");

    themeOptions.querySelectorAll("input").forEach((input) => {
        input.addEventListener("change", () => {
            selectedTheme = input.value;
            themeName.textContent = `Тема: ${wordThemes[selectedTheme].title}`;
            startRandomRound();
        });
    });
}

function renderKeyboard() {
    const isFinished = roundFinished;

    letterBoard.innerHTML = alphabet.split("").map((letter) => {
        let stateClass = "";
        if (guessedLetters.has(letter)) stateClass = "correct";
        if (wrongLetters.has(letter)) stateClass = "wrong";

        return `<button class="letter-button ${stateClass}" type="button" data-letter="${letter}" ${stateClass || isFinished ? "disabled" : ""}>${letter}</button>`;
    }).join("");

    letterBoard.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => chooseLetter(button.dataset.letter));
    });
}

function renderWord() {
    if (!currentWord) {
        maskedWord.innerHTML = `<span class="word-letter"></span><span class="word-letter"></span><span class="word-letter"></span><span class="word-letter"></span><span class="word-letter"></span>`;
        return;
    }

    maskedWord.innerHTML = currentWord.split("").map((char) => {
        if (char === " ") return `<span class="word-space"></span>`;
        if (!letterPattern.test(char)) return `<span class="word-letter">${char}</span>`;
        return `<span class="word-letter">${guessedLetters.has(char) ? char : ""}</span>`;
    }).join("");
}

function renderStatus() {
    missCount.textContent = `Помилок: ${wrongLetters.size}`;
    missedLetters.textContent = wrongLetters.size ? [...wrongLetters].join(" ") : "-";
    renderWord();
    renderKeyboard();
}

function startRound(word, sourceTitle) {
    currentWord = normalizeWord(word);
    guessedLetters = new Set();
    wrongLetters = new Set();
    roundFinished = false;
    themeName.textContent = `Тема: ${sourceTitle}`;
    roundMessage.className = "round-message";
    roundMessage.textContent = `Слово загадано: ${getWordLetters(currentWord).length} різних літер`;
    renderStatus();
}

function startRandomRound() {
    const theme = wordThemes[selectedTheme];
    const word = theme.words[Math.floor(Math.random() * theme.words.length)];
    startRound(word, theme.title);
}

function startCustomRound() {
    const word = normalizeWord(customWordInput.value);

    if (!word || !letterPattern.test(word)) {
        roundMessage.className = "round-message warning";
        roundMessage.textContent = "Введіть слово українськими літерами";
        customWordInput.focus();
        return;
    }

    startRound(word, "Своє слово");
    customWordInput.value = "";
}

function chooseLetter(letter) {
    if (!currentWord || roundFinished || guessedLetters.has(letter) || wrongLetters.has(letter)) return;

    if (currentWord.includes(letter)) {
        guessedLetters.add(letter);
        roundMessage.className = "round-message";
        roundMessage.textContent = `Є літера ${letter}`;
    } else {
        wrongLetters.add(letter);
        roundMessage.className = "round-message warning";
        roundMessage.textContent = `Літери ${letter} немає`;
    }

    renderStatus();
    checkWin();
}

function checkWin() {
    const letters = getWordLetters(currentWord);
    const isComplete = letters.every((letter) => guessedLetters.has(letter));

    if (!isComplete) return;

    roundFinished = true;
    guessedLetters = new Set([...guessedLetters, ...letters]);
    roundMessage.className = "round-message win";
    roundMessage.textContent = `Слово відкрито: ${currentWord}`;
    renderStatus();
}

function revealWord() {
    if (!currentWord) return;

    roundFinished = true;
    guessedLetters = new Set([...guessedLetters, ...getWordLetters(currentWord)]);
    roundMessage.className = "round-message win";
    roundMessage.textContent = `Відповідь: ${currentWord}`;
    renderStatus();
}

startCustomButton.addEventListener("click", startCustomRound);
randomWordButton.addEventListener("click", startRandomRound);
revealWordButton.addEventListener("click", revealWord);
customWordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") startCustomRound();
});

renderThemes();
startRandomRound();
