const equal = class Equal {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value, equal) {
        //  check value

        if (value && typeof value === "string") {
            if (value.length > equal || value.length < equal) {
                this.errors.push((this.label || '') + " باید " + equal + " کاراکتر باشد.");
                this.fails = true;
            }
        }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default equal;