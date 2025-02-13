# Використовуємо легкий образ Node.js
FROM node:18-alpine

# Встановлюємо робочу директорію всередині контейнера
WORKDIR /app

# Копіюємо package.json і package-lock.json
COPY frontend/package.json frontend/package-lock.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код у контейнер
COPY frontend .

# Відкриваємо порт 3000 для React
EXPOSE 5173

# Запускаємо React у режимі розробки
CMD ["npm", "run", "dev"]