const max = class Max {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value, max) {
        if (typeof value === "string") {
            if (value.length > max) {
                this.errors.push("باید حداکثر " + max + " کاراکتر باشد.");
                this.fails = true;
            }
        }

        return this;
    }
};

export default max;