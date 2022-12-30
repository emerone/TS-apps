import './main.css'
import './calculator.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="calculator-app">
<div class="container">
<h2>Calculator</h2>
    <div class="calculator">
      <div class="input">
        <p></p>
        <p></p>
      </div>  
      <button negatif type="button">±</button>
      <button clear type="button">CE</button>
      <button clear type="button">C</button>
      <button operator value="*" type="button">×</button>
      <button number type="button">7</button>
      <button number type="button">8</button>
      <button number type="button">9</button>
      <button operator value="/" type="button">÷</button>
      <button number type="button">4</button>
      <button number type="button">5</button>
      <button number type="button">6</button>
      <button operator value="-" type="button">-</button>
      <button number type="button">1</button>
      <button number type="button">2</button>
      <button number type="button">3</button>
      <button operator value="+" type="button">+</button>
      <button value="." type="button">.</button>
      <button number value="0" type="button">0</button>
      <button backspace type="button">⇦</button>
      <button equal type="button">=</button>
    <div class="history">
    </div>
    </div>
  </div>
  <p>Made with TypeScript</p>
</div>
`

const buttons = document.querySelectorAll("button") as NodeListOf<HTMLButtonElement>
const operators = document.querySelectorAll('button[operator]') as NodeListOf<HTMLButtonElement>
const equal = document.querySelector('button[equal]') as HTMLButtonElement
const backspace = document.querySelector('button[backspace]') as HTMLButtonElement
const negatifBtn = document.querySelector('buton[negatif]') as HTMLButtonElement

const firstLine = document.querySelector('.input > :first-child') as HTMLParagraphElement
const lastLine = document.querySelector('.input > :last-child') as HTMLParagraphElement

const setupCalculator: Function = () => {
  
  if (!buttons || !lastLine || !firstLine) return
  
  /*
  * Variables 
  */ 
  
  let calculs = {input: "0", oldInput: "", operator: ""} 
  let canOperate: boolean  = true

  /*
   * Functions
   */ 

  const showVars : Function = () => {

    lastLine.innerHTML = calculs.input
    firstLine.innerHTML = calculs.oldInput + calculs.operator
    if(lastLine.innerHTML === "") lastLine.innerHTML = "0"
  }
  showVars()

  const numberToLine : Function = (button : HTMLButtonElement) => {

    if (Number.isInteger(+button.innerHTML) === false || !button)  return

    calculs.input === "0" ? calculs.input =  button.innerHTML 
    : calculs.input = calculs.input + button.innerHTML ;
    showVars()
  }

  const clear : Function = (button : HTMLButtonElement) => {

    if (!button) return
    
    if (button.innerHTML === "CE") {

      calculs.input = "0"
      showVars()
    }

    if (button.innerHTML === "C") {
        
      calculs.oldInput = ""
      calculs.operator = ""
      calculs.input = "0"
      canOperate = true

      showVars()
    }
  }

  const operation : Function = (button : HTMLButtonElement) => {

    if (!button) return

    calculs.operator = " " + button.innerHTML
    showVars()

    if (canOperate === false) return
    
    calculs.oldInput = `${+calculs.input}`
    calculs.input = "0"
    canOperate = false
    showVars()
  }

  const calculate : Function = (a: string, operator: string, b: string) => {

    if(!a || !operator || !b) return  

    let result : string 

    if (operator === " ÷") result = `${+a / +b }`;
    else if (operator === " ×") result = `${+a * +b }`;
    else if (operator === " -") result = `${+a - +b }`;
    else if (operator === " +") result = `${+a + +b }`;
    else return console.log("error", a, operator, b)

    if (result === "NaN" || result === "Infinity" ) result = "0"

    calculs.input = result
    calculs.oldInput = ''
    calculs.operator = ''
    canOperate = true

    showVars()
  }

  const removeLastChar : Function = () => {

    calculs.input = calculs.input.slice(0, -1) 
    showVars()
  }

  /*
   * Events 
   */ 

  buttons.forEach(button => {
    button.onclick = () => {
      clear(button)
      numberToLine(button)
    }
  })

  operators.forEach(operator => {
    operator.onclick = () => {
      operation(operator)
    }
  })

  equal.onclick = () => {
    calculate(
      calculs.oldInput,
      calculs.operator,
      calculs.input
    )
  }

  backspace.onclick = () => {
    removeLastChar()
  }
}

setupCalculator()