const boolean = class Boolean {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value) {
        if (value)
            if (typeof value !== 'boolean') {
                value = Number(value);
                if (isNaN(value))
                    this.setError();
                else if (value !== 1 && value !== 0)
                    this.setError();
            }

        return this;
    }

    setError(message) {
        this.errors.push(message || ((this.label || '') + ' باید از نوع داده ای بولین (صحیح،غلط) باشد.'));
        this.fails = true;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default boolean;