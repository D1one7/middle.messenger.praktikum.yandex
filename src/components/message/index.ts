import Block from "../../core/Block";
import template from "./index.hbs";

interface MessageProps {
    messageText: string;
    messageTime: string;
    messageFromMe: boolean
}

export default class Messagechat extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super(props);
    }
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
