document.addEventListener("DOMContentLoaded", function () {
    // 1. Находим тег <header> на странице
    const header = document.querySelector("header");
    
    if (!header) return; // Если хедера нет на странице, ничего не делаем

    // 2. Получаем имя текущего HTML-файла из адресной строки
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    // 3. Описываем структуру нашего меню (название: ссылка)
    const menuItems = [
        { title: "Плутанина", url: "snarl.html" },
        { title: "Абревіатури", url: "abbs.html" },
        {title: "Загадки омуту", url: "mysteries.html"},
        { title: "Ягідний бум", url: "bum.html" },
        { title: "Таємниці хащі", url: "secrets.html" },
        { title: "Жаб'яче бажання", url: "wish.html" },
        { title: "Kahoot!", url: "https://kahoot.com/", external: true },
        { title: "Gartic Phone", url: "https://garticphone.com/uk", external: true },
        { title: "Smash Carts", url: "https://smashkarts.io/", external: true },
        { title: "Make It Meme", url: "https://makeitmeme.com/", external: true }
    ];

    // 4. Генерируем внутренности хедера
    let menuHTML = `<a href="index.html"><div class="header-title">Темний Ліс</div></a>`;

    menuItems.forEach(item => {
        // Проверяем, совпадает ли текущая страница с пунктом меню
        const isActive = currentPath === item.url ? "active" : "";
        
        // Если ссылка внешняя, можно добавить target="_blank", чтобы открывалась в новой вкладке
        const target = item.external ? 'target="_blank"' : '';

        menuHTML += `
            <a href="${item.url}" ${target}>
                <div class="block ${isActive}">${item.title}</div>
            </a>
        `;
    });

    // 5. Вставляем готовое меню в тег <header>
    header.innerHTML = menuHTML;
});