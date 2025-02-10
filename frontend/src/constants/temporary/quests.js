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

export const completedQuestsList = [
   {
      name: "Dragon Slayer",
      rating: 5,
      tags: ["Combat", "Epic"],
      completionDate: new Date(2023, 5, 15)
   },
   {
      name: "Treasure Hunt",
      rating: 4,
      tags: ["Adventure", "Puzzle"],
      completionDate: new Date(2023, 6, 1)
   },
   {
      name: "Magic Master",
      rating: 3,
      tags: ["Magic", "Skills"],
      completionDate: new Date(2023, 7, 10)
   },
   {
      name: "Forest Guardian",
      rating: 4,
      tags: ["Nature", "Exploration"],
      completionDate: new Date(2023, 8, 5)
   },
   {
      name: "Shadow Assassin",
      rating: 5,
      tags: ["Stealth", "Combat"],
      completionDate: new Date(2023, 9, 20)
   },
   {
      name: "Alchemist's Challenge",
      rating: 3,
      tags: ["Crafting", "Puzzle"],
      completionDate: new Date(2023, 10, 12)
   },
   {
      name: "Pirate's Bounty",
      rating: 4,
      tags: ["Adventure", "Combat"],
      completionDate: new Date(2023, 11, 3)
   },
   {
      name: "Ice Caverns",
      rating: 4,
      tags: ["Exploration", "Survival"],
      completionDate: new Date(2024, 0, 15)
   },
   {
      name: "The Lost City",
      rating: 5,
      tags: ["Adventure", "Mystery"],
      completionDate: new Date(2024, 1, 10)
   },
   {
      name: "Fire Temple",
      rating: 4,
      tags: ["Combat", "Puzzle"],
      completionDate: new Date(2024, 2, 22)
   },
   {
      name: "Arcane Library",
      rating: 3,
      tags: ["Magic", "Knowledge"],
      completionDate: new Date(2024, 3, 5)
   },
   {
      name: "Beast Tamer",
      rating: 4,
      tags: ["Combat", "Nature"],
      completionDate: new Date(2024, 4, 18)
   },
   {
      name: "Sky Fortress",
      rating: 5,
      tags: ["Adventure", "Epic"],
      completionDate: new Date(2024, 5, 30)
   },
   {
      name: "Underground Labyrinth",
      rating: 4,
      tags: ["Exploration", "Puzzle"],
      completionDate: new Date(2024, 6, 7)
   },
   {
      name: "The Enchanted Garden",
      rating: 3,
      tags: ["Nature", "Magic"],
      completionDate: new Date(2024, 7, 14)
   },
   {
      name: "Desert Nomad",
      rating: 4,
      tags: ["Survival", "Adventure"],
      completionDate: new Date(2024, 8, 25)
   },
   {
      name: "The Dark Tower",
      rating: 5,
      tags: ["Combat", "Epic"],
      completionDate: new Date(2024, 9, 1)
   },
   {
      name: "Crystal Caves",
      rating: 4,
      tags: ["Exploration", "Puzzle"],
      completionDate: new Date(2024, 10, 10)
   },
   {
      name: "The Forgotten Tomb",
      rating: 3,
      tags: ["Adventure", "Mystery"],
      completionDate: new Date(2024, 11, 20)
   },
   {
      name: "The Elemental Trials",
      rating: 5,
      tags: ["Combat", "Magic"],
      completionDate: new Date(2025, 0, 5)
   },
   {
      name: "The Haunted Manor",
      rating: 4,
      tags: ["Horror", "Mystery"],
      completionDate: new Date(2025, 1, 15)
   },
   {
      name: "The Golden Fleece",
      rating: 5,
      tags: ["Adventure", "Epic"],
      completionDate: new Date(2025, 2, 25)
   },
   {
      name: "The Clockwork City",
      rating: 4,
      tags: ["Puzzle", "Steampunk"],
      completionDate: new Date(2025, 3, 10)
   },
   {
      name: "The Celestial Temple",
      rating: 5,
      tags: ["Magic", "Epic"],
      completionDate: new Date(2025, 4, 20)
   },
   {
      name: "The Frozen Wasteland",
      rating: 4,
      tags: ["Survival", "Exploration"],
      completionDate: new Date(2025, 5, 30)
   },
   {
      name: "The Infernal Abyss",
      rating: 5,
      tags: ["Combat", "Horror"],
      completionDate: new Date(2025, 6, 15)
   },
   {
      name: "The Sacred Grove",
      rating: 4,
      tags: ["Nature", "Magic"],
      completionDate: new Date(2025, 7, 25)
   },
   {
      name: "The Ancient Ruins",
      rating: 3,
      tags: ["Exploration", "Mystery"],
      completionDate: new Date(2025, 8, 5)
   },
   {
      name: "The Phantom Ship",
      rating: 4,
      tags: ["Adventure", "Horror"],
      completionDate: new Date(2025, 9, 15)
   },
   {
      name: "The Eternal Flame",
      rating: 5,
      tags: ["Combat", "Epic"],
      completionDate: new Date(2025, 10, 25)
   }
];