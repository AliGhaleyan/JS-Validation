const min = class Min {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value, min) {
        if (typeof value === "string") {
            if (value.length < min) {
                this.errors.push((this.label || '') + " باید حداقل " + min + " کاراکتر باشد.");
                this.fails = true;
            }
        }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default min;