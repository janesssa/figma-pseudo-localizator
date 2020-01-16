figma.showUI(__html__, { width: 320, height: 180});

const cachedNodes = {}
const originalNodes = {}
const nodes = {}
const newNodes = {}
let original = false 
let alertOnceFont = false
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
      if (node.type === 'TEXT' && node.characters !== undefined) {
        if(!original){
          originalNodes[id] = { ...node, characters: node.characters }
        }
        cachedNodes[id] = { node: node }
        nodes[id] = { ...node, characters: node.characters, fontName: node.fontName}
        id++
      }
    }
  }
  selection.forEach(item => childrenIterator(item))

  changeText(nodes, percentage)
}

const changeText = (node, percentage) => {
  original = true
  const extraText = 'DoNec A VeSTIBuLUM erat. mAuRis sED Orci loREm. DoNEc mAXImUs LAciNiA poSUERE. mAURis diCtuM, PuRus qUiS ALIqUAM vehicULA, ArCu loREm iNTErDUM ElIt, A ConsEctEtUr NullA NISI Et QUaM. FUScE lOBorTIS VOLuTPAT fRinGILLa. PrOIN alIqUEt aT iPSuM sagitTIs CoNdimeNTUm. vIvamUS NEc ANte EU tuRPIS VArIUS ALIquEt. NuLLa EUiSmOd loBOrTiS ARCu, Et PHaRETRA ENIm SEMPEr Eu. PrOin In FrinGilla aRcu, qUis FeuGiAt dUI. suspendiSsE LucTus pOrtA nIsL, NeC VEHiCULa lOreM TeMpUS aT. inTeRduM Et mALesuadA fAmeS ac AnTE IPsum PRIMIS iN FAUCibUs. prAeseNT odIO DOlor, cuRsus EU fauCibuS vEL, VulPutaTE In DoLor. inTeger maxIMUs loreM VOLUTPAt GrAVIDa ullAmCOrPeR. PhaSELlUs EU fELis ARCu. nULLaM VolUtPAt NUnc TiNCiDuNT VehicuLa varIus. aeNeaN ImPErDiet qUAM Eget DuI ORnarE PELleNTesQUe. qUIsque Semper leo AT phaReTrA IaCUlis. sUSPEnDIsSe RutruM, LectUs ac PHAreTRA FRInGiLLA, NUlLA leo FInIBus UrNA, Ut frINgiLla NibH DuI ULTRIceS mEtuS. pellENtEsQue vitAE VArIUs neQUE. ViVaMus fRInGILla Ex SEd est gRaviDA consEquAt. dUis matTIS UT Mi seD DiGNiSSIm. PellenTESqUE viTae NISi SiT amET ODIo sEmPeR voLUtPaT. dUis scElERiSque, FElIs A alIQuEt CondImeNtUM, meTUs enIM sCeLErISQUe ODiO, PULVINAr iMPErDIeT pURus NunC iN leCtUs. CUrAbITUr Sit amET CUrSUS lorEM, IN HEndReRIt ODio. PHaSELluS VOLUtpat posuere QuAm Ut BlAndIT. VEstIBuLum PORTtitOR RISUS LeO, Ac SCelerIsQUe SEm lUCtUs NOn. moRBi QUiS Ante ut DoLor UltRiciEs GrAVIda EGet eGet TellUs. aLIQUam DiCtuM vEhiculA TURPIs, ET BLAndIT toRtoR tINcIDunT Sed. eTIAM TiNcIdUnt moLeSTIE EnIm UT cOnVAllIS. nuLlaM EFFiCituR vestiBuLUM TOrtOr, ac inTErDum auguE TiNciDUnT eGet. Ut cOnDImenTum Nisl ENIm, aT ViveRra NulLa CoNGuE A. PeLlENteSQUe EU EfficItUR auGUe.'
  let id = -1
  Object.keys(node).forEach(async (key) => {
    let characters = originalNodes[key].characters
    let fontName = node[key].fontName
    let uid = node[key].id
    const length = Math.ceil(characters.length * percentage) 
    const random = Math.ceil(Math.random() * (extraText.length - length)) 
    let addText = extraText.slice(random, random + length)
    if(addText.slice(0, 1) === ' ') addText = extraText.slice(random + 1, random + length + 1)
    const newText = pseudoText(addText)
    id++
    newNodes[id] = {
      id: uid,
      characters: newText
    }
    revertText(key, newNodes)
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
  let fontName = cachedNodes[key].node.fontName
  if (fontName != figma.mixed) {
    figma.loadFontAsync(fontName).then(() => {
      cachedNodes[key].node.characters = obj[key].characters
    })
  } else {
    if(!alertOnceFont){
      alert('We cannot replace mixed font texts.')
      alertOnceFont = true
    }
  }
}

figma.ui.onmessage = msg => {
  switch (msg.type) {
    case 'start': {
      let percentage = msg.options.input / 100
      getTextNodes(figma.currentPage.children, percentage)
      debugger
      break
    }
    case 'revert': {
      let alertOnce = false
      let message = 'Caution! There is nothing to revert.'
      if(Object.keys(originalNodes).length === 0 || Object.keys(newNodes).length === 0){
        alert(message)
      } else {
        Object.keys(originalNodes).forEach(key => {
          if(originalNodes[key].characters === newNodes[key].characters){
            if(!alertOnce){
              alert('Caution! There is nothing to revert.')
              alertOnce = true
            } 
          } else {
            revertText(key, originalNodes)
            reverted = true
          }
        })
      }
      break
    }
  }
}

figma.on('close', () => {
  if(!reverted){
    Object.keys(originalNodes).forEach(key => {
      revertText(key, originalNodes)
    })
  }
})
