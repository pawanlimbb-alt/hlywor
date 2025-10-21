document.addEventListener('DOMContentLoaded', () => {

    const menuItems = Array.from(document.querySelectorAll('.library-buttons a, .library-buttons button'));
    if(menuItems.length === 0) return;

    let selectedIndex = 0;
    menuItems[selectedIndex].classList.add('selected');

    function updateSelection(newIndex) {
        menuItems[selectedIndex].classList.remove('selected');
        selectedIndex = newIndex;
        menuItems[selectedIndex].classList.add('selected');
    }

    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                updateSelection((selectedIndex + 1) % menuItems.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                updateSelection((selectedIndex - 1 + menuItems.length) % menuItems.length);
                break;
            case 'Enter':
                const item = menuItems[selectedIndex];
                item.click();
                break;
        }
    });

});

