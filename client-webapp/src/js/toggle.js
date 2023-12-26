function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");

    if (currentTheme === "light") {
        body.setAttribute("data-theme", "dark");
    } else {
        body.setAttribute("data-theme", "light");
    }
}
