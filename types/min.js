const min = class Min {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value, min) {
        if (typeof value === "string") {
            if (value.length < min) {
                this.errors.push("باید حداقل " + min + " کاراکتر باشد.");
                this.fails = true;
            }
        }

        return this;
    }
};

export default min;