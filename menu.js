document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    if (header) {
        const menuGroups = [
            [
                { title: "Плутанина", url: "snarl.html" },
                { title: "Абревіатури", url: "abbs.html" },
                { title: "Загадки омуту", url: "mysteries.html" },
                { title: "Вгадайка", url: "guess.html" },
                { title: "Словолісся", url: "slovolissia.html" },
                { title: "Ягідний бум", url: "bum.html" },
                { title: "Таємниці хащі", url: "secrets.html" },
                { title: "Жаб'яче бажання", url: "wish.html" },
                { title: "Ланцюжок слів", url: "word-chain.html" },
                { title: "Заміноване слово", url: "bomb-word.html" },
            ],
            [
                { title: "Kahoot!", url: "https://kahoot.com", external: true },
                { title: "Gartic.io", url: "https://gartic.io", external: true },
                { title: "Gartic Phone", url: "https://garticphone.com", external: true },
                { title: "Smash Carts", url: "https://smashkarts.io", external: true },
                { title: "Make It Meme", url: "https://makeitmeme.com", external: true },
                { title: "Mushrooms", url: "https://mushrooom-game.onrender.com", external: true }
            ],
            [
                { title: "Кубік рефлексії", url: "reflection-cube.html" }
            ]
        ];

        let menuHTML = `<a href="index.html" class="header-title-link"><div class="header-title">Темний Ліс</div></a>`;

        menuGroups.forEach(group => {
            group.forEach(item => {
                const isActive = currentPath === item.url ? "active" : "";
                const target = item.external ? 'target="_blank" rel="noopener noreferrer"' : '';

                menuHTML += `
                    <a href="${item.url}" ${target}>
                        <div class="block ${isActive}">${item.title}</div>
                    </a>
                `;
            });
        });

        header.innerHTML = menuHTML;
    }
    if (currentPath === "index.html" && main) {
        const gameGroups = [
            {
                games: [
                    { title: "Плутанина", file: "snarl.html", description: "Розсортуйте спантеличені слова і вгадайте, яке з них приховано за переплутаними літерами.", new: false  },
                    { title: "Абревіатури", file: "abbs.html", description: "Ведучий показує абревіатуру, а гравці шукають креативне й смішне розшифрування." , new: false },
                    { title: "Загадки омуту", file: "mysteries.html", description: "Складіть із літер слово якнайшвидше або змагайтеся, хто знайде найбільше варіантів.", new: false  },
                    { title: "Вгадайка", file: "guess.html", description: "Відгадуйте слово по літерах, поки не відкриєте всі правильні відповіді.", new: false  },
                    { title: "Словолісся", file: "slovolissia.html", description: "Вгадай слово за шість спроб і відстежуй, які літери стоять правильно, а які лише поруч.", new: false  },
                    { title: "Ягідний бум", file: "bum.html", description: "Рахуйте в колі, замінюючи числа на кумедні кодові слова й не давайте себе спіймати.", new: false  },
                    { title: "Таємниці хащі", file: "secrets.html", description: "Приховайте фразу в шумовому тексті й нехай гравці розгадують її серед хащі літер.", new: false  },
                    { title: "Жаб'яче бажання", file: "wish.html", description: "Генеруйте абсурдні бажання й ставте гравців перед нелегким вибором на час.", new: false  },
                    { title: "Ланцюжок слів", file: "word-chain.html", description: "Розбийте слово на літери й придумайте до кожної літери... слово.", new: true  },
                    { title: "Заміноване слово", file: "bomb-word.html", description: "Відкривайте твердження одну за одною, намагайтеся вгадати слово й не дайте бомбі вибухнути.", new: true  }
                ]
            },
            {
                games: [
                    { title: "Kahoot!", file: "https://kahoot.com", description: "Бери вікторини й запускай їх у швидкому форматі.", external: true, new: false },
                    { title: "Gartic.io", file: "https://gartic.io", description: "Малюй, відгадуй та смійтеся з результатами.", external: true, new: false },
                    { title: "Gartic Phone", file: "https://garticphone.com", description: "Спільне малювання для компанії.", external: true, new: false },
                    { title: "Make It Meme", file: "https://makeitmeme.com", description: "Створи мем за пару хвилин.", external: true, new: false },
                    { title: "Smash Carts", file: "https://smashkarts.io", description: "Аркадні бійки з друзями.", external: true, new: false },
                    { title: "Mushrooom", url: "https://mushrooom-game.onrender.com", description: "Вгадуй слова за їх близкістю.", external: true, new: true }
                ]
            },
            {
                isUseful: true, // Позначка нової категорії
                games: [
                    { title: "Кубік рефлексії", file: "reflection-cube.html", description: "Кидай кубик, обирай питання для рефлексії й діліться тим, що сьогодні було важливим." },
                    { title: "Генерація відео", url: "https://upsampler.com/free-video-generator-no-signup", description: "Генерація відео без рестрації.",external: true, }
                ]
            }
        ];

        // Фільтруємо масив: виключаємо категорію корисних посилань з рандомізатора
        const randomizableGames = gameGroups
            .filter(group => !group.isUseful)
            .flatMap(group => group.games);

        const gameCards = gameGroups.map((group) => {
            let groupHTML = "";
            if (group.isUseful) {
                groupHTML += `<div class="useful-links-heading"><h2>Корисні посилання</h2></div>`;
            }
            groupHTML += `
                <div class="game-group ${group.isUseful ? 'useful-group' : ''}">
                    ${group.games.map(game => `
                        <article class="game-card ${group.isUseful ? 'useful-card' : ''} ${game.new ? 'new-game': ''}">
                            <h2>${game.title}</h2>
                            <p>${game.description}</p>
                            <button class="card-button" type="button" data-title="${game.title}" data-description="${game.description}" data-file="${game.file || game.url || '#'}" data-external="${game.external ? "true" : "false"}">
                                Детальніше
                            </button>
                        </article>
                    `).join("")}
                </div>
            `;
            return groupHTML;
        }).join('<div class="game-group-divider"></div>');
        main.innerHTML = `
            <section class="home-shell">
                <div class="home-hero">
                    <p class="hero-kicker">Темний Ліс</p>
                    <h1>Оберіть гру для перерви</h1>
                    <p class="hero-text">Добірка готових активностей. Клацніть по картці або натисніть кнопку випадкового вибору.</p>
                    <div class="hero-actions">
                        <button class="random-button" id="random-game-btn" type="button">Випадкова гра</button>
                    </div>
                </div>
                <div class="game-grid">${gameCards}</div>
            </section>

            <div class="modal-overlay" id="game-modal" hidden>
                <div class="modal-card" role="dialog" aria-modal="true">
                    <button class="modal-close" id="modal-close" type="button">×</button>
                    <p class="modal-kicker">Вибір гри</p>
                    <h2 id="modal-title"></h2>
                    <p id="modal-description"></p>
                    <a id="modal-link" class="modal-link" href="#">Відкрити гру</a>
                </div>
            </div>
        `;

        const modal = document.getElementById("game-modal");
        const modalTitle = document.getElementById("modal-title");
        const modalDescription = document.getElementById("modal-description");
        const modalLink = document.getElementById("modal-link");
        const closeButton = document.getElementById("modal-close");
        const randomButton = document.getElementById("random-game-btn");
        let highlightTimer = null;
        
        // Знаходимо картки для анімації (корисні посилання пропускаються)
        const randomizableCards = Array.from(main.querySelectorAll(".game-card:not(.useful-card)"));
        const allCards = Array.from(main.querySelectorAll(".game-card"));

        const clearCardHighlight = () => {
            allCards.forEach(card => card.classList.remove("is-highlighted", "is-selected"));
        };

        const openModal = (game) => {
            modalTitle.textContent = game.title;
            modalDescription.textContent = game.description;
            modalLink.href = game.file || game.url || '#';
            modalLink.textContent = `Відкрити ${game.title}`;
            modalLink.target = game.external ? "_blank" : "_self";
            modal.hidden = false;
            document.body.classList.add("modal-open");
        };

        const closeModal = () => {
            modal.hidden = true;
            document.body.classList.remove("modal-open");
        };

        main.querySelectorAll(".card-button").forEach(button => {
            button.addEventListener("click", () => {
                clearCardHighlight();
                openModal({
                    title: button.dataset.title,
                    description: button.dataset.description,
                    file: button.dataset.file,
                    external: button.dataset.external === "true"
                });
            });
        });

        randomButton.addEventListener("click", () => {
            if (highlightTimer) clearInterval(highlightTimer);
            clearCardHighlight();
            randomButton.disabled = true;
            randomButton.textContent = "⏳ Обираю...";

            const selectedIndex = Math.floor(Math.random() * randomizableGames.length);
            const selectedGame = randomizableGames[selectedIndex];
            let currentIndex = 0;
            let step = 0;
            const targetSteps = randomizableGames.length * 2 + selectedIndex;

            highlightTimer = setInterval(() => {
                clearCardHighlight();
                randomizableCards[currentIndex]?.classList.add("is-highlighted");
                step += 1;

                if (step >= targetSteps) {
                    clearInterval(highlightTimer);
                    clearCardHighlight();
                    randomizableCards[selectedIndex]?.classList.add("is-selected");
                    setTimeout(() => {
                        openModal(selectedGame);
                        randomButton.disabled = false;
                        randomButton.textContent = "🎲 Випадкова гра";
                    }, 700);
                    return;
                }
                currentIndex = (currentIndex + 1) % randomizableCards.length;
            }, 110);
        });

        closeButton.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });
    }
});
