import { readPage, constructPage } from "./templatingEngine.js";
import { marked } from "marked";

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

const tutorialMD = readPage("./public/pages/tutorial.md");
const tutorialHTML = marked(tutorialMD);


export const tutorialPage = constructPage(tutorialHTML, {
    tabTitle: "DogInder Tutorial",
    cssLinks: `
        <link rel="stylesheet" href="/pages/tutorial/tutorial.css">
        <link href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.css" rel="stylesheet"/>
        <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js"></script>
    `
});
