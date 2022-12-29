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
      <button value="negatif" type="button">±</button>
      <button clear type="button">CE</button>
      <button clear type="button">C</button>
      <button number type="button">⇦</button>
      <button operator value="*" type="button">×</button>
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
      <button value="backspace" type="button">⇦</button>
      <button equal type="button">=</button>
    <div class="history">
    </div>
    </div>
  </div>
  <p>Made with TypeScript</p>
</div>
`

  /*
  * Variables 
  */ 

const buttons = document.querySelectorAll("button") as NodeListOf<HTMLButtonElement>
const operators = document.querySelectorAll('button[operator]') as NodeListOf<HTMLButtonElement>
const equal = document.querySelector('button[equal]') as HTMLButtonElement

const firstLine = document.querySelector('.input > :first-child') as HTMLParagraphElement
const lastLine = document.querySelector('.input > :last-child') as HTMLParagraphElement

const setupCalculator: Function = () => {
  
  if (!buttons || !lastLine) return
  
  /*
  * Variables 
  */ 
  
  let calculs = {input: "0", oldInput: "", operator: ""} 
  let canOperate: boolean  = true

  /*
   * Function 
   */ 

  const showVars : Function = () => {
    lastLine.innerHTML = calculs.input
    firstLine.innerHTML = calculs.oldInput + calculs.operator
  }
  showVars()

  const numberToLine : Function = (button : HTMLButtonElement) => {

    if (Number.isInteger(+button.innerHTML) === false || !button)  return

    button.onclick = () => {

      let input: string = calculs.input

      calculs.input === "0" ? calculs.input =  button.innerHTML : calculs.input = calculs.input + button.innerHTML ;
      showVars()
    }
  }

  const clear : Function = (button : HTMLButtonElement) => {
    
    if (button.innerHTML === "CE") {
    
      button.onclick = () => {
        calculs.input = "0"
        showVars()
      }
    }

    if (button.innerHTML === "C") {
    
      button.onclick = () => {
        calculs.oldInput = ""
        calculs.operator = ""
        calculs.input = "0"
        canOperate = true
        showVars()
      }
    }
  }

  const operation : Function = (button : HTMLButtonElement) => {

    button.onclick = () => {

      calculs.operator = " " + button.innerHTML
      showVars()

      if (canOperate === false) return
      
      calculs.oldInput = `${+calculs.input}`
      calculs.input = "0"
      showVars()
      canOperate = false
    }
  }

  const calculate : Function = (a: string, operator: string, b: string) => {
    if(!a || !operator || !b) return  

    let result : string 

     if (operator === " ÷") result = `${+a / +b }`;
    else if (operator === " ×") result = `${+a * +b }`;
    else if (operator === " -") result = `${+a - +b }`;
    else if (operator === " +") result = `${+a + +b }`;
    else return console.log("error", a, operator, b)

    if (result === "NaN") result = "0"

    calculs.input = result
    calculs.oldInput = ''
    calculs.operator = ''
    canOperate = true

    showVars()
  }

  /*
   * Events 
   */ 

  buttons.forEach(button => {
    numberToLine(button)
    clear(button)
  })

  operators.forEach(operator => {
    operation(operator)
  })

  equal.onclick = () => {
    calculate(calculs.oldInput, calculs.operator, calculs.input)
  }
}

setupCalculator()