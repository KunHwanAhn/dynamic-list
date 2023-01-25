(() => {
  const LIST_ITEM_COUNT = 100;

  const listParent = document.getElementById('dynamic-list');

  Array.from({length: LIST_ITEM_COUNT}).forEach((_, index) => {
    const listItem = document.createElement('li');
    listItem.style.willChange = 'transform';
    listItem.style.transition = 'transform .2s ease-out';

    listItem.addEventListener('mouseenter', (event) => {
      listItem.style.transform = 'translateX(40px)';
    });
    listItem.addEventListener('mouseleave', () => {
      listItem.style.transform = '';
    })

    listParent.appendChild(listItem);
  })


  console.log(listParent);
})();
