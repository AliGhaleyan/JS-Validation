const persian = class Persian {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value, withNumbers = false) {
        let reg = '';

        if (value) {
            if (withNumbers != false) {
               reg = /^[\u0600-\u06FF0-9\s]+$/;
            } else {
                reg = /^[\u0600-\u06FF\s]+$/;
            }

            if (!reg.test(value)) {
                this.errors.push((this.label || '') + ' باید حروف فارسی باشد');
                this.fails = true;
            }
        }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default persian;