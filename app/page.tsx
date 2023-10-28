import { GameProvider } from './contexts/game-context'
import GameControls from './in-game/game-controls/game-controls'

export default function Home() {
  return (
    <GameProvider>
      <GameControls />
    </GameProvider>
  )
}
