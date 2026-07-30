document.addEventListener("DOMContentLoaded", () => {
    const targetEl = document.getElementById("word-target");
    const timerEl = document.getElementById("timer");
    const descriptionEl = document.getElementById("word-description");
    const letterRowsEl = document.getElementById("letter-rows");
    const messageEl = document.getElementById("game-message");
    const customWordInput = document.getElementById("custom-word");
    const startCustomButton = document.getElementById("start-custom-word");
    const randomWordButton = document.getElementById("new-random-word");
    const checkButton = document.getElementById("check-answers");
    const resetButton = document.getElementById("reset-game");
    const leaderboardBody = document.getElementById("leaderboard-body");
    const leaderboardKey = "word-chain-leaderboard";

    const wordPool = [
        "КАВА",
        "ЛІС",
        "ЯГОДА",
        "МУХОМОР",
        "ЗАГАДКА",
        "СОНЦЕ",
        "ПЕРЕПЛУТ",
        "ОСІНЬ",
        "ШТАНЬ",
        "ТРАВА"
    ];

    let currentWord = "";
    let usedWords = [];
    let timerId = null;
    let elapsedSeconds = 0;
    let leaderboard = [];

    const normalizeLetter = value => value.toUpperCase().normalize("NFKD").replace(/[^\p{L}]/gu, "");

    const formatTime = seconds => {
        const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${mins}:${secs}`;
    };

    const startTimer = () => {
        if (timerId) {
            clearInterval(timerId);
        }
        elapsedSeconds = 0;
        timerEl.textContent = `Час: ${formatTime(elapsedSeconds)}`;
        timerId = setInterval(() => {
            elapsedSeconds += 1;
            timerEl.textContent = `Час: ${formatTime(elapsedSeconds)}`;
        }, 1000);
    };

    const stopTimer = () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
    };

    const renderRows = () => {
        const letters = currentWord.split("");
        letterRowsEl.innerHTML = letters.map(letter => `
            <div class="letter-row">
                <div class="letter-label">${letter}</div>
                <input class="letter-input" type="text" placeholder="Придумай слово на ${letter}" data-letter="${letter}">
            </div>
        `).join("");
    };

    const renderLeaderboard = () => {
        if (!leaderboard.length) {
            leaderboardBody.innerHTML = '<tr><td colspan="3">Ще немає результатів.</td></tr>';
            return;
        }

        leaderboardBody.innerHTML = leaderboard
            .slice(0, 10)
            .map((entry, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${entry.word}</td>
                    <td>${formatTime(entry.time)}</td>
                </tr>
            `)
            .join("");
    };

    const setWord = (word) => {
        currentWord = word.toUpperCase();
        renderRows();
        targetEl.textContent = `Слово: ${currentWord}`;
        descriptionEl.textContent = `Розбийте слово на літери. Для кожної літери придумайте своє слово. Якщо літери повторюються, для кожної з них потрібне окреме слово. Якщо в слові є складні літери, як «ь», перевіряється лише їхня наявність.`;
        messageEl.textContent = "Введіть слова для кожної літери і натисніть «Перевірити».";
        startTimer();
    };

    const pickRandomWord = () => {
        const nextWord = wordPool[Math.floor(Math.random() * wordPool.length)];
        setWord(nextWord);
    };

    const validateAnswers = () => {
        if (!currentWord) {
            messageEl.textContent = "Спочатку оберіть або впишіть слово.";
            return;
        }

        if (usedWords.length && currentWord && !letterRowsEl.querySelectorAll(".letter-input").length) {
            messageEl.textContent = "У цьому раунді немає полів для вводу.";
            return;
        }

        const rows = Array.from(letterRowsEl.querySelectorAll(".letter-input"));
        const answers = rows.map(input => normalizeLetter(input.value));
        const uniqueAnswers = new Set(answers.filter(Boolean));

        if (answers.some(answer => !answer)) {
            messageEl.textContent = "Заповніть усі поля перед перевіркою.";
            return;
        }

        if (uniqueAnswers.size !== answers.length) {
            messageEl.textContent = "Усі слова мають бути різними.";
            return;
        }

        if (usedWords.some(word => answers.includes(word))) {
            messageEl.textContent = "Одне або кілька слів уже використовувалися в цьому сеансі.";
            return;
        }

        const letters = currentWord.split("");
        const invalid = answers.findIndex((answer, index) => {
            const requiredLetter = letters[index];
            const startsWith = answer.startsWith(requiredLetter);
            const containsSoftSign = requiredLetter === "Ь";
            return !startsWith && !containsSoftSign;
        });

        if (invalid !== -1) {
            messageEl.textContent = `Слово №${invalid + 1} не підходить: воно має починатися з літери «${letters[invalid]}».`;
            return;
        }

        usedWords = [...usedWords, ...answers];
        leaderboard.unshift({ word: currentWord, time: elapsedSeconds });
        leaderboard = leaderboard.slice(0, 10);
        localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
        renderLeaderboard();
        stopTimer();
        messageEl.textContent = `Чудово! Слово ${currentWord} розібрано за ${formatTime(elapsedSeconds)}.`;
    };

    startCustomButton.addEventListener("click", () => {
        const customValue = customWordInput.value.trim();
        if (!customValue) {
            messageEl.textContent = "Введіть слово перед стартом.";
            return;
        }
        setWord(customValue);
        customWordInput.value = "";
    });

    randomWordButton.addEventListener("click", pickRandomWord);
    checkButton.addEventListener("click", validateAnswers);
    letterRowsEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            validateAnswers();
        }
    });
    customWordInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const customValue = customWordInput.value.trim();
            if (!customValue) {
                messageEl.textContent = "Введіть слово перед стартом.";
                return;
            }
            setWord(customValue);
            customWordInput.value = "";
        }
    });
    resetButton.addEventListener("click", () => {
        usedWords = [];
        messageEl.textContent = "Раунд скинуто. Оберіть нове слово.";
        stopTimer();
        timerEl.textContent = "Час: 00:00";
        letterRowsEl.innerHTML = "";
        targetEl.textContent = "Слово: —";
        descriptionEl.textContent = "Оберіть слово, щоб почати раунд.";
    });

    const savedLeaderboard = localStorage.getItem(leaderboardKey);
    if (savedLeaderboard) {
        try {
            leaderboard = JSON.parse(savedLeaderboard);
        } catch (error) {
            leaderboard = [];
        }
    }

    renderLeaderboard();
    pickRandomWord();
});
