const start_with = class StartWith {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value,equal) {
        let started = value.substr(0,1);

        if (started !== equal) {
            this.errors.push('باید با ' + equal + ' شروع شود.');
            this.fails = true;
        }

        return this;
    }
};

export default start_with;