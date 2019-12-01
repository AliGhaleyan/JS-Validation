const email = class Email {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value) {
        if (!/\S+@\S+\.\S+/.test(value)) {
            this.errors.push(" فرمت ایمیل نادرست است.");
            this.fails = true;
        }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default email;