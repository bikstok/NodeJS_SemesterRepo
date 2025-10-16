import { readPage, constructPage } from "./templatingEngine.js";
import { marked } from "marked";


// Frontpage
const frontpage = readPage("./public/pages/frontend/index.html");
export const frontpagePage = constructPage(frontpage, {
    tabTitle: "NodeJS | Welcome"
});


// Git page (Markdown)
const gitMD = readPage("./public/pages/git.md");
const gitHTML = marked(gitMD);
export const gitPage = constructPage(gitHTML, {
    tabTitle: "NodeJS | Git"
});

// Tutorial page (Markdown)
const expressMD = readPage("./public/pages/express.md");
const expressHTML = marked(expressMD);
export const expressPage = constructPage(expressHTML, {
    tabTitle: "Nodemon | Express Tutorial"
});
