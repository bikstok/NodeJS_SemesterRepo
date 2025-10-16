import fs from 'fs'



const header = fs.readFileSync("./public/components/header/header.html").toString();
const footer = fs.readFileSync("./public/components/footer/footer.html").toString();

//blokere når vi starter appen op - derfor vil vi gerne have den uden for selve endpointet
const frontpage = readPage("./public/pages/frontend/index.html")
export const frontpagePage = header + frontpage + footer


const matches = readPage("./public/pages/matches/matches.html");
export const matchesPage = header + matchesPage + footer;


function readPage(path) {
    return fs.readFileSync(path).toString();
}