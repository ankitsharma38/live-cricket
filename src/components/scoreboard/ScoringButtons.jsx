import { useState } from 'react'

const ScoringButtons = ({ 
  handleDot, handleRun, handleWicket, handleExtra, 
  isMatchComplete 
}) => {
  const [showWideModal, setShowWideModal] = useState(false)
  const [wideRuns, setWideRuns] = useState('1')
  const [showNoBallModal, setShowNoBallModal] = useState(false)
  const [noBallRuns, setNoBallRuns] = useState('0')
  const [showByeModal, setShowByeModal] = useState(false)
  const [byeRuns, setByeRuns] = useState('1')
  const [showLegByeModal, setShowLegByeModal] = useState(false)
  const [legByeRuns, setLegByeRuns] = useState('1')

  const handleWideClick = () => {
    setShowWideModal(true)
  }

  const handleWideSubmit = () => {
    const runs = parseInt(wideRuns) || 1
    handleExtra('Wide', runs)
    setShowWideModal(false)
    setWideRuns('1')
  }

  const handleNoBallClick = () => {
    setShowNoBallModal(true)
  }

  const handleNoBallSubmit = () => {
    const additionalRuns = parseInt(noBallRuns) || 0
    const totalRuns = 1 + additionalRuns // 1 for no ball + additional runs
    handleExtra('No Ball', totalRuns)
    setShowNoBallModal(false)
    setNoBallRuns('0')
  }

  const handleByeClick = () => {
    setShowByeModal(true)
  }

  const handleByeSubmit = () => {
    const runs = parseInt(byeRuns) || 1
    handleExtra('Bye', runs)
    setShowByeModal(false)
    setByeRuns('1')
  }

  const handleLegByeClick = () => {
    setShowLegByeModal(true)
  }

  const handleLegByeSubmit = () => {
    const runs = parseInt(legByeRuns) || 1
    handleExtra('Leg Bye', runs)
    setShowLegByeModal(false)
    setLegByeRuns('1')
  }
  return (
    <div className="bg-white rounded-lg shadow-lg mb-6">
      <div className="bg-gray-50 px-6 py-4 rounded-t-lg shadow-inner">
        <h3 className="text-xl font-semibold text-start">Scoring</h3>
      </div>
      <hr className="border-gray-300" />
      <div className="p-6">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
          <button 
            onClick={handleDot} 
            disabled={isMatchComplete()}
            className="h-10 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 disabled:opacity-50 transition-colors shadow-md"
          >
            •
          </button>
          {[1,2,3,4,6].map(num => (
            <button 
              key={num} 
              onClick={() => handleRun(num)} 
              disabled={isMatchComplete()}
              className={`h-10 text-white rounded-lg font-bold disabled:opacity-50 transition-colors shadow-md ${
                num === 4 || num === 6 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleWicket} 
          disabled={isMatchComplete()}
          className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 disabled:opacity-50 transition-colors shadow-md mb-4"
        >
          🏏 WICKET
        </button>
      
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['Wide', 'No Ball', 'Bye', 'Leg Bye'].map(extra => (
            <button 
              key={extra}
              onClick={extra === 'Wide' ? handleWideClick : extra === 'No Ball' ? handleNoBallClick : extra === 'Bye' ? handleByeClick : extra === 'Leg Bye' ? handleLegByeClick : () => handleExtra(extra)} 
              disabled={isMatchComplete()} 
              className="h-10 bg-transparent border border-gray-400 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors shadow-md font-bold text-sm"
            >
              {extra}
            </button>
          ))}
        </div>
      </div>

      {/* Wide Modal */}
      {showWideModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">How many wides?</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of runs (default 1):
              </label>
              <input
                type="text"
                value={wideRuns}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === '' || /^[1-9]\d*$/.test(value)) {
                    setWideRuns(value)
                  }
                }}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                placeholder="1"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleWideSubmit}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Add Wide
              </button>
              <button
                onClick={() => setShowWideModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Ball Modal */}
      {showNoBallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">No-ball: additional runs off the bat? (0 for none)</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional runs (default 0):
              </label>
              <input
                type="text"
                value={noBallRuns}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === '' || /^\d+$/.test(value)) {
                    setNoBallRuns(value)
                  }
                }}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                placeholder="0"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleNoBallSubmit}
                className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
              >
                Add No Ball
              </button>
              <button
                onClick={() => setShowNoBallModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bye Modal */}
      {showByeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">How many byes? (default 1)</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of runs (default 1):
              </label>
              <input
                type="text"
                value={byeRuns}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === '' || /^[1-9]\d*$/.test(value)) {
                    setByeRuns(value)
                  }
                }}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                placeholder="1"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleByeSubmit}
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
              >
                Add Bye
              </button>
              <button
                onClick={() => setShowByeModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leg Bye Modal */}
      {showLegByeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">How many leg-byes? (default 1)</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of runs (default 1):
              </label>
              <input
                type="text"
                value={legByeRuns}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === '' || /^[1-9]\d*$/.test(value)) {
                    setLegByeRuns(value)
                  }
                }}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                placeholder="1"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleLegByeSubmit}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Add Leg Bye
              </button>
              <button
                onClick={() => setShowLegByeModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScoringButtons