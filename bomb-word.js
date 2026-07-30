document.addEventListener("DOMContentLoaded", () => {
    const progressEl = document.getElementById("bomb-progress");
    const stateEl = document.getElementById("bomb-state");
    const bombEl = document.getElementById("bomb-visual");
    const cluesListEl = document.getElementById("clues-list");
    const answerInput = document.getElementById("bomb-answer");
    const submitButton = document.getElementById("bomb-submit");
    const nextButton = document.getElementById("bomb-next");
    const timerEl = document.getElementById("bomb-timer");
    const descriptionEl = document.getElementById("bomb-description");

    const rounds = [
          {
            "word": "МОРЕ",
            "clues": [
            { "text": "Воно може бути спокійним або штормовим", "wire": "gray" },
            { "text": "Там живуть риби", "wire": "red" },
            { "text": "Його колір часто змінюється", "wire": "blue" },
            { "text": "Біля нього будують маяки", "wire": "green" },
            { "text": "Іноді воно викидає на берег черепашки", "wire": "yellow" },
            { "text": "Його глибини досліджують вчені", "wire": "violet" }
            ]
        },
        {
            "word": "СОНЦЕ",
            "clues": [
            { "text": "Воно яскраве", "wire": "gray" },
            { "text": "Дарує світло", "wire": "red" },
            { "text": "Його не можна побачити вночі", "wire": "blue" },
            { "text": "Без нього немає життя", "wire": "green" },
            { "text": "Від нього засмагають", "wire": "yellow" },
            { "text": "Воно нагріває планету", "wire": "violet" }
            ]
        },
        {
            "word": "ДОЩ",
            "clues": [
            { "text": "Він мокрий", "wire": "gray" },
            { "text": "Його звук чути вночі", "wire": "red" },
            { "text": "Після нього з'являються калюжі", "wire": "blue" },
            { "text": "З ним пов'язують сірі хмари", "wire": "green" },
            { "text": "Іноді він іде з грозою", "wire": "yellow" },
            { "text": "Він потрібен рослинам", "wire": "violet" }
            ]
        },
        {
            "word": "ВІТЕР",
            "clues": [
            { "text": "Він невидимий", "wire": "gray" },
            { "text": "Може зірвати капелюха", "wire": "red" },
            { "text": "Його силу вимірюють у балах", "wire": "blue" },
            { "text": "Він гойдає дерева", "wire": "green" },
            { "text": "Іноді він теплий, іноді холодний", "wire": "yellow" },
            { "text": "З ним літають повітряні змії", "wire": "violet" }
            ]
        },
        {
            "word": "СНІГ",
            "clues": [
            { "text": "Він білий", "wire": "gray" },
            { "text": "З нього ліплять сніговика", "wire": "red" },
            { "text": "Він тане в теплі", "wire": "blue" },
            { "text": "Покриває землю взимку", "wire": "green" },
            { "text": "Хрустить під ногами", "wire": "yellow" },
            { "text": "Буває пухнастим або мокрим", "wire": "violet" }
            ]
        },
        {
            "word": "ЛІД",
            "clues": [
            { "text": "Він твердий", "wire": "gray" },
            { "text": "Утворюється з води", "wire": "red" },
            { "text": "На ньому можна ковзати", "wire": "blue" },
            { "text": "Буває у формі бурульок", "wire": "green" },
            { "text": "Тане при підвищенні температури", "wire": "yellow" },
            { "text": "Покриває річки взимку", "wire": "violet" }
            ]
        },
        {
            "word": "ВОГОНЬ",
            "clues": [
            { "text": "Він гарячий", "wire": "gray" },
            { "text": "Дає світло", "wire": "red" },
            { "text": "Його бояться у лісі", "wire": "blue" },
            { "text": "Використовують для приготування їжі", "wire": "green" },
            { "text": "Його колір жовтий або червоний", "wire": "yellow" },
            { "text": "Його можна загасити водою", "wire": "violet" }
            ]
        },
        {
            "word": "ГОРА",
            "clues": [
            { "text": "Вона висока", "wire": "gray" },
            { "text": "На неї сходять альпіністи", "wire": "red" },
            { "text": "З неї витікають річки", "wire": "blue" },
            { "text": "Вона може мати снігову вершину", "wire": "green" },
            { "text": "Буває кам'янистою", "wire": "yellow" },
            { "text": "З неї відкривається краєвид", "wire": "violet" }
            ]
        },
        {
            "word": "РІЧКА",
            "clues": [
            { "text": "Тече", "wire": "gray" },
            { "text": "У неї впадають струмки", "wire": "red" },
            { "text": "Вона має береги", "wire": "blue" },
            { "text": "У ній водяться раки", "wire": "green" },
            { "text": "Впадає в море", "wire": "yellow" },
            { "text": "По ній пливуть човни", "wire": "violet" }
            ]
        },
        {
            "word": "ПОЛЕ",
            "clues": [
            { "text": "Воно широке", "wire": "gray" },
            { "text": "На ньому ростуть квіти", "wire": "red" },
            { "text": "Його орють трактором", "wire": "blue" },
            { "text": "Збирають врожай", "wire": "green" },
            { "text": "Там можна побачити вітряки", "wire": "yellow" },
            { "text": "По ньому бігають зайці", "wire": "violet" }
            ]
        },
        {
            "word": "МІСТО",
            "clues": [
            { "text": "Там багато будинків", "wire": "gray" },
            { "text": "Є вулиці та площі", "wire": "red" },
            { "text": "У ньому є транспорт", "wire": "blue" },
            { "text": "Вдень галасливе", "wire": "green" },
            { "text": "Має парки", "wire": "yellow" },
            { "text": "Там є метро", "wire": "violet" }
            ]
        },
        {
            "word": "СЕЛО",
            "clues": [
            { "text": "Там мало вулиць", "wire": "gray" },
            { "text": "Будинки невисокі", "wire": "red" },
            { "text": "Є сади", "wire": "blue" },
            { "text": "Тихе та спокійне", "wire": "green" },
            { "text": "Тримають свійських тварин", "wire": "yellow" },
            { "text": "У ньому є криниця", "wire": "violet" }
            ]
        },
        {
            "word": "ШКОЛА",
            "clues": [
            { "text": "Там є класи", "wire": "gray" },
            { "text": "Вчать читати та писати", "wire": "red" },
            { "text": "Дзвенить дзвоник", "wire": "blue" },
            { "text": "Там багато дітей", "wire": "green" },
            { "text": "Її будують з цегли", "wire": "yellow" },
            { "text": "Там проходять уроки", "wire": "violet" }
            ]
        },
        {
            "word": "КНИГА",
            "clues": [
            { "text": "Її читають", "wire": "gray" },
            { "text": "Вона має сторінки", "wire": "red" },
            { "text": "У ній є текст", "wire": "blue" },
            { "text": "Зберігає знання", "wire": "green" },
            { "text": "Має обкладинку", "wire": "yellow" },
            { "text": "Її пишуть автори", "wire": "violet" }
            ]
        },
        {
            "word": "ЗОШИТ",
            "clues": [
            { "text": "У ньому пишуть", "wire": "gray" },
            { "text": "Має клітинки або лінійки", "wire": "red" },
            { "text": "Його використовують у школі", "wire": "blue" },
            { "text": "Він може бути товстим", "wire": "green" },
            { "text": "Іноді його носять у рюкзаку", "wire": "yellow" },
            { "text": "На ньому малюють графіки", "wire": "violet" }
            ]
        },
        {
            "word": "ОЛІВЕЦЬ",
            "clues": [
            { "text": "Ним малюють", "wire": "gray" },
            { "text": "Залишає слід на папері", "wire": "red" },
            { "text": "Його загострюють", "wire": "blue" },
            { "text": "Може бути кольоровим", "wire": "green" },
            { "text": "У нього є грифель", "wire": "yellow" },
            { "text": "Легко стирається гумкою", "wire": "violet" }
            ]
        },
        {
            "word": "РУЧКА",
            "clues": [
            { "text": "Нею пишуть", "wire": "gray" },
            { "text": "Має чорнило", "wire": "red" },
            { "text": "Буває кулькова", "wire": "blue" },
            { "text": "Залишає чіткі лінії", "wire": "green" },
            { "text": "Може мати ковпачок", "wire": "yellow" },
            { "text": "Нею підписують документи", "wire": "violet" }
            ]
        },
        {
            "word": "ПАРТА",
            "clues": [
            { "text": "За нею сидять", "wire": "gray" },
            { "text": "Зроблена з дерева", "wire": "red" },
            { "text": "Вона у класі", "wire": "blue" },
            { "text": "На ній лежать підручники", "wire": "green" },
            { "text": "Може бути регульованою", "wire": "yellow" },
            { "text": "Витримує важкі речі", "wire": "violet" }
            ]
        },
        {
            "word": "ДОШКА",
            "clues": [
            { "text": "На ній пишуть крейдою", "wire": "gray" },
            { "text": "Висить на стіні", "wire": "red" },
            { "text": "Буває інтерактивною", "wire": "blue" },
            { "text": "На ній пояснюють уроки", "wire": "green" },
            { "text": "Може бути білою або зеленою", "wire": "yellow" },
            { "text": "З неї стирають ганчіркою", "wire": "violet" }
            ]
        },
        {
            "word": "МЕЛ",
            "clues": [
            { "text": "Він білий", "wire": "gray" },
            { "text": "Кришиться", "wire": "red" },
            { "text": "Залишає слід", "wire": "blue" },
            { "text": "Використовується у школі", "wire": "green" },
            { "text": "Буває кольоровим", "wire": "yellow" },
            { "text": "Ним пишуть на дошці", "wire": "violet" }
            ]
        },
        {
            "word": "ПІДРУЧНИК",
            "clues": [
            { "text": "Його вивчають", "wire": "gray" },
            { "text": "Містить правила", "wire": "red" },
            { "text": "Має завдання", "wire": "blue" },
            { "text": "Він потрібен на уроці", "wire": "green" },
            { "text": "Розділений на параграфи", "wire": "yellow" },
            { "text": "Ілюстрований малюнками", "wire": "violet" }
            ]
        },
        {
            "word": "ЗАДАЧА",
            "clues": [
            { "text": "Її треба розв'язати", "wire": "gray" },
            { "text": "Дається у школі", "wire": "red" },
            { "text": "Складається з умови", "wire": "blue" },
            { "text": "Відповідь – число", "wire": "green" },
            { "text": "Буває складна або легка", "wire": "yellow" },
            { "text": "Її можна перевірити", "wire": "violet" }
            ]
        },
        {
            "word": "ТВІР",
            "clues": [
            { "text": "Його пишуть у школі", "wire": "gray" },
            { "text": "Складається з абзаців", "wire": "red" },
            { "text": "Містить думки автора", "wire": "blue" },
            { "text": "Буває на тему", "wire": "green" },
            { "text": "Його оцінюють", "wire": "yellow" },
            { "text": "Читають вголос", "wire": "violet" }
            ]
        },
        {
            "word": "МОВА",
            "clues": [
            { "text": "На ній говорять", "wire": "gray" },
            { "text": "Має граматику", "wire": "red" },
            { "text": "Буває рідною", "wire": "blue" },
            { "text": "Вивчають у школі", "wire": "green" },
            { "text": "Містить слова", "wire": "yellow" },
            { "text": "Нею пишуть тексти", "wire": "violet" }
            ]
        },
        {
            "word": "СЛОВО",
            "clues": [
            { "text": "Складається з букв", "wire": "gray" },
            { "text": "Має значення", "wire": "red" },
            { "text": "Його вимовляють", "wire": "blue" },
            { "text": "Входить до речення", "wire": "green" },
            { "text": "Буває довгим або коротким", "wire": "yellow" },
            { "text": "Його можна перекласти", "wire": "violet" }
            ]
        },
        {
            "word": "БУКВА",
            "clues": [
            { "text": "Є в алфавіті", "wire": "gray" },
            { "text": "Позначає звук", "wire": "red" },
            { "text": "Її пишуть", "wire": "blue" },
            { "text": "Буває велика або мала", "wire": "green" },
            { "text": "Друкується в книзі", "wire": "yellow" },
            { "text": "Звучить по-різному", "wire": "violet" }
            ]
        },
        {
            "word": "АЛФАВІТ",
            "clues": [
            { "text": "Містить 33 літери", "wire": "gray" },
            { "text": "Впорядкований", "wire": "red" },
            { "text": "Його вчать діти", "wire": "blue" },
            { "text": "Поділений на голосні та приголосні", "wire": "green" },
            { "text": "Має назву", "wire": "yellow" },
            { "text": "З нього починається навчання", "wire": "violet" }
            ]
        },
        {
            "word": "ЧИТАННЯ",
            "clues": [
            { "text": "Це процес", "wire": "gray" },
            { "text": "Потребує тексту", "wire": "red" },
            { "text": "Розвиває уяву", "wire": "blue" },
            { "text": "Вчиться у школі", "wire": "green" },
            { "text": "Може бути вголос або мовчки", "wire": "yellow" },
            { "text": "Допомагає дізнаватися нове", "wire": "violet" }
            ]
        },
        {
            "word": "ПИСЬМО",
            "clues": [
            { "text": "Його відправляють", "wire": "gray" },
            { "text": "Написані на папері", "wire": "red" },
            { "text": "Містить текст", "wire": "blue" },
            { "text": "Має конверт", "wire": "green" },
            { "text": "На ньому пишуть адресу", "wire": "yellow" },
            { "text": "Приносить поштар", "wire": "violet" }
            ]
        },
        {
            "word": "ПОШТА",
            "clues": [
            { "text": "Доставляє листи", "wire": "gray" },
            { "text": "Має марки", "wire": "red" },
            { "text": "Скринька для відправлень", "wire": "blue" },
            { "text": "Працює щодня", "wire": "green" },
            { "text": "Є у кожному місті", "wire": "yellow" },
            { "text": "Там працюють листоноші", "wire": "violet" }
            ]
        },
        {
            "word": "ЛИСТОНОША",
            "clues": [
            { "text": "Розносить кореспонденцію", "wire": "gray" },
            { "text": "Має сумку", "wire": "red" },
            { "text": "Ходить пішки", "wire": "blue" },
            { "text": "Приносить газети", "wire": "green" },
            { "text": "Одягнений у форму", "wire": "yellow" },
            { "text": "З ним можна зустрітися на вулиці", "wire": "violet" }
            ]
        },
        {
            "word": "МАРКА",
            "clues": [
            { "text": "Клеїться на конверт", "wire": "gray" },
            { "text": "Малюнок на ній", "wire": "red" },
            { "text": "Підтверджує оплату", "wire": "blue" },
            { "text": "Колекціонують", "wire": "green" },
            { "text": "Вказує країну", "wire": "yellow" },
            { "text": "Має номінал", "wire": "violet" }
            ]
        },
        {
            "word": "КОНВЕРТ",
            "clues": [
            { "text": "Запечатується", "wire": "gray" },
            { "text": "Має клапан", "wire": "red" },
            { "text": "Вкладають листа", "wire": "blue" },
            { "text": "Пишуть адресу", "wire": "green" },
            { "text": "Буває різних кольорів", "wire": "yellow" },
            { "text": "Відправляють поштою", "wire": "violet" }
            ]
        },
        {
            "word": "ГАЗЕТА",
            "clues": [
            { "text": "Виходить щодня або щотижня", "wire": "gray" },
            { "text": "Містить новини", "wire": "red" },
            { "text": "Зроблена з паперу", "wire": "blue" },
            { "text": "Її читають", "wire": "green" },
            { "text": "Має заголовки", "wire": "yellow" },
            { "text": "Продається в кіоску", "wire": "violet" }
            ]
        },
        {
            "word": "ЖУРНАЛ",
            "clues": [
            { "text": "Глянцевий", "wire": "gray" },
            { "text": "Містить статті", "wire": "red" },
            { "text": "Має яскраві картинки", "wire": "blue" },
            { "text": "Виходить періодично", "wire": "green" },
            { "text": "Про моду або науку", "wire": "yellow" },
            { "text": "Його гортають", "wire": "violet" }
            ]
        },
        {
            "word": "БІБЛІОТЕКА",
            "clues": [
            { "text": "Там багато книг", "wire": "gray" },
            { "text": "Їх видають додому", "wire": "red" },
            { "text": "У ній тихо", "wire": "blue" },
            { "text": "Займаються в читальному залі", "wire": "green" },
            { "text": "Каталог допомагає знайти", "wire": "yellow" },
            { "text": "Там працюють бібліотекарі", "wire": "violet" }
            ]
        },
        {
            "word": "АВТОР",
            "clues": [
            { "text": "Пише тексти", "wire": "gray" },
            { "text": "Створює книги", "wire": "red" },
            { "text": "Має стиль", "wire": "blue" },
            { "text": "Підписує свої роботи", "wire": "green" },
            { "text": "Його читають", "wire": "yellow" },
            { "text": "Буває відомим", "wire": "violet" }
            ]
        },
        {
            "word": "ЧИТАЧ",
            "clues": [
            { "text": "Той, хто читає", "wire": "gray" },
            { "text": "Бере книгу", "wire": "red" },
            { "text": "Має свою думку", "wire": "blue" },
            { "text": "Відвідує бібліотеку", "wire": "green" },
            { "text": "Слідкує за сюжетом", "wire": "yellow" },
            { "text": "Може рекомендувати книги", "wire": "violet" }
            ]
        },
        {
            "word": "КРИНИЦЯ",
            "clues": [
            { "text": "З неї беруть воду", "wire": "gray" },
            { "text": "Глибока", "wire": "red" },
            { "text": "Зазвичай у селі", "wire": "blue" },
            { "text": "Має відро", "wire": "green" },
            { "text": "Збудована з каменю", "wire": "yellow" },
            { "text": "Там чиста вода", "wire": "violet" }
            ]
        },
        {
            "word": "КОЛОДЯЗЬ",
            "clues": [
            { "text": "З нього дістають воду", "wire": "gray" },
            { "text": "Має зручний воріт", "wire": "red" },
            { "text": "Буває з журавлем", "wire": "blue" },
            { "text": "Глибокий", "wire": "green" },
            { "text": "Знаходиться на подвір'ї", "wire": "yellow" },
            { "text": "У ньому живе жабка", "wire": "violet" }
            ]
        },
        {
            "word": "ВОДА",
            "clues": [
            { "text": "Прозора", "wire": "gray" },
            { "text": "Тече", "wire": "red" },
            { "text": "Без смаку", "wire": "blue" },
            { "text": "Потрібна для життя", "wire": "green" },
            { "text": "Буває гарячою або холодною", "wire": "yellow" },
            { "text": "Замінює сік", "wire": "violet" }
            ]
        },
        {
            "word": "РІДИНА",
            "clues": [
            { "text": "Має форму посудини", "wire": "gray" },
            { "text": "Може випаровуватися", "wire": "red" },
            { "text": "Не має власної форми", "wire": "blue" },
            { "text": "Тече", "wire": "green" },
            { "text": "Може бути густою", "wire": "yellow" },
            { "text": "Це агрегатний стан", "wire": "violet" }
            ]
        },
        {
            "word": "ПАРА",
            "clues": [
            { "text": "Піднімається вгору", "wire": "gray" },
            { "text": "Утворюється при кипінні", "wire": "red" },
            { "text": "Невидима", "wire": "blue" },
            { "text": "Охолоджується", "wire": "green" },
            { "text": "Стоїть над чайником", "wire": "yellow" },
            { "text": "Використовують у лазні", "wire": "violet" }
            ]
        },
        {
            "word": "ЛІТАК",
            "clues": [
            { "text": "Літає", "wire": "gray" },
            { "text": "Має крила", "wire": "red" },
            { "text": "Його пілотує пілот", "wire": "blue" },
            { "text": "Перевозить пасажирів", "wire": "green" },
            { "text": "Злітає і сідає", "wire": "yellow" },
            { "text": "Гуде", "wire": "violet" }
            ]
        },
        {
            "word": "ПОТЯГ",
            "clues": [
            { "text": "Їде по рейках", "wire": "gray" },
            { "text": "Має вагони", "wire": "red" },
            { "text": "Сигналить", "wire": "blue" },
            { "text": "Перевозить вантажі", "wire": "green" },
            { "text": "Зупиняється на станціях", "wire": "yellow" },
            { "text": "Використовує електроенергію", "wire": "violet" }
            ]
        },
        {
            "word": "МАШИНА",
            "clues": [
            { "text": "Їздить дорогами", "wire": "gray" },
            { "text": "Має колеса", "wire": "red" },
            { "text": "Буває легкова або вантажна", "wire": "blue" },
            { "text": "Керує водій", "wire": "green" },
            { "text": "Заправляють бензином", "wire": "yellow" },
            { "text": "Сигналить", "wire": "violet" }
            ]
        },
        {
            "word": "ВЕЛОСИПЕД",
            "clues": [
            { "text": "Має два колеса", "wire": "gray" },
            { "text": "Рухається ногами", "wire": "red" },
            { "text": "Має кермо", "wire": "blue" },
            { "text": "Буває гірським", "wire": "green" },
            { "text": "На ньому їздять влітку", "wire": "yellow" },
            { "text": "Потрібен шолом", "wire": "violet" }
            ]
        },
        {
            "word": "САМОКАТ",
            "clues": [
            { "text": "Має одну ногу", "wire": "gray" },
            { "text": "Відштовхуються", "wire": "red" },
            { "text": "Дитячий транспорт", "wire": "blue" },
            { "text": "Легкий", "wire": "green" },
            { "text": "Складається", "wire": "yellow" },
            { "text": "На ньому катаються в парку", "wire": "violet" }
            ]
        },
        {
            "word": "РОЛИКИ",
            "clues": [
            { "text": "Взуття з колесами", "wire": "gray" },
            { "text": "Ковзають", "wire": "red" },
            { "text": "Потребують захисту", "wire": "blue" },
            { "text": "Популярні у підлітків", "wire": "green" },
            { "text": "Можна падати", "wire": "yellow" },
            { "text": "Їх ремонтують", "wire": "violet" }
            ]
        },
        {
            "word": "ЛИЖІ",
            "clues": [
            { "text": "Ковзають по снігу", "wire": "gray" },
            { "text": "Довгі", "wire": "red" },
            { "text": "Використовують палиці", "wire": "blue" },
            { "text": "Вид спорту", "wire": "green" },
            { "text": "Потребують мастила", "wire": "yellow" },
            { "text": "Спускаються з гори", "wire": "violet" }
            ]
        },
        {
            "word": "КОВЗАНИ",
            "clues": [
            { "text": "На них ковзають", "wire": "gray" },
            { "text": "Гостре лезо", "wire": "red" },
            { "text": "Потрібна крига", "wire": "blue" },
            { "text": "Використовують у хокеї", "wire": "green" },
            { "text": "Бувають фігурні", "wire": "yellow" },
            { "text": "Затягують шнурками", "wire": "violet" }
            ]
        },
        {
            "word": "М'ЯЧ",
            "clues": [
            { "text": "Круглий", "wire": "gray" },
            { "text": "Ним грають", "wire": "red" },
            { "text": "Пружний", "wire": "blue" },
            { "text": "Буває гумовим", "wire": "green" },
            { "text": "Його кидають", "wire": "yellow" },
            { "text": "Використовують у футболі", "wire": "violet" }
            ]
        },
    ];

    const medium_rounds = [
          {
        "word": "ТІНЬ",
        "clues": [
        { "text": "Вона завжди поруч, але її неможливо впіймати", "wire": "gray" },
        { "text": "Зникає, коли зникає світло", "wire": "red" },
        { "text": "Може бути довгою або короткою", "wire": "blue" },
        { "text": "Вона повторює рухи, але не говорить", "wire": "green" },
        { "text": "Її малюють на асфальті в сонячний день", "wire": "yellow" },
        { "text": "Вона не має ваги, але її бояться в казках", "wire": "violet" }
        ]
    },
    {
        "word": "ЕХО",
        "clues": [
        { "text": "Повертає те, що відправив", "wire": "gray" },
        { "text": "У горах воно особливо гучне", "wire": "red" },
        { "text": "Не можна побачити, але можна почути", "wire": "blue" },
        { "text": "Воно завжди повторює останнє слово", "wire": "green" },
        { "text": "Живе в порожнечі", "wire": "yellow" },
        { "text": "Його використовують у віршах як риму", "wire": "violet" }
        ]
    },
    {
        "word": "СОВІСТЬ",
        "clues": [
        { "text": "Вона не спить, коли ти зробив помилку", "wire": "gray" },
        { "text": "Її не видно, але вона гризе", "wire": "red" },
        { "text": "Кожен має свою, але вона працює однаково", "wire": "blue" },
        { "text": "Вона підказує, що добре, а що погано", "wire": "green" },
        { "text": "Її часто заглушають виправданнями", "wire": "yellow" },
        { "text": "У народі кажуть: «Вона мучить»", "wire": "violet" }
        ]
    },
    {
        "word": "ЧАС",
        "clues": [
        { "text": "Він не зупиняється", "wire": "gray" },
        { "text": "Його не можна повернути", "wire": "red" },
        { "text": "Вимірюють годинами та хвилинами", "wire": "blue" },
        { "text": "Він розтягується, коли нудно", "wire": "green" },
        { "text": "Його наздоганяють або втрачають", "wire": "yellow" },
        { "text": "Він — найцінніший ресурс", "wire": "violet" }
        ]
    },
    {
        "word": "ПАМ'ЯТЬ",
        "clues": [
        { "text": "Зберігає минуле", "wire": "gray" },
        { "text": "Може зраджувати", "wire": "red" },
        { "text": "Її тренують вправами", "wire": "blue" },
        { "text": "Вона буває короткою та довгою", "wire": "green" },
        { "text": "Найкращі моменти живуть у ній", "wire": "yellow" },
        { "text": "Вона стирається без повторення", "wire": "violet" }
        ]
    },
    {
        "word": "ДОРОГА",
        "clues": [
        { "text": "Вона веде вперед", "wire": "gray" },
        { "text": "Буває прямою та звивистою", "wire": "red" },
        { "text": "Нею рухаються люди й машини", "wire": "blue" },
        { "text": "У неї є початок, але не завжди кінець", "wire": "green" },
        { "text": "Її обирають, коли вирушають", "wire": "yellow" },
        { "text": "У переносному значенні — це життєвий шлях", "wire": "violet" }
        ]
    },
    {
        "word": "ВІДДЗЕРКАЛЕННЯ",
        "clues": [
        { "text": "Показує твою точну копію", "wire": "gray" },
        { "text": "Воно зникає в темряві", "wire": "red" },
        { "text": "З'являється в озері або дзеркалі", "wire": "blue" },
        { "text": "Завжди симетричне", "wire": "green" },
        { "text": "Не можна доторкнутися", "wire": "yellow" },
        { "text": "У казках воно вказує на правду", "wire": "violet" }
        ]
    },
    {
        "word": "КОРДОН",
        "clues": [
        { "text": "Розділяє території", "wire": "gray" },
        { "text": "Його не можна перетинати без дозволу", "wire": "red" },
        { "text": "Буває державним або особистим", "wire": "blue" },
        { "text": "На мапі позначають лінією", "wire": "green" },
        { "text": "Порушення має наслідки", "wire": "yellow" },
        { "text": "Іноді він проходить через річку", "wire": "violet" }
        ]
    },
    {
        "word": "СВІТАН",
        "clues": [
        { "text": "Початок нового дня", "wire": "gray" },
        { "text": "Небо стає рожевим та золотим", "wire": "red" },
        { "text": "З'являється після ночі", "wire": "blue" },
        { "text": "Співають півні", "wire": "green" },
        { "text": "Його зустрічають на вершинах гір", "wire": "yellow" },
        { "text": "Він символ надії", "wire": "violet" }
        ]
    },
    {
        "word": "ЗАХІД",
        "clues": [
        { "text": "Кінець дня", "wire": "gray" },
        { "text": "Сонце опускається вниз", "wire": "red" },
        { "text": "Небо стає червоним та помаранчевим", "wire": "blue" },
        { "text": "Його малюють художники", "wire": "green" },
        { "text": "Іноді кажуть «на заході життя»", "wire": "yellow" },
        { "text": "Час, коли замовкають птахи", "wire": "violet" }
        ]
    },
    {
        "word": "ШЕПІТ",
        "clues": [
        { "text": "Гучність нижче звичайної", "wire": "gray" },
        { "text": "Використовують, щоб не почули інші", "wire": "red" },
        { "text": "Лунає в бібліотеці", "wire": "blue" },
        { "text": "Буває ніжним або таємничим", "wire": "green" },
        { "text": "Його чути вночі у лісі", "wire": "yellow" },
        { "text": "Іноді він голосніший за крик", "wire": "violet" }
        ]
    },
    {
        "word": "ТИША",
        "clues": [
        { "text": "Відсутність звуків", "wire": "gray" },
        { "text": "Буває золотою", "wire": "red" },
        { "text": "Її цінують уночі", "wire": "blue" },
        { "text": "Може лякати", "wire": "green" },
        { "text": "Вона — найкраща відповідь", "wire": "yellow" },
        { "text": "У ній чутно думки", "wire": "violet" }
        ]
    },
    {
        "word": "ХМАРА",
        "clues": [
        { "text": "Вона плаває в небі", "wire": "gray" },
        { "text": "Буває білою та сірою", "wire": "red" },
        { "text": "З неї падає дощ", "wire": "blue" },
        { "text": "Часто приховує сонце", "wire": "green" },
        { "text": "У неї немає чіткої форми", "wire": "yellow" },
        { "text": "По ній можна вгадувати погоду", "wire": "violet" }
        ]
    },
    {
        "word": "МІСЯЦЬ",
        "clues": [
        { "text": "Світить вночі", "wire": "gray" },
        { "text": "Він буває повним або півмісяцем", "wire": "red" },
        { "text": "Притягує воду в морях", "wire": "blue" },
        { "text": "Його бачать у вікно", "wire": "green" },
        { "text": "У ньому бачать обличчя", "wire": "yellow" },
        { "text": "Він — супутник", "wire": "violet" }
        ]
    },
    {
        "word": "ЗІРКА",
        "clues": [
        { "text": "Світиться на нічному небі", "wire": "gray" },
        { "text": "Вона дуже далеко", "wire": "red" },
        { "text": "Падаюча виконує бажання", "wire": "blue" },
        { "text": "На небі їх мільярди", "wire": "green" },
        { "text": "Температура — мільйони градусів", "wire": "yellow" },
        { "text": "Люди з давнини орієнтуються за нею", "wire": "violet" }
        ]
    },
    {
        "word": "ВСЕСВІТ",
        "clues": [
        { "text": "У ньому все існує", "wire": "gray" },
        { "text": "Почався з Великого вибуху", "wire": "red" },
        { "text": "Містить галактики", "wire": "blue" },
        { "text": "Безмежний", "wire": "green" },
        { "text": "Його досліджують за допомогою телескопів", "wire": "yellow" },
        { "text": "Ми — його маленька частка", "wire": "violet" }
        ]
    },
    {
        "word": "ГЛОБУС",
        "clues": [
        { "text": "Тривимірна модель", "wire": "gray" },
        { "text": "На ньому видно сушу та океани", "wire": "red" },
        { "text": "Він обертається навколо осі", "wire": "blue" },
        { "text": "Використовується в географії", "wire": "green" },
        { "text": "Має кольорові континенти", "wire": "yellow" },
        { "text": "Куляста форма", "wire": "violet" }
        ]
    },
    {
        "word": "КАРТА",
        "clues": [
        { "text": "Показує місцевість", "wire": "gray" },
        { "text": "Допомагає знайти шлях", "wire": "red" },
        { "text": "Буває фізичною та політичною", "wire": "blue" },
        { "text": "Вона плоска", "wire": "green" },
        { "text": "На ній є легенда", "wire": "yellow" },
        { "text": "Сучасна версія — GPS", "wire": "violet" }
        ]
    },
    {
        "word": "МАНДРІВНИК",
        "clues": [
        { "text": "Подорожує світом", "wire": "gray" },
        { "text": "Не має постійної домівки", "wire": "red" },
        { "text": "Збирає враження", "wire": "blue" },
        { "text": "Йому допомагає компас", "wire": "green" },
        { "text": "У старі часи мав пригодницький дух", "wire": "yellow" },
        { "text": "Він — герой багатьох книг", "wire": "violet" }
        ]
    },
    {
        "word": "ТЕЛЕСКОП",
        "clues": [
        { "text": "Наближає далекі об'єкти", "wire": "gray" },
        { "text": "Використовують астрономи", "wire": "red" },
        { "text": "Має лінзи та дзеркала", "wire": "blue" },
        { "text": "Дивляться у небо", "wire": "green" },
        { "text": "Відкриває планети та зірки", "wire": "yellow" },
        { "text": "Його винайшов Галілей", "wire": "violet" }
        ]
    },
    {
        "word": "МІКРОСКОП",
        "clues": [
        { "text": "Показує невидиме", "wire": "gray" },
        { "text": "Використовується в лабораторіях", "wire": "red" },
        { "text": "Дозволяє бачити клітини", "wire": "blue" },
        { "text": "У нього є окуляр та об'єктив", "wire": "green" },
        { "text": "Відкриває світ малого", "wire": "yellow" },
        { "text": "Допоміг вивчити бактерії", "wire": "violet" }
        ]
    },
    {
        "word": "ЛАБІРИНТ",
        "clues": [
        { "text": "З нього важко знайти вихід", "wire": "gray" },
        { "text": "Плутанина з коридорів", "wire": "red" },
        { "text": "Міф про Мінотавра", "wire": "blue" },
        { "text": "Буває з живоплоту", "wire": "green" },
        { "text": "Тренажер для логіки", "wire": "yellow" },
        { "text": "У ньому легко заблукати", "wire": "violet" }
        ]
    },
    {
        "word": "ГОЛОВОЛОМКА",
        "clues": [
        { "text": "Тренує мозок", "wire": "gray" },
        { "text": "Має рішення", "wire": "red" },
        { "text": "Потребує логіки", "wire": "blue" },
        { "text": "Вона буває математичною", "wire": "green" },
        { "text": "Складна, але цікава", "wire": "yellow" },
        { "text": "Викликає задоволення при розв'язку", "wire": "violet" }
        ]
    },
    {
        "word": "ЗАГАДКА",
        "clues": [
        { "text": "Потребує відповіді", "wire": "gray" },
        { "text": "Часто римована", "wire": "red" },
        { "text": "У ній щось приховано", "wire": "blue" },
        { "text": "Буває народною", "wire": "green" },
        { "text": "Відповідь не на поверхні", "wire": "yellow" },
        { "text": "Любить мудрість", "wire": "violet" }
        ]
    },
    {
        "word": "ЛОГІКА",
        "clues": [
        { "text": "Допомагає мислити", "wire": "gray" },
        { "text": "Будує причинно-наслідкові зв'язки", "wire": "red" },
        { "text": "Використовується в математиці", "wire": "blue" },
        { "text": "Вона — основа доказів", "wire": "green" },
        { "text": "Буває формальною та неформальною", "wire": "yellow" },
        { "text": "Її вивчають у філософії", "wire": "violet" }
        ]
    },
    {
        "word": "ТЕОРІЯ",
        "clues": [
        { "text": "Пояснює явища", "wire": "gray" },
        { "text": "Має гіпотезу", "wire": "red" },
        { "text": "Потребує доказів", "wire": "blue" },
        { "text": "Наприклад, Дарвіна або Ейнштейна", "wire": "green" },
        { "text": "Буває науковою", "wire": "yellow" },
        { "text": "Відрізняється від практики", "wire": "violet" }
        ]
    },
    {
        "word": "ПАРАДОКС",
        "clues": [
        { "text": "Суперечить сам собі", "wire": "gray" },
        { "text": "Здається неможливим", "wire": "red" },
        { "text": "Але насправді існує", "wire": "blue" },
        { "text": "Є в математиці та філософії", "wire": "green" },
        { "text": "Ламає уявлення", "wire": "yellow" },
        { "text": "Буває цікавим головоломкам", "wire": "violet" }
        ]
    },
    {
        "word": "ІЛЮЗІЯ",
        "clues": [
        { "text": "Обманює зір", "wire": "gray" },
        { "text": "Може бути оптичною", "wire": "red" },
        { "text": "Те, чого немає, здається реальним", "wire": "blue" },
        { "text": "Використовується в цирку", "wire": "green" },
        { "text": "Часто пов'язана з фокусами", "wire": "yellow" },
        { "text": "Вона не така, як здається", "wire": "violet" }
        ]
    },
    {
        "word": "МАЯК",
        "clues": [
        { "text": "Світить у темряві", "wire": "gray" },
        { "text": "Допомагає кораблям", "wire": "red" },
        { "text": "Стоїть на березі", "wire": "blue" },
        { "text": "Його видно здалеку", "wire": "green" },
        { "text": "Рятує в бурю", "wire": "yellow" },
        { "text": "Символ надії", "wire": "violet" }
        ]
    },
    {
        "word": "ШЛЯХ",
        "clues": [
        { "text": "Чимось відрізняється від дороги", "wire": "gray" },
        { "text": "Часто вживають у переносному значенні", "wire": "red" },
        { "text": "У нього є мета", "wire": "blue" },
        { "text": "Його обирають", "wire": "green" },
        { "text": "Життєвий або професійний", "wire": "yellow" },
        { "text": "Він буває тернистим", "wire": "violet" }
        ]
    },
    {
        "word": "СПОГАД",
        "clues": [
        { "text": "Картинка з минулого", "wire": "gray" },
        { "text": "Зігріває душу", "wire": "red" },
        { "text": "Може бути сумним", "wire": "blue" },
        { "text": "Зникає з часом", "wire": "green" },
        { "text": "Його викликає запах або музика", "wire": "yellow" },
        { "text": "Він — скарб", "wire": "violet" }
        ]
    },
    {
        "word": "МРІЯ",
        "clues": [
        { "text": "Живе в голові", "wire": "gray" },
        { "text": "Не завжди здійснюється", "wire": "red" },
        { "text": "Надихає діяти", "wire": "blue" },
        { "text": "У неї немає меж", "wire": "green" },
        { "text": "Буває яскравою", "wire": "yellow" },
        { "text": "Перший крок до мети", "wire": "violet" }
        ]
    },
    {
        "word": "МЕТА",
        "clues": [
        { "text": "Те, до чого прагнуть", "wire": "gray" },
        { "text": "Потребує зусиль", "wire": "red" },
        { "text": "Має термін", "wire": "blue" },
        { "text": "Буває коротко- та довгостроковою", "wire": "green" },
        { "text": "Досягнення приносить задоволення", "wire": "yellow" },
        { "text": "Без неї життя втрачає сенс", "wire": "violet" }
        ]
    },
    {
        "word": "НАДІЯ",
        "clues": [
        { "text": "Вмирає останньою", "wire": "gray" },
        { "text": "Дає сили", "wire": "red" },
        { "text": "Живе навіть у темряві", "wire": "blue" },
        { "text": "Є у кожного", "wire": "green" },
        { "text": "Вона — світло в кінці тунелю", "wire": "yellow" },
        { "text": "Її не можна купити", "wire": "violet" }
        ]
    },
    {
        "word": "ДРУЖБА",
        "clues": [
        { "text": "Взаємна підтримка", "wire": "gray" },
        { "text": "Перевіряється часом", "wire": "red" },
        { "text": "Не терпить зради", "wire": "blue" },
        { "text": "Робить життя багатшим", "wire": "green" },
        { "text": "У ній важливі чесність і довіра", "wire": "yellow" },
        { "text": "Це не просто знайомство", "wire": "violet" }
        ]
    },
    {
        "word": "ЗАЗДРІСТЬ",
        "clues": [
        { "text": "Руйнує зсередини", "wire": "gray" },
        { "text": "Виникає через чуже щастя", "wire": "red" },
        { "text": "Буває білою та чорною", "wire": "blue" },
        { "text": "Не дає радіти", "wire": "green" },
        { "text": "Одна з найважчих емоцій", "wire": "yellow" },
        { "text": "Її важко приховати", "wire": "violet" }
        ]
    },
    {
        "word": "ГОРДІСТЬ",
        "clues": [
        { "text": "Може бути позитивною", "wire": "gray" },
        { "text": "Але також смертним гріхом", "wire": "red" },
        { "text": "Це почуття власної гідності", "wire": "blue" },
        { "text": "Буває національною", "wire": "green" },
        { "text": "Не дає просити допомоги", "wire": "yellow" },
        { "text": "Її легко поранити", "wire": "violet" }
        ]
    },
    {
        "word": "СТРАХ",
        "clues": [
        { "text": "Паралізує", "wire": "gray" },
        { "text": "Може бути корисним", "wire": "red" },
        { "text": "Часто виникає перед невідомим", "wire": "blue" },
        { "text": "Має різні обличчя", "wire": "green" },
        { "text": "Його перемагають сміливі", "wire": "yellow" },
        { "text": "Живе в уяві", "wire": "violet" }
        ]
    },
    {
        "word": "СМІЛИВІСТЬ",
        "clues": [
        { "text": "Долає перешкоди", "wire": "gray" },
        { "text": "Не боїться ризику", "wire": "red" },
        { "text": "Вона в серці", "wire": "blue" },
        { "text": "Буває безрозсудною", "wire": "green" },
        { "text": "Допомагає виживати", "wire": "yellow" },
        { "text": "Виховується з дитинства", "wire": "violet" }
        ]
    },
    {
        "word": "ЧЕСТЬ",
        "clues": [
        { "text": "Її бережуть", "wire": "gray" },
        { "text": "Не продається", "wire": "red" },
        { "text": "Пов'язана з гідністю", "wire": "blue" },
        { "text": "Захищають на дуелях", "wire": "green" },
        { "text": "Вона — у вчинках", "wire": "yellow" },
        { "text": "Важливіша за життя", "wire": "violet" }
        ]
    },
    {
        "word": "БРЕХНЯ",
        "clues": [
        { "text": "Спотворює правду", "wire": "gray" },
        { "text": "Має короткі ноги", "wire": "red" },
        { "text": "Рано чи пізно розкривається", "wire": "blue" },
        { "text": "Породжує недовіру", "wire": "green" },
        { "text": "Буває білою", "wire": "yellow" },
        { "text": "Часто вимагає нової брехні", "wire": "violet" }
        ]
    },
    {
        "word": "ПРАВДА",
        "clues": [
        { "text": "Вона гірка", "wire": "gray" },
        { "text": "Не завжди приємна", "wire": "red" },
        { "text": "Вільна робить", "wire": "blue" },
        { "text": "Її шукають", "wire": "green" },
        { "text": "У суперечці народжується", "wire": "yellow" },
        { "text": "Вона — основа справедливості", "wire": "violet" }
        ]
    },
    {
        "word": "СПРАВЕДЛИВІСТЬ",
        "clues": [
        { "text": "Кожному своє", "wire": "gray" },
        { "text": "Не завжди досяжна", "wire": "red" },
        { "text": "Панує в суді", "wire": "blue" },
        { "text": "Зображується з вагами", "wire": "green" },
        { "text": "Її відновлюють", "wire": "yellow" },
        { "text": "Вона — ідеал", "wire": "violet" }
        ]
    },
    {
        "word": "ВІДПОВІДАЛЬНІСТЬ",
        "clues": [
        { "text": "За свої вчинки", "wire": "gray" },
        { "text": "Ознака зрілості", "wire": "red" },
        { "text": "Буває особистою та колективною", "wire": "blue" },
        { "text": "Несуть за роботу", "wire": "green" },
        { "text": "Її перекладають на інших", "wire": "yellow" },
        { "text": "Вона важить", "wire": "violet" }
        ]
    },
    {
        "word": "СВОБОДА",
        "clues": [
        { "text": "Робити те, що хочеш", "wire": "gray" },
        { "text": "Але не шкодячи іншим", "wire": "red" },
        { "text": "Одна з найвищих цінностей", "wire": "blue" },
        { "text": "Вона всередині", "wire": "green" },
        { "text": "Буває слова, думки, дій", "wire": "yellow" },
        { "text": "Її обмежує закон", "wire": "violet" }
        ]
    },
    {
        "word": "МИР",
        "clues": [
        { "text": "Відсутність війни", "wire": "gray" },
        { "text": "Гармонія в душі", "wire": "red" },
        { "text": "Згода між людьми", "wire": "blue" },
        { "text": "Його будують", "wire": "green" },
        { "text": "Він починається з кожного", "wire": "yellow" },
        { "text": "Голуб — його символ", "wire": "violet" }
        ]
    },
    {
        "word": "ВІЙНА",
        "clues": [
        { "text": "Руйнує все", "wire": "gray" },
        { "text": "Приносить біль", "wire": "red" },
        { "text": "Народжує героїв", "wire": "blue" },
        { "text": "Краще не знати", "wire": "green" },
        { "text": "Її оголошують", "wire": "yellow" },
        { "text": "Залишає рани на довгі роки", "wire": "violet" }
        ]
    },
    {
        "word": "ГЕРОЙ",
        "clues": [
        { "text": "Вчиняє подвиг", "wire": "gray" },
        { "text": "Ризикує життям", "wire": "red" },
        { "text": "Буває літературним", "wire": "blue" },
        { "text": "Має силу духу", "wire": "green" },
        { "text": "Його пам'ятають", "wire": "yellow" },
        { "text": "Він живе поруч", "wire": "violet" }
        ]
    },
    {
        "word": "ПОДВИГ",
        "clues": [
        { "text": "Вчинок, гідний пам'яті", "wire": "gray" },
        { "text": "Вимагає мужності", "wire": "red" },
        { "text": "Не обов'язково на війні", "wire": "blue" },
        { "text": "Робить людину великою", "wire": "green" },
        { "text": "Його не забувають", "wire": "yellow" },
        { "text": "Часто пов'язаний з самопожертвою", "wire": "violet" }
        ]
    },
    {
        "word": "ПАМ'ЯТНИК",
        "clues": [
        { "text": "Нагадує про подію", "wire": "gray" },
        { "text": "Зроблений з каменю або бронзи", "wire": "red" },
        { "text": "Стоїть на площі", "wire": "blue" },
        { "text": "Увічнює героя", "wire": "green" },
        { "text": "Його відкривають урочисто", "wire": "yellow" },
        { "text": "Він — історія", "wire": "violet" }
        ]
    },
    {
        "word": "ІСТОРІЯ",
        "clues": [
        { "text": "Вивчає минуле", "wire": "gray" },
        { "text": "Складається з фактів", "wire": "red" },
        { "text": "Має своїх героїв", "wire": "blue" },
        { "text": "Повторюється", "wire": "green" },
        { "text": "Її пишуть переможці", "wire": "yellow" },
        { "text": "Уроки з неї — безцінні", "wire": "violet" }
        ]
    },
    {
        "word": "МАЙБУТНЄ",
        "clues": [
        { "text": "Те, чого ще немає", "wire": "gray" },
        { "text": "Ми його створюємо", "wire": "red" },
        { "text": "Воно невідоме", "wire": "blue" },
        { "text": "Будується сьогодні", "wire": "green" },
        { "text": "Діти — його обличчя", "wire": "yellow" },
        { "text": "Технології його прискорюють", "wire": "violet" }
        ]
    },
    {
        "word": "ТЕХНОЛОГІЯ",
        "clues": [
        { "text": "Полегшує життя", "wire": "gray" },
        { "text": "Постійно змінюється", "wire": "red" },
        { "text": "Починається з колеса", "wire": "blue" },
        { "text": "Сьогодні — штучний інтелект", "wire": "green" },
        { "text": "Вона — двигун прогресу", "wire": "yellow" },
        { "text": "Нерозривно пов'язана з наукою", "wire": "violet" }
        ]
    },
    {
        "word": "НАУКА",
        "clues": [
        { "text": "Пояснює світ", "wire": "gray" },
        { "text": "Спирається на досліди", "wire": "red" },
        { "text": "Буває природничою та гуманітарною", "wire": "blue" },
        { "text": "Вона — знання", "wire": "green" },
        { "text": "Без неї немає прогресу", "wire": "yellow" },
        { "text": "Потребує критичного мислення", "wire": "violet" }
        ]
    },
    {
        "word": "ВІДКРИТТЯ",
        "clues": [
        { "text": "Те, чого раніше не знали", "wire": "gray" },
        { "text": "Робиться вченими", "wire": "red" },
        { "text": "Змінює уявлення", "wire": "blue" },
        { "text": "Буває випадковим", "wire": "green" },
        { "text": "Прославляє автора", "wire": "yellow" },
        { "text": "Наприклад, Америка або пеніцилін", "wire": "violet" }
        ]
    },
    {
        "word": "ВИНАХІД",
        "clues": [
        { "text": "Створює нове", "wire": "gray" },
        { "text": "Має практичне застосування", "wire": "red" },
        { "text": "Патентують", "wire": "blue" },
        { "text": "Може здаватися фантастичним", "wire": "green" },
        { "text": "Друкується в книгах", "wire": "yellow" },
        { "text": "Змінює побут", "wire": "violet" }
        ]
    },
    {
        "word": "ФАНТАЗІЯ",
        "clues": [
        { "text": "Створює образи", "wire": "gray" },
        { "text": "Не обмежена реальністю", "wire": "red" },
        { "text": "Є у кожного", "wire": "blue" },
        { "text": "Надихає письменників", "wire": "green" },
        { "text": "Розвивається через читання", "wire": "yellow" },
        { "text": "Вона — двигун творчості", "wire": "violet" }
        ]
    },
    {
        "word": "КРЕАТИВНІСТЬ",
        "clues": [
        { "text": "Здатність створювати нове", "wire": "gray" },
        { "text": "Цінується в мистецтві", "wire": "red" },
        { "text": "Потребує сміливості", "wire": "blue" },
        { "text": "Мислення поза рамками", "wire": "green" },
        { "text": "Її можна тренувати", "wire": "yellow" },
        { "text": "Вона в кожному", "wire": "violet" }
        ]
    },
    {
        "word": "МИСТЕЦТВО",
        "clues": [
        { "text": "Виражає почуття", "wire": "gray" },
        { "text": "Буває живописом, музикою, танцем", "wire": "red" },
        { "text": "Збуджує емоції", "wire": "blue" },
        { "text": "Його створюють обдаровані", "wire": "green" },
        { "text": "Воно вічне", "wire": "yellow" },
        { "text": "Не потребує перекладу", "wire": "violet" }
        ]
    },
    {
        "word": "МУЗИКА",
        "clues": [
        { "text": "Використовує звуки", "wire": "gray" },
        { "text": "Має ноти", "wire": "red" },
        { "text": "Впливає на настрій", "wire": "blue" },
        { "text": "Буває класичною або сучасною", "wire": "green" },
        { "text": "Вона — мова душі", "wire": "yellow" },
        { "text": "Її слухають у навушниках", "wire": "violet" }
        ]
    },
    {
        "word": "ПІСНЯ",
        "clues": [
        { "text": "Є слова та мелодія", "wire": "gray" },
        { "text": "Її співають", "wire": "red" },
        { "text": "Має приспів", "wire": "blue" },
        { "text": "Народна або авторська", "wire": "green" },
        { "text": "Залишається в пам'яті", "wire": "yellow" },
        { "text": "Часто про любов", "wire": "violet" }
        ]
    },
    {
        "word": "ТАНЕЦЬ",
        "clues": [
        { "text": "Ритмічні рухи", "wire": "gray" },
        { "text": "Не потребує слів", "wire": "red" },
        { "text": "Буває народним або бальним", "wire": "blue" },
        { "text": "Супроводжується музикою", "wire": "green" },
        { "text": "Висловлює радість", "wire": "yellow" },
        { "text": "Поширений у всіх культурах", "wire": "violet" }
        ]
    },
    {
        "word": "ФІЛЬМ",
        "clues": [
        { "text": "Рухомі картинки", "wire": "gray" },
        { "text": "Розповідає історію", "wire": "red" },
        { "text": "Дивляться в кінотеатрі", "wire": "blue" },
        { "text": "Знімають на камеру", "wire": "green" },
        { "text": "Буває документальним", "wire": "yellow" },
        { "text": "Має режисера", "wire": "violet" }
        ]
    },
    {
        "word": "КІНО",
        "clues": [
        { "text": "Масове мистецтво", "wire": "gray" },
        { "text": "Показують на екрані", "wire": "red" },
        { "text": "Створюють актори", "wire": "blue" },
        { "text": "Має жанри", "wire": "green" },
        { "text": "Суперзірки знімаються в ньому", "wire": "yellow" },
        { "text": "Збирає глядачів", "wire": "violet" }
        ]
    },
    {
        "word": "АКТОР",
        "clues": [
        { "text": "Втілює роль", "wire": "gray" },
        { "text": "Працює на сцені або знімальному майданчику", "wire": "red" },
        { "text": "Перевтілюється", "wire": "blue" },
        { "text": "Має талант", "wire": "green" },
        { "text": "Отримує нагороди", "wire": "yellow" },
        { "text": "Буває театральним або кіношним", "wire": "violet" }
        ]
    },
    {
        "word": "ГЛЯДАЧ",
        "clues": [
        { "text": "Дивиться виставу", "wire": "gray" },
        { "text": "Сидіть у залі", "wire": "red" },
        { "text": "Реагує на гру", "wire": "blue" },
        { "text": "Оцінює", "wire": "green" },
        { "text": "Часто аплодує", "wire": "yellow" },
        { "text": "Без нього мистецтво неповне", "wire": "violet" }
        ]
    },
    {
        "word": "СЦЕНА",
        "clues": [
        { "text": "Місце дії", "wire": "gray" },
        { "text": "Піднесена платформа", "wire": "red" },
        { "text": "На ній грають актори", "wire": "blue" },
        { "text": "Має завісу", "wire": "green" },
        { "text": "Освітлюється софітами", "wire": "yellow" },
        { "text": "За лаштунками життя інше", "wire": "violet" }
        ]
    },
    {
        "word": "ВИСТАВА",
        "clues": [
        { "text": "Театральна дія", "wire": "gray" },
        { "text": "Триває певний час", "wire": "red" },
        { "text": "Поділена на акти", "wire": "blue" },
        { "text": "Глядачі дивляться", "wire": "green" },
        { "text": "Може бути трагедією або комедією", "wire": "yellow" },
        { "text": "Починається з аплодисментів", "wire": "violet" }
        ]
    },
    {
        "word": "АПЛОДИСМЕНТИ",
        "clues": [
        { "text": "Овації", "wire": "gray" },
        { "text": "Виражають схвалення", "wire": "red" },
        { "text": "Звучать після виступу", "wire": "blue" },
        { "text": "Можуть бути гучними", "wire": "green" },
        { "text": "Найвища нагорода", "wire": "yellow" },
        { "text": "Роблять руками", "wire": "violet" }
        ]
    },
    {
        "word": "УСПІХ",
        "clues": [
        { "text": "Досягнення мети", "wire": "gray" },
        { "text": "Приходить після роботи", "wire": "red" },
        { "text": "Буває гучним", "wire": "blue" },
        { "text": "Не завжди приходить швидко", "wire": "green" },
        { "text": "Його святкують", "wire": "yellow" },
        { "text": "Він — результат", "wire": "violet" }
        ]
    },
    {
        "word": "ПОРАЗКА",
        "clues": [
        { "text": "Зворотний бік успіху", "wire": "gray" },
        { "text": "Вчить більше, ніж перемога", "wire": "red" },
        { "text": "Не кінець", "wire": "blue" },
        { "text": "Буває гіркою", "wire": "green" },
        { "text": "Дає досвід", "wire": "yellow" },
        { "text": "Її потрібно прийняти", "wire": "violet" }
        ]
    },
    {
        "word": "БОРОТЬБА",
        "clues": [
        { "text": "Змагання", "wire": "gray" },
        { "text": "За правду або за життя", "wire": "red" },
        { "text": "Внутрішня або зовнішня", "wire": "blue" },
        { "text": "Вимагає сили", "wire": "green" },
        { "text": "Завершується перемогою", "wire": "yellow" },
        { "text": "Часто описана в епіці", "wire": "violet" }
        ]
    },
    {
        "word": "ПЕРЕМОГА",
        "clues": [
        { "text": "Результат боротьби", "wire": "gray" },
        { "text": "Радісна", "wire": "red" },
        { "text": "Дістається ціною зусиль", "wire": "blue" },
        { "text": "Олімпійська символіка", "wire": "green" },
        { "text": "Її присвячують", "wire": "yellow" },
        { "text": "Солодка", "wire": "violet" }
        ]
    },
    {
        "word": "ПРОГРЕС",
        "clues": [
        { "text": "Рух вперед", "wire": "gray" },
        { "text": "У науці та техніці", "wire": "red" },
        { "text": "Не зупиняється", "wire": "blue" },
        { "text": "Покращує життя", "wire": "green" },
        { "text": "Має своїх героїв", "wire": "yellow" },
        { "text": "Іноді суперечливий", "wire": "violet" }
        ]
    }
    ];

    const hard_rounds = [
        {
        "word": "НІЖ",
        "clues": [
        { "text": "У нього є лезо та руків'я, але він не живе", "wire": "gray" },
        { "text": "Він може бути першим інструментом людства", "wire": "red" },
        { "text": "Його бояться, але без нього не обійтися на кухні", "wire": "blue" },
        { "text": "Він розділяє, але не мирить", "wire": "green" },
        { "text": "У переносному значенні — це гострий розум", "wire": "yellow" },
        { "text": "Він з'явився раніше за виделку", "wire": "violet" }
        ]
    },
    {
        "word": "ГОЛКА",
        "clues": [
        { "text": "Вона тонка та гостра, але не зброя", "wire": "gray" },
        { "text": "З'єднує тканини, але не швачка", "wire": "red" },
        { "text": "Має вушко, але не носить прикрас", "wire": "blue" },
        { "text": "Її використовують у медицині, щоб лікувати", "wire": "green" },
        { "text": "Без неї не пошити одяг", "wire": "yellow" },
        { "text": "Вона маленька, але без неї — велика проблема", "wire": "violet" }
        ]
    },
    {
        "word": "ПІСОК",
        "clues": [
        { "text": "Він складається з маленьких камінчиків", "wire": "gray" },
        { "text": "Його не тримаєш у жмені", "wire": "red" },
        { "text": "Він може бути у пустелі або на пляжі", "wire": "blue" },
        { "text": "У ньому тоне, але не тоне все", "wire": "green" },
        { "text": "Він сиплеться крізь пальці — як час", "wire": "yellow" },
        { "text": "Із нього роблять скло", "wire": "violet" }
        ]
    },
    {
        "word": "КЛЮЧ",
        "clues": [
        { "text": "Він відкриває, але не говорить", "wire": "gray" },
        { "text": "Може бути від дверей або від серця", "wire": "red" },
        { "text": "У музиці він задає тон", "wire": "blue" },
        { "text": "Буває схованим під килимком", "wire": "green" },
        { "text": "У нього є борідка, але вона не росте", "wire": "yellow" },
        { "text": "Втратити його — опинитися в пастці", "wire": "violet" }
        ]
    },
    {
        "word": "СВІЧКА",
        "clues": [
        { "text": "Вона тане, коли горить", "wire": "gray" },
        { "text": "Дає світло, але сама зникає", "wire": "red" },
        { "text": "Її запалюють у храмах", "wire": "blue" },
        { "text": "Вона має ґнот", "wire": "green" },
        { "text": "Коротке життя — яскраве горіння", "wire": "yellow" },
        { "text": "Без неї було б темно до електрики", "wire": "violet" }
        ]
    },
    {
        "word": "КІЛЬЦЕ",
        "clues": [
        { "text": "Замкнена лінія без початку й кінця", "wire": "gray" },
        { "text": "Одягають на палець, але це не прикраса в першу чергу", "wire": "red" },
        { "text": "У спорті — це снаряд", "wire": "blue" },
        { "text": "Має символ нескінченності", "wire": "green" },
        { "text": "Його дарують як обіцянку", "wire": "yellow" },
        { "text": "Золоте або ні, але завжди коло", "wire": "violet" }
        ]
    },
    {
        "word": "МОЛОТ",
        "clues": [
        { "text": "Він важкий і б'є, але не дереться", "wire": "gray" },
        { "text": "Він символ праці", "wire": "red" },
        { "text": "Разом із серпом — сила", "wire": "blue" },
        { "text": "Його використовують ковалі", "wire": "green" },
        { "text": "Він може розбити, але не зібрати", "wire": "yellow" },
        { "text": "У суді — символ правосуддя", "wire": "violet" }
        ]
    },
    {
        "word": "ДЗЕРКАЛО",
        "clues": [
        { "text": "Показує правду, але не говорить", "wire": "gray" },
        { "text": "Те, що зліва — справа навпаки", "wire": "red" },
        { "text": "У казках воно відповідає на запитання", "wire": "blue" },
        { "text": "Розбити — до біди (за повір'ям)", "wire": "green" },
        { "text": "Воно не має власної пам'яті", "wire": "yellow" },
        { "text": "Через нього пізнають себе", "wire": "violet" }
        ]
    },
    {
        "word": "ГУМКА",
        "clues": [
        { "text": "Вона стирає, але не залишає сміття", "wire": "gray" },
        { "text": "Вона пружна, але не м'яч", "wire": "red" },
        { "text": "Знайома кожному школяреві", "wire": "blue" },
        { "text": "Стирає тільки те, що зроблено олівцем", "wire": "green" },
        { "text": "Розтягується, але не рветься", "wire": "yellow" },
        { "text": "Без неї не виправити помилку", "wire": "violet" }
        ]
    },
    {
        "word": "ЛІНІЯ",
        "clues": [
        { "text": "Має довжину, але не ширину", "wire": "gray" },
        { "text": "Може бути прямою або кривою", "wire": "red" },
        { "text": "У ній немає товщини (за математикою)", "wire": "blue" },
        { "text": "Розділяє, з'єднує або обмежує", "wire": "green" },
        { "text": "Крапки, поставлені поруч, утворюють її", "wire": "yellow" },
        { "text": "Буває суцільною та пунктирною", "wire": "violet" }
        ]
    },
    {
        "word": "КРАПКА",
        "clues": [
        { "text": "Вона не має розміру, але існує", "wire": "gray" },
        { "text": "Ставиться в кінці речення", "wire": "red" },
        { "text": "У геометрії — це місце", "wire": "blue" },
        { "text": "Може бути жирною або ледь видимою", "wire": "green" },
        { "text": "З неї починається будь-який малюнок", "wire": "yellow" },
        { "text": "Вона зупиняє, але не завершує", "wire": "violet" }
        ]
    },
    {
        "word": "КУТ",
        "clues": [
        { "text": "Утворюється двома лініями", "wire": "gray" },
        { "text": "Буває гострим, прямим або тупим", "wire": "red" },
        { "text": "Він вимірюється в градусах", "wire": "blue" },
        { "text": "Може бути в геометрії або в кімнаті", "wire": "green" },
        { "text": "Його не можна побачити, якщо дивитися збоку", "wire": "yellow" },
        { "text": "За ним ховаються", "wire": "violet" }
        ]
    },
    {
        "word": "ДІАМЕТР",
        "clues": [
        { "text": "З'єднує дві точки на колі", "wire": "gray" },
        { "text": "Проходить через центр", "wire": "red" },
        { "text": "Це найдовша хорда", "wire": "blue" },
        { "text": "Дорівнює двом радіусам", "wire": "green" },
        { "text": "Без нього не обчислити довжину кола", "wire": "yellow" },
        { "text": "Він ділить коло навпіл", "wire": "violet" }
        ]
    },
    {
        "word": "РАДІУС",
        "clues": [
        { "text": "Від центру до краю", "wire": "gray" },
        { "text": "Удвічі менший за діаметр", "wire": "red" },
        { "text": "Його має кожне коло", "wire": "blue" },
        { "text": "Він завжди однаковий для одного кола", "wire": "green" },
        { "text": "Без нього не накреслити коло циркулем", "wire": "yellow" },
        { "text": "Символ відстані", "wire": "violet" }
        ]
    },
    {
        "word": "ЦИРКУЛЬ",
        "clues": [
        { "text": "У нього дві ніжки, але він не ходить", "wire": "gray" },
        { "text": "На одній голка, на іншій грифель", "wire": "red" },
        { "text": "Створює ідеальне коло", "wire": "blue" },
        { "text": "Використовується в геометрії та кресленні", "wire": "green" },
        { "text": "Без нього не побудувати коло", "wire": "yellow" },
        { "text": "Має шарнір посередині", "wire": "violet" }
        ]
    },
    {
        "word": "ЛІНІЙКА",
        "clues": [
        { "text": "Вона пряма, але не говорить правду", "wire": "gray" },
        { "text": "На ній є поділки", "wire": "red" },
        { "text": "Нею вимірюють довжину", "wire": "blue" },
        { "text": "У школі вона лежить у пеналі", "wire": "green" },
        { "text": "Вона може бути дерев'яною або пластиковою", "wire": "yellow" },
        { "text": "Це найпростіший вимірювальний інструмент", "wire": "violet" }
        ]
    },
    {
        "word": "ЛІТР",
        "clues": [
        { "text": "Міра рідини", "wire": "gray" },
        { "text": "Дорівнює 1000 кубічних сантиметрів", "wire": "red" },
        { "text": "У ньому вимірюють молоко, воду, олію", "wire": "blue" },
        { "text": "Склянка — це приблизно ¼", "wire": "green" },
        { "text": "Буває в пляшці або каністрі", "wire": "yellow" },
        { "text": "Не плутати з кілограмом", "wire": "violet" }
        ]
    },
    {
        "word": "МЕТР",
        "clues": [
        { "text": "Основна одиниця довжини", "wire": "gray" },
        { "text": "У ньому 100 сантиметрів", "wire": "red" },
        { "text": "Спочатку визначався через меридіан", "wire": "blue" },
        { "text": "Довжина кроку дорослої людини", "wire": "green" },
        { "text": "Має еталон у Парижі", "wire": "yellow" },
        { "text": "Без нього не обійтися в будівництві", "wire": "violet" }
        ]
    },
    {
        "word": "СЕКУНДА",
        "clues": [
        { "text": "Дуже короткий проміжок часу", "wire": "gray" },
        { "text": "У хвилині їх 60", "wire": "red" },
        { "text": "Вимірюється атомним годинником", "wire": "blue" },
        { "text": "Це час удару серця", "wire": "green" },
        { "text": "Найменша одиниця в побуті", "wire": "yellow" },
        { "text": "Вона миттєва", "wire": "violet" }
        ]
    },
    {
        "word": "ГОДИНА",
        "clues": [
        { "text": "60 хвилин", "wire": "gray" },
        { "text": "Має 3600 секунд", "wire": "red" },
        { "text": "Стрілка проходить повне коло", "wire": "blue" },
        { "text": "Робоча, шкільна, астрономічна", "wire": "green" },
        { "text": "З нею пов'язані пояси", "wire": "yellow" },
        { "text": "Вона тягнеться або летить", "wire": "violet" }
        ]
    },
    {
        "word": "ТИЖДЕНЬ",
        "clues": [
        { "text": "7 днів", "wire": "gray" },
        { "text": "Починається з понеділка або неділі", "wire": "red" },
        { "text": "Буває робочим або вихідним", "wire": "blue" },
        { "text": "Повторюється циклічно", "wire": "green" },
        { "text": "У ньому є п'ятниця", "wire": "yellow" },
        { "text": "Замінює тижні у календарі", "wire": "violet" }
        ]
    },
    {
        "word": "МІСЯЦЬ",
        "clues": [
        { "text": "12 таких — рік", "wire": "gray" },
        { "text": "Має 28, 30 або 31 день", "wire": "red" },
        { "text": "Лютий — найкоротший", "wire": "blue" },
        { "text": "Назви походять від богів", "wire": "green" },
        { "text": "Календарний період", "wire": "yellow" },
        { "text": "А ще — супутник Землі", "wire": "violet" }
        ]
    },
    {
        "word": "РІК",
        "clues": [
        { "text": "365 днів", "wire": "gray" },
        { "text": "Високосний — 366", "wire": "red" },
        { "text": "Поділяється на пори", "wire": "blue" },
        { "text": "Починається 1 січня", "wire": "green" },
        { "text": "Символ повного циклу", "wire": "yellow" },
        { "text": "Новий — завжди з надією", "wire": "violet" }
        ]
    },
    {
        "word": "ТОЧКА",
        "clues": [
        { "text": "У математиці — без вимірів", "wire": "gray" },
        { "text": "У пунктуації — кінець", "wire": "red" },
        { "text": "Її ставлять крапку в реченні", "wire": "blue" },
        { "text": "У ній немає початку й кінця як такої", "wire": "green" },
        { "text": "Багато точок — пунктир", "wire": "yellow" },
        { "text": "Це аналог абсолютної нульової величини", "wire": "violet" }
        ]
    },
    {
        "word": "ВУГОЛ",
        "clues": [
        { "text": "Місце, де сходяться дві стіни", "wire": "gray" },
        { "text": "У геометрії — фігура з двох променів", "wire": "red" },
        { "text": "За ним ховаються від покарання", "wire": "blue" },
        { "text": "Буває квартирним або географічним", "wire": "green" },
        { "text": "Його вимірюють транспортиром", "wire": "yellow" },
        { "text": "Це частина трикутника", "wire": "violet" }
        ]
    },
    {
        "word": "СТІНА",
        "clues": [
        { "text": "Вертикальна поверхня", "wire": "gray" },
        { "text": "Відділяє простір", "wire": "red" },
        { "text": "На ній висять картини", "wire": "blue" },
        { "text": "Вона має товщину", "wire": "green" },
        { "text": "Підпирає дах", "wire": "yellow" },
        { "text": "Без неї немає будинку", "wire": "violet" }
        ]
    },
    {
        "word": "ДАХ",
        "clues": [
        { "text": "Захищає від дощу", "wire": "gray" },
        { "text": "Він над головою", "wire": "red" },
        { "text": "Буває похилим або плоским", "wire": "blue" },
        { "text": "Його криють черепицею або шифером", "wire": "green" },
        { "text": "Він є у кожного будинку", "wire": "yellow" },
        { "text": "Під ним — дім", "wire": "violet" }
        ]
    },
    {
        "word": "ПІДЛОГА",
        "clues": [
        { "text": "По ній ходять", "wire": "gray" },
        { "text": "Вона внизу", "wire": "red" },
        { "text": "Може бути дерев'яною, кам'яною або бетонною", "wire": "blue" },
        { "text": "У багатоповерхівках — перекриття", "wire": "green" },
        { "text": "На ній лежать килими", "wire": "yellow" },
        { "text": "Перший або останній поверх", "wire": "violet" }
        ]
    },
    {
        "word": "СТЕЛЯ",
        "clues": [
        { "text": "Вгорі", "wire": "gray" },
        { "text": "Межує з дахом", "wire": "red" },
        { "text": "Може бути натяжною", "wire": "blue" },
        { "text": "На ній люстра", "wire": "green" },
        { "text": "Білиться вапном", "wire": "yellow" },
        { "text": "Його не дістати рукою", "wire": "violet" }
        ]
    },
    {
        "word": "ДВЕРІ",
        "clues": [
        { "text": "Впускають і випускають", "wire": "gray" },
        { "text": "Мають ручку", "wire": "red" },
        { "text": "Замок — їх охоронець", "wire": "blue" },
        { "text": "Вони відчиняються та зачиняються", "wire": "green" },
        { "text": "У них є одвірок", "wire": "yellow" },
        { "text": "На них є петлі", "wire": "violet" }
        ]
    },
    {
        "word": "ВІКНО",
        "clues": [
        { "text": "Пропускає світло", "wire": "gray" },
        { "text": "З нього дивляться", "wire": "red" },
        { "text": "Має шибку", "wire": "blue" },
        { "text": "Відчиняється назовні або всередину", "wire": "green" },
        { "text": "На ньому є підвіконня", "wire": "yellow" },
        { "text": "Символ можливості", "wire": "violet" }
        ]
    },
    {
        "word": "КЛЮЧ",
        "clues": [
        { "text": "У музиці — це знак при ключі", "wire": "gray" },
        { "text": "У нього є борідка, але не обличчя", "wire": "red" },
        { "text": "Його виготовляють слюсарі", "wire": "blue" },
        { "text": "Він розв'язує загадку", "wire": "green" },
        { "text": "Скрипковий, басовий, від дверей", "wire": "yellow" },
        { "text": "Він — код доступу", "wire": "violet" }
        ]
    },
    {
        "word": "ЗАМОК",
        "clues": [
        { "text": "Буває на дверях і на ланцюгу", "wire": "gray" },
        { "text": "У нього є ключ", "wire": "red" },
        { "text": "Середньовічний — з вежами", "wire": "blue" },
        { "text": "Його відкривають та закривають", "wire": "green" },
        { "text": "Може бути кодовим", "wire": "yellow" },
        { "text": "У казках у ньому принцеса", "wire": "violet" }
        ]
    },
    {
        "word": "ДЗВІН",
        "clues": [
        { "text": "Він звучить", "wire": "gray" },
        { "text": "Його б'ють", "wire": "red" },
        { "text": "Висить на дзвіниці", "wire": "blue" },
        { "text": "Скликає людей", "wire": "green" },
        { "text": "Бронзовий", "wire": "yellow" },
        { "text": "У нього є язик", "wire": "violet" }
        ]
    },
    {
        "word": "ЛІХТАР",
        "clues": [
        { "text": "Світить у темряві", "wire": "gray" },
        { "text": "Може бути вуличним або ручним", "wire": "red" },
        { "text": "Працює на батарейках", "wire": "blue" },
        { "text": "Його запалюють з настанням ночі", "wire": "green" },
        { "text": "Стоїть на стовпі", "wire": "yellow" },
        { "text": "Він — маленьке сонце", "wire": "violet" }
        ]
    },
    {
        "word": "КИЛИМ",
        "clues": [
        { "text": "Лежить на підлозі", "wire": "gray" },
        { "text": "На ньому малюнки", "wire": "red" },
        { "text": "Зберігає тепло", "wire": "blue" },
        { "text": "Його виготовляють ткацьким способом", "wire": "green" },
        { "text": "У казках — літає", "wire": "yellow" },
        { "text": "Його вибивають", "wire": "violet" }
        ]
    },
    {
        "word": "ПОДУШКА",
        "clues": [
        { "text": "М'яка", "wire": "gray" },
        { "text": "Кладуть голову", "wire": "red" },
        { "text": "Набита пір'ям або синтепоном", "wire": "blue" },
        { "text": "Є на ліжку", "wire": "green" },
        { "text": "Допомагає спати", "wire": "yellow" },
        { "text": "Іноді — декоративна", "wire": "violet" }
        ]
    },
    {
        "word": "ОДІЯЛО",
        "clues": [
        { "text": "Ним накриваються", "wire": "gray" },
        { "text": "Зберігає тепло", "wire": "red" },
        { "text": "Буває в теплу пору та в холодну", "wire": "blue" },
        { "text": "У нього є підкладка", "wire": "green" },
        { "text": "Без нього холодно вночі", "wire": "yellow" },
        { "text": "Пір'яне або бавовняне", "wire": "violet" }
        ]
    },
    {
        "word": "ПРОСТИНЯ",
        "clues": [
        { "text": "Тканина на ліжку", "wire": "gray" },
        { "text": "Під простирадлом", "wire": "red" },
        { "text": "Біла або кольорова", "wire": "blue" },
        { "text": "Часто з бавовни", "wire": "green" },
        { "text": "Її застилають", "wire": "yellow" },
        { "text": "Вона гладка", "wire": "violet" }
        ]
    },
    {
        "word": "РУШНИК",
        "clues": [
        { "text": "Витирають", "wire": "gray" },
        { "text": "Він вологий", "wire": "red" },
        { "text": "Висить у ванній", "wire": "blue" },
        { "text": "Бавовняний або махровий", "wire": "green" },
        { "text": "Його міняють", "wire": "yellow" },
        { "text": "Буває кухонним або банним", "wire": "violet" }
        ]
    },
    {
        "word": "МИЛО",
        "clues": [
        { "text": "Миє", "wire": "gray" },
        { "text": "Піниться", "wire": "red" },
        { "text": "Має запах", "wire": "blue" },
        { "text": "Розчиняється у воді", "wire": "green" },
        { "text": "Знищує бактерії", "wire": "yellow" },
        { "text": "Буває рідким або твердим", "wire": "violet" }
        ]
    },
    {
        "word": "ЗУБНА",
        "clues": [
        { "text": "Паста для чищення", "wire": "gray" },
        { "text": "Біла або кольорова", "wire": "red" },
        { "text": "З нею пов'язана щітка", "wire": "blue" },
        { "text": "Охороняє зуби", "wire": "green" },
        { "text": "Гігієнічний засіб", "wire": "yellow" },
        { "text": "Має м'ятний смак", "wire": "violet" }
        ]
    },
    {
        "word": "ЩІТКА",
        "clues": [
        { "text": "Нею чистять", "wire": "gray" },
        { "text": "Буває зубною, волосяною або взуттєвою", "wire": "red" },
        { "text": "Має ворсинки", "wire": "blue" },
        { "text": "Допомагає доглядати", "wire": "green" },
        { "text": "Замінює руку", "wire": "yellow" },
        { "text": "Може бути масажною", "wire": "violet" }
        ]
    },
    {
        "word": "ГРІБІНЕЦЬ",
        "clues": [
        { "text": "Розчісує волосся", "wire": "gray" },
        { "text": "Має зубці", "wire": "red" },
        { "text": "Буває пластмасовим або дерев'яним", "wire": "blue" },
        { "text": "Лежить у кишені", "wire": "green" },
        { "text": "Допомагає зачісці", "wire": "yellow" },
        { "text": "Античний — зі слонової кістки", "wire": "violet" }
        ]
    },
    {
        "word": "ДЗЕРКАЛО",
        "clues": [
        { "text": "Відбиває", "wire": "gray" },
        { "text": "Показує обличчя", "wire": "red" },
        { "text": "Скляне з амальгамою", "wire": "blue" },
        { "text": "З нього дивиться двійник", "wire": "green" },
        { "text": "Заднє — з підсвічуванням", "wire": "yellow" },
        { "text": "У казках — джерело істини", "wire": "violet" }
        ]
    },
    {
        "word": "ПАРФУМ",
        "clues": [
        { "text": "Має аромат", "wire": "gray" },
        { "text": "Наносять на шкіру", "wire": "red" },
        { "text": "Спіральний флакон", "wire": "blue" },
        { "text": "Розрізняють ноти", "wire": "green" },
        { "text": "Це не дезодорант", "wire": "yellow" },
        { "text": "Дорогий подарунок", "wire": "violet" }
        ]
    },
    {
        "word": "ОДЕКОЛОН",
        "clues": [
        { "text": "Свіжий запах", "wire": "gray" },
        { "text": "На спиртовій основі", "wire": "red" },
        { "text": "Чоловічий або жіночий", "wire": "blue" },
        { "text": "Полегшує спеку", "wire": "green" },
        { "text": "Винайдений у Кельні", "wire": "yellow" },
        { "text": "Менш стійкий, ніж парфум", "wire": "violet" }
        ]
    }
    ];

    const difficultyRounds = {
        easy: rounds,
        medium: medium_rounds,
        hard: hard_rounds
    };

    let currentDifficulty = "easy";
    let currentRound = 0;
    let openedClueIndices = [];
    let wrongAttempts = 0;
    let isLost = false;
    let isWon = false;
    let cutWireNames = [];
    let timerActive = false;
    let remainingSeconds = 600;
    let timerInterval = null;

    const normalizeWord = value => value.toUpperCase().normalize("NFKD").replace(/[^\p{L}]/gu, "");

    const getActiveRounds = () => difficultyRounds[currentDifficulty];

    const getCurrentRoundData = () => {
        const activeRounds = getActiveRounds();
        if (currentRound >= activeRounds.length) {
            currentRound = 0;
        }
        return activeRounds[currentRound];
    };

    const renderClues = () => {
        const round = getCurrentRoundData();
        cluesListEl.innerHTML = round.clues.map((clue, index) => {
            const isBase = index === 0;
            const isOpened = isBase || openedClueIndices.includes(index);
            const cardClass = ["clue-card", isOpened ? "is-open" : "", isBase ? "is-base" : ""].filter(Boolean).join(" ");
            const wireLabel = {
                gray: "сірий",
                red: "червоний",
                blue: "синій",
                green: "зелений",
                yellow: "жовтий",
                violet: "фіолетовий"
            }[clue.wire] || "дріт";
            const displayText = isOpened
                ? clue.text
                : `Перерізати ${wireLabel} дріт`;
            return `
                <div class="${cardClass}" data-index="${index}" data-wire="${clue.wire}">
                    ${displayText}
                </div>
            `;
        }).join("");
    };

    const updateStatus = () => {
        const round = getCurrentRoundData();
        progressEl.textContent = `Тверджень відкрито: ${openedClueIndices.length}/${round.clues.length}`;
        stateEl.textContent = isWon ? "Стан: перемога" : isLost ? "Стан: програш" : "Стан: триває";
        bombEl.classList.toggle("is-warning", openedClueIndices.length >= round.clues.length && !isWon && !isLost);

        const wireElements = bombEl.querySelectorAll(".wire-image");
        const wireOrder = ["red", "blue", "green", "yellow", "violet"];
        wireElements.forEach((wire, index) => {
            const wireName = wireOrder[index];
            const shouldHide = cutWireNames.includes(wireName);
            wire.classList.toggle("is-hidden", shouldHide);
            wire.dataset.wire = wireName;
        });
    };

    const showExplosion = () => {
        const overlay = document.createElement("div");
        overlay.className = "explosion-overlay";
        overlay.textContent = "💥 ВИБУХ! 💥";
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 1500);
    };

    const showSafeResult = () => {
        const overlay = document.createElement("div");
        overlay.className = "safe-overlay";
        overlay.textContent = "Пронесло";
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 800);
    };

    const showVictory = () => {
        const round = getCurrentRoundData();
        const overlay = document.createElement("div");
        overlay.className = "victory-overlay";
        overlay.innerHTML = `
            <div class="victory-content">
                <span class="victory-icon">🏆</span>
                <h2>ПЕРЕМОГА!</h2>
                <p>Ви вгадали слово: <strong>${round.word}</strong></p>
                <p class="victory-sub">Бомбу знешкоджено!</p>
            </div>
        `;
        document.body.appendChild(overlay);
        // Автоматичне зникнення через 3 секунди
        setTimeout(() => overlay.remove(), 3000);
    };

    const stopTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        timerActive = false;
    };

    const resetTimer = () => {
        stopTimer();
        timerActive = false;
        remainingSeconds = 600;
        timerEl.textContent = "10:00";
        timerEl.classList.remove("timer-warning");
    };

    const updateTimerDisplay = () => {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        
        // Блимає червоним, якщо залишилось менше 60 секунд
        if (remainingSeconds <= 60 && !isWon && !isLost) {
            timerEl.classList.add("timer-warning");
        } else {
            timerEl.classList.remove("timer-warning");
        }
    };

    const triggerTimeoutExplosion = () => {
        if (isLost || isWon) return;
        isLost = true;
        stopTimer();
        bombEl.classList.add("is-exploded");
        bombEl.querySelectorAll(".wire-image").forEach((wire) => wire.classList.add("is-hidden"));
        showExplosion();
        descriptionEl.textContent = "Час вийшов. Бомба вибухнула.";
        updateStatus();
    };

    const startRound = () => {
        const round = getCurrentRoundData();
        openedClueIndices = [0];
        wrongAttempts = 0;
        cutWireNames = [];
        isLost = false;
        isWon = false;
        answerInput.value = "";
        resetTimer();
        descriptionEl.textContent = `Перший рядок вже відкритий. Перерізайте решту дротів, щоб не дістатися до вибуху.`;
        renderClues();
        updateStatus();
        bombEl.classList.remove("is-warning", "is-exploded");
        // Видаляємо старі оверлеї, якщо вони залишились
        document.querySelectorAll(".victory-overlay, .explosion-overlay, .safe-overlay").forEach(el => el.remove());
    };

    const revealClue = (index) => {
        if (isLost || isWon) return;
        if (index === 0 || openedClueIndices.includes(index)) return;

        const round = getCurrentRoundData();
        const clue = round.clues[index];
        const wireName = clue.wire;
        const shouldExplode = Math.random() < 0.35;

        if (shouldExplode) {
            isLost = true;
            stopTimer();
            bombEl.classList.add("is-exploded");
            bombEl.querySelectorAll(".wire-image").forEach((wire) => wire.classList.add("is-hidden"));
            showExplosion();
            descriptionEl.textContent = "Перерізали не той провід. Бомба здетонувала!";
            updateStatus();
            return;
        }

        openedClueIndices.push(index);
        cutWireNames.push(wireName);
        renderClues();
        updateStatus();
        showSafeResult();
        descriptionEl.textContent = `Пронесло. Провід ${wireName} відрізано успішно.`;
    };

    cluesListEl.addEventListener("click", (event) => {
        const card = event.target.closest(".clue-card");
        if (!card) return;
        const index = Number(card.dataset.index);
        revealClue(index);
    });

    const startTimer = () => {
        if (timerActive || isLost || isWon) return;
        timerActive = true;
        timerEl.classList.remove("timer-warning");
        timerInterval = setInterval(() => {
            remainingSeconds -= 1;
            updateTimerDisplay();
            
            if (remainingSeconds <= 0) {
                triggerTimeoutExplosion();
            }
        }, 1000);
    };

    submitButton.addEventListener("click", () => {
        if (isLost || isWon) {
            descriptionEl.textContent = "Гра вже завершена. Натисніть 'Наступне слово'.";
            return;
        }
        
        const round = getCurrentRoundData();
        const guessed = normalizeWord(answerInput.value);
        if (!guessed) {
            descriptionEl.textContent = "Напишіть слово перед перевіркою.";
            return;
        }

        if (guessed === round.word) {
            isWon = true;
            stopTimer();
            updateStatus();
            bombEl.classList.remove("is-warning");
            descriptionEl.textContent = `Правильно! Це було слово "${round.word}".`;
            showVictory();
            return;
        }

        wrongAttempts = Math.min(wrongAttempts + 1, 5);
        updateStatus();
        descriptionEl.textContent = "Не вгадали. Спробуйте ще раз або відкрийте наступне твердження.";
        answerInput.value = "";
        answerInput.focus();
    });

    nextButton.addEventListener("click", () => {
        const activeRounds = getActiveRounds();
        currentRound = (currentRound + 1) % activeRounds.length;
        startRound();
        // Таймер запускається після того, як гра готова
        setTimeout(startTimer, 100);
    });

    document.querySelectorAll(".difficulty-button").forEach((button) => {
        button.addEventListener("click", () => {
            const nextDifficulty = button.dataset.difficulty;
            if (!nextDifficulty || nextDifficulty === currentDifficulty) return;
            currentDifficulty = nextDifficulty;
            currentRound = 0;
            document.querySelectorAll(".difficulty-button").forEach((item) => {
                item.classList.toggle("is-active", item.dataset.difficulty === currentDifficulty);
            });
            startRound();
            setTimeout(startTimer, 100);
        });
    });

    answerInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            submitButton.click();
        }
    });

    startRound();
    setTimeout(startTimer, 100);
});
