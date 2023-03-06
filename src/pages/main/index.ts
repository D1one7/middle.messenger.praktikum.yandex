import Block from "../../core/Block";
import template from "./index.hbs";
import Link from "../../components/navigation";
import setPage from "../../core/setPage";

export default class mainPage extends Block {
    init() {
        this.children.navList = [
            new Link({
                linkHref: "",
                linkText: "Ошибка 500",
                events: {
                    click: setPage('internalError')
                }
            }),
            new Link({
                linkHref: "",
                linkText: "Ошибка 404",
                events: {
                    click: setPage('notFound')
                }
            }),
            new Link({
                linkHref: "",
                linkText: "Чаты",
                events: {
                    click: setPage('chat')
                }
            }),
            new Link({
                linkHref: "",
                linkText: "Профиль",
                events: {
                    click: setPage('profile')
                }
            }),
            new Link({
                linkText: "Авторизация",
                events: {
                    click: setPage('signin')
                }
            }),
            new Link({
                linkText: "Регистрация",
                events: {
                    click: setPage('signup')
                }
            })
        ]
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
