class Validation {
    /**
     * Validation construct
     */
    constructor() {
        this.errors = {};
        this.fails = false;

        if (Validation.types_classes === false)
            Validation.types_classes = require('./types.js').default;
    }

    /**
     * get and require file for type (rule) name
     *
     * @param name
     * @returns {*}
     */
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

    /**
     * make a object of Validation class then check validate type is single mode or no
     *
     * @param values
     * @param rules
     * @param labels
     * @param single
     * @returns {Validation}
     */
    static validate(values, rules, labels = false, single = false,) {
        let object = new Validation();

        if (single)
            object.singleValidate(values, rules, labels);
        else
            object.groupValidate(values, rules, labels);

        return object;
    }

    /**
     * action single mode validation
     *
     * @param value
     * @param rules
     * @param label
     * @returns {Validation}
     */
    singleValidate(value, rules, label = false) {
        if (!Array.isArray(rules))
            rules = Validation.fetchRulesOfString(rules);

        this.errors.errors = [];

        let rules_array = rules, result;
        for (let i = 0; i < rules_array.length; i++) {
            let rule, rule_object, variables;
            [rule, variables] = Validation.fetchVariablesOfRuleString(rules_array[i]);

            rule_object = new (Validation.getTypeClass(rule)['default'])();
            if (label !== false && rule_object.hasOwnProperty('setLabel') && typeof rule_object.setLabel === 'function')
                rule_object.setLabel(label);
            result = rule_object.check(value, ...variables);

            if (result.hasOwnProperty('errors') && result.errors)
                this.errors.errors.push(...result.errors);

            if (result.fails)
                this.fails = result.fails;
        }
        return this;
    }

    /**
     * action group mode validation
     *
     * @param values
     * @param rules
     * @param labels
     * @returns {Validation}
     */
    groupValidate(values, rules, labels = false) {
        let result;
        for (let i in values) {
            let value = values[i];
            let rule = rules[i];
            let label = labels ? labels[i] : false;
            result = Validation.validate(value, rule, label, true);
            this.errors[i] = result.errors.errors;
            if (result.fails)
                this.fails = true;
        }
        return this;
    }

    /**
     * action group mode validation for saved references
     *
     * @param vms
     * @param values
     * @param rules
     * @param labels
     * @returns {Validation}
     */
    groupValidateReferences(vms, values, rules, labels = {}) {
        let result;
        for (let i in values) {
            let value = values[i];
            let rule = rules[i];
            result = Validation.validate(value, labels[i], rule, true);
            let vm = vms[i];
            vm.$set(vm, 'localErrors', result.errors.errors);
            this.errors[i] = result.errors.errors;
            if (result.fails)
                this.fails = true;
        }
        return this;
    }

    /**
     * split rules of '|'
     *
     * @param string
     * @returns {*|{type, default}}
     */
    static fetchRulesOfString(string) {
        return string.split('|');
    }

    /**
     * split variables of rule from string
     *
     * @param string
     * @returns {[null,null]}
     */
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

    /**
     * split variables of string
     * @param string
     * @returns {*}
     */
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

    /**
     * save data and rule for run after
     *
     * @param name
     * @param data
     * @param rules
     * @param label
     */
    static save(name, data, rules, label) {
        Validation.saved_properties['values'][name] = data;
        Validation.saved_properties['rules'][name] = rules;
        Validation.saved_properties['labels'][name] = label;
    }

    /**
     * save data and rule for run after in references mode
     *
     * @param vm
     * @param name
     * @param data
     * @param rules
     * @param label
     */
    static saveReference(vm, name, data, rules, label) {
        Validation.saved_properties['values'][name] = data;
        Validation.saved_properties['rules'][name] = rules;
        Validation.saved_properties['labels'][name] = label;
        Validation.saved_properties['vms'][name] = vm;
    }

    /**
     * check validation for saved values and rules in normal mode
     *
     * @returns {Validation}
     */
    static runSavedValidates() {
        return Validation.validate(Validation.saved_properties['values'], Validation.saved_properties['rules']);
    }

    /**
     * check validation for saved values and rules in references mode
     *
     * @returns {Validation}
     */
    static runSavedReferences() {
        let object = new Validation();
        return object.groupValidateReferences(Validation.saved_properties['vms'], Validation.saved_properties['values'], Validation.saved_properties['rules'], Validation.saved_properties['labels']);
    }
}

Validation.types_classes = false;
Validation.loaded_types = {};
Validation.saved_properties = {
    values: {},
    rules : {},
    labels: {},
    vms   : {},
};

export default Validation;