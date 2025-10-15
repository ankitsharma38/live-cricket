const Commentary = ({ ballByBall, balls }) => {
  const getCurrentOver = () => {
    // Count legitimate balls (excluding wides and no balls)
    let legitimateBalls = 0
    let currentOverBalls = []
    
    // Go through balls from the end to find current over
    for (let i = ballByBall.length - 1; i >= 0; i--) {
      const ball = ballByBall[i]
      currentOverBalls.unshift(ball)
      
      // Count only legitimate balls (not wides or no balls)
      if (!ball.includes('WD') && !ball.includes('NB')) {
        legitimateBalls++
      }
      
      // Stop when we have 6 legitimate balls or reach start of over
      if (legitimateBalls >= 6) {
        break
      }
    }
    
    return currentOverBalls
  }

  const getBallColor = (ball) => {
    if (ball === 'W') return 'bg-red-600 text-white border-red-700'
    if (ball === '4') return 'bg-green-600 text-white border-green-700'
    if (ball === '6') return 'bg-green-700 text-white border-green-800'
    if (ball === '•') return 'bg-gray-500 text-white border-gray-600'
    if (ball.includes('WD')) return 'bg-yellow-500 text-black border-yellow-600'
    if (ball.includes('NB')) return 'bg-orange-500 text-white border-orange-600'
    if (ball === 'B') return 'bg-purple-500 text-white border-purple-600'
    if (ball === 'LB') return 'bg-indigo-500 text-white border-indigo-600'
    return 'bg-blue-600 text-white border-blue-700'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="space-y-4">
        {/* Ball by Ball */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Ball by Ball</h3>
          <div className="bg-gray-50 rounded-lg p-3 min-h-24 border">
            {ballByBall.length === 0 ? (
              <p className="text-gray-500 text-center py-4 text-sm">No balls bowled yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {ballByBall.map((ball, index) => (
                  <span 
                    key={index} 
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold border-2 shadow-sm ${getBallColor(ball)}`}
                  >
                    {ball}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Current Over */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Current Over</h3>
          <div className="bg-blue-50 rounded-lg p-3 min-h-16 border">
            {getCurrentOver().length === 0 ? (
              <p className="text-gray-500 text-center py-2 text-sm">Over not started</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {getCurrentOver().map((ball, index) => (
                  <span 
                    key={index} 
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold border-2 shadow-sm ${getBallColor(ball)}`}
                  >
                    {ball}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Commentary