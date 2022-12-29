import './main.css'
import './counter.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="counter-app">
  <h2>Counter with input</h2>
  <div class="search">
    <input type="number">
    <button id="counter" type="button">Enter</button>
    </div>
    <h3> Count is 0</h3>
  <p class="read-the-docs">
    Made with TypeScript 
  </p>
</div>
`
const input = document.querySelector('input') as HTMLInputElement | null ;
const enterBtn = document.querySelector('button') as HTMLButtonElement | null;
const result = document.querySelector('h3') as HTMLInputElement | null;

const setupCounter = (input : HTMLInputElement | null, button : HTMLButtonElement | null, element: HTMLElement | null) => {
  
  if (!input || !button || !element) return

  /*
  * Variables
  */ 

  let counter : number = 0

  /*
  * Functions
  */ 

  const setCounter : Function = () => {

    const valueToAdd : number = input.valueAsNumber
    const result = counter + valueToAdd;

    if (isNaN(result)) return
    element.innerHTML = `Count is ${result}`
    counter = result
  }

  const eventsConditions = (e : any) : void => {

    console.log( e)

    if (e.type === "keydown" && e.key ===  "Enter") setCounter()
    if (e.type === "click") setCounter()
  }

  /*
  * Eventts
  */ 

  button.addEventListener('click', eventsConditions)
  input.addEventListener('keydown', eventsConditions)
}

setupCounter(input, enterBtn, result)

