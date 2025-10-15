const MatchStatistics = ({ 
  ballsFaced, boundaries, sixes, dotBalls, runs, balls 
}) => {
  const getStrikeRate = () => {
    return ballsFaced > 0 ? ((runs / ballsFaced) * 100).toFixed(1) : '0.0'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6 text-center">Match Statistics</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">⚾</div>
          <div className="text-2xl font-bold text-blue-600">{ballsFaced}</div>
          <div className="text-sm text-gray-600">Balls Faced</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🏏</div>
          <div className="text-2xl font-bold text-green-600">{boundaries}</div>
          <div className="text-sm text-gray-600">Boundaries</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🚀</div>
          <div className="text-2xl font-bold text-purple-600">{sixes}</div>
          <div className="text-sm text-gray-600">Sixes</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">⚪</div>
          <div className="text-2xl font-bold text-gray-600">{dotBalls}</div>
          <div className="text-sm text-gray-600">Dot Balls</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center col-span-2">
          <div className="text-sm text-gray-600 mb-1">Strike Rate</div>
          <div className="text-2xl font-bold text-orange-600">{getStrikeRate()}</div>
        </div>
      </div>
    </div>
  )
}

export default MatchStatistics