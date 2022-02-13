(function () {
    'use strict';

    /**
     * @public {function}
     * @param {Element} element
     * @return {Element}
     */
    const targetElement = (element) => {
        const TARGET_ATTRIBUTE = 'target';
        const target = element.getAttribute(TARGET_ATTRIBUTE);
        if (!target) {
            return null;
        }
        const TARGET_PARENT_ATTRIBUTE = 'target-parent';
        const targetParent = element.hasAttribute(TARGET_PARENT_ATTRIBUTE)
            ? element.closest(element.getAttribute(TARGET_PARENT_ATTRIBUTE))
            : element.parentElement;
        if (!targetParent) {
            return null;
        }
        return targetParent.querySelector(target);
    };

    const OPTION_TAG = 'slm-option';

    class SlmListboxElement extends HTMLElement {
        connectedCallback() {
            this._valueElement = targetElement(this);
            this.addEventListener('click', this._onClickOption);
            if (!this.value) {
                this._setDefaultValue();
            }
        }

        disconnectedCallback() {
            this.removeEventListener('click', this._onClickOption);
        }

        get value() {
            return this._valueElement.getAttribute('value');
        }

        set value(value) {
            if (this.hasAttribute('disabled')) {
                return;
            }
            this._valueElement.setAttribute('value', value || '');
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
    }
    window.customElements.define('slm-listbox', SlmListboxElement);

})();
