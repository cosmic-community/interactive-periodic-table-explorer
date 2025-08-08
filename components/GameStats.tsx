import { GameStatsProps } from '@/types';
import { getStreakMessage } from '@/lib/gameLogic';

export default function GameStats({ 
  gameState, 
  onToggleMode, 
  onResetGame 
}: GameStatsProps) {
  const accuracy = gameState.totalGuesses > 0 
    ? Math.round((gameState.correctGuesses / gameState.totalGuesses) * 100)
    : 0;

  const streakMessage = getStreakMessage(gameState.streak);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">
          {gameState.gameMode === 'guess' ? '🎮 Game Mode' : '🔍 Explore Mode'}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleMode(gameState.gameMode === 'guess' ? 'explore' : 'guess')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              gameState.gameMode === 'guess' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {gameState.gameMode === 'guess' ? 'Switch to Explore' : 'Start Game! 🎯'}
          </button>
          {gameState.totalGuesses > 0 && (
            <button
              onClick={onResetGame}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
            >
              Reset Game
            </button>
          )}
        </div>
      </div>

      {gameState.gameMode === 'guess' ? (
        <>
          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{gameState.score}</div>
              <div className="text-sm opacity-80">Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">{gameState.streak}</div>
              <div className="text-sm opacity-80">Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{accuracy}%</div>
              <div className="text-sm opacity-80">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{gameState.correctGuesses}/{gameState.totalGuesses}</div>
              <div className="text-sm opacity-80">Correct</div>
            </div>
          </div>

          {/* Streak Message */}
          {gameState.streak > 0 && (
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-3">
                <div className="text-lg font-bold">{streakMessage}</div>
              </div>
            </div>
          )}

          {/* Achievements */}
          {gameState.achievements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">🏆 Achievements ({gameState.achievements.length})</h3>
              <div className="flex flex-wrap gap-2">
                {gameState.achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="bg-gradient-to-r from-gold-400 to-yellow-500 text-black rounded-lg px-3 py-2 flex items-center gap-2"
                    title={achievement.description}
                  >
                    <span>{achievement.emoji}</span>
                    <span className="font-medium text-sm">{achievement.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Game Instructions */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <h3 className="font-semibold mb-2">🎯 How to Play:</h3>
            <ol className="text-sm opacity-90 space-y-1 list-decimal list-inside">
              <li>Click any element on the periodic table</li>
              <li>Guess if it's safe to lick or dangerous</li>
              <li>Build streaks for bonus points!</li>
              <li>Unlock achievements and learn chemistry</li>
            </ol>
          </div>
        </>
      ) : (
        /* Explore Mode Info */
        <div className="space-y-4">
          <p className="text-lg">
            🔍 <strong>Explore Mode:</strong> Click on any element to learn about its properties and lickability without affecting your game score.
          </p>
          <div className="p-4 bg-white/5 rounded-lg">
            <h3 className="font-semibold mb-2">🧪 Element Safety Guide:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                <span><strong>Sure, probably fine:</strong> Generally safe elements</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚠️</span>
                <span><strong>Maybe not a good idea:</strong> Proceed with caution</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400">🚨</span>
                <span><strong>You really shouldn't:</strong> Definitely not recommended</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">☠️</span>
                <span><strong>Please reconsider:</strong> Absolutely do not attempt</span>
              </div>
            </div>
          </div>
          
          {gameState.totalGuesses > 0 && (
            <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg">
              <h3 className="font-semibold mb-2">📊 Your Game Stats:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Score: <span className="font-bold">{gameState.score}</span></div>
                <div>Best Streak: <span className="font-bold">{gameState.streak}</span></div>
                <div>Accuracy: <span className="font-bold">{accuracy}%</span></div>
                <div>Achievements: <span className="font-bold">{gameState.achievements.length}</span></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}