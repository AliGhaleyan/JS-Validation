const start_with = class StartWith {
    constructor() {
        this.errors = [];
        this.fails = false;
        this.label = false;
    }

    check(value,equal) {
        if (value && typeof value == "string") {
            let started = value.substr(0,1);

            if (started !== equal) {
                this.errors.push((this.label || '') + ' باید با ' + equal + ' شروع شود.');
                this.fails = true;
            }
        }

        return this;
    }

    setLabel(label) {
        this.label = label;
    }
};

export default start_with;