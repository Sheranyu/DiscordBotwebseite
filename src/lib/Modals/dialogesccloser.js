// externalLogic.js

/**
 * @param {() => void} closedialog
 */
export function setupEscapeKeyListener(closedialog) {
    /**
   * @param {{ key: string; }} event
   */
    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        closedialog();
      }
    }
  
    window.addEventListener('keydown', handleEscapeKey);
  
    return function cleanup() {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }
  