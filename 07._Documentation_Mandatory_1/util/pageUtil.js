import { readPage, constructPage } from "./templatingEngine.js";

// Frontpage
const frontpage = readPage("./public/pages/frontend/index.html");
export const frontpagePage = constructPage(frontpage, {
    tabTitle: "NodeJS | Welcome"
});

// Introduction
const introduction = readPage("./public/pages/introduction/introduction.html");
export const introductionPage = constructPage(introduction, {
    tabTitle: "NodeJS | Introduction",
    cssLinks: `<link rel="stylesheet" href="/pages/introduction/introduction.css">`
});

