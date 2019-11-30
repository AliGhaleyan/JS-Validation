const integer = class Integer {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value) {
        if (!Number(value)) {
            this.errors.push("باید از نوع داده عددی باشد.");
            this.fails = true;
        }

        return this;
    }
};

export default integer;