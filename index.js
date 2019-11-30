class Validation {
    constructor() {
        this.errors = {};
        this.fails = true;

        if (Validation.types_classes === false)
            Validation.types_classes = require('./types.js').default;
    }

    static getTypeClass(name = false) {
        let type = Validation.types_classes.find(item => item.name == name);

        if (!type)
            throw new Error("Validation Error: '" + name + "' rule not defined.");
        else {
            if (!Validation.loaded_types[name])
                Validation.loaded_types[name] = require('./types/' + (type.hasOwnProperty('route') ? type.route : type.name));

            return Validation.loaded_types[name];
        }
    }

    static validate(values, rules, single = false) {
        let object = new Validation();
        if (single)
            object.singleValidate(values, rules);
        else
            object.groupValidate(values, rules);

        return object;
    }

    singleValidate(value, rules) {
        if (!Array.isArray(rules))
            rules = Validation.fetchRulesOfString(rules);

        this.errors.errors = [];

        let rules_array = rules, result;
        for (let i = 0; i < rules_array.length; i++) {
            let rule, rule_object, variables;
            [rule, variables] = Validation.fetchVariablesOfRuleString(rules_array[i]);

            rule_object = new (Validation.getTypeClass(rule)['default'])();
            result = rule_object.check(value, ...variables);

            if (result.hasOwnProperty('errors') && result.errors)
                this.errors.errors.push(...result.errors);

            if (result.fails)
                this.fails = result.fails;
        }
        return this;
    }

    groupValidate(values, rules) {
        let result;
        for (let i in values) {
            let value = values[i];
            let rule = rules[i];
            result = Validation.validate(value, rule, true);
            this.errors[i] = result.errors.errors;
            if (result.fails)
                this.fails = true;
        }
        return this;
    }

    groupValidateForVInput(vms, values, rules) {
        let result;
        for (let i in values) {
            let value = values[i];
            let rule = rules[i];
            result = Validation.validate(value, rule, true);
            let vm = vms[i];
            vm.$set(vm, 'localErrors', result.errors.errors);
            this.errors[i] = result.errors.errors;
            if (result.fails)
                this.fails = true;
        }
        return this;
    }

    static fetchRulesOfString(string) {
        return string.split('|');
    }

    static fetchVariablesOfRuleString(string) {
        let rule, variable = [], list;
        list = string.split(':');
        if (list.length > 1) {
            rule = list.splice(0, 1);
            variable = Validation.fetchVariables(list[0]);
        } else
            rule = string;

        return [rule, variable];
    }

    static fetchVariables(string) {
        let temp = string;
        if (!/^\[.*\]/.test(string)) {
            temp = string.split(',');
            if (temp.length > 1)
                temp.map(item => {
                    return Validation.fetchVariables(item);
                });
            else
                temp = [string];
        } else {
            temp = JSON.parse(string);
            temp = temp.map(item => {
                return '' + item;
            });
            temp = [temp];
        }

        return temp;
    }

    static save(name, data, rules) {
        Validation.saved_properties['values'][name] = data;
        Validation.saved_properties['rules'][name] = rules;
    }

    static saveForVInput(vm, name, data, rules) {
        Validation.saved_properties['values'][name] = data;
        Validation.saved_properties['rules'][name] = rules;
        Validation.saved_properties['vms'][name] = vm;
    }

    static runSavedValidates() {
        return Validation.validate(Validation.saved_properties['values'], Validation.saved_properties['rules']);
    }

    static runSavedForVInputValidate() {
        let object = new Validation();
        return object.groupValidateForVInput(Validation.saved_properties['vms'], Validation.saved_properties['values'], Validation.saved_properties['rules']);
    }
}

Validation.types_classes = false;
Validation.loaded_types = {};
Validation.saved_properties = {
    values: {},
    rules : {},
    vms   : {},
};

export default Validation;