figma.showUI(__html__, { width: 320, height: 220});

const cachedNodes = {}
const originalNodes = {}
const newNodes = {}
let reverted = false

const getTextNodes = (selection, percentage) => {
  let id = 0;
  function childrenIterator(node) {
    if (node.children) {
      node.children.forEach(child => {
        childrenIterator(child)
      })
    }
    else {
      if (node.type === 'TEXT' && node.characters !== undefined && node.characters.length < 100) {
        cachedNodes[id] = { node: node }
        originalNodes[id] = { ...node, characters: node.characters, fontName: node.fontName }
        id++
      }
    }
  }
  selection.forEach(item => childrenIterator(item))

  startProgress('start')
  changeText({...originalNodes}, percentage)
}

const changeText = (node, percentage) => {
  const extraText = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vulputate, nisl vitae volutpat pulvinar, ipsum est auctor risus, ut semper purus nunc et magna. Nulla facilisi. Vestibulum quis condimentum magna.'
  let id = -1
  Object.keys(node).forEach(async (key) => {
    let characters = node[key].characters
    let fontName = node[key].fontName
    let uid = node[key].id
    const length = Math.ceil(characters.length * percentage) - characters.length
    const addText = characters + extraText.slice(0, length)
    const newText = pseudoText(addText)
    if (fontName != figma.mixed) {
      await figma.loadFontAsync(fontName).then(() => {
        id++
        return newNodes[id] = {
          id: uid,
          characters: newText
        }
      })
      revertText(key, newNodes)
    }
  })
}

const pseudoText = (text) => {
  let after = ''
  for(let i = 0; i < text.length; i++){
    let c = text.charAt(i)
    let out = ''
    switch (c) {
      case 'a': out = 'á'; break;
      case 'b': out = 'β'; break;
      case 'c': out = 'ç'; break;
      case 'd': out = 'δ'; break;
      case 'e': out = 'è'; break;
      case 'f': out = 'ƒ'; break;
      case 'g': out = 'ϱ'; break;
      case 'h': out = 'λ'; break;
      case 'i': out = 'ï'; break;
      case 'j': out = 'J'; break;
      case 'k': out = 'ƙ'; break;
      case 'l': out = 'ℓ'; break;
      case 'm': out = '₥'; break;
      case 'n': out = 'ñ'; break;
      case 'o': out = 'ô'; break;
      case 'p': out = 'ƥ'; break;
      case 'q': out = '9'; break;
      case 'r': out = 'ř'; break;
      case 's': out = 'ƨ'; break;
      case 't': out = 'ƭ'; break;
      case 'u': out = 'ú'; break;
      case 'v': out = 'Ʋ'; break;
      case 'w': out = 'ω'; break;
      case 'x': out = 'ж'; break;
      case 'y': out = '¥'; break;
      case 'z': out = 'ƺ'; break;
      case 'A': out = 'Â'; break;
      case 'B': out = 'ß'; break;
      case 'C': out = 'Ç'; break;
      case 'D': out = 'Ð'; break;
      case 'E': out = 'É'; break;
      case 'F': out = 'F'; break;
      case 'G': out = 'G'; break;
      case 'H': out = 'H'; break;
      case 'I': out = 'Ì'; break;
      case 'J': out = 'J'; break;
      case 'K': out = 'K'; break;
      case 'L': out = '£'; break;
      case 'M': out = 'M'; break;
      case 'N': out = 'N'; break;
      case 'O': out = 'Ó'; break;
      case 'P': out = 'Þ'; break;
      case 'Q': out = 'Q'; break;
      case 'R': out = 'R'; break;
      case 'S': out = '§'; break;
      case 'T': out = 'T'; break;
      case 'U': out = 'Û'; break;
      case 'V': out = 'V'; break;
      case 'W': out = 'W'; break;
      case 'X': out = 'X'; break;
      case 'Y': out = 'Ý'; break;
      case 'Z': out = 'Z'; break;
      default: out = c; break;
    }
    after += out
  }
  return after
}

const revertText = (key, obj) => {
  cachedNodes[key].node.characters = obj[key].characters
}

const startProgress = (tag) => {
  let message = { type: 'start', options: { tag: tag } }
  figma.ui.postMessage(message)
}

const blinkButton = (tag) => {
  let message = { type: 'blink', options: { tag: tag } }
  figma.ui.postMessage(message)
}

const stopProgress = (tag) => {
  let message = { type: 'stop', options: { tag: tag } }
  figma.ui.postMessage(message)
}

figma.ui.onmessage = msg => {
  switch (msg.type) {
    case 'start': {
      let percentage = msg.options.input / 100
      getTextNodes(figma.currentPage.children, percentage)
      reverted = false
      break
    }
    case 'revert': {
      let alertOnce = false
      let message = 'Caution! There is nothing to revert.'
      reverted = true
      if(Object.keys(originalNodes).length === 0 || Object.keys(newNodes).length === 0){
        alert(message)
      } else {
        startProgress('revert')
        stopProgress('start')
        Object.keys(originalNodes).forEach(key => {
          if(originalNodes[key].characters === newNodes[key].characters){
            if(!alertOnce){
              alert('Caution! There is nothing to revert.')
              alertOnce = true
            } 
          } else {
            revertText(key, originalNodes)
          }
        })
      }
      break
    }
    case 'cancel': {
      let alertOnce = false
      stopProgress('revert')
      stopProgress('start')
      debugger
      Object.keys(originalNodes).forEach(key => {
        if(!reverted){
          if(!alertOnce){
            blinkButton('revert')
            alert('Caution! Your text is not reverted yet.')
            alertOnce = true
          } 
        } else {
          figma.closePlugin()
        }
      })
    }
  }
}
