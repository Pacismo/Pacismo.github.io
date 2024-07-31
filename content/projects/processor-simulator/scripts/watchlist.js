import {MemoryType, SimulationState} from './webapp.js'

export default class Watchlist {
  /** @type {HTMLTableElement} */
  table
  /** @type {HTMLInputElement} */
  address_field
  /** @type {HTMLSelectElement} */
  address_type_field
  /**
   * @type {{[address: number]: {row: HTMLTableRowElement, value:
   *     HTMLTableCellElement, type: HTMLTableCellElement, read_type:
   *     MemoryType}}}
   */
  entries
  /** @type {SimulationState} */
  simulator

  /**
   * Creates a new Watchlist manager
   *
   * @param {SimulationState} simulator The simulator to read from
   * @param {HTMLTableElement|string} table The table containing the watchlist
   * @param {HTMLInputElement|string} watch_address_input The address input
   * @param {HTMLSelectElement|string} watch_type_input The address type input
   */
  constructor(simulator, table, watch_address_input, watch_type_input) {
    if (typeof table === 'string')
      this.table = document.getElementById(table);
    else
      this.table = table;

    if (typeof watch_address_input === 'string')
      this.address_field = document.getElementById(watch_address_input);
    else
      this.address_field = watch_address_input;

    if (typeof watch_type_input === 'string')
      this.address_type_field = document.getElementById(watch_type_input);
    else
      this.this.address_type_field = watch_type_input;

    this.entries = {};
    this.simulator = simulator;
  }

  /**
   * @param {number} address
   * @param {string} type
   */
  create_entry(address, type, read_type) {
    let row = document.createElement('tr');
    let address_cell = document.createElement('th');
    let type_cell = document.createElement('td');
    let value_cell = document.createElement('td');

    let addr = document.createElement('span');
    let rem = document.createElement('span');
    addr.textContent = address.toString(16).toUpperCase().padStart(8, '0');
    addr.classList = 'address-value'
    rem.textContent = 'X';
    rem.classList = 'remove';
    address_cell.append(rem, addr);
    address_cell.classList = 'address';
    address_cell.onclick = () => this.remove_from_watchlist(address);
    type_cell.textContent = type;

    row.append(address_cell, type_cell, value_cell);
    row.classList = 'monospace';
    this.table.append(row);
    this.entries[address] = {
      row,
      value: value_cell,
      type: type_cell,
      read_type
    }
  }

  add_to_watchlist() {
    let address = this.address_field.valueAsNumber;
    let addr_type = this.address_type_field.value;
    let type;
    switch (addr_type) {
      case 'byte':
        type = MemoryType.Byte;
        break;
      case 'short':
        type = MemoryType.Short;
        break;
      case 'word':
        type = MemoryType.Word;
        break;
      case 'float':
        type = MemoryType.Float;
        break;
      default:
        throw new Error('Unexpected input');
    }

    if (address in this.entries) {
      this.entries[address].type.textContent = addr_type;
      this.entries[address].read_type = type;
    } else {
      this.create_entry(address, addr_type, type);
    }

    this.update();
  }

  /**
   * @param {number} address
   */
  remove_from_watchlist(address) {
    if (address in this.entries) {
      this.table.removeChild(this.entries[address].row);
      delete this.entries[address];
    }
    this.update();
  }

  update() {
    Object.entries(this.entries)
        .forEach(
            ([k, v]) => v.value.textContent =
                this.simulator.read_address(Number.parseInt(k), v.read_type));
  }
}
