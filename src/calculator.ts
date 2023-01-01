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
      <button negative type="button">±</button>
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
      <button dot value="." type="button">.</button>
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

const buttons = document.querySelectorAll("button") as NodeListOf<HTMLButtonElement> | null ;
const operators = document.querySelectorAll('button[operator]') as NodeListOf<HTMLButtonElement> | null ;
const equal = document.querySelector('button[equal]') as HTMLButtonElement | null ;
const backspace = document.querySelector('button[backspace]') as HTMLButtonElement | null ;
const negativeBtn = document.querySelector('button[negative]') as HTMLButtonElement | null ;
const dotBtn = document.querySelector("button[dot]") as HTMLButtonElement | null ;
 
const firstLine = document.querySelector('.input > :first-child') as HTMLParagraphElement | null ;
const lastLine = document.querySelector('.input > :last-child') as HTMLParagraphElement | null ;

const setupCalculator: Function = () : void => {
  
  if (!buttons || !operators || !equal || !backspace || !negativeBtn || !dotBtn) return
  
  /*
  * Variables 
  */ 
  
  let calculs = {input: "0", oldInput: "", operator: ""} 
  let canOperate: boolean  = true

  /*
   * Functions
   */ 

  const showToCalculator : Function = () : void => {

    if (!lastLine || !firstLine) return

    lastLine.innerHTML = calculs.input
    firstLine.innerHTML = calculs.oldInput + calculs.operator
    if(lastLine.innerHTML === "") lastLine.innerHTML = "0"
  }
  showToCalculator()

  const numberToLine : Function = (button : HTMLButtonElement) : void => {

    if (Number.isInteger(+button.innerHTML) === false || !button)  return

    calculs.input === "0" ? calculs.input =  button.innerHTML 
    : calculs.input = calculs.input + button.innerHTML ;
    showToCalculator()
  }

  const clear : Function = (button : HTMLButtonElement) : void => {
    
    if (button.innerHTML === "CE") {

      calculs.input = "0"
      showToCalculator()
    }

    if (button.innerHTML === "C") {
        
      calculs.oldInput = ""
      calculs.operator = ""
      calculs.input = "0"
      canOperate = true

      showToCalculator()
    }
  }

  const addOperation : Function = (button : HTMLButtonElement) : void => {

    calculs.operator = " " + button.innerHTML
    showToCalculator()

    if (canOperate === false) return
    
    calculs.oldInput = `${+calculs.input}`
    calculs.input = "0"
    canOperate = false
    showToCalculator()
  }

  const calculate : Function = (a: string, operator: string, b: string) : void => {

    if(!a || !operator || !b) return  

    let result : string  = "null"

    if (operator === " ÷") result = `${+a / +b }`;
    if (operator === " ×") result = `${+a * +b }`;
    if (operator === " -") result = `${+a - +b }`;
    if (operator === " +") result = `${+a + +b }`;

    if (result === "NaN" || result === "Infinity" || result == "null") result = "0"

    calculs.input = result
    calculs.oldInput = ''
    calculs.operator = ''
    canOperate = true

    showToCalculator()
  }

  const removeLastChar : Function = () : void => {

    calculs.input = calculs.input.slice(0, -1) 
    showToCalculator()
  }

  const negativeToInput : Function = () : void => {

    calculs.input = `${+calculs.input  * -1}`
    showToCalculator()
  }

  const addDot : Function = () => {

    calculs.input = calculs.input + "."
    showToCalculator()
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
      addOperation(operator)
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

  negativeBtn.onclick = () => {
    negativeToInput()
  }

  dotBtn.onclick = () => {
    addDot()
  }
}

setupCalculator()