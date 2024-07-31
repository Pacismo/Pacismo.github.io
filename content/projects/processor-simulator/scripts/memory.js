import {SimulationState, SimulatorMemoryConfiguration} from './webapp.js';

const COLUMNS = 16;

/**
 * @param {HTMLTableElement} table
 */
function populate(table, is_disasm = false) {
  const MEMCONF = SimulatorMemoryConfiguration.get();

  while (table.firstChild !== null) table.removeChild(table.lastChild);

  /** @type {HTMLTableRowElement} */
  let header_row = document.createElement('tr');
  header_row.classList = 'header-row';
  table.appendChild(header_row);
  header_row.appendChild(document.createElement('th'));

  for (let i = 0; i < COLUMNS; ++i) {
    let cell = document.createElement('th');
    cell.textContent = i.toString(16).toUpperCase();
    header_row.appendChild(cell);
  }

  for (let i = 0; i < MEMCONF.region_size / COLUMNS; ++i) {
    let row = document.createElement('tr');
    table.appendChild(row);
    let address = document.createElement('th');
    row.appendChild(address);

    if (is_disasm)
      for (let j = 0; j < COLUMNS && i * COLUMNS + j < MEMCONF.region_size;
           j += 4) {
        let cell = document.createElement('td');
        cell.colSpan = 4;
        cell.style = 'text-align: left;'
        row.appendChild(cell);
      }
    else
      for (let j = 0; j < COLUMNS && i * COLUMNS + j < MEMCONF.region_size;
           ++j) {
        let cell = document.createElement('td');
        cell.style = 'text-align: right;'
        row.appendChild(cell);
      }
  }
}

export default class Memory {
  /** @type {HTMLTableElement} */
  table
  /** @type {HTMLParagraphElement} */
  page_label
  /** @type {HTMLSelectElement} */
  selector
  /** @type {SimulationState} */
  simulator
  /** @type {number} */
  region_id
  /** @type {string} */
  last_hash
  /** @type {SimulatorMemoryConfiguration} */
  MEMCONF

  /**
   * Creates a new Memory view manager
   * @param {SimulationState} simulator
   * @param {HTMLTableElement|string} table
   * @param {HTMLParagraphElement|string} pageid
   * @param {HTMLSelectElement|string} selector
   */
  constructor(simulator, table, pageid, selector) {
    this.table =
        typeof table === 'string' ? document.getElementById(table) : table;
    this.page_label =
        typeof pageid === 'string' ? document.getElementById(pageid) : pageid;
    this.selector = typeof selector === 'string' ?
        document.getElementById(selector) :
        selector;
    this.region_id = 0;
    this.last_hash = null;
    this.simulator = simulator;
    this.MEMCONF = SimulatorMemoryConfiguration.get();

    populate(this.table, this.selector.value === 'disassembly');
    this.update();
  }

  switch_mode() {
    this.last_hash = null;
    populate(this.table, this.selector.value === 'disassembly');
    this.update();
  }

  update() {
    const MEMCONF = this.MEMCONF;

    const new_hash = this.simulator.get_region_hash(this.region_id);

    if (this.last_hash !== null && new_hash !== this.last_hash) {
      for (let i = 1; i < this.table.rows.length; ++i)
        for (let j = 1; j < this.table.rows[i].cells.length; ++j)
          this.table.rows[i].cells[j].classList = '';
      return;
    }

    const disasm = this.selector.value === 'disassembly';

    const values = disasm ? this.simulator.disassemble_region(this.region_id) :
                            this.simulator.read_region(this.region_id);
    let new_page = this.last_hash === null;
    this.last_hash = new_hash;

    for (let i = 0; i < MEMCONF.region_size / COLUMNS; ++i)
      this.table.rows[i + 1].cells[0].textContent =
          (this.region_id * MEMCONF.region_size + i * COLUMNS)
              .toString(16)
              .toUpperCase()
              .padStart(8, '0');

    const i_inc = disasm ? 4 : 1;
    const cell_count = MEMCONF.region_size / i_inc;
    const col_count = COLUMNS / i_inc;

    for (let i = 0; i < cell_count; ++i) {
      let row = ((i / col_count) | 0) + 1;
      let col = i % col_count + 1;
      let cell = this.table.rows[row].cells[col];
      let address = (this.region_id * MEMCONF.region_size + i * i_inc);

      if (values !== null) {
        let new_value = values[i].toString(16).toUpperCase().padStart(2, '0');
        if (cell.textContent !== new_value && !new_page)
          cell.classList = 'updated';
        else
          cell.classList = '';
        cell.textContent = new_value;
      } else if (new_page) {
        cell.textContent = disasm ? '' : '00';
        cell.classList = '';
      }

      cell.title = `Address: ${
          address.toString(16).toUpperCase().padStart(
              8, '0')}\nDecimal Address: ${address}\nClick to put address in watchlist as selected type`;
      cell.onclick = () => this.on_cell_click(address);
    }

    this.page_label.textContent = `${this.region_id + 1} / ${MEMCONF.regions}`;
  }

  next_page() {
    const MEMCONF = this.MEMCONF;
    this.region_id += 1;
    if (this.region_id >= MEMCONF.regions)
      this.region_id = MEMCONF.regions - 1;
    else if (this.region_id < 0)
      this.region_id = 0;
    else {
      this.last_hash = null;
      this.update();
    }
  }

  previous_page() {
    const MEMCONF = this.MEMCONF;
    this.region_id -= 1;
    if (this.region_id >= MEMCONF.regions)
      this.region_id = MEMCONF.regions - 1;
    else if (this.region_id < 0)
      this.region_id = 0;
    else {
      this.last_hash = null;
      this.update();
    }
  }

  /** @type {(address: number) => void} */
  on_cell_click = () => {}
}
