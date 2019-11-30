const persian = class Persian {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value) {
        if (! /^[\u0600-\u06FF\s]+$/.test(value)) {
            this.errors.push('باید حروف فارسی باشد');
            this.fails = true;
        }

        return this;
    }
};

export default persian;