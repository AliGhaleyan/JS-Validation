const persian = class Persian {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value) {
        if (value)
            if (!/^[\u0600-\u06FF\s]+$/.test(value)) {
                this.errors.push((this.label || '') + ' باید حروف فارسی باشد');
                this.fails = true;
            }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default persian;