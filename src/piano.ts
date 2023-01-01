import './main.css'
import './piano.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="calculator-app">
<div class="container">
<h2>Digital pianno</h2>
  <div class="pianno-app">
  <button type="button" letter="A" white > </button> 
  <button type="button" letter="W" black > </button> 
  <button type="button" letter="S" white > </button> 
  <button type="button" letter="E" black > </button> 
  <button type="button" letter="D" white > </button> 
  
  <button type="button" letter="F" white > </button> 
  <button type="button" letter="T" black > </button> 
  <button type="button" letter="G" white > </button> 
  <button type="button" letter="Y" black > </button> 
  <button type="button" letter="H" white > </button> 
  <button type="button" letter="U" black > </button> 
  <button type="button" letter="J" white > </button> 
  
  <button type="button" letter="K" white > </button> 
  <button type="button" letter="O" black > </button> 
  <button type="button" letter="L" white > </button> 
  <button type="button" letter="P" black > </button> 
  <button type="button" letter=";" white > </button> 
  
  </div>
  <p>Made with TypeScript</p>
</div>
`

const buttonList = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement> 

const setupPiano: Function = () : void => {

  let lettersArray : string[] = [] ;

  if (buttonList) buttonList.forEach(button => {

    const letter = button.getAttribute("letter")
    if (!letter) return
    lettersArray.push(letter)
    button.innerText = letter
  }) 
}

setupPiano()