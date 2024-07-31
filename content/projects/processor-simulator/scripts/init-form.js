import {popup} from './popup.js';
import {assemble_files, CacheConfiguration, CacheMode, Input, SimulationConfiguration} from './webapp.js';

export default class InitForm {
  form
  configuration
  bytecode

  constructor() {
    this.form = document.createElement('form');
    this.form.name = 'Simulation Configuration';
    this.form.innerHTML = document.getElementById('sim_form')
  }

  /**
   * @returns {Promise<void>}
   */
  show() {
    return new Promise((res, rej) => {
      let submit = document.getElementById('conf_submit');
      const conf = {
        /** @type {HTMLInputElement} */
        miss_penalty: document.getElementById('conf_mem_misspenalty'),
        /** @type {HTMLInputElement} */
        volatile_penalty: document.getElementById('conf_mem_volatilepenalty'),
        /** @type {HTMLInputElement} */
        pipelining: document.getElementById('conf_mem_pipeliningenabled'),
        /** @type {HTMLInputElement} */
        writethrough: document.getElementById('conf_mem_writethrough'),
        /** @type {HTMLInputElement} */
        cache_data_enabled: document.getElementById('conf_cache_data_enabled'),
        /** @type {HTMLInputElement} */
        cache_data_setbits: document.getElementById('conf_cache_data_setbits'),
        /** @type {HTMLInputElement} */
        cache_data_offsetbits:
            document.getElementById('conf_cache_data_offsetbits'),
        /** @type {HTMLInputElement} */
        cache_data_ways: document.getElementById('conf_cache_data_ways'),
        /** @type {HTMLInputElement} */
        cache_instruction_enabled:
            document.getElementById('conf_cache_instruction_enabled'),
        /** @type {HTMLInputElement} */
        cache_instruction_setbits:
            document.getElementById('conf_cache_instruction_setbits'),
        /** @type {HTMLInputElement} */
        cache_instruction_offsetbits:
            document.getElementById('conf_cache_instruction_offsetbits'),
        /** @type {HTMLInputElement} */
        cache_instruction_ways:
            document.getElementById('conf_cache_instruction_ways'),
        /** @type {HTMLInputElement} */
        asm: document.getElementById('asm_file'),
      };

      conf.asm.onchange = () => {
        let label = document.getElementById('asm_file_lbl');
        if (conf.asm.files.length > 0) {
          label.style = 'white-space: pre;'
          let files = [];
          for (let i = 0; i < conf.asm.files.length; ++i)
            files.push(conf.asm.files.item(i).name);

          label.textContent = files.join('\n');
        } else {
            label.textContent = "Upload Assembly Source";
        }
      };

      conf.asm.onchange();

      submit.onclick = async () => {
        try {
          const miss_penalty = Number.parseInt(conf.miss_penalty.value);
          const volatile_penalty = Number.parseInt(conf.volatile_penalty.value);
          const pipelining = conf.pipelining.checked;
          const writethrough = conf.writethrough.checked;
          const data_enabled = conf.cache_data_enabled.checked;
          const data_set_bits = Number.parseInt(conf.cache_data_setbits.value);
          const data_offset_bits =
              Number.parseInt(conf.cache_data_offsetbits.value);
          const data_ways = Number.parseInt(conf.cache_data_ways.value);
          const instruction_enabled = conf.cache_instruction_enabled.checked;
          const instruction_set_bits =
              Number.parseInt(conf.cache_instruction_setbits.value);
          const instruction_offset_bits =
              Number.parseInt(conf.cache_instruction_offsetbits.value);
          const instruction_ways =
              Number.parseInt(conf.cache_instruction_ways.value);

          let files = [];

          for (let i = 0; i < conf.asm.files.length; ++i)
            files.push(new Input(
                conf.asm.files[i].name, await conf.asm.files[i].text()));

          if (files.length == 0)
            throw new Error('You must specify at least one file');

          let data_cache = new CacheConfiguration(
              data_enabled ? CacheMode.Associative : CacheMode.Disabled,
              data_set_bits, data_offset_bits, data_ways);
          let instruction_cache = new CacheConfiguration(
              instruction_enabled ? CacheMode.Associative : CacheMode.Disabled,
              instruction_set_bits, instruction_offset_bits, instruction_ways);

          this.configuration = new SimulationConfiguration(
              miss_penalty, volatile_penalty, writethrough, pipelining,
              instruction_cache, data_cache);
          this.bytecode = assemble_files(files);

          res();
        } catch (e) {
          rej(e);
        } finally {
          close();
        }
      }
    });
  }
}
