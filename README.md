# Worddle

Worddle is a mobile game built with React Native and Expo. It turns a familiar word puzzle into a clean mobile experience with dynamic board generation, a custom on-screen keyboard, and instant color-coded feedback for every guess.


## Screenshots



## Highlights

- Built a mobile word game with support for 4-letter, 5-letter, and 6-letter puzzle modes
- Implemented dynamic guess-grid rendering and custom keyboard interactions for a responsive gameplay experience
- Added real-time per-letter feedback using color states to mirror familiar puzzle-solving mechanics
- Structured the app with reusable components and navigation-driven flow for maintainable frontend architecture

## Features

- Multiple word-length modes
- Dynamic board generation based on selected difficulty
- Randomized target word selection from local word lists
- Custom virtual keyboard with enter and delete controls
- Color-coded tile feedback for guess evaluation
- Clean flow between home screen and gameplay screen

## Tech Stack

- React Native
- Expo
- JavaScript
- React Navigation
- React Hooks

## How It Works

1. The user selects a word length from the home screen.
2. The app generates a game board based on the selected mode.
3. A random word is picked from the matching local word list.
4. The player enters guesses through the custom keyboard.
5. Each letter is evaluated and displayed with visual feedback.

## Project Structure

```text
worddle/
├── App.js
├── index.js
├── screens/
│   ├── HomeScreen.js
│   └── GameScreen.js
├── components/
│   ├── Grid.js
│   ├── Cell.js
│   └── Keyboard.js
├── utils/
│   └── Words.js
├── assets/
└── package.json
```

## Getting Started

```bash
npm install
npm start
```



