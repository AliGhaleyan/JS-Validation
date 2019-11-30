const email = class Email {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value) {
        if (!/\S+@\S+\.\S+/.test(value)) {
            this.errors.push("فرمت ایمیل نادرست است.");
            this.fails = true;
        }

        return this;
    }
};

export default email;