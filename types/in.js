const in_values = class InValues {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value, ...array) {
        if (!array.includes(value)) {
            let str = '';
            array.map(item => {
                str += ',' +  item;
            });
            this.errors.push('باید یکی از مقادیر '+ str + ' باشد');
            this.fails = true;
        }

        return this;
    }
};

export default in_values;