/* eslint-disable no-useless-escape */
const english = class English {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value) {
        if (! /^[a-zA-Z0-9?><;,{}[\]\-_+=!@#$%\^&*|']*$/.test(value)) {
            this.errors.push((this.label || '') + ' باید حروف لاتین باشد.');
            this.fails = true;
        }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default english;