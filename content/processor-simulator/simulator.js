import Cache from './scripts/cache.js';
import InitForm from './scripts/init-form.js';
import Memory from './scripts/memory.js';
import Pipeline from './scripts/pipeline.js';
import {close_popup} from './scripts/popup.js';
import Registers from './scripts/registers.js';
import Watchlist from './scripts/watchlist.js';
import {SimulationState} from './scripts/webapp.js';
import init from './scripts/webapp.js';
import populate from './scripts/yaml_populator.js';

await init();

let init_form = new InitForm;
while (true) try {
    await init_form.show();
    break;
  } catch (e) {
    await close_popup('Error', container => {
      container.className = 'error-message';

      e.toString().split(/\n|\r\n/).forEach(l => {
        let p = document.createElement('code');
        p.classList = 'monospace';
        p.style =
            'margin-top: 0; margin-bottom: 0; display: block; white-space: pre;';
        container.appendChild(p);
        p.textContent = l;
      });
    });
  }

export const sim =
    new SimulationState(init_form.configuration, init_form.bytecode);

export const pipeline = new Pipeline(
    sim, 'pipeline_table', 'fetch_state', 'decode_state', 'execute_state',
    'memory_state', 'writeback_state');

export const registers = new Registers(sim, 'register_table', {
  v0: 'reg_v0_val',
  v1: 'reg_v1_val',
  v2: 'reg_v2_val',
  v3: 'reg_v3_val',
  v4: 'reg_v4_val',
  v5: 'reg_v5_val',
  v6: 'reg_v6_val',
  v7: 'reg_v7_val',
  v8: 'reg_v8_val',
  v9: 'reg_v9_val',
  va: 'reg_va_val',
  vb: 'reg_vb_val',
  vc: 'reg_vc_val',
  vd: 'reg_vd_val',
  ve: 'reg_ve_val',
  vf: 'reg_vf_val',
  sp: 'reg_sp_val',
  bp: 'reg_bp_val',
  lp: 'reg_lp_val',
  pc: 'reg_pc_val',
  zf: 'reg_zf_val',
  of: 'reg_of_val',
  eps: 'reg_eps_val',
  nan: 'reg_nan_val',
  inf: 'reg_inf_val'
});

export const watchlist = new Watchlist(
    sim, 'watchlist_table', 'watchlist_address', 'watchlist_type');

export const cache =
    new Cache(sim, 'cache_view_content', 'cache_view_selector');

export const memory = new Memory(
    sim, 'memory_table', 'memory_view_pageid', 'memory_view_selector');

export function show_config() {
  close_popup('Configuration', e => {
    let list = document.createElement('ul');
    list.classList = 'configuration-display';
    e.appendChild(list);

    let aliases = new Map([
      ['cache', 'Cache'], ['data', 'Data'], ['instruction', 'Instruction'],
      ['mode', 'Mode'], ['set_bits', 'Set Bits'],
      ['offset_bits', 'Offset Bits'], ['ways', 'Ways'],
      ['miss_penalty', 'Miss Penalty'], ['pipelining', 'Pipelining'],
      ['volatile_penalty', 'Volatile Penalty'], ['writethrough', 'Writethrough']
    ]);

    const config = sim.get_configuration();
    Object.entries(config.as_json()).forEach(populate(list, aliases));
    config.free();
  });
}

export function update_views() {
  pipeline.update();
  registers.update();
  watchlist.update();
  cache.update();
  memory.update();
}

export function show_stats() {
  close_popup('Statistics', e => {
    let list = document.createElement('ul');
    list.classList = 'configuration-display';
    e.appendChild(list);

    let aliases = new Map([
      ['clocks', 'Clocks'], ['memory_accesses', 'Memory Accesses'],
      ['cache_hits', 'Cache Hits'],
      ['cache_conflict_misses', 'Cache Misses (Conflict)'],
      ['cache_cold_misses', 'Cache Misses (Cold)']
    ]);

    Object.entries(sim.get_stats()).forEach(populate(list, aliases));
  });
}

export function clock() {
  sim.clock();
  update_views();
}

export function step() {
  sim.step();
  update_views();
}

export function run() {
  sim.run();
  sim.is_done();
  update_views();
}

update_views();
