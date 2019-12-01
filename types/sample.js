const sample = class Sample {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value) {
        //  check value
        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default sample;