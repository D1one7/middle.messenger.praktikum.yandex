import Block from "../../core/Block";
import template from "./index.hbs";

interface LinkProps {
    linkHref?: string;
    linkText: string;
    events?: Record<string, () => void>;
}

export default class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super(props);
    }
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
