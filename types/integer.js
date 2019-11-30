const integer = class Integer {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value) {
        if (!Number(value)) {
            this.errors.push((this.label || '') + " باید از نوع داده عددی باشد.");
            this.fails = true;
        }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default integer;