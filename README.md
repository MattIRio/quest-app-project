# Virtual Quests - Interactive Platform


## Description
This project is a web platform for creating and completing interactive quests with multimedia elements. Users can create their own quests, configure tasks, and participate in quests created by others.

## Features
### 1. User Registration & Authentication:
- Sign up via email or social media
- Profile creation (avatar, name, email, password)

### 2. Quest Creation:
- Define quest title, description, number of tasks, and time limits
- Add multimedia content (text, images, videos(unfinished))
- Various question types: open-ended, multiple-choice, image-based object search

### 3. Quest Participation:
- Interactive task map
- Real-time progress tracking
- Countdown timer for time-limited tasks

### 4. Rating & Feedback System:
- Quest author ranking
- Quest reviews and ratings (stars, comments)

## Technologies
- **Backend**: Spring Boot (Java), PostgreSQL, WebSocket, Python
- **Frontend**: React.js, CSS, Mui, Rtk query, Witi
- **Database**: PostgreSQL
- **Deployment**: Heroku / Docker

## Running the Project with Docker

### 1. Build and Run with `docker-compose`
```sh
docker-compose up --build

