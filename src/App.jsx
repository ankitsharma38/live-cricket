import { useMatch } from './hooks/useMatch'
import { useKeyboard } from './hooks/useKeyboard'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScoreDisplay from './components/scoreboard/ScoreDisplay'
import ScoringButtons from './components/scoreboard/ScoringButtons'
import MatchControls from './components/scoreboard/MatchControls'
import Commentary from './components/scoreboard/Commentary'
import MatchStatistics from './components/scoreboard/MatchStatistics'

function App() {
  const matchData = useMatch()
  useKeyboard(matchData)

  useEffect(() => {
    document.title = `🏏 ${matchData.runs}/${matchData.wickets} (${matchData.getOvers()}) - Cricket Scoreboard`
  }, [matchData.runs, matchData.wickets, matchData.balls])

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto p-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Main Controls */}
          <div className="lg:col-span-2 space-y-6">
            <ScoreDisplay 
              currentTeam={matchData.currentTeam}
              teamA={matchData.teamA}
              teamB={matchData.teamB}
              runs={matchData.runs}
              wickets={matchData.wickets}
              getOvers={matchData.getOvers}
              getRunRate={matchData.getRunRate}
              totalOvers={matchData.totalOvers}
              ballsFaced={matchData.ballsFaced}
              balls={matchData.balls}
              target={matchData.target}
            />

            <ScoringButtons 
              handleDot={matchData.handleDot}
              handleRun={matchData.handleRun}
              handleWicket={matchData.handleWicket}
              handleExtra={matchData.handleExtra}
              isMatchComplete={matchData.isMatchComplete}
            />

            <MatchControls 
              handleUndo={matchData.handleUndo}
              history={matchData.history}
              setTotalOvers={matchData.setTotalOvers}
              totalOvers={matchData.totalOvers}
              switchInnings={matchData.switchInnings}
              isMatchComplete={matchData.isMatchComplete}
              innings={matchData.innings}
              resetMatch={matchData.resetMatch}
              teamA={matchData.teamA}
              setTeamA={matchData.setTeamA}
              teamB={matchData.teamB}
              setTeamB={matchData.setTeamB}
              target={matchData.target}
              setTarget={matchData.setTarget}
              runs={matchData.runs}
            />
          </div>

          {/* Right Side - Commentary and Statistics */}
          <div className="lg:col-span-1 space-y-6">
            <Commentary 
              ballByBall={matchData.ballByBall}
              balls={matchData.balls}
            />

            <MatchStatistics 
              ballsFaced={matchData.ballsFaced}
              boundaries={matchData.boundaries}
              sixes={matchData.sixes}
              dotBalls={matchData.dotBalls}
              runs={matchData.runs}
              balls={matchData.balls}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
