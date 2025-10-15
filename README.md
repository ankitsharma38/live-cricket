# 🏏 Cricket Scoreboard Application

A modern, responsive cricket scoreboard built with React and Tailwind CSS. Features real-time scoring, ball-by-ball tracking, target management, and persistent data storage.

## 🌐 Live Demo

**[🚀 Try the Live Application](https://cricket-live-task.netlify.app/)**

*Experience all features including keyboard shortcuts, data persistence, and responsive design!*

## ✨ Features

### 🎯 Core Functionality
- **Live Scoring** - Real-time runs, wickets, and overs tracking
- **Ball-by-Ball Commentary** - Complete match history with visual indicators
- **Target Management** - Set custom targets with automatic chase calculations
- **Match Statistics** - Boundaries, sixes, strike rates, and run rates
- **Undo Functionality** - Revert any scoring action with complete state restoration
- **Team Management** - Custom team names and innings switching

### ⌨️ Keyboard Shortcuts
- **0 or Space** → Dot ball (•)
- **1-6** → Add runs
- **W** → Wicket
- **U** → Undo last action

### 📱 User Interface
- **Responsive Design** - Works perfectly on desktop and mobile
- **Professional Styling** - Clean UI with cricket ball favicon
- **Dynamic Browser Title** - Shows live score in browser tab
- **Color-coded Balls** - Visual distinction for different ball types
- **Target Status** - Real-time chase requirements with success/failure indicators

### 💾 Data Persistence
- **Auto-save** - Automatically saves all match data
- **Persistent Storage** - Data survives page refresh and browser restart
- **localStorage** - Reliable browser-based storage
- **Complete State** - Preserves all scoring, statistics, and match history

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankitsharma38/live-cricket
   cd live-cricket
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
```

## 🎮 How to Use

### Basic Scoring
1. **Add Runs** - Click number buttons (1-6) or use keyboard
2. **Dot Ball** - Click "•" button or press 0/Space
3. **Wicket** - Click "WICKET" button or press W
4. **Extras** - Click Wide/No Ball/Bye/Leg Bye for extras with custom runs

### Match Management
1. **Set Teams** - Enter team names in Controls section
2. **Set Overs** - Choose T20 (20), ODI (50), or custom overs
3. **Set Target** - Click Target button to set custom chase target
4. **Switch Innings** - Automatically switch after completing overs/wickets
5. **Reset Match** - Reset all data with confirmation dialog

### Advanced Features
- **Undo** - Press U or click Undo to revert last action
- **Target Chase** - Set custom targets and track "Need X runs in Y balls"
- **Match Statistics** - View boundaries, sixes, strike rates in real-time
- **Current Over** - See balls in the current over separately

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Footer.jsx          # App footer
│   │   └── Navbar.jsx          # App header with branding
│   └── scoreboard/
│       ├── Commentary.jsx      # Ball-by-ball and current over display
│       ├── MatchControls.jsx   # Match management controls
│       ├── MatchStatistics.jsx # Statistics panel
│       ├── ScoreDisplay.jsx    # Main score display with target info
│       └── ScoringButtons.jsx  # Scoring interface with modals
├── hooks/
│   ├── useKeyboard.js          # Keyboard shortcuts functionality
│   └── useMatch.js             # Main match state management
├── App.jsx                     # Main application component
├── index.css                   # Tailwind CSS imports
└── main.jsx                    # React app entry point
```

## 🔧 Technical Details

### State Management
- **React Hooks** - useState for component state
- **Custom Hooks** - useMatch for match logic, useKeyboard for shortcuts
- **Persistent Storage** - localStorage with auto-save/load

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-first approach
- **Custom Colors** - Cricket-themed color scheme
- **Professional UI** - Clean, modern interface

### Data Storage
```javascript
// Storage Structure
{
  teamA: "Team A",
  teamB: "Team B", 
  runs: 45,
  wickets: 3,
  balls: 24,
  ballByBall: ["1", "4", "•", "W", "6", "2"],
  target: { score: 150, overs: 20 },
  // ... complete match state
}
```

### Browser Compatibility
- **Modern Browsers** - Chrome, Firefox, Safari, Edge
- **localStorage Support** - All modern browsers
- **Responsive** - Works on desktop, tablet, mobile

## 🎯 Key Components

### ScoreDisplay
- Live score with runs/wickets
- Overs display with ball precision
- Run rate and strike rate calculations
- Target chase information with color-coded status

### ScoringButtons
- Quick scoring interface
- Modal popups for extras (Wide, No Ball, Bye, Leg Bye)
- Responsive button layout
- Input validation for extra runs

### MatchControls
- Undo, Target, Reset functionality
- Match format selection (T20, ODI, Custom)
- Team name management
- Innings switching with confirmation

### Commentary
- Complete ball-by-ball history
- Current over display
- Color-coded ball indicators
- Visual distinction for different ball types

## 🔄 Data Persistence

The application uses **localStorage** for reliable data persistence:

- **Auto-save** - Saves on every state change
- **Auto-load** - Loads saved data on app start
- **Complete State** - Preserves all match data
- **Error Handling** - Graceful fallback for storage issues

## 🎨 Customization

### Colors
- **Primary** - Blue (#1976d2)
- **Success** - Green (boundaries, target achieved)
- **Warning** - Yellow (wides), Orange (no balls)
- **Danger** - Red (wickets, target failed)

### Responsive Breakpoints
- **Mobile** - < 1024px (stacked layout)
- **Desktop** - ≥ 1024px (side-by-side layout)

## 🐛 Troubleshooting

### Data Not Persisting
- Check browser localStorage is enabled
- Clear browser cache and reload
- Check browser console for errors

### Keyboard Shortcuts Not Working
- Ensure no input fields are focused
- Check browser console for JavaScript errors
- Try clicking on the page background first

### UI Issues
- Clear browser cache
- Check if Tailwind CSS is loading properly
- Verify responsive design on different screen sizes

## 📝 License

This project is built for educational and demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for cricket lovers** 🏏

*Enjoy scoring your matches with this modern cricket scoreboard!*
