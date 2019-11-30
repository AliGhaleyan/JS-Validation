const string = class String {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value) {
        if (typeof value !== "string") {
            this.errors.push((this.label || '') + " باید از نوع داده رشته باشد.");
            this.fails = true;
        }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default string;