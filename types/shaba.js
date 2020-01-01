const shaba = class Shaba {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value) {
        //  check value
        if (value)
            if (!/^\d{24}$/.test(value)) {
                this.errors.push(" شماره شبا نادرست است.");
                this.fails = true;
            }
        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default shaba;