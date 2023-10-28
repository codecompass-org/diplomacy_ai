// Get a game from the game table in supabase

import { Game } from '@/app/models/game'
import { supabase } from './supabase'

export const getGame = async (id: number): Promise<Game> => {
  const { data, error } = await supabase
    .from('Games')
    .select()
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  return data
}
