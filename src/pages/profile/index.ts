import Block from "../../core/Block";
import BlueButton from "../../components/button";
import renderDOM from "../../core/RenderDOM";

import {
    validateData,
    loginValidation,
    nameValidation,
    emailValidation,
    phoneValidation,
    profileRules
} from "../../core/validations";

import template from "./index.hbs";
import Input from "../../components/field";


export default class profilePage extends Block{

    init() {
        this.children.email = new Input({
            name: "email",
            placeholder: "Почта",
            type: "text",
            events: {
                blur: this.checkInput(emailValidation),
            },
        });

        this.children.login = new Input({
            name: "login",
            placeholder: "Логин",
            type: "text",
            events: {
                blur: this.checkInput(loginValidation),
            },
        });


        this.children.first_name = new Input({
            name: "first_name",
            placeholder: "Имя",
            type: "text",
            events: {
                blur: this.checkInput(nameValidation),
            },
        });

        this.children.second_name = new Input({
            name: "second_name",
            placeholder: "Фамилия",
            type: "text",
            events: {
                blur: this.checkInput(nameValidation),
            },
        });

        this.children.display_name = new Input({
            name: "display_name",
            placeholder: "Имя в чате",
            type: "text",
            events: {
                blur: this.checkInput(nameValidation),
            },
        });
        this.children.phone = new Input({
            name: "phone",
            placeholder: "Телефон",
            type: "text",
            events: {
                blur: this.checkInput(phoneValidation),
            },
        });
        this.children.button = new BlueButton({
            buttonText: "Изменить",
            buttonLink: "",
            events: {
                click: (event: Event) => {
                    event.preventDefault();
                    this.submitHandler();
                },
            }
        });

    }
    checkInput(func: (
        value: string,
        fieldName: string
    ) => { [key: string]: string }) {
        return (event: Event) => {
            const targetInput = event.target as HTMLInputElement;
            const name = targetInput.getAttribute("name") ?? "";
            const error = func(targetInput.value, name);
            this.setProps({ errors: {...this.props.errors, ...error} });
            const input = this.children[name] as Input;
            input.setProps({ error: error[name] });
            input.setValue(targetInput.value);
        };
    }
    submitHandler() {
        const inputsData: {[key: string]: string} = {};
        const children = this.children;
        let errors: {[key: string]: string} = {};
        // получаем значение инпутов
        for (const current of Object.values(children)) {
            if (current instanceof Input) {
                inputsData[current.name] = current.value as string;
            }
        }
        // проверяем данные и получаем ошибки
        errors = validateData(inputsData, profileRules);
        // обновляем ошибки у каждого инпута
        for (const [key, input] of Object.entries(children)) {
            if (input instanceof Input) {
                if (errors[key]) {
                    input.setProps({ error: errors[key] });
                } else {
                    input.setProps({ error: undefined });
                }
                input.setValue(inputsData[key]);
            }
        }
        // Отправляем в чат, если нет ошибок
        if (Object.values(errors).every((error) => !error.length)) {
            console.log(inputsData);
            renderDOM('chat');
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
