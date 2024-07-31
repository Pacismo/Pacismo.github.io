/* tslint:disable */
/* eslint-disable */
/**
* @returns {string}
*/
export function about(): string;
/**
* @param {(Input)[]} input
* @returns {Uint8Array}
*/
export function assemble_files(input: (Input)[]): Uint8Array;
/**
*/
export enum CacheMode {
  Disabled = 0,
  Associative = 1,
}
/**
*/
export enum MemoryType {
  Byte = 0,
  Short = 1,
  Word = 2,
  Float = 3,
}
/**
*/
export class CacheConfiguration {
  free(): void;
/**
* @param {CacheMode} mode
* @param {number} set_bits
* @param {number} offset_bits
* @param {number} ways
*/
  constructor(mode: CacheMode, set_bits: number, offset_bits: number, ways: number);
/**
*/
  mode: CacheMode;
/**
*/
  offset_bits: number;
/**
*/
  set_bits: number;
/**
*/
  ways: number;
}
/**
*/
export class Input {
  free(): void;
/**
* @param {string} filename
* @param {string} content
*/
  constructor(filename: string, content: string);
}
/**
*/
export class SimulationConfiguration {
  free(): void;
/**
* @param {number} miss_penalty
* @param {number} volatile_penalty
* @param {boolean} writethrough
* @param {boolean} pipelining
* @param {CacheConfiguration} instruction_cache
* @param {CacheConfiguration} data_cache
*/
  constructor(miss_penalty: number, volatile_penalty: number, writethrough: boolean, pipelining: boolean, instruction_cache: CacheConfiguration, data_cache: CacheConfiguration);
/**
* @returns {any}
*/
  as_json(): any;
/**
*/
  data_cache: CacheConfiguration;
/**
*/
  instruction_cache: CacheConfiguration;
/**
*/
  miss_penalty: number;
/**
*/
  pipelining: boolean;
/**
*/
  volatile_penalty: number;
/**
*/
  writethrough: boolean;
}
/**
*/
export class SimulationState {
  free(): void;
/**
* @param {SimulationConfiguration} config
* @param {Uint8Array} asm
*/
  constructor(config: SimulationConfiguration, asm: Uint8Array);
/**
* @returns {SimulationConfiguration}
*/
  get_configuration(): SimulationConfiguration;
/**
* @returns {boolean}
*/
  is_done(): boolean;
/**
* @returns {boolean}
*/
  clock(): boolean;
/**
* @returns {boolean}
*/
  step(): boolean;
/**
*/
  run(): void;
/**
* Reads a value from an address
* @param {number} address
* @param {MemoryType} memory_type
* @returns {any}
*/
  read_address(address: number, memory_type: MemoryType): any;
/**
* @returns {any}
*/
  read_pipeline_state(): any;
/**
* @returns {any}
*/
  read_cache_state(): any;
/**
* @returns {any}
*/
  read_registers(): any;
/**
* @returns {any}
*/
  read_registers_fp32(): any;
/**
* @param {number} region_id
* @returns {string}
*/
  get_region_hash(region_id: number): string;
/**
* @param {number} region_id
* @returns {Uint8Array}
*/
  read_region(region_id: number): Uint8Array;
/**
* @param {number} region_id
* @returns {(string)[]}
*/
  disassemble_region(region_id: number): (string)[];
/**
* @returns {any}
*/
  get_stats(): any;
}
/**
*/
export class SimulatorMemoryConfiguration {
  free(): void;
/**
* @returns {SimulatorMemoryConfiguration}
*/
  static get(): SimulatorMemoryConfiguration;
/**
*/
  page_count: number;
/**
*/
  page_size: number;
/**
*/
  region_size: number;
/**
*/
  regions: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_cacheconfiguration_free: (a: number) => void;
  readonly __wbg_get_cacheconfiguration_mode: (a: number) => number;
  readonly __wbg_set_cacheconfiguration_mode: (a: number, b: number) => void;
  readonly __wbg_get_cacheconfiguration_set_bits: (a: number) => number;
  readonly __wbg_set_cacheconfiguration_set_bits: (a: number, b: number) => void;
  readonly __wbg_get_cacheconfiguration_offset_bits: (a: number) => number;
  readonly __wbg_set_cacheconfiguration_offset_bits: (a: number, b: number) => void;
  readonly __wbg_get_cacheconfiguration_ways: (a: number) => number;
  readonly __wbg_set_cacheconfiguration_ways: (a: number, b: number) => void;
  readonly cacheconfiguration_new: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbg_simulationconfiguration_free: (a: number) => void;
  readonly __wbg_get_simulationconfiguration_instruction_cache: (a: number) => number;
  readonly __wbg_set_simulationconfiguration_instruction_cache: (a: number, b: number) => void;
  readonly __wbg_get_simulationconfiguration_data_cache: (a: number) => number;
  readonly __wbg_set_simulationconfiguration_data_cache: (a: number, b: number) => void;
  readonly __wbg_get_simulationconfiguration_writethrough: (a: number) => number;
  readonly __wbg_set_simulationconfiguration_writethrough: (a: number, b: number) => void;
  readonly __wbg_get_simulationconfiguration_pipelining: (a: number) => number;
  readonly __wbg_set_simulationconfiguration_pipelining: (a: number, b: number) => void;
  readonly simulationconfiguration_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly simulationconfiguration_as_json: (a: number) => number;
  readonly __wbg_get_simulationconfiguration_miss_penalty: (a: number) => number;
  readonly __wbg_get_simulationconfiguration_volatile_penalty: (a: number) => number;
  readonly __wbg_set_simulationconfiguration_miss_penalty: (a: number, b: number) => void;
  readonly __wbg_set_simulationconfiguration_volatile_penalty: (a: number, b: number) => void;
  readonly about: (a: number) => void;
  readonly __wbg_simulatormemoryconfiguration_free: (a: number) => void;
  readonly __wbg_get_simulatormemoryconfiguration_page_count: (a: number) => number;
  readonly __wbg_set_simulatormemoryconfiguration_page_count: (a: number, b: number) => void;
  readonly __wbg_get_simulatormemoryconfiguration_page_size: (a: number) => number;
  readonly __wbg_set_simulatormemoryconfiguration_page_size: (a: number, b: number) => void;
  readonly __wbg_get_simulatormemoryconfiguration_regions: (a: number) => number;
  readonly __wbg_set_simulatormemoryconfiguration_regions: (a: number, b: number) => void;
  readonly __wbg_get_simulatormemoryconfiguration_region_size: (a: number) => number;
  readonly __wbg_set_simulatormemoryconfiguration_region_size: (a: number, b: number) => void;
  readonly simulatormemoryconfiguration_get: () => number;
  readonly __wbg_simulationstate_free: (a: number) => void;
  readonly simulationstate_new: (a: number, b: number, c: number, d: number) => void;
  readonly simulationstate_get_configuration: (a: number) => number;
  readonly simulationstate_is_done: (a: number) => number;
  readonly simulationstate_clock: (a: number) => number;
  readonly simulationstate_step: (a: number) => number;
  readonly simulationstate_run: (a: number) => void;
  readonly simulationstate_read_address: (a: number, b: number, c: number, d: number) => void;
  readonly simulationstate_read_pipeline_state: (a: number) => number;
  readonly simulationstate_read_cache_state: (a: number) => number;
  readonly simulationstate_read_registers: (a: number) => number;
  readonly simulationstate_read_registers_fp32: (a: number) => number;
  readonly simulationstate_get_region_hash: (a: number, b: number, c: number) => void;
  readonly simulationstate_read_region: (a: number, b: number, c: number) => void;
  readonly simulationstate_disassemble_region: (a: number, b: number, c: number) => void;
  readonly simulationstate_get_stats: (a: number) => number;
  readonly __wbg_input_free: (a: number) => void;
  readonly input_new: (a: number, b: number, c: number, d: number) => number;
  readonly assemble_files: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
