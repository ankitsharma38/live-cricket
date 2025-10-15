import { useEffect } from 'react'

export const useKeyboard = (matchData) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Prevent keyboard actions when typing in inputs
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return
      }

      const key = event.key
      
      switch (key) {
        case '0':
        case ' ':
          matchData.handleDot()
          break
        case '1':
          matchData.handleRun(1)
          break
        case '2':
          matchData.handleRun(2)
          break
        case '3':
          matchData.handleRun(3)
          break
        case '4':
          matchData.handleRun(4)
          break
        case '5':
          matchData.handleRun(5)
          break
        case '6':
          matchData.handleRun(6)
          break
        case 'w':
        case 'W':
          matchData.handleWicket()
          break
        case 'u':
        case 'U':
          matchData.handleUndo()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [matchData])
}