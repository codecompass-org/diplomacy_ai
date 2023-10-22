"use client"

// MapComponent.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SvgHelper } from '../../utils/svg-utils/svg-helper';
import { UnitInterface } from '../../models/types';
import { Order } from '@/app/models/order';

interface Props {
  units: UnitInterface[];
  orders: Order[];
  onTerritoryClicked?: (id: string) => void;
}

const MapComponent: React.FC<Props> = ({ units, orders, onTerritoryClicked }) => {
  const mapRef = useRef<HTMLObjectElement>(null);
  const [svgMap, setSvgMap] = useState<any>(null);
  const [popup, setPopup] = useState<any>(null);
  const [selectedTerritory, setSelectedTerritory] = useState<SVGPathElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const initializeUnitsOnMap = () => {
    units.forEach((unit) => {
      SvgHelper.drawUnitOnMap(svgMap, unit);
    });
  };

  const initializeOrdersOnMap = useCallback(() => {
    orders.forEach((order) => {
      SvgHelper.drawOrderOnMap(svgMap, order);
    });
  }, [orders, svgMap]);

  const applyHoverFunctionToTerritories = (doc: Document | null) => {
    if (!doc) return;
    const territories = doc.querySelectorAll('.territory');

    territories.forEach((elem) => {
      const svgElem = elem as SVGGraphicsElement;
      svgElem.addEventListener('mouseover', () => showPopup(svgElem));
      svgElem.addEventListener('mouseleave', hidePopup);
      svgElem.addEventListener('click', (event) => {
        if (selectedTerritory) {
          selectedTerritory.style.fill = '';
        }
        const target = event.target as SVGPathElement;
        setSelectedTerritory(target);
        target.style.fill = 'orange';
        const id = target.getAttribute('data-name') || '';
        onTerritoryClicked?.(id);
      });
    });
  };

  const showPopup = (elem: SVGGraphicsElement) => {
    const box = elem.getBBox();
    if (popup) {
      popup.style.x = box.x + (box.width / 2) - 30 + 'px';
      popup.style.y = box.y + (box.height / 2) - 18 + 'px';
      popup.style.display = 'block';
      popup.textContent = elem.dataset.name?.toUpperCase() || '';
      svgMap?.getElementsByTagName('g')[0].appendChild(popup);
    }
  };

  const hidePopup = () => {
    if (popup) {
      popup.style.display = 'none';
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      setIsLoaded(true);
      const mapContentDocument = mapRef.current?.contentDocument;
      setSvgMap(mapContentDocument);
      const popupElement = mapContentDocument?.getElementById('tooltip');
      setPopup(popupElement);
      if (mapContentDocument) {
        applyHoverFunctionToTerritories(mapContentDocument);
      }
    }
  }, [mapRef]);

  useEffect(() => {
    if(!svgMap) return;
    initializeUnitsOnMap();
    initializeOrdersOnMap();
  }, [svgMap])

  useEffect(() => {
    if (isLoaded) {
      initializeOrdersOnMap();
    }
  }, [initializeOrdersOnMap, isLoaded, orders]);


  return <object id="svg" type="image/svg+xml" data="assets/map_2.svg" ref={mapRef}>Diplomacy map</object>;
};

export default MapComponent;
