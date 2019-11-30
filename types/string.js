const string = class String {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value) {
        if (typeof value !== "string") {
            this.errors.push("باید از نوع داده رشته باشد.");
            this.fails = true;
        }

        return this;
    }
};

export default string;