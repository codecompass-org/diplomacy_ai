import { UnitInterface, UnitType, OrderType } from '../../models/types';
import { Order } from '../../models/order';
import { CANNON } from './assets/cannon';
import { SHIP } from './assets/ship';

export class SvgHelper {
  private map: SVGAElement;

  constructor(map: SVGAElement) {
    this.map = map;
  }

  private static getCenter(box: DOMRect): [number, number] {
    return [box.x + (box.width / 2), box.y + (box.height / 2) + 10];
  }

  private buildUnit(path: SVGAElement, unit: UnitInterface): SVGAElement {
    const [x, y] = SvgHelper.getCenter(path.getBBox());
    const unitPath = unit.type === UnitType.Army ? CANNON : SHIP;

    const u = this.createSVGElement('path', {
      d: unitPath,
      transform: `translate(${x - 30}, ${y - 18}) scale(0.1)`,
      class: `${unit.nation.toLowerCase()} unit`,
      'data-terr': `${unit.territoryId.toLowerCase()}`
    });

    return u as SVGAElement;
  }

  private createSVGElement(tag: string, attributes: Record<string, string>): SVGElement {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const key in attributes) {
      el.setAttribute(key, attributes[key]);
    }
    return el;
  }

  private buildCircle(path: SVGAElement): SVGAElement {
    const [x, y] = SvgHelper.getCenter(path.getBBox());

    return this.createSVGElement('circle', {
      cx: `${x}`,
      cy: `${y}`,
      r: '40',
      stroke: 'black',
      'stroke-width': '10',
      fill: 'none'
    }) as SVGAElement;
  }

  private buildLine(from: SVGAElement, to: SVGAElement): SVGAElement {
    const [x1, y1] = SvgHelper.getCenter(from.getBBox());
    const [x2, y2] = SvgHelper.getCenter(to.getBBox());

    return this.createSVGElement('line', {
      x1: `${x1}`, x2: `${x2}`, y1: `${y1}`, y2: `${y2}`,
      stroke: 'black',
      'stroke-width': '10',
      'marker-end': 'url(#arrowHead)'
    }) as SVGAElement;
  }

  private buildConvoySymbol(path: SVGAElement) {
    // TODO this will just draw a squiggly line above the unit
    const box = path.getBBox();
    const x = box.x + (box.width / 2);
    const y = box.y + (box.height / 2) + 10;
    const u = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    u.setAttribute('cx', `${x}`);
    u.setAttribute('cy', `${y}`);
    u.setAttribute('r', '40');
    u.setAttribute('stroke', 'black');
    u.setAttribute('stroke-width', '10');
    u.setAttribute('fill', 'none');
    return u;
  }

  drawUnitOnMap(unit: UnitInterface): void {
    const svgEl = this.map.querySelector(`[data-name=${unit.territoryId}]`) as SVGAElement;
    const army = this.buildUnit(svgEl, unit);
    this.map.getElementsByTagName('g')[0].appendChild(army);
    svgEl.classList.add(unit.nation.toLowerCase());
  }

  drawOrderOnMap(order: Order) {
    const currentElement = this.map.querySelector(`[data-name=${order.unit?.territoryId}]`) as SVGAElement;
    const prevOrder = this.map.querySelector(`#${order.unit?.territoryId}`);
    if (prevOrder) {
      prevOrder.remove();
    }

    let newOrder;
    if (order.type === OrderType.Hold) {
      newOrder = this.buildCircle(currentElement);
    } else if (order.type === OrderType.Move) {
      const toElement = this.map.querySelector(`[data-name=${order.toTerritoryId}]`) as SVGAElement;
      newOrder = this.buildLine(currentElement, toElement);
    } else if (order.type === OrderType.Support) {
      const fromElement = this.map.querySelector(`[data-name=${order.fromTerritoryId}]`) as SVGAElement;
      const toElement = this.map.querySelector(`[data-name=${order.toTerritoryId}]`) as SVGAElement;
      newOrder = this.buildLine(fromElement, toElement);
    } else if (order.type === OrderType.Convoy) {
      newOrder = this.buildConvoySymbol(currentElement);
    }

    newOrder!.id = order.unit!.territoryId;
    this.map.getElementsByTagName('g')[0].appendChild(newOrder!);
  }

  clearUnits() {
    const units = this.map.querySelectorAll('.unit');
    units.forEach((u) => u.remove());
  }

  clearOrders() {
    const orders = this.map.querySelectorAll('.order');
    orders.forEach((o) => o.remove());
  }

  showPopup = (elem: SVGGraphicsElement) => {
    const popup = this.map.querySelector('.tooltip') as SVGAElement;
    const box = elem.getBBox();

    (popup.style as any).x = `${box.x + (box.width / 2) - 30}px`;
    (popup.style as any).y = `${box.y + (box.height / 2) - 18}px`;
    popup.style.display = 'block';
    popup.textContent = elem.dataset.name?.toUpperCase() || '';
    this.map.getElementsByTagName('g')[0].appendChild(popup);
  };

  hidePopup = () => {
    const popup = this.map.querySelector('.tooltip') as SVGAElement;
    popup.style.display = 'none';
  };

  getTerritories(): NodeListOf<SVGGraphicsElement> {
    return this.map.querySelectorAll('.territory')
  }
}
