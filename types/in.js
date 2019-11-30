const in_values = class InValues {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value, ...array) {
        if (!array.includes(value)) {
            let str = '';
            array.map(item => {
                str += ',' +  item;
            });
            this.errors.push((this.label || '') + ' باید یکی از مقادیر '+ str + ' باشد');
            this.fails = true;
        }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default in_values;