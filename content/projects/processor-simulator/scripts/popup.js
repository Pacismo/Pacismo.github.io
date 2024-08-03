/**
 * Creates a popup that must be manually closed
 *
 * @param {string} title
 * @param {(content: HTMLDivElement, close: () => void) => void} populator
 */
export function popup(populator) {
  let body = document.getElementsByTagName('main').item(0);

  /** @type {HTMLDivElement} */
  let popup = document.createElement('div');
  popup.classList = 'popup';
  body.appendChild(popup);

  /** @type {HTMLDivElement} */
  let container = document.createElement('div');
  popup.appendChild(container);

  populator(container, () => body.removeChild(popup));
}

/**
 * Creates a popup that the user must close
 *
 * @param {string} title
 * @param {(content: HTMLDivElement) => void} populator
 * @returns {Promise<void>} An awaitable promise that resolves when closed.
 */
export function close_popup(title, populator) {
  return new Promise((res, rej) => {
    let body = document.getElementsByTagName('main').item(0);

    /** @type {HTMLDivElement} */
    let popup = document.createElement('div');
    popup.classList = 'popup';
    body.appendChild(popup);

    /** @type {HTMLDivElement} */
    let container = document.createElement('div');
    popup.appendChild(container);

    let pop_title = document.createElement('h2');
    pop_title.textContent = title;
    container.appendChild(pop_title);
    pop_title.style = 'margin: 0;';

    let message = document.createElement('div');
    message.classList = 'message';
    container.appendChild(message);

    let exit_button = document.createElement('button');
    container.appendChild(exit_button);
    exit_button.onclick = () => {
      body.removeChild(popup);
      res();
    };
    exit_button.textContent = 'Close';
    exit_button.classList = 'close-button';

    populator(message);
  });
}
