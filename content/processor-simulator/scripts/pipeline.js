import {close_popup} from './popup.js';
import {SimulationState} from './webapp.js';
import populate from './yaml_populator.js';

export default class Pipeline {
  /** @type {HTMLTableElement} */
  table
  /** @type {HTMLTableCellElement} */
  fetch
  /** @type {HTMLTableCellElement} */
  decode
  /** @type {HTMLTableCellElement} */
  execute
  /** @type {HTMLTableCellElement} */
  memory
  /** @type {HTMLTableCellElement} */
  writeback
  /**
   * @type {{
   *         fetch: {state: string, [k: string]: any},
   *         decode: {state: string, [k: string]: any},
   *         execute: {state: string, [k: string]: any},
   *         memory: {state: string, [k: string]: any},
   *         writeback: {job: string, [k: string]: any} | null
   * }}
   */
  current_state
  /** @type {SimulationState} */
  simulator

  /**
   * Creates a new Pipeline manager
   *
   * @param {SimulationState} simulator
   * @param {HTMLTableElement|string} table
   * @param {HTMLTableCellElement|string} fetch_cell
   * @param {HTMLTableCellElement|string} decode_cell
   * @param {HTMLTableCellElement|string} execute_cell
   * @param {HTMLTableCellElement|string} memory_cell
   * @param {HTMLTableCellElement|string} writeback_cell
   */
  constructor(
      simulator, table, fetch_cell, decode_cell, execute_cell, memory_cell,
      writeback_cell) {
    if (typeof table === 'string')
      this.table = document.getElementById(table);
    else
      this.table = table;

    if (typeof decode_cell === 'string')
      this.decode = document.getElementById(decode_cell);
    else
      this.decode = decode_cell;

    if (typeof execute_cell === 'string')
      this.execute = document.getElementById(execute_cell);
    else
      this.execute = execute_cell;

    if (typeof memory_cell === 'string')
      this.memory = document.getElementById(memory_cell);
    else
      this.memory = memory_cell;

    if (typeof writeback_cell === 'string')
      this.writeback = document.getElementById(writeback_cell);
    else
      this.writeback = writeback_cell;

    if (typeof fetch_cell === 'string')
      this.fetch = document.getElementById(fetch_cell);
    else
      this.fetch = fetch_cell;

    this.current_state = simulator.read_pipeline_state();
    this.simulator = simulator;
  }

  /**
   * @param {string} stage
   */
  show_details(stage) {
    let sel = this.current_state[stage];

    close_popup(
        `Current State: ${stage[0].toUpperCase() + stage.substring(1)}`, c => {
          let list = document.createElement('ul');
          list.classList = 'configuration-display';
          c.appendChild(list);

          Object.entries(sel ?? {state: 'idle'}).forEach(populate(list));
        });
  }

  update() {
    this.current_state = this.simulator.read_pipeline_state();

    this.fetch.textContent = this.current_state.fetch.state;
    this.decode.textContent = this.current_state.decode.state;
    this.execute.textContent = this.current_state.execute.state;
    this.memory.textContent = this.current_state.memory.state;
    this.writeback.textContent = this.current_state.writeback?.job ?? 'idle';
  }
}
