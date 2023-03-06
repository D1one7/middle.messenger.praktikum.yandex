import Block from "../../core/Block";
import blue from "./index.hbs";

interface ButtonProps {
    buttonLink?: string;
    buttonText: string;
    events?: Record<string, () => void>;
}

export default class BlueButton extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
    }
    protected render(): DocumentFragment {
        return this.compile(blue, this.props);
    }
}
