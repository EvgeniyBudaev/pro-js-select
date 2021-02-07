class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectedId = options.selectedId
        this.inputHidden = document.querySelector('[data-input="hidden"]')
        this.inputHiddenValue = null
        this.span = document.querySelector('[data-type="value"]')
        this.render()
        this.setup()
    }

    render() {
        if (this.$el) {
            this.$el.classList.add('select')
        }
    }

    setup() {
        this.inputHiddenValue = this.current.value
        this.inputHidden.value = this.inputHiddenValue
        this.span.innerHTML = this.current.value

        this.clickHandler = this.clickHandler.bind(this)
        if (this.$el) {
            this.$el.addEventListener('click', this.clickHandler)
            this.$arrow = this.$el.querySelector('[data-type="arrow"]')
            this.$value = this.$el.querySelector('[data-type="value"]')
        }
    }

    clickHandler(event) {
        const {type} = event.target.dataset
        if (type === 'input' || type === 'value' || type === 'arrow') {
            this.toggle()
        } else if (type === 'item') {
            const id = event.target.dataset.id
            this.select(id)
        } else if (type === 'backdrop') {
            this.close()
        }
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId)
    }

    select(id) {
        this.selectedId = id
        this.$value.textContent = this.current.value
        this.close()

        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected')
        })

        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
        this.inputHidden.value = this.current.value
        this.options.onSelect ? this.options.onSelect(this.current) : null
        this.close()
    }

    get isOpen() {
        return this.$el.classList.contains('open')
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.$el.classList.add('open')
        this.$arrow.classList.remove('fa-chevron-down')
        this.$arrow.classList.add('fa-chevron-up')

        const selectDropDown = document.querySelector('.select__dropdown')
        selectDropDown.style.overflowY = 'auto'
    }

    close() {
        this.$el.classList.remove('open')
        this.$arrow.classList.add('fa-chevron-down')
        this.$arrow.classList.remove('fa-chevron-up')
    }
}