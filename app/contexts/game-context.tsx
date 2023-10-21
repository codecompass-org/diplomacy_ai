"use client"

import { createContext, useContext, useState } from 'react';
import { TerritoryInterface, UnitInterface, OrderType } from '../models/types';
import { Order } from '../models/order';

import territoryListRaw from '../data/static/territories.json';
import { InitialUnits } from '../data/static/initial-units';
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

import { ReactNode } from 'react';

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [territories, setTerritories] = useState<TerritoryInterface[]>(territoryList);
  const [units, setUnits] = useState<UnitInterface[]>(InitialUnits);
  const [orders, setOrders] = useState<Order[]>([new Order(units[0], OrderType.Hold)]);

  const submitOrders = (orders: Order[]) => {
    setOrders(orders);
  };

  const value = {
    territories,
    units,
    orders,
    submitOrders
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;

};
