"use client"

import React, { useState, useEffect, useRef } from 'react';
import { TerritoryInterface, UnitInterface, OrderType, TerritoryType } from '../../models/types';
import { Order } from '../../models/order';
import { useGame } from '../../contexts/game-context';
import MapComponent from '../map/map';


const GameControls = () => {
  const [pendingOrder, setPendingOrder] = useState(new Order());
  const [ordersFinalized, setOrdersFinalized] = useState(false);

  const { territories, units, orders, submitOrders } = useGame();

  useEffect(() => {
    // Your equivalent logic to ngAfterViewInit
  }, []);

  const onSubmitClicked = () => {
    submitOrders(orders);
  };

  const onTerritoryClick = (territoryId: string) => {
    const unit = getUnitByTerritoryId(territoryId);
    // Logic for pendingOrder (you might need to adapt `updateBasedOnClickedTerritory`)
    // ...
    toggleOrderMenuOpenClose();
    updateOrderMenuColors();
  };

  function onActionClick(Hold: OrderType, e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }

  function getUnitByTerritoryId(territoryId: string) {
    return units.find(u => u.territoryId === territoryId);
  }

  function toggleOrderMenuOpenClose() {
    throw new Error('Function not implemented.');
  }

  function updateOrderMenuColors() {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 p-4 text-white">
        <h1>WORK IN PROGRESS</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {/* This assumes you have a React version of your <app-map> component */}
        <MapComponent units={units} orders={orders} onTerritoryClicked={onTerritoryClick} />

        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center">

            <button className="mb-2 focus:outline-none" onClick={(e) => onActionClick(OrderType.Hold, e)}>
              <i className="material-icons">pause</i>
            </button>
            <button className="mb-2 focus:outline-none" onClick={(e) => onActionClick(OrderType.Move, e)}>
              <i className="material-icons">play_arrow</i>
            </button>
            <button className="mb-2 focus:outline-none" onClick={(e) => onActionClick(OrderType.Support, e)}>
              <i className="material-icons">fastforward</i>
            </button>
            <button className="focus:outline-none" onClick={(e) => onActionClick(OrderType.Convoy, e)}>
              <i className="material-icons">share</i>
            </button>
          </div>
        </div>



        <ul className="mt-4">
          {orders.map(order => (
            <li key={order.unit?.territoryId} className="mb-4 border rounded p-4">
              {/* Your existing template structure translated to regular HTML, you might need to add select event handlers and structure */}
            </li>
          ))}
        </ul>

        <button className="w-full bg-blue-500 text-white p-4 mt-4 rounded" onClick={onSubmitClicked}>
          Submit Orders
        </button>
      </main>
    </div>
  );
};

export default GameControls;
