const setLabel = class Phone {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value) {
        let phone_reg = /(0|\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/;
        if (value && !phone_reg.test(value)) {
            this.errors.push("شماره تلفن معتبر نیست.");
            this.fails = true;
        }

        return this;
    }
};

export default setLabel;