import renderDOM, { ROUTES } from "./RenderDOM";

export default function setPage(page: keyof typeof ROUTES) {
    return (event: Event) => {
        event.preventDefault();
        renderDOM(page);
    };
}
