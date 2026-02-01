# TravelTrucks

# Travel Trucks App is a web application for browsing and booking travel trucks.

## The app allows users to explore available trucks, filter them by parameters, view detailed information, and make a booking request through a form.

## Features

- Browse a list of available travel trucks
- View detailed information about each truck
- Filter trucks by different criteria
- Book a truck using a booking form
- Loader during asynchronous data fetching
- Notification after successful booking

---

## Technologies Used

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Redux Toolkit**
- **CSS / CSS Modules**

---

## Installation and Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/AntonZorkin/TravelTrucksApp.git
   Navigate to the project directory:
   cd TravelTrucksApp
   Install dependencies:
   npm install
   Run the development server:
   npm run dev
   Open your browser and go to:
   http://localhost:3000
   Build for Production
   npm run build
   npm start
   Author:   Anton Zorkin,   Frontend Developer
   GitHub: https://github.com/AntonZorkin/TravelTrucksApp
   Notes:   This project was created as a learning and portfolio project to practice modern frontend development with Next.js, TypeScript, and Redux.
   ```

## **TravelTrucks** — фронтенд частина веб-додатку для компанії з оренди кемперів. Додаток дозволяє переглядати список кемперів у каталозі, фільтрувати оголошення, відкривати сторінку конкретного кемпера з характеристиками та відгуками, а також залишати заявку на бронювання через форму.

## Основні можливості

- **Домашня сторінка (Home)**
  - Головний банер з CTA (перехід до каталогу)
  - Навігація по сайту
- **Сторінка каталогу (Catalog)**
  - Список оголошень про кемпери
  - Фільтрація за:
    - локацією (місто)
    - типом авто (van / fully integrated / alcove)
    - обладнанням (AC, automatic, kitchen, TV, bathroom тощо)
  - Додавання кемпера в обране (іконка ❤️)
  - Кнопка “Show more” для переходу на детальну сторінку
- **Сторінка одного кемпера (Camper details)**
  - Галерея зображень
  - Вкладки **Features** та **Reviews**
  - Блок характеристик (довжина, ширина, висота, бак, витрата тощо)
  - **Форма бронювання**: ім’я, email, дата, коментар

---

## Технології (приклад)

- React
- Next.js
- Axios / Fetch API
- HTML/CSS (або SCSS / CSS Modules — залежить від реалізації)

---

## ⚙️ Встановлення та запуск

1. **Клонувати репозиторій:**
   ```bash
   git clone https://github.com/AntonZorkin/TravelTrucksApp
   ```
   **Перейти в папку проєкту:**
   cd traveltrucks
   **Встановити залежності:**
   npm install
   **Запустити локально:**
   npm run dev
   **Відкрити у браузері:**
   http://localhost:3000 (або порт, який покаже консоль)
   **Структура сторінок**
   / — Home
   /catalog — Catalog
   /catalog/:id — Camper details
   **Автор**
   Зоркін Антон
   https://github.com/AntonZorkin/TravelTrucksApp
