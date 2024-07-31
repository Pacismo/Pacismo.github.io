import {popup} from './popup.js';
import {assemble_files, CacheConfiguration, CacheMode, Input, SimulationConfiguration} from './webapp.js';

export default class InitForm {
  form
  configuration
  bytecode

  constructor() {
    this.form = document.createElement('form');
    this.form.name = 'Simulation Configuration';
    this.form.innerHTML = String.raw`
                <h2 style="margin: 0;">Configure Simulation</h2>
                <hr />
                <fieldset class="grid">
                    <legend>Memory</legend>
                    <label for="conf_mem_misspenalty">Miss penalty:</label>
                    <input type="number" id="conf_mem_misspenalty" name="miss_penalty" value="100" required><br />
                    <label for="conf_mem_volatilepenalty">Volatile penalty:</label>
                    <input type="number" id="conf_mem_volatilepenalty" name="volatile_penalty" value="10"
                        required><br />
                    <label for="conf_mem_pipeliningenabled">Enable pipelining</label>
                    <input type="checkbox" id="conf_mem_pipeliningenabled" name="pipelining"><br />
                    <label for="conf_mem_writethrough">Enable writethrough</label>
                    <input type="checkbox" id="conf_mem_writethrough" name="writethrough">
                </fieldset>
                <fieldset class="cache-config">
                    <legend>Cache</legend>
                    <div class="cache-entry data">
                        <fieldset class="grid">
                            <legend>Data</legend>
                            <label for="conf_cache_data_enabled">Enabled</label>
                            <input type="checkbox" id="conf_cache_data_enabled" name="conf_cache_data_enabled"><br />
                            <label for="conf_cache_data_setbits">Set bits:</label>
                            <input type="number" id="conf_cache_data_setbits" name="cache_data_set_bits" min="0" max="8"
                                value="0" required><br />
                            <label for="conf_cache_data_offsetbits">Offset bits:</label>
                            <input type="number" id="conf_cache_data_offsetbits" name="cache_data_offset_bits" min="2"
                                max="16" value="2" required><br />
                            <label for="conf_cache_data_ways">Ways:</label>
                            <input type="number" id="conf_cache_data_ways" name="cache_data_ways" min="1" max="16"
                                value="1" required>
                        </fieldset>
                    </div>
                    <div class="cache-entry instruction">
                        <fieldset class="grid">
                            <legend>Instruction</legend>
                            <label for="conf_cache_instruction_enabled">Enabled</label>
                            <input type="checkbox" id="conf_cache_instruction_enabled" name="conf_cache_instruction_enabled"><br />
                            <label for="conf_cache_instruction_setbits">Set bits:</label>
                            <input type="number" id="conf_cache_instruction_setbits" name="cache_instruction_set_bits"
                                min="0" max="8" value="0" required><br />
                            <label for="conf_cache_instruction_offsetbits">Offset bits:</label>
                            <input type="number" id="conf_cache_instruction_offsetbits"
                                name="cache_instruction_offset_bits" min="2" max="16" value="2" required><br />
                            <label for="conf_cache_instruction_ways">Ways:</label>
                            <input type="number" id="conf_cache_instruction_ways" name="cache_instruction_ways" min="1"
                                max="16" value="1" required>
                        </fieldset>
                    </div>
                </fieldset>
                <div class="file-input">
                    <label for="asm_file"><img src="./add-file.png" /><p id="asm_file_lbl">Upload Assembly Source</p></label>
                    <input type="file" id="asm_file" name="asm_file" accept=".asm,.txt" required multiple>
                </div>
                <input class="submit-button" id="conf_submit" type="button" value="Start">`;
  }

  /**
   * @returns {Promise<void>}
   */
  show() {
    return new Promise((res, rej) => {
      popup((content, close) => {
        content.className = 'form-container'
        content.appendChild(this.form);

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
          cache_data_enabled:
              document.getElementById('conf_cache_data_enabled'),
          /** @type {HTMLInputElement} */
          cache_data_setbits:
              document.getElementById('conf_cache_data_setbits'),
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

        conf.asm.onchange =
            e => {
              let label = document.getElementById('asm_file_lbl');
              label.style = 'white-space: pre;'
              let files = [];
              for (let i = 0; i < conf.asm.files.length; ++i)
                files.push(conf.asm.files.item(i).name);

              label.textContent = files.join('\n');
            }

                 submit.onclick = async () => {
              try {
                const miss_penalty = Number.parseInt(conf.miss_penalty.value);
                const volatile_penalty =
                    Number.parseInt(conf.volatile_penalty.value);
                const pipelining = conf.pipelining.checked;
                const writethrough = conf.writethrough.checked;
                const data_enabled = conf.cache_data_enabled.checked;
                const data_set_bits =
                    Number.parseInt(conf.cache_data_setbits.value);
                const data_offset_bits =
                    Number.parseInt(conf.cache_data_offsetbits.value);
                const data_ways = Number.parseInt(conf.cache_data_ways.value);
                const instruction_enabled =
                    conf.cache_instruction_enabled.checked;
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
                    instruction_enabled ? CacheMode.Associative :
                                          CacheMode.Disabled,
                    instruction_set_bits, instruction_offset_bits,
                    instruction_ways);

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
    });
  }
}
