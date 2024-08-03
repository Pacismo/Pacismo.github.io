import {CacheConfiguration, CacheMode, SimulationState} from './webapp.js'

export default class Cache
{
    /** @type {HTMLDivElement} */
    content
    /** @type {HTMLTableElement} */
    table
    /** @type {{[name: string]: HTMLTableElement}} */
    tables
    /** @type {{[name: string]: CacheConfiguration}} */
    config
    /** @type {HTMLSelectElement} */
    selector
    /** @type {SimulationState} */
    simulator

    /**
     * Creates a new Cache view manager
     * @param {SimulationState} simulator
     * @param {HTMLDivElement|string} content
     */
    constructor(simulator, content, selector) {
        this.content = typeof content === 'string' ? document.getElementById(content) : content;
        this.selector = typeof selector === 'string' ? document.getElementById(selector) : selector;
        this.tables = {};
        this.simulator = simulator;

        let config = simulator.get_configuration();
        this.make_table('data', config.data_cache);
        this.make_table('instruction', config.instruction_cache);
        this.config = {data : config.data_cache, instruction : config.instruction_cache};

        [[ 'Data', 'data' ], [ 'Instruction', 'instruction' ]].map(([ name, id ], i) => {
            let opt = document.createElement('option');
            opt.textContent = name;
            opt.value = id;
            if (i === 0)
                opt.selected = true;

            this.selector.appendChild(opt);
        });

        this.update(true);
    }

    /**
     * @param {boolean} swap
     */
    update(swap = false) {
        let cache = this.selector.value;

        if (swap) {
            this.content.childNodes.forEach(c => c.remove());
            this.table = this.tables[cache];
            this.content.append(this.table);
        }

        /** @type {{[name: string]: (number[]|null)[]}} */
        let values = this.simulator.read_cache_state();
        let config = this.config[cache];

        if (config.mode === CacheMode.Associative)
            values[cache].forEach((r, i) => {
                let tr = this.table.rows[i + 1];
                const col_offset = (i % config.ways === 0) ? 1 : 0;

                let ba = tr.cells[col_offset + 1];
                let db = tr.cells[col_offset + 2];

                if (r === null) {
                    ba.textContent = '';
                    db.textContent = '';
                } else {
                    ba.textContent = r.base_address.toString(16).toUpperCase().padStart(8, '0');
                    db.textContent = r.dirty;
                }
                if (r === null)
                    for (let i = 3 + col_offset; i < tr.cells.length; ++i)
                        tr.cells[i].textContent = '';
                else
                    for (let i = 0; i < r.data.length; ++i)
                        tr.cells[i + col_offset + 3].textContent =
                            r.data[i].toString(16).toUpperCase().padStart(2, '0');
            });
    }

    /**
     * Creates a new table
     *
     * @param {string} name
     * @param {CacheConfiguration} config
     */
    make_table(name, config) {
        if (config.mode === CacheMode.Disabled) {
            let p = document.createElement('p');
            p.textContent = 'No data';
            this.tables[name] = p;
        } else {
            let table = document.createElement('table');
            let headers = document.createElement('tr');
            ['Set', 'Way', 'Base Address', 'Dirty']
                .map(n => {
                    let h = document.createElement('th');
                    h.textContent = n;
                    return h;
                })
                .forEach(c => headers.appendChild(c));
            let wide_header = document.createElement('th');
            wide_header.textContent = 'Values';
            wide_header.colSpan = Math.pow(2, config.offset_bits);
            headers.appendChild(wide_header);

            let rows = [ headers ];

            for (let set = 0; set < Math.pow(2, config.set_bits); ++set) {
                let first_row = document.createElement('tr');
                let first_row_cells = [
                    document.createElement('th'),
                    document.createElement('th'),
                    document.createElement('th'),
                    document.createElement('th'),
                ];
                first_row_cells[0].textContent = `${set}`;
                first_row_cells[0].rowSpan = config.ways;
                first_row_cells[1].textContent = '0';

                for (let offset = 0; offset < Math.pow(2, config.offset_bits); ++offset)
                    first_row_cells.push(document.createElement('td'));

                first_row_cells.forEach(c => c.classList = 'monospace');

                first_row_cells.forEach(c => first_row.appendChild(c));
                rows.push(first_row);

                for (let way = 1; way < config.ways; ++way) {
                    let row = document.createElement('tr');
                    let cells = [
                        document.createElement('th'),
                        document.createElement('th'),
                        document.createElement('th'),
                    ];
                    cells[0].textContent = `${way}`;

                    for (let offset = 0; offset < Math.pow(2, config.offset_bits); ++offset)
                        cells.push(document.createElement('td'));

                    cells.forEach(c => c.classList = 'monospace');

                    cells.forEach(c => row.appendChild(c));
                    rows.push(row);
                }
            }

            rows.forEach(r => table.appendChild(r));
            this.tables[name] = table;
        }
    }
}
