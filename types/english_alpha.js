/* eslint-disable no-useless-escape */
const english = class English {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value) {
        if (! /^[a-zA-Z0-9?><;,{}[\]\-_+=!@#$%\^&*|']*$/.test(value)) {
            this.errors.push('باید حروف لاتین باشد.');
            this.fails = true;
        }

        return this;
    }
};

export default english;