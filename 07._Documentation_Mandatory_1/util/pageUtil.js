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

// Javescript Fundamentals (Markdown)
const javascriptFundamentalsMD = readPage("./public/pages/javascript_fundamentals.md");
const javascriptFundamentalsHTML = marked(javascriptFundamentalsMD);
export const javascriptFundamentalsPage = constructPage(javascriptFundamentalsHTML, {
    tabTitle: "NodeJS | Javascript Fundamentals"
});

// RestAPI (Markdown)
const restAPIMD = readPage("./public/pages/restapi.md");
const restAPIHTML = marked(restAPIMD);
export const restAPIPage = constructPage(restAPIHTML, {
    tabTitle: "NodeJS | Javascript Fundamentals"
});


// Installing NodeJS and Express (Markdown)
const expressMD = readPage("./public/pages/express.md");
const expressHTML = marked(expressMD);
export const expressPage = constructPage(expressHTML, {
    tabTitle: "NodeJS | Express & NodeJS Tutorial"
});
