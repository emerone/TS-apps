import './main.css'
import './stopwatch.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="stopwatch-app">
  <h2>Stop Watch</h2>
  <div class="btns">
    <button type="button">Start</button>
    <button type="button">Stop</button>
    <button type="button">Reset</button>
    </div>
    <h3>00:00</h3>
  <p>Made with TypeScript</p>
</div>
`
const startBtn = document.querySelectorAll('button')[0] as HTMLButtonElement | null
const stopBtn = document.querySelectorAll('button')[1] as HTMLButtonElement | null
const resetBtn = document.querySelectorAll('button')[2] as HTMLButtonElement | null
const container = document.querySelector('h3') as HTMLHeadElement | null

const setupStopwatch : Function = (startBtn : HTMLButtonElement | null, stopBtn : HTMLButtonElement | null, resetBtn: HTMLButtonElement | null, container : HTMLElement | null) : void => {
  
  if (!startBtn || !stopBtn || !resetBtn || !container) return

  /*
  * Variables
  */ 

  let sec : number = 0, min : number = 0
  let isIntervalRuning : boolean = false
  let minResult : string, secResult : string, result : string;

  /*
  * Functions
  */ 
  
  const run : Function =  () : void => {
    
    if (sec < 599) {
      sec = sec + 1
    }else {
      sec = 0; min++
    }
    
    isIntervalRuning = true

    sec >= 100 ? secResult =  sec.toString().slice(0, 2) : 
      sec >= 10 ? secResult = "0" + sec.toString().slice(0, 1) : 
        secResult = "00"

    min < 10 ? minResult = "0" + min.toString() : 
      minResult = min.toString()

    result = `${minResult}:${secResult}`

    container.innerHTML = result
  }
  
  let interval = setInterval(run, 100)
  clearInterval(interval)

  const stop : Function = () : void => {
    clearInterval(interval)
    isIntervalRuning = false
  }

  /*
  * Events
  */ 

  stopBtn.onclick = () : void => {
    if (!isIntervalRuning) return
    stop()
  }

  startBtn.onclick = () : void => {
    if (isIntervalRuning) return
    interval = setInterval(run, 100)
  }

  resetBtn.onclick = () : void => {
    stop();
    [sec, min] = [0, 0];
  }
}

setupStopwatch(startBtn, stopBtn, resetBtn, container)