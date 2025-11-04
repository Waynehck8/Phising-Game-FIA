# 🎯 Phishing Game

An educational web game that teaches users how to identify phishing websites through interactive gameplay.

## 🎮 How to Play

1. **Start the Game**: Click "Start Game" to begin
2. **View Screenshots**: You'll see 10 website screenshots - some real, some fake
3. **Make Your Choice**: Click "Real" or "Phishing" for each website
4. **Get Feedback**: Receive instant feedback and explanations
5. **See Your Score**: View your final score, accuracy, and improvement tips

## 🏆 Scoring System

- **+10 points**: Correct answer
- **+5 points**: Fast answer bonus (under 5 seconds)
- **-3 points**: Wrong answer
- **Final Score**: Total points earned throughout the game

## 🎯 Educational Goals

This game helps players learn to identify phishing websites by recognizing:

- **Suspicious domains** (typos, unusual extensions)
- **Urgent messages** (account suspension, security alerts)
- **Poor design quality** (inconsistent branding, amateur layouts)
- **Requests for sensitive information** (passwords, credit cards, SSN)
- **Grammar and spelling errors**

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App
- **Deployment**: Ready for Vercel/Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd phishing-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 📁 Project Structure

```
phishing-game/
├── public/
│   ├── images/          # Website screenshots
│   └── index.html
├── src/
│   ├── components/      # React components
│   │   ├── StartScreen.tsx
│   │   ├── GameGrid.tsx
│   │   ├── TileCard.tsx
│   │   └── EndScreen.tsx
│   ├── data/
│   │   └── rounds.json  # Game data
│   ├── types/
│   │   └── game.ts      # TypeScript interfaces
│   ├── App.tsx          # Main app component
│   └── index.tsx        # Entry point
├── tailwind.config.js   # Tailwind configuration
└── package.json
```

## 🎨 Customization

### Adding New Rounds

Edit `src/data/rounds.json` to add new website screenshots:

```json
{
  "id": 11,
  "image": "/images/new-site.png",
  "label": "phishing",
  "title": "New Phishing Site",
  "explanation": "This is a phishing site because...",
  "indicators": ["Suspicious domain", "Urgent message", "Poor design"]
}
```

### Modifying Scoring

Update the scoring logic in `src/components/GameGrid.tsx`:

```typescript
// Calculate points
let points = isCorrect ? 10 : -3;
if (isCorrect && timeSpent < 5000) {
  points += 5; // Fast answer bonus
}
```

## 🌐 Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

### Netlify

1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎓 Educational Use

This game is designed for educational purposes to raise awareness about phishing attacks. It can be used in:

- Cybersecurity training programs
- School computer science classes
- Corporate security awareness training
- Personal learning and skill development

## 🔒 Security Note

All website screenshots in this game are either:
- Legitimate websites (used with educational intent)
- Mock phishing sites created for educational purposes

No real phishing sites are used, and all content is designed purely for educational value.

---

**Remember**: Stay vigilant online and always verify before you trust!
