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

const setupPiano: Function = (): void => {

  /**
   * Variables 
   */ 

  let lettersArray: string[] = []
  let canPlaySong: {[key: string]: boolean} = {}
  
  /**
   * Functions 
   */ 

  if (buttonList) buttonList.forEach(button => {

    const letter = button.getAttribute("letter")
    if (!letter) return

    lettersArray.push(letter.toUpperCase())
    button.innerText = letter
  }) 

  const startSong: Function = (key: string) => {
    const newURL: string = `${key}.mp3`
    new Audio(newURL).play()
  }


  const giveActiveClass: Function = (e: KeyboardEvent): void => {

    const key: string = e.key.toUpperCase()
    
    if (lettersArray.some(x => x === key)) {

      const currentButton = document.querySelector(`[letter="${key}"]`) as HTMLButtonElement
      currentButton.classList.add("active")

      if (canPlaySong[key] !== false) startSong(key)

      canPlaySong[key] = false
    }
  }

  const removeActiveClass: Function = (e: KeyboardEvent): void => {

    const key: string = e.key.toUpperCase()
    
    if (lettersArray.some(e => e === key)) {

      const currentButton = document.querySelector(`[letter="${key}"]`) as HTMLButtonElement
      currentButton.classList.remove("active")
      currentButton.attributes.removeNamedItem("class")

      canPlaySong[key] = true
    }
  }


  /**
   * Events
   */ 

  document.onkeydown = e => giveActiveClass(e)

  document.onkeyup = e => removeActiveClass(e)

  buttonList.forEach(button => button.onclick = () => {
    const key = button.innerHTML
    startSong(key)

    button.classList.add('active')
    setTimeout(() => {
      button.classList.remove('active')
      button.attributes.removeNamedItem("class")
    }, 500);
  });
}

setupPiano()