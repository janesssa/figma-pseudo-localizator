var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 320, height: 240 });
const originalNodes = {};
const newNodes = {};
let totalNodes = 0;
const getTextNodes = (selection, percentage) => {
    let id = 0;
    function childrenIterator(node) {
        if (node.children) {
            node.children.forEach(child => {
                childrenIterator(child);
            });
        }
        else {
            if (node.type === 'TEXT' && node.characters !== undefined && node.characters.length < 100) {
                originalNodes[id] = Object.assign(Object.assign({}, node), { characters: node.characters, fontName: node.fontName });
                id++;
            }
        }
    }
    selection.forEach(item => childrenIterator(item));
    totalNodes = Object.keys(originalNodes).length - 1;
    startProgress();
    changeText(Object.assign({}, originalNodes), percentage);
};
const changeText = (node, percentage) => {
    const extraText = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vulputate, nisl vitae volutpat pulvinar, ipsum est auctor risus, ut semper purus nunc et magna. Nulla facilisi. Vestibulum quis condimentum magna.';
    let id = -1;
    Object.keys(node).forEach((key) => __awaiter(this, void 0, void 0, function* () {
        let characters = node[key].characters;
        let fontName = node[key].fontName;
        let uid = node[key].id;
        const length = Math.ceil(characters.length * percentage) - characters.length;
        const addText = characters + extraText.slice(0, length);
        const newText = pseudoText(addText);
        if (fontName != figma.mixed) {
            yield figma.loadFontAsync(fontName).then(() => {
                id++;
                return newNodes[id] = {
                    id: uid,
                    characters: newText
                };
            });
        }
    }));
    setTimeout(() => replaceText(newNodes, figma.currentPage.children), 1000); // Todo --- This is a bad fix
};
const pseudoText = (text) => {
    let after = '';
    for (let i = 0; i < text.length; i++) {
        let c = text.charAt(i);
        let out = '';
        switch (c) {
            case 'a':
                out = 'á';
                break;
            case 'b':
                out = 'β';
                break;
            case 'c':
                out = 'ç';
                break;
            case 'd':
                out = 'δ';
                break;
            case 'e':
                out = 'è';
                break;
            case 'f':
                out = 'ƒ';
                break;
            case 'g':
                out = 'ϱ';
                break;
            case 'h':
                out = 'λ';
                break;
            case 'i':
                out = 'ï';
                break;
            case 'j':
                out = 'J';
                break;
            case 'k':
                out = 'ƙ';
                break;
            case 'l':
                out = 'ℓ';
                break;
            case 'm':
                out = '₥';
                break;
            case 'n':
                out = 'ñ';
                break;
            case 'o':
                out = 'ô';
                break;
            case 'p':
                out = 'ƥ';
                break;
            case 'q':
                out = '9';
                break;
            case 'r':
                out = 'ř';
                break;
            case 's':
                out = 'ƨ';
                break;
            case 't':
                out = 'ƭ';
                break;
            case 'u':
                out = 'ú';
                break;
            case 'v':
                out = 'Ʋ';
                break;
            case 'w':
                out = 'ω';
                break;
            case 'x':
                out = 'ж';
                break;
            case 'y':
                out = '¥';
                break;
            case 'z':
                out = 'ƺ';
                break;
            case 'A':
                out = 'Â';
                break;
            case 'B':
                out = 'ß';
                break;
            case 'C':
                out = 'Ç';
                break;
            case 'D':
                out = 'Ð';
                break;
            case 'E':
                out = 'É';
                break;
            case 'F':
                out = 'F';
                break;
            case 'G':
                out = 'G';
                break;
            case 'H':
                out = 'H';
                break;
            case 'I':
                out = 'Ì';
                break;
            case 'J':
                out = 'J';
                break;
            case 'K':
                out = 'K';
                break;
            case 'L':
                out = '£';
                break;
            case 'M':
                out = 'M';
                break;
            case 'N':
                out = 'N';
                break;
            case 'O':
                out = 'Ó';
                break;
            case 'P':
                out = 'Þ';
                break;
            case 'Q':
                out = 'Q';
                break;
            case 'R':
                out = 'R';
                break;
            case 'S':
                out = '§';
                break;
            case 'T':
                out = 'T';
                break;
            case 'U':
                out = 'Û';
                break;
            case 'V':
                out = 'V';
                break;
            case 'W':
                out = 'W';
                break;
            case 'X':
                out = 'X';
                break;
            case 'Y':
                out = 'Ý';
                break;
            case 'Z':
                out = 'Z';
                break;
            default:
                out = c;
                break;
        }
        after += out;
    }
    return after;
};
const replaceText = (obj, selection) => __awaiter(this, void 0, void 0, function* () {
    function childrenIterator(node) {
        if (node.children) {
            node.children.forEach(child => {
                childrenIterator(child);
            });
        }
        else {
            if (node.type === 'TEXT' && node.characters !== undefined && node.characters.length < 100) {
                Object.keys(obj).forEach(id => {
                    if (obj[id].id === node.id) {
                        node.characters = obj[id].characters;
                        updateProgress(Object.keys(obj)[id]);
                    }
                });
            }
        }
    }
    if (Object.entries(obj).length > 0)
        yield selection.forEach(item => childrenIterator(item));
    setTimeout(() => stopProgress(), 1000);
});
const revertText = (obj, selection) => __awaiter(this, void 0, void 0, function* () {
    function childrenIterator(node) {
        if (node.children) {
            node.children.forEach(child => {
                childrenIterator(child);
            });
        }
        else {
            if (node.type === 'TEXT' && node.characters !== undefined && node.characters.length < 100) {
                Object.keys(obj).forEach(id => {
                    if (obj[id].id === node.id) {
                        node.characters = obj[id].characters;
                    }
                });
            }
        }
    }
    if (Object.entries(obj).length > 0)
        yield selection.forEach(item => childrenIterator(item));
    setTimeout(() => stopProgress(), 1000);
});
const startProgress = () => {
    let message = { type: 'start', options: { total: totalNodes } };
    figma.ui.postMessage(message);
};
const updateProgress = (currentNode) => {
    let progress = (currentNode / totalNodes) * 100;
    let html = currentNode + '/' + totalNodes;
    if (totalNodes === currentNode)
        setTimeout(() => stopProgress(), 500);
    debugger;
    let message = { type: 'update', options: { current: progress, html: html } };
    figma.ui.postMessage(message);
};
const stopProgress = () => {
    let message = { type: 'stop' };
    figma.ui.postMessage(message);
};
figma.ui.onmessage = msg => {
    switch (msg.type) {
        case 'start': {
            let percentage = msg.options.input / 100;
            getTextNodes(figma.currentPage.children, percentage);
            break;
        }
        case 'revert': {
            let alertOnce = false;
            let message = 'Caution! There is nothing to revert.';
            debugger;
            if (Object.keys(originalNodes).length === 0 || Object.keys(newNodes).length === 0) {
                alert(message);
            }
            else {
                Object.keys(originalNodes).forEach(key => {
                    console.log('inside first loop', key);
                    startProgress();
                    if (originalNodes[key].characters === newNodes[key].characters) {
                        if (!alertOnce) {
                            alert('Caution! There is nothing to revert.');
                            alertOnce = true;
                        }
                    }
                    else {
                        console.log('inside second if');
                        updateProgress(key);
                        revertText(originalNodes, figma.currentPage.children);
                    }
                });
            }
            break;
        }
        case 'cancel': {
            let alertOnce = false;
            Object.keys(originalNodes).forEach(key => {
                if (originalNodes[key].characters === newNodes[key].characters) {
                    if (!alertOnce) {
                        alert('Caution! Your text is not reverted yet.');
                        stopProgress();
                        alertOnce = true;
                    }
                }
                else {
                    figma.closePlugin();
                }
            });
        }
    }
};
