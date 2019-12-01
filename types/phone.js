const setLabel = class Phone {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value) {
        let phoneno = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!value.match(phoneno)) {
            this.errors.push("شماره تلفن معتبر نیست.");
            this.fails = true;
        }

        return this;
    }
};

export default setLabel;