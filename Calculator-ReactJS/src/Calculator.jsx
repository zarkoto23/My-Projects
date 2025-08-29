import { useState } from 'react'
import './Calculator.css'


export default function Calculator(){
    const[display, setDisplay]=useState('')
    const [currentValue, setCurrentValue]=useState('')
    const[previousValue, setPreviousValue]=useState('')
    const[operator, setOperator]=useState(null)
    const [justCalculated, setJustCalculated]=useState(false)

    function handleNumber(number){
        
    }

    

    return(
        <div className="calculator">
  <div className="display">{display || "0"}</div>
  <div className='buttons'>
    <button className='clear'>C</button>
    <button onClick={()=>handleNumber('9')}>9</button>
    <button onClick={()=>handleNumber('8')}>8</button>
    <button className='operator'>/</button>
    <button onClick={()=>handleNumber('7')}>7</button>

    <button onClick={()=>handleNumber('6')}>6</button>
    <button onClick={()=>handleNumber('5')}>5</button>
    <button className='operator'>*</button>
    <button onClick={()=>handleNumber('4')}>4</button>

    <button onClick={()=>handleNumber('3')}>3</button>
    <button onClick={()=>handleNumber('2')}>2</button>
    <button className='operator'>-</button>
    <button onClick={()=>handleNumber('1')}>1</button>
    <button onClick={()=>handleNumber('0')}>0</button>

    <button>.</button>
    <button className='operator'>+</button>
    <button className='equals'>=</button>
  </div>
</div>

    )
}