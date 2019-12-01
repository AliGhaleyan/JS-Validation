const required = class Required {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value) {
        if (value === null || typeof value === 'undefined' || value === "") {
            this.errors.push(" فیلد " + (this.label || '') + " الزامی است.");
            this.fails = true;
        }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default required;