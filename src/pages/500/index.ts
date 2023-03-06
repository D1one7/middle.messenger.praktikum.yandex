import Block from "../../core/Block";
import template from "./index.hbs";
import setPage from "../../core/setPage";
import ButtonBlue from "../../components/button";

export default class internalPage extends Block {
    init() {
        this.children.buttonHome = new ButtonBlue({
            buttonHref: "",
            buttonText: "Вернуться к чатам",
            events: {
                click: setPage('main')
            }
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
