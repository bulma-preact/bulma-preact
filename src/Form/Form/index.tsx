import { h, Component, render, VNode } from 'preact';

const REQUIED_ERROR = 'required error';
const PATTERN_ERROR = 'pattern error';

export interface State {
    value: string | number;
    errors: string[];
}
export interface States {
    [name: string]: State
}
export interface FieldProps {
    check: (key: string, state: State) => void;
}
interface Rule {
    required?: boolean;
    pattern?: RegExp;
    message: string;
}
export interface FieldConfig {
    label: string | VNode;
    initialValue?: string | number;
    rules?: Rule[];
    inline?: boolean;
}

export interface Iform {
    fieldDecorator: (key: string, config: FieldConfig) => (com: VNode) => VNode;
    getStates: () => States;
    validates: (callback: () => void) => void;
    setValues: (values: { [name: string]: string }) => void;
    setErrors: (errors: { [name: string]: string[] }) => void;
    setValue: (key: string, value: string) => void;
    setError: (key: string, errors: string[]) => void;
    resetFields: () => void;
    getFieldValue: (key: string) => string;
}

export const createForm = (Com) => {

    return class extends Component<any, {}> {
        constructor(props) {
            super(props);
        }

        getStates = () => {
            const { fieldComponents } = this;
            let state = {};
            for (let key in fieldComponents) {
                const com = fieldComponents[key];
                state[key] = com.getState();
            }
            return state;
        }

        fieldComponents = {};
        fieldConfigs = {};

        setFieldComponent = (key, com): void => {
            this.fieldComponents[key] = com;
        }

        resetFields = ():void => {
            const { fieldComponents } = this;
            for (let key in fieldComponents) {
                fieldComponents[key].setValue(null);
                fieldComponents[key].setError([]);
            }
        }

        setFieldConfig = (key, config): void => {
            this.fieldConfigs[key] = config;
        }

        setValue = (key, value) => {
            const { fieldComponents } = this;
            fieldComponents[key].setValue(value)
        }

        setError = (key, errors) => {
            const { fieldComponents } = this;
            fieldComponents[key].setError(errors)
        }

        getFieldValue = (key) => {
            const com = this.fieldComponents[key]
            const state = com.getState();
            return state.value;
        }

        setValues = (values) => {
            const { fieldComponents } = this;
            for (let key in values) {
                const value = values[key] || null;
                const fieldComponent = fieldComponents[key];
                fieldComponent.setValue(value)
            }
        }

        setErrors = (errs) => {
            const { fieldComponents } = this;
            for (let key in errs) {
                const errors = errs[key] || [];
                const fieldComponent = fieldComponents[key];
                fieldComponent.setError(errors)
            }
        }

        validates = (callback = (errors, values) => {}) => {
            let errors = {};
            let values = {};
            let hasError = false;
            for (let key in this.fieldConfigs) {
                const fieldConfig = this.fieldConfigs[key];
                const fieldRules = fieldConfig.rules || [];
                const states = this.getStates()
                const fieldState = states[key];
                errors[key] = fieldState.errors;
                if (fieldRules.find(r => r.pattern)) {
                    const patternItem = fieldRules.filter(r => r.pattern)[0];
                    if (!patternItem.pattern.test(fieldState.value) && fieldState.value) {
                        errors[key].push(patternItem.message);
                    }
                    else {
                        errors[key].filter(item => item != patternItem.message);
                    }
                }
                if (fieldRules.find(r => r.required)) {
                    const requiredItem = fieldRules.filter(r => r.required)[0];
                    if (!fieldState.value && fieldState.value !== 0) {
                        errors[key].push(requiredItem.message);
                    }
                    else {
                        errors[key].filter(item => item != requiredItem.message);
                    }
                }
                if (errors[key].length > 0) hasError = true;
                values[key] = !fieldState.value && fieldState.value !== 0 ? null : `${fieldState.value}`;
            }
            this.setErrors(errors);
            this.setValues(values);
            callback(!hasError ? hasError : errors, values);
        }

        validatorCallBack = (key) => (message) => {
            if (message) this.setError(key, [message]);
            else this.setError(key, [])
        }

        fieldDecorator = (
            key: string,
            config: FieldConfig = {
                label: '',
                initialValue: null,
                rules: [],
                inline: false,
            }
        ) => {
            const _this = this;
            const { initialValue, label } = config;
            return (element: VNode) => {
                class Field extends Component<{}, State> {
                    constructor(props) {
                        super(props);
                        this.state = {
                            value: initialValue,
                            errors: [],
                        }
                        Field.setError = this.setError.bind(this);
                        Field.setValue = this.setValue.bind(this);
                        Field.getState = this.getState.bind(this);
                        _this.setFieldConfig(key, config);
                        _this.setFieldComponent(key, this);
                    }

                    static setError;
                    static setValue;
                    static getState;

                    setValue = (value) => {
                        this.setState({ value })
                    }

                    setError = (errors) => {
                        this.setState({ errors })
                    }

                    getState = () => {
                        return this.state;
                    }

                    validatorCallBack = (key) => (message) => {
                        if (message) this.setError([message]);
                        else this.setError([])
                    }
    
                    handleChange = (key, config) => (value) => {
                        const { rules = [] } = config;
                        let errors = [];
                        if (rules.find(r => r.pattern)) {
                            const patternItem = rules.filter(r => r.pattern)[0];
                            if (!patternItem.pattern.test(value) && value) {
                                errors.push(patternItem.message);
                            }
                            else {
                                errors.filter(item => item != patternItem.message);
                            }
                        }
                        if (rules.find(r => r.required)) {
                            const requiredItem = rules.filter(r => r.required)[0];
                            if (!value && value !== 0) {
                                errors.push(requiredItem.message);
                            }
                            else {
                                errors.filter(item => item != requiredItem.message);
                            }
                        }
                        this.setState({ value, errors });
                        if (rules.find(r => r.validator)) {
                            const validatorItems = rules.filter(r => r.validator);
                            validatorItems.map(item => {
                                item.validator(value, this.validatorCallBack(key))
                            })
                        }
                    }
    
                    render() {
                        const nodeName: any = element.nodeName;
                        const children = element.children;
                        const errMsg = this.state.errors[0];
                        const props = {
                            ...element.attributes,
                            onInput: (e) => {
                                if (e.target) this.handleChange(key, config)(e.target.value)
                                else this.handleChange(key, config)(e)
                            },
                            onChange: (e) => {
                                if (e.target) this.handleChange(key, config)(e.target.value)
                                else this.handleChange(key, config)(e)
                            },
                            value: this.state.value,
                            className: `${element.attributes && element.attributes.class} ${errMsg && 'is-danger'}`
                        }
                        return (
                            <div class="field" style={{ position: 'relative' }}>
                                <label class="label">{label}</label>
                                <div class="control">
                                    {
                                        h(
                                            nodeName,
                                            props,
                                            children
                                        )
                                    }
                                </div>
                                <p class="help is-danger">{errMsg}&nbsp;</p>
                            </div>
                        )
                    }
                }
                return (
                    <Field />
                )
            }
        }

        form: Iform = {
            fieldDecorator: this.fieldDecorator,
            getStates: this.getStates,
            validates: this.validates,
            setValues: this.setValues,
            setErrors: this.setErrors,
            setValue: this.setValue,
            setError: this.setError,
            getFieldValue: this.getFieldValue,
            resetFields: this.resetFields,
        }

        render() {
            return (
                <Com
                    {...this.props}
                    form={this.form}
                />
            )
        }
    }
}
