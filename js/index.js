function setupSelect(currentSelect) {
    const select = currentSelect
    if (select) {
        const items = select.querySelectorAll('[data-type="item"]')
        const array = [...items]
        let obj = array.map((item) => {
            return {
                id: item.dataset.id,
                value: item.textContent
            }
        })

        new Select(select,  {
            placeholder: 'Выберите язык программирования',
            selectedId: '1',
            data: obj,
            onSelect(item) {
                console.log('[index.js] Selected item:', item)
            }
        })
    }
}

function callSelects() {
    const selects = document.querySelectorAll('[data-type="select"]')
    if (selects) selects.forEach(select => setupSelect(select))
}

callSelects()
