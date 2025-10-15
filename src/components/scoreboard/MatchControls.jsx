import { useState } from 'react'

const MatchControls = ({ 
  handleUndo, history, setTotalOvers, totalOvers, 
  switchInnings, isMatchComplete, innings, resetMatch,
  teamA, setTeamA, teamB, setTeamB, target, runs
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showTargetModal, setShowTargetModal] = useState(false)
  return (
    <div className="bg-white rounded-lg shadow-lg mb-6">
      <div className="bg-gray-50 px-6 py-4 rounded-t-lg shadow-inner">
        <h3 className="text-xl font-semibold text-start">Controls</h3>
      </div>
      <hr className="border-gray-300" />
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Control Buttons */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 mb-3">Actions</h4>
          <button 
            onClick={handleUndo} 
            disabled={history.length === 0} 
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 transition-colors"
          >
            ↶ Undo
          </button>
          <button 
            onClick={() => setShowTargetModal(true)}
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            🎯 Target
          </button>
          <button 
            onClick={() => setShowResetConfirm(true)} 
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            🔄 Reset
          </button>
        </div>

        {/* Format Selection */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 mb-3">Match Format</h4>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setTotalOvers(20)} 
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              T20 (20)
            </button>
            <button 
              onClick={() => setTotalOvers(50)} 
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              ODI (50)
            </button>
          </div>
          <div className="grid grid-cols-4 gap-1 mb-3">
            {[5, 10, 15, 20].map(overs => (
              <button 
                key={overs}
                onClick={() => setTotalOvers(overs)}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
              >
                {overs}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <input 
              type="number" 
              value={totalOvers} 
              onChange={(e) => setTotalOvers(Number(e.target.value))}
              min="1" 
              max="50"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none text-center"
              placeholder="Enter overs"
            />
            <button 
              onClick={() => setTotalOvers(totalOvers)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Team Management */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 mb-3">Teams</h4>
          <input 
            type="text" 
            value={teamA} 
            onChange={(e) => setTeamA(e.target.value)}
            placeholder="Team A"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors"
          />
          <input 
            type="text" 
            value={teamB} 
            onChange={(e) => setTeamB(e.target.value)}
            placeholder="Team B"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors"
          />
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
              Save Teams
            </button>
            <button 
              onClick={switchInnings} 
              disabled={!isMatchComplete() && innings === 1}
              className="px-3 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 disabled:opacity-50 transition-colors"
            >
              Switch Innings
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Reset</h3>
            <p className="text-gray-600 mb-6">This will reset all scores and ball-by-ball data. This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  resetMatch()
                  setShowResetConfirm(false)
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Reset Match
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Target Modal */}
      {showTargetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Match Target</h3>
            <div className="text-gray-700 mb-6">
              {target ? (
                <div>
                  <p className="mb-2"><strong>Target:</strong> {target} runs</p>
                  <p className="mb-2"><strong>Current Score:</strong> {runs} runs</p>
                  <p><strong>Runs Needed:</strong> {Math.max(0, target - runs)} runs</p>
                </div>
              ) : (
                <p>No target set. Complete first innings to set target.</p>
              )}
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowTargetModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default MatchControls