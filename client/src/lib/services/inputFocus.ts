

export const inputFocus = (e: any) => {
    const target = e.target;

    if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement
    ) {
        setTimeout(() => {
            target.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 300);
    }
}