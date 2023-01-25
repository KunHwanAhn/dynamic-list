(() => {
  const LIST_ITEM_COUNT = 100;

  /**
   * @param {number} index
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

  const listParent = document.getElementById('dynamic-list');

  const listItems = Array.from({length: LIST_ITEM_COUNT}).map(() => {
    const listItem = document.createElement('li');
    listItem.style.willChange = 'transform';
    listItem.style.transition = 'transform .2s ease-out';

    return listItem;
  });

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

    listParent.appendChild(listItem);
  })
})();
