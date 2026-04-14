# Neon Arcade (CYBER-ARCADE: PRO EDITION)

A retro-futuristic, browser-based arcade web application featuring a collection of classic and fast-paced mini-games. Built purely with Vanilla JavaScript, HTML, and CSS, it includes global score tracking and local storage to save your highest scores across sessions.

## 🎮 Included Games

1. **Tic-Tac-Toe** (`⭕`)
   - The classic 3x3 grid game. Defeat the system by aligning three identical symbols horizontally, vertically, or diagonally.
   - **Reward**: +500 points for winning.

2. **Memory Match** (`🃏`)
   - Test your memory by flipping and matching pairs of symbols hidden behind cards.
   - **Mechanics**: +200 points for a successful match. -50 points penalty for a mismatch.
   - Auto-reloads automatically when all cards are successfully matched!

3. **Meteor Blaster** (`🚀`)
   - A fast-paced shooter game. Defend yourself against a continuous barrage of falling meteors.
   - **Controls**: Use the **Left** and **Right** arrow keys to maneuver your spaceship. Press **Spacebar** to fire lasers to destroy them.
   - **Reward**: +100 points for each successfully destroyed meteor.

4. **Blade Master** (`⚔️`)
   - A quick-reflex slicing game.
   - **Mechanics**: Hover your mouse or slash across the falling fruits to slice them in mid-air.
   - **Reward**: +50 points for each fruit sliced.

## ✨ Features

- **Global Score System**: Points earned from all connected mini-games feed directly into your active session score in the top status bar.
- **Top Score Persistence**: The arcade remembers your highest score using Web Local Storage, so your records act as the target beat across sessions even if you close the browser.
- **Dynamic Session Loading**: Smoothly switch between games without requiring the page to hard refresh.

## 🚀 How to Run

Because this project is built entirely on native web standards with zero dependencies, there is no need for local servers or installations.

1. Clone or download this project folder to your local machine.
2. Locate the `index.html` file.
3. Open it directly in your favorite modern web browser (Google Chrome, Firefox, Safari, Edge).
4. Select a protocol to begin!

## 🛠️ File Structure

- `index.html` - The structural skeleton and Game Menu UI.
- `style.css` - Contains the styling algorithms, glow text filters, and responsive components logic.
- `arcade.js` - Contains the logic engines for all 4 mini-games, game loop instancing, and score keeping.
