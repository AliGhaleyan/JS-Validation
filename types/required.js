const required = class Required {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value) {
        if (value === null || typeof value === 'undefined' || value === "") {
            this.errors.push("فیلد الزامی است.");
            this.fails = true;
        }

        return this;
    }
};

export default required;