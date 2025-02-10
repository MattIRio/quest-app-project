export const quests = [
   { id: 1, name: "Haunted Mansion", rating: 4.5, tags: ["horror", "mystery"] },
   { id: 2, name: "Space Odyssey", rating: 4.8, tags: ["sci-fi", "adventure"] },
   { id: 3, name: "Lost in the Woods", rating: 4.2, tags: ["adventure", "mystery"] },
   { id: 4, name: "Cyber Heist", rating: 4.7, tags: ["sci-fi", "fantasy"] },
   { id: 5, name: "Phantom Shadows", rating: 4.3, tags: ["horror", "fantasy"] },
   { id: 6, name: "Time Rift", rating: 4.6, tags: ["sci-fi", "mystery"] },
   { id: 7, name: "Dark Secrets", rating: 4.1, tags: ["horror", "thriller"] },
   { id: 8, name: "Enchanted Forest", rating: 4.9, tags: ["fantasy", "adventure"] },
   { id: 9, name: "Alien Invasion", rating: 4.4, tags: ["sci-fi", "action"] },
   { id: 10, name: "Castle of the Dead", rating: 4.7, tags: ["horror", "fantasy"] }
];

export const tagsList = [
   "horror", "adventure", "mystery", "sci-fi", "fantasy",
   "romance", "thriller", "comedy", "drama", "action",
   "historical", "biography", "crime", "psychological", "philosophy"
];


export const questData = {
   title: "Таємниці загубленого міста",
   description:
      "Ви — дослідник, який вирушив у подорож до загубленого міста. Ваше завдання — розгадати всі загадки та знайти скарби древньої цивілізації.",
   tasks: [
      {
         title: "Вхід до міста",
         type: "multiple-choice",
         question:
            "Щоб увійти до міста, потрібно розгадати код на воротах. Яке число є сумою всіх цифр у році заснування міста (1327)?",
         options: ["13", "14", "12", "15"],
         correct: "13",
      },
      {
         title: "Храм мудрості",
         type: "multiple-choice",
         question:
            "У храмі є три статуї. Одна завжди каже правду, друга завжди бреше, третя говорить випадково. Ви питаєте одну з них: 'Яка дорога веде до скарбу?' Як дізнатися правильний шлях?",
         options: [
            "Запитати будь-яку статую і піти протилежним шляхом",
            "Запитати всі статуї і обрати найбільш популярну відповідь",
            "Запитати статую, яка завжди каже правду",
            "Йти наосліп",
         ],
         correct: "Запитати будь-яку статую і піти протилежним шляхом",
      },
      {
         title: "Скарбниця",
         type: "multiple-choice",
         question:
            "Перед вами три скрині: золота, срібна і дерев'яна. Лише одна містить скарб. На них є написи: 'Скарб не тут' (золота), 'Скарб у золотій скрині' (срібна), 'Скарб не в срібній скрині' (дерев'яна). Відомо, що лише один напис правдивий. Де скарб?",
         options: ["Золота скриня", "Срібна скриня", "Дерев'яна скриня"],
         correct: "Дерев'яна скриня",
      },
      {
         title: "Загадка жерця",
         type: "text",
         question:
            "Жрець вимовив стародавнє слово, яке означає 'світло'. Що це за слово?",
         correct: "lux",
      },
      {
         title: "Ключ до скарбу",
         type: "text",
         question:
            "Вас зустрічає напис на стіні: 'Сума половини і третьої частини числа X дорівнює 30'. Знайдіть X.",
         correct: "36",
      },
   ],
};
