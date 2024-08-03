import {SimulationState} from './webapp.js';

export default class Registers
{
    /** @type {HTMLTableElement} */
    table
    /**
     * @type {{
     *  v0 : HTMLTableCellElement,
     *  v1 : HTMLTableCellElement,
     *  v2 : HTMLTableCellElement,
     *  v3 : HTMLTableCellElement,
     *  v4 : HTMLTableCellElement,
     *  v5 : HTMLTableCellElement,
     *  v6 : HTMLTableCellElement,
     *  v7 : HTMLTableCellElement,
     *  v8 : HTMLTableCellElement,
     *  v9 : HTMLTableCellElement,
     *  va : HTMLTableCellElement,
     *  vb : HTMLTableCellElement,
     *  vc : HTMLTableCellElement,
     *  vd : HTMLTableCellElement,
     *  ve : HTMLTableCellElement,
     *  vf : HTMLTableCellElement,
     *  sp : HTMLTableCellElement,
     *  bp : HTMLTableCellElement,
     *  lp : HTMLTableCellElement,
     *  pc : HTMLTableCellElement,
     *  zf : HTMLTableCellElement,
     *  of : HTMLTableCellElement,
     *  eps : HTMLTableCellElement,
     *  nan : HTMLTableCellElement,
     *  inf : HTMLTableCellElement,
     * }}
     */
    cells

    /**
     * Creates a new Register view manager
     * @param {SimulationState} simulator
     * @param {HTMLTableElement} table
     * @param {{
     *  v0 : HTMLTableCellElement|string,
     *  v1 : HTMLTableCellElement|string,
     *  v2 : HTMLTableCellElement|string,
     *  v3 : HTMLTableCellElement|string,
     *  v4 : HTMLTableCellElement|string,
     *  v5 : HTMLTableCellElement|string,
     *  v6 : HTMLTableCellElement|string,
     *  v7 : HTMLTableCellElement|string,
     *  v8 : HTMLTableCellElement|string,
     *  v9 : HTMLTableCellElement|string,
     *  va : HTMLTableCellElement|string,
     *  vb : HTMLTableCellElement|string,
     *  vc : HTMLTableCellElement|string,
     *  vd : HTMLTableCellElement|string,
     *  ve : HTMLTableCellElement|string,
     *  vf : HTMLTableCellElement|string,
     *  sp : HTMLTableCellElement|string,
     *  bp : HTMLTableCellElement|string,
     *  lp : HTMLTableCellElement|string,
     *  pc : HTMLTableCellElement|string,
     *  zf : HTMLTableCellElement|string,
     *  of : HTMLTableCellElement|string,
     *  eps : HTMLTableCellElement|string,
     *  nan : HTMLTableCellElement|string,
     *  inf : HTMLTableCellElement|string,
     * }} register_names
     */
    constructor(simulator, table, register_names) {
        this.cells = Object.fromEntries(Object.entries(register_names).map(([ k, v ]) => {
            if (typeof v === 'string')
                return [ k, document.getElementById(v) ];
            else
                return [ k, v ];
        }));

        this.table = table;
        this.simulator = simulator;
    }

    update() {
        /** @type {{[k: string]: number}} */
        let state = this.simulator.read_registers();
        let statefp = this.simulator.read_registers_fp32();

        Object.entries(state).forEach(([ k, v ]) => {
            if (k === 'v')
                for (let i = 0; i < 16; ++i) {
                    let cell = this.cells[`v${i.toString(16)}`];
                    cell.textContent = v[i].toString(16).toUpperCase().padStart(8, '0');
                    cell.title = `Int32: ${v[i]}\nFP32: ${statefp.v[i].toString()}`;
                }
            else {
                let cell = this.cells[k];
                cell.textContent = v.toString(16).toUpperCase().padStart(8, '0');
                cell.title = `Int32: ${v}\nFP32: ${statefp[k].toString()}`;
            }
        });
    }
}
