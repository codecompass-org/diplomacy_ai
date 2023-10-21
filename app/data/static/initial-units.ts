import { Nation, UnitType } from "@/app/models/types";

export const InitialUnits = [
  {
    territoryId: 'mos',
    nation: Nation.Russia,
    type: UnitType.Army
  },
  {
    territoryId: 'lpl',
    nation: Nation.England,
    type: UnitType.Fleet
  },
  {
    territoryId: 'par',
    nation: Nation.France,
    type: UnitType.Army
  },
  {
    territoryId: 'ank',
    nation: Nation.Turkey,
    type: UnitType.Fleet
  },
  {
    territoryId: 'tri',
    nation: Nation.Austria,
    type: UnitType.Army
  },
  {
    territoryId: 'nap',
    nation: Nation.Italy,
    type: UnitType.Fleet
  },
  {
    territoryId: 'ber',
    nation: Nation.Germany,
    type: UnitType.Army
  }
]