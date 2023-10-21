import { GameProvider } from './contexts/game-context'
import GameControls from './in-game/game-controls/game-controls'
import Map from './in-game/map/map'

export default function Home() {
  return (
    <GameProvider>
      <GameControls />
    </GameProvider>
  )
}
