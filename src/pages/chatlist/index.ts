import Block from "../../core/Block";
import template from "./index.hbs";
import setPage from "../../core/setPage";
import ButtonBlue from "../../components/button";
import Dialog from "../../components/dialogs";
import Messagechat from "../../components/message";
import Input from "../../components/field";

const messageData: { messageText: string, messageFromMe: boolean, messageTime: string }[] = [
    {
        messageText: "Привет",
        messageFromMe: false,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: false,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: true,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: false,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: true,
        messageTime: "10:23"
    },    {
        messageText: "Привет",
        messageFromMe: false,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: true,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: false,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: true,
        messageTime: "10:23"
    },    {
        messageText: "Привет",
        messageFromMe: false,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: true,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: false,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: true,
        messageTime: "10:23"
    },    {
        messageText: "Привет",
        messageFromMe: false,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: true,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: false,
        messageTime: "10:23"
    },
    {
        messageText: "Привет",
        messageFromMe: true,
        messageTime: "10:23"
    },
];
export default class chatPage extends Block {
    init() {
        this.children.chatMessages = messageData.reduce((acc, messageData) => {
            const dialog = new Messagechat(messageData);
            acc.push(dialog);
            return acc;
        }, []);

        this.children.chatInput = new Input({
            name: "message",
            type: "text",
            placeholder: "Начните вводить сообщение...",
        });

        this.children.dialogs = [
            new Dialog({
                dialogName: "Маарс",
                dialogLastmessage: "пидор",
                dialogOnline: false,
                dialogTime: "02:57"
            }),
            new Dialog({
                dialogName: "Маарс",
                dialogLastmessage: "пидор",
                dialogOnline: true,
                dialogTime: "02:57"
            }),
            new Dialog({
                dialogName: "Маарс",
                dialogLastmessage: "пидор",
                dialogOnline: true,
                dialogTime: "02:57"
            }),
            ];
        this.children.buttonHome = new ButtonBlue({
            buttonHref: "",
            buttonText: "Вернуться к чатам",
            events: {
                click: setPage('main')
            }
        })
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
