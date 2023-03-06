import Block from "../../core/Block";
import template from "./index.hbs";

interface DialogProps {
    dialogName?: string;
    dialogLastmessage: string;
    dialogTime: string;
    dialogOnline: boolean;
    events?: Record<string, () => void>;
}

export default class Dialog extends Block<DialogProps> {
    constructor(props: DialogProps) {
        super(props);
    }
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
