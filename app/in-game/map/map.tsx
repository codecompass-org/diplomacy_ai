"use client"

import React, { useEffect, useRef, useState } from 'react';
import { SvgHelper } from '../../utils/svg-utils/svg-helper';
import { UnitInterface } from '../../models/types';
import { Order } from '@/app/models/order';

interface Props {
  units: UnitInterface[];
  orders: Order[];
  onTerritoryClicked: (id: string) => void;
}

const MapComponent: React.FC<Props> = ({ units, orders, onTerritoryClicked }) => {
  const mapRef = useRef<HTMLObjectElement>(null);
  const [svgMap, setSvgMap] = useState<SvgHelper | null>(null);
  const [selectedTerritory, setSelectedTerritory] = useState<SVGPathElement | null>(null);

  const initializeMapData = () => {
    if (!svgMap) return;
    svgMap.clearUnits();
    units.forEach(unit => svgMap.drawUnitOnMap(unit));

    svgMap.clearOrders();
    orders.forEach(order => svgMap.drawOrderOnMap(order));
  };

  const setupTerritoryInteractions = () => {
    if (!svgMap) return;
    const territories = svgMap.getTerritories();

    territories.forEach((elem) => {
      const svgElem = elem as SVGGraphicsElement;
      svgElem.addEventListener('mouseover', () => svgMap.showPopup(svgElem));
      svgElem.addEventListener('mouseleave', svgMap.hidePopup);
      svgElem.addEventListener('click', handleTerritoryClick);
    });
  };

  const handleTerritoryClick = (event: Event) => {
    if (selectedTerritory) {
      selectedTerritory.style.fill = '';
    }
    const target = event.target as SVGPathElement;
    setSelectedTerritory(target);
    target.style.fill = 'orange';
    onTerritoryClicked(target.getAttribute('data-name') || '');
  };

  const listenForSVGLoad = () => {
    const handleObjectLoad = () => {
      if (!mapRef.current) return;
      const mapContentDocument = mapRef.current.contentDocument;
      setSvgMap(new SvgHelper(mapContentDocument as unknown as SVGAElement));
    };

    // Check if the object reference exists and the SVG is fully loaded.
    if (mapRef.current && mapRef.current.contentDocument) {
      // If the SVG is already loaded (for some browsers)
      handleObjectLoad();
    } else if (mapRef.current) {
      // If the SVG hasn't been loaded yet, attach a listener
      mapRef.current.addEventListener('load', handleObjectLoad);

      // Cleanup the event listener on component unmount
      return () => {
        mapRef.current?.removeEventListener('load', handleObjectLoad);
      };
    }
  };

  useEffect(listenForSVGLoad, [mapRef]);
  useEffect(initializeMapData, [svgMap, units, orders]);
  useEffect(setupTerritoryInteractions, [svgMap]);

  return (
    <object id="svg" type="image/svg+xml" data="assets/map_2.svg" ref={mapRef}>
      Diplomacy map
    </object>
  );
};

export default MapComponent;
