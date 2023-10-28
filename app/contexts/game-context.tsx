"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { TerritoryInterface, UnitInterface } from '../models/types';
import { Order } from '../models/order';
import { getGame } from '../data/api/get-game';

import territoryListRaw from '../data/static/territories.json';
const territoryList: TerritoryInterface[] = territoryListRaw as TerritoryInterface[];

interface GameInterface {
  territories: TerritoryInterface[];
  units: UnitInterface[];
  orders: Order[];
  submitOrders: (orders: Order[]) => void;
}


const GameContext = createContext<GameInterface>({ territories: [], units: [], orders: [], submitOrders: () => { } });

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [territories, setTerritories] = useState<TerritoryInterface[]>(territoryList);
  const [units, setUnits] = useState<UnitInterface[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getGame(1).then((game) => {
      setUnits(game.current_units || []);
    });
  }, [])

  const submitOrders = (orders: Order[]) => {
    setOrders(orders);
  };

  const value = {
    territories,
    units,
    orders,
    submitOrders
  };
  console.log(value)
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;

};
