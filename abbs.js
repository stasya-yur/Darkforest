const uaAlphabet = {
    popular: "АБВГДЕЄЖЗІЙКЛМНОПРСТУФХЦ", // Популярні літери
    normal: "АБВГДЕЄЖЗІЙКЛМНОПРСТУФХЦЧШЩЮЯ", // Всі, крім Ь та И (на початку слова)
};
const wordDisplay = document.querySelector('.word');
const btnNext = document.querySelector('.next-word');

// Функція для отримання випадкового числа в діапазоні
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функція генерації випадкової літери
function getRandomLetter(isEasy) {
    const letters = isEasy ? uaAlphabet.popular : uaAlphabet.normal;
    return letters[Math.floor(Math.random() * letters.length)];
}

function generateAbbreviation() {
    // Отримуємо вибрану складність
    const level = document.querySelector('input[name="level"]:checked').value;
    
    let length;
    let isEasy = false;

    // Встановлюємо параметри залежно від рівня
    if (level === 'easy') {
        length = getRandomInt(3, 4);
        isEasy = true;
    } else if (level === 'medium') {
        length = getRandomInt(4, 6);
    } else { // hard
        length = getRandomInt(5, 8);
    }

    let result = "";
    for (let i = 0; i < length; i++) {
        result += getRandomLetter(isEasy);
    }

    // Виводимо результат
    wordDisplay.textContent = result;
}

// Слухач кнопки
btnNext.addEventListener('click', generateAbbreviation);

// Генерація при завантаженні
generateAbbreviation();