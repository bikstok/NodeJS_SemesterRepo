import fs from 'fs';

const header = readPage("./public/components/header/header.html");
const footer = readPage("./public/components/footer/footer.html");

const globalCssAndScripts = `
  <link href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.css" rel="stylesheet"/>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js" defer></script>
`;

export function constructPage(pageContent, options = {}) {
    return header
    .replace('$$TAB_TITLE$$', options.tabTitle || "NodeJS Notes")
    .replace('$$CSS_LINKS$$', options.cssLinks || "") + globalCssAndScripts
     + pageContent 
     + footer;
}



export function readPage(path) {
    return fs.readFileSync(path).toString();
}