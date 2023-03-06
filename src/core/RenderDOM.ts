import mainPage from "../pages/main";
import internalPage from "../pages/500";
import notFoundPage from "../pages/404";
import chatPage from "../pages/chatlist";
import profilePage from "../pages/profile";
import signinPage from "../pages/signin";
import signupPage from "../pages/signup";

export const ROUTES = {
    main: mainPage,
    internalError: internalPage,
    notFound: notFoundPage,
    chat: chatPage,
    profile: profilePage,
    signin: signinPage,
    signup: signupPage

};

export default function renderDOM(route: keyof typeof ROUTES) {
    const root = document.querySelector('#app') as HTMLElement;
    root.innerHTML = '';
    const PageComponent = ROUTES[route];
    const page = new PageComponent({});
    if (page.element) {
        root.appendChild(page.element);
    }
    page.dispatchComponentDidMount();
}

