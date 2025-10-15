import { useState, useEffect } from 'react'

export const useMatch = () => {
  const [teamA, setTeamA] = useState('Team A')
  const [teamB, setTeamB] = useState('Team B')
  const [currentTeam, setCurrentTeam] = useState('A')
  const [runs, setRuns] = useState(0)
  const [wickets, setWickets] = useState(0)
  const [balls, setBalls] = useState(0)
  const [totalOvers, setTotalOvers] = useState(20)
  const [target, setTarget] = useState(null)
  const [commentary, setCommentary] = useState([])
  const [ballByBall, setBallByBall] = useState([])
  const [history, setHistory] = useState([])
  const [innings, setInnings] = useState(1)
  const [firstInningsScore, setFirstInningsScore] = useState(null)
  const [ballsFaced, setBallsFaced] = useState(0)
  const [boundaries, setBoundaries] = useState(0)
  const [sixes, setSixes] = useState(0)
  const [dotBalls, setDotBalls] = useState(0)

  const getOvers = () => {
    const completedOvers = Math.floor(balls / 6)
    const remainingBalls = balls % 6
    return `${completedOvers}.${remainingBalls}`
  }

  const getRunRate = () => {
    const overs = balls / 6
    return overs > 0 ? (runs / overs).toFixed(2) : '0.00'
  }

  const addToHistory = (action) => {
    setHistory(prev => [...prev, { runs, wickets, balls, ballsFaced, boundaries, sixes, dotBalls, ballByBall, action }])
  }

  const addCommentary = (text) => {
    setCommentary(prev => [text, ...prev.slice(0, 9)])
  }

  const addBallByBall = (value) => {
    setBallByBall(prev => [...prev, value])
  }

  const isMatchComplete = () => {
    return balls >= totalOvers * 6 || wickets >= 10 || (target && runs >= target.score)
  }

  const getMatchStatus = () => {
    if (innings === 1 && isMatchComplete()) {
      return `${currentTeam === 'A' ? teamA : teamB} innings complete`
    }
    if (innings === 2 && target && runs >= target.score) {
      return `${currentTeam === 'A' ? teamA : teamB} wins!`
    }
    if (innings === 2 && isMatchComplete() && target && runs < target.score) {
      return `${currentTeam === 'A' ? teamB : teamA} wins!`
    }
    return ''
  }

  const handleRun = (runValue) => {
    if (isMatchComplete()) return
    addToHistory(`${runValue} run${runValue > 1 ? 's' : ''}`)
    setRuns(prev => prev + runValue)
    setBalls(prev => prev + 1)
    setBallsFaced(prev => prev + 1)
    if (runValue === 4) setBoundaries(prev => prev + 1)
    if (runValue === 6) setSixes(prev => prev + 1)
    addCommentary(`${runValue} run${runValue > 1 ? 's' : ''}`)
    addBallByBall(runValue.toString())
  }

  const handleDot = () => {
    if (isMatchComplete()) return
    addToHistory('Dot ball')
    setBalls(prev => prev + 1)
    setBallsFaced(prev => prev + 1)
    setDotBalls(prev => prev + 1)
    addCommentary('Dot ball')
    addBallByBall('•')
  }

  const handleWicket = () => {
    if (isMatchComplete()) return
    addToHistory('Wicket')
    setWickets(prev => prev + 1)
    setBalls(prev => prev + 1)
    setBallsFaced(prev => prev + 1)
    addCommentary('WICKET!')
    addBallByBall('W')
  }

  const handleExtra = (type, extraRuns = 1) => {
    if (isMatchComplete()) return
    addToHistory(`${type} ${extraRuns > 1 ? extraRuns + ' runs' : ''}`)
    setRuns(prev => prev + extraRuns)
    if (type !== 'No Ball' && type !== 'Wide') {
      setBalls(prev => prev + 1)
      setBallsFaced(prev => prev + 1)
      addBallByBall(type === 'Bye' ? 'B' : 'LB')
    } else {
      addBallByBall(type === 'Wide' ? `WD${extraRuns > 1 ? extraRuns : ''}` : 'NB')
    }
    addCommentary(`${type}${extraRuns > 1 ? ` (${extraRuns} runs)` : ''}`)
  }

  const handleUndo = () => {
    if (history.length === 0) return
    const lastState = history[history.length - 1]
    setRuns(lastState.runs)
    setWickets(lastState.wickets)
    setBalls(lastState.balls)
    setBallsFaced(lastState.ballsFaced)
    setBoundaries(lastState.boundaries)
    setSixes(lastState.sixes)
    setDotBalls(lastState.dotBalls)
    setBallByBall(lastState.ballByBall)
    setHistory(prev => prev.slice(0, -1))
    setCommentary(prev => [`Undo: ${lastState.action}`, ...prev.slice(0, 9)])
  }

  const switchInnings = () => {
    if (innings === 1) {
      setFirstInningsScore({ runs, wickets, balls })
      setTarget({ score: runs + 1, overs: totalOvers })
      setInnings(2)
    }
    setCurrentTeam(currentTeam === 'A' ? 'B' : 'A')
    setRuns(0)
    setWickets(0)
    setBalls(0)
    setBallsFaced(0)
    setBoundaries(0)
    setSixes(0)
    setDotBalls(0)
    setCommentary([])
    setHistory([])
    setBallByBall([])
  }

  const resetMatch = async () => {
    setRuns(0)
    setWickets(0)
    setBalls(0)
    setBallsFaced(0)
    setBoundaries(0)
    setSixes(0)
    setDotBalls(0)
    setTarget(null)
    setCommentary([])
    setHistory([])
    setInnings(1)
    setFirstInningsScore(null)
    setCurrentTeam('A')
    setBallByBall([])
    localStorage.removeItem('cricketScoreboard')
  }

  const [isLoaded, setIsLoaded] = useState(false)

  // Load state on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const saved = localStorage.getItem('cricketScoreboard')
        if (saved) {
          const data = JSON.parse(saved)
          console.log('Loading saved data:', data)
          setTeamA(data.teamA || 'Team A')
          setTeamB(data.teamB || 'Team B')
          setCurrentTeam(data.currentTeam || 'A')
          setRuns(data.runs || 0)
          setWickets(data.wickets || 0)
          setBalls(data.balls || 0)
          setTotalOvers(data.totalOvers || 20)
          setTarget(data.target || null)
          setCommentary(data.commentary || [])
          setBallByBall(data.ballByBall || [])
          setHistory(data.history || [])
          setInnings(data.innings || 1)
          setFirstInningsScore(data.firstInningsScore || null)
          setBallsFaced(data.ballsFaced || 0)
          setBoundaries(data.boundaries || 0)
          setSixes(data.sixes || 0)
          setDotBalls(data.dotBalls || 0)
        }
        setIsLoaded(true)
      } catch (e) {
        console.error('Error loading data:', e)
        setIsLoaded(true)
      }
    }
    loadData()
  }, [])

  // Save state whenever it changes (but only after initial load)
  useEffect(() => {
    if (!isLoaded) return
    
    const state = {
      teamA, teamB, currentTeam, runs, wickets, balls, totalOvers,
      target, commentary, ballByBall, history, innings, firstInningsScore,
      ballsFaced, boundaries, sixes, dotBalls
    }
    localStorage.setItem('cricketScoreboard', JSON.stringify(state))
    console.log('Saving data:', state)
  }, [isLoaded, runs, wickets, balls, ballByBall, target, innings, teamA, teamB, currentTeam, totalOvers, commentary, history, firstInningsScore, ballsFaced, boundaries, sixes, dotBalls])

  return {
    teamA, setTeamA,
    teamB, setTeamB,
    currentTeam,
    runs, wickets, balls,
    totalOvers, setTotalOvers,
    target, setTarget, commentary, history,
    innings, firstInningsScore,
    ballsFaced, boundaries, sixes, dotBalls,
    ballByBall,
    getOvers, getRunRate, getMatchStatus,
    isMatchComplete,
    handleRun, handleDot, handleWicket, handleExtra,
    handleUndo, switchInnings, resetMatch
  }
}