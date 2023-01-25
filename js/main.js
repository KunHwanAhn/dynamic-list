(() => {
  const LIST_ITEM_COUNT = 100;
  const MODAL_Z_INDEX = '1000';

  /**
   * @param {number} index
   * @param {number} maxIndex
   */
  function getSibilings(index, maxIndex = LIST_ITEM_COUNT - 1) {
    if (index === 0) {
      return [index + 1];
    }

    if (index === maxIndex) {
      return [index - 1];
    }

    return [index - 1, index + 1];
  }

  document.body.style.overflowX = 'hidden';

  const modalContent = document.getElementById('modal-content');
  modalContent.style.display = 'flex';
  modalContent.style.justifyContent = 'center';
  modalContent.style.alignItems = 'center';
  modalContent.style.backgroundColor = 'rgb(255, 255, 255)';
  modalContent.style.border = '1px solid black';
  modalContent.style.borderRadius = '4px';
  modalContent.style.width = '70vw';
  modalContent.style.height = '70vh';
  modalContent.style.fontSize = '10vw';
  modalContent.style.willChange = 'transform';
  modalContent.addEventListener('click', (event) => { event.stopPropagation(); });

  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.zIndex = MODAL_Z_INDEX;
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.style.justifyContent = '';
    modal.style.alignItems = '';

    modalContent.innerHTML = '';
  });

  /**
   * @param {number} index
   */
  function showModal(index) {
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    modalContent.animate([
      { transform: 'scale(0.99)' },
      { transform: 'scale(1.01)' },
      { transform: 'scale(1)' }
    ], {
      duration: 200,
      iterations: 1,
      easing: 'ease-out',
    })

    modalContent.innerHTML = `${index}`;
  }

  const listItems = Array.from({length: LIST_ITEM_COUNT}).map(() => {
    const listItem = document.createElement('li');
    listItem.style.willChange = 'transform';
    listItem.style.transition = 'transform 0.2s ease-out';
    listItem.style.cursor = 'pointer';

    return listItem;
  });

  const listParent = document.getElementById('dynamic-list');

  listItems.forEach((listItem, index, array) => {
    const sibilings = getSibilings(index);

    listItem.addEventListener('mouseenter', () => {
      listItem.style.transform = 'translateX(40px)';

      sibilings.forEach((sibiling) => {
        array[sibiling].style.transform = 'translateX(20px)';
      })
    });
    listItem.addEventListener('mouseleave', () => {
      listItem.style.transform = '';

      sibilings.forEach((sibiling) => {
        array[sibiling].style.transform = '';
      })
    })
    listItem.addEventListener('click', () => { showModal(index); });

    listParent.appendChild(listItem);
  });
})();
