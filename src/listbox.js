const OPTION_TAG = 'slm-option';

class SlmListboxElement extends HTMLElement {
    static formAssociated = true;

    connectedCallback() {
        this._internals = this.attachInternals();
        this.addEventListener('click', this._onClickOption);
        if (!this.value) {
            this._setDefaultValue();
        }
    }

    disconnectedCallback() {
        this.removeEventListener('click', this._onClickOption);
    }

    get form() {
        return this._internals.form;
    }

    get name() {
        return this.getAttribute('name');
    }

    get type() {
        return this.localName;
    }

    get validity() {
        return this._internals.validity;
    }

    get validationMessage() {
        return this._internals.validationMessage;
    }

    get willValidate() {
        return this._internals.willValidate;
    }

    get value() {
        return this.getAttribute('value');
    }

    set value(value) {
        if (this.hasAttribute('disabled')) {
            return;
        }
        this.setAttribute('value', value || '');
        this._internals.setFormValue(value);
    }

    /**
     * @private {function}
     */
    _setDefaultValue() {
        const defaultValue = () => {
            const options = this.options();
            if (!options.length) {
                return '';
            }
            const selected = options.find((node) => node.hasAttribute('selected'));
            if (selected) {
                return selected.getAttribute('value');
            }
            return options[0].getAttribute('value');
        };
        this.value = defaultValue();
    }

    /**
     * @private {function}
     * @param {Event} event
     */
    _onClickOption(event) {
        const target = event.target.closest(OPTION_TAG);
        if (!target) {
            return;
        }
        this.value = target.getAttribute('value');
        this.dispatchEvent(
            new Event('change', {
                bubbles: true
            })
        );
    }

    /**
     * @public {function}
     * @return {Array<Node>}
     */
    options() {
        return Array.from(this.querySelectorAll(OPTION_TAG));
    }

    /**
     * @public {function}
     * @return {Boolean}
     */
    checkValidity() {
        return this._internals.checkValidity();
    }

    /**
     * @public {function}
     * @return {Boolean}
     */
    reportValidity() {
        return this._internals.reportValidity();
    }
}
window.customElements.define('slm-listbox', SlmListboxElement);
