const max = class Max {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value, max) {
        if (typeof value === "string") {
            if (value.length > max) {
                this.errors.push((this.label || '') + " باید حداکثر " + max + " کاراکتر باشد.");
                this.fails = true;
            }
        }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default max;