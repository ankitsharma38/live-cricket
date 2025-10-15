const FirstInnings = ({ firstInningsScore, teamA }) => {
  if (!firstInningsScore) return null
  
  return (
    <div className="bg-gray-200 p-4 rounded-lg mb-8 text-center">
      <h4 className="font-bold">
        First Innings: {teamA} - {firstInningsScore.runs}/{firstInningsScore.wickets} ({Math.floor(firstInningsScore.balls/6)}.{firstInningsScore.balls%6} overs)
      </h4>
    </div>
  )
}

export default FirstInnings