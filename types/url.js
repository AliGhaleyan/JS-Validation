const url = class Url {
    constructor() {
        this.errors = [];
        this.fails = false;
    }

    check(value) {
        if (value)
            if (!value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) {
                this.errors.push('آدرس اینترنتی معتبر نیست.');
                this.fails = true;
            }

        return this;
    }
};

export default url;