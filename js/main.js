(() => {
  const LIST_ITEM_COUNT = 100;
  const POPOUT_Z_INDEX = 1000;

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

  let popoutIndex = -1;

  /**
   * @param {number} index
   */
  function setPopoutIndex(index) {
    popoutIndex = index;
  }

  /**
   * @returns popoutIndex
   */
  function getPopoutIndex() {
    return popoutIndex;
  }

  /**
   * @param {number} index
   * @param {HTMLDivElement} bg
   */
  function showPopout(index, bg) {
    document.body.style.overflowY = 'hidden';
    bg.style.display = 'block';

    const target = listItems[index];
    target.style.justifyContent = 'center';
    target.style.fontSize = '4vw';
    target.style.transition = '';
    target.style.position = 'fixed';
    target.style.insetBlockStart = '50%';
    target.style.insetInlineStart = '50%';
    target.style.transform = 'translate(-50%, -50%)';
    target.style.width = '70vw';
    target.style.height = '70vh';
    target.style.cursor = '';
    target.style.zIndex = `${POPOUT_Z_INDEX}`;
  }

  /**
   * @param {number} index
   * @param {HTMLDivElement} bg
   */
  function hidePopout(index, bg) {
    document.body.style.overflowY = 'auto';
    setPopoutIndex(-1);
    resetListItem(listItems[index]);

    const sibilings = getSibilings(index);
    sibilings.forEach((sibiling) => {
      resetListItem(listItems[sibiling]);
    });

    bg.style.display = 'none';
  }

  /**
   * @param {HTMLLIElement} target
   */
  function resetListItem(target) {
    target.style.listStyle = 'none';
    target.style.marginBlockStart = '0.5rem';
    target.style.padding = '1rem';
    target.style.border = '1px solid black';
    target.style.position = 'relative';
    target.style.background = 'white';
    target.style.willChange = 'transform';
    target.style.transition = 'transform 0.2s ease-out';
    target.style.transform = '';
    target.style.cursor = 'pointer';
    target.style.display = 'flex';
    target.style.alignItems = 'center';
    target.style.justifyContent = '';
    target.style.fontSize = '';
    target.style.insetBlockStart = '';
    target.style.insetInlineStart = '';
    target.style.width = '';
    target.style.height = '';
    target.style.zIndex = '';
  }

  document.body.style.overflowX = 'hidden';

  const listItems = Array.from({length: LIST_ITEM_COUNT}).map((_, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${index + 1}`;
    resetListItem(listItem);

    return listItem;
  });

  const popoutBackground = document.getElementById('popout-bg');
  popoutBackground.style.display = 'none';
  popoutBackground.style.position = 'fixed';
  popoutBackground.style.insetBlockStart = '0';
  popoutBackground.style.insetInlineStart = '0';
  popoutBackground.style.width = '100%';
  popoutBackground.style.height = '100%';
  popoutBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  popoutBackground.style.cursor = 'pointer';
  popoutBackground.style.zIndex = `${POPOUT_Z_INDEX - 1}`;
  popoutBackground.addEventListener('click', () => { hidePopout(getPopoutIndex(), popoutBackground); });

  const listParent = document.getElementById('dynamic-list');
  listParent.style.paddingInlineStart = '0';

  listItems.forEach((listItem, index, array) => {
    const sibilings = getSibilings(index);

    // NOTE: 리스트 아이템에 hover 했을 때
    listItem.addEventListener('mouseenter', () => {
      if (index === getPopoutIndex()) {
        return;
      }

      listItem.style.transform = 'translateX(40px)';

      sibilings.forEach((sibiling) => {
        array[sibiling].style.transform = 'translateX(20px)';
      })
    });

    // NOTE: 리스트 아이템을 벗어났을 때
    listItem.addEventListener('mouseleave', () => {
      if (index === getPopoutIndex()) {
        return;
      }

      resetListItem(listItem);

      sibilings.forEach((sibiling) => { resetListItem(array[sibiling]); });
    });

    // NOTE: 리스트 아이템을 선택했을 때
    listItem.addEventListener('click', () => {
      setPopoutIndex(index);
      showPopout(getPopoutIndex(), popoutBackground);
    });

    listParent.appendChild(listItem);
  });
})();
