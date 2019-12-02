const sample = class Sample {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value, confirm) {
        if (value != confirm) {
            this.errors.push((this.label || '') + ' مطابقت ندارد');
            this.fails = true;
        }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default sample;