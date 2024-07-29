/**
 * @type {(container: HTMLElement, aliases?: Map<string, string>) => (pair:
 *     [string, any]) => void}
 */
export default function put_into(container, aliases = undefined) {
  return pair => {
    let key = pair[0];
    let value = pair[1];

    let list_item = document.createElement('li');
    let k = document.createElement('b');
    if (aliases && aliases.has(key))
      k.textContent = `${aliases.get(key)}: `;
    else
      k.textContent = `${key}: `;
    list_item.appendChild(k);
    let v = null;

    switch (typeof value) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
        v = document.createTextNode(`${value}`);
        break;
      case 'object':
        v = document.createElement('ul');
        Object.entries(value).forEach(put_into(v, aliases));
        break;
      default:
        v = document.createTextNode('???');
        break;
    }

    list_item.appendChild(v);
    container.appendChild(list_item);
  };
}
