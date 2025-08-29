import './Calculator.css'


export default function Calculator(){

    return(
        <div className="calculator">
  <div className="display"></div>
  <div className='buttons'>
    <button className='clear'>C</button>
    <button>9</button>
    <button>8</button>
    <button className='operator'>/</button>
    <button>7</button>

    <button>6</button>
    <button>5</button>
    <button className='operator'>*</button>
    <button>4</button>

    <button>3</button>
    <button>2</button>
    <button className='operator'>-</button>
    <button>1</button>
    <button>0</button>

    <button>.</button>
    <button className='operator'>+</button>
    <button className='equals'>=</button>
  </div>
</div>

    )
}