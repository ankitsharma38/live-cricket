const ScoreDisplay = ({
  currentTeam, teamA, teamB, runs, wickets,
  getOvers, getRunRate, totalOvers, ballsFaced, balls, target
}) => {
  const battingTeamName = currentTeam === 'A' ? teamA : teamB;

  return (
    <div className="bg-white rounded-lg shadow-lg mb-6">
      <div className="bg-gray-50 px-6 py-4 rounded-t-lg shadow-inner">
        <div className="text-xl font-semibold">
          {battingTeamName} • Live Score
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="p-6">
        <div className="flex items-center">
          {/* Main Score */}
          <div className="flex-1">
            <div className="text-5xl font-bold" style={{ color: "#1976d2" }}>
              {runs}
              <span className="text-3xl text-gray-600">/{wickets}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              ({getOvers()} of {totalOvers} overs)
            </div>
          </div>

          {/* Run Rate */}
          <div className="text-center px-2 lg:px-12">
            <div className="text-xl lg:text-2xl font-bold text-blue-600">{getRunRate()}</div>
            <div className="text-xs text-gray-600">Run Rate</div>
          </div>

          {/* Strike Rate */}
          <div className="text-center px-2 lg:px-12">
            <div className="text-xl lg:text-2xl font-bold text-purple-600">
              {balls > 0 ? ((runs / balls) * 100).toFixed(0) : '0'}
            </div>
            <div className="text-xs text-gray-600">Strike Rate</div>
          </div>
        </div>
        {target && (
          <div className={`text-sm font-medium text-center mt-4 mx-6 px-4 py-2 rounded-lg ${
            runs >= target.score 
              ? 'bg-green-500 text-white' 
              : (balls >= target.overs * 6 || wickets >= 10) && runs < target.score
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
          }`}>
            {runs >= target.score ? (
              <span className="font-bold">🎉 Target Achieved! Congratulations! 🎉</span>
            ) : (balls >= target.overs * 6 || wickets >= 10) && runs < target.score ? (
              <span className="font-bold">😢 Target Not Achieved! Better Luck Next Time! 😢</span>
            ) : (
              <span>
                Need {Math.max(0, target.score - runs)} runs in {Math.max(0, (target.overs * 6) - balls)} balls
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ScoreDisplay