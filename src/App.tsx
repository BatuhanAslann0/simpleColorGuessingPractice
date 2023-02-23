import { useState, useEffect } from 'react'
import './App.css'

 const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let generatedColor = '#'
    for (let i = 0; i < 6; i++) {
      generatedColor += letters[Math.floor(Math.random() * 16)]
    }
    return generatedColor
  }

const App = () => {

  const [color,setColor] = useState('')
  const [colorOptions,setColorOptions]= useState<string[]>([])
  const [pickedRightColor,setPickedRightColor] = useState<boolean | undefined > (undefined)

  const pickColor =() => {
    const actualColor = getRandomColor()
    setColor(actualColor)
    setColorOptions([actualColor,getRandomColor(),getRandomColor()].sort(() => Math.random() - 0.5 ))
  }

  useEffect(() => {
   pickColor()
  },[]) 

  const controlGuessTrue = (option:string) => {
    if(option === color) {
      setPickedRightColor(true)
      pickColor()
    } else {
      setPickedRightColor(undefined)
      setTimeout(() => {
        setPickedRightColor(false)
      }, 300);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setPickedRightColor(undefined)
    }, 1000);
  },[color])

 

  return (
    <div className="App">
      <h1>Guess The Color</h1>
      <div style={{ background: color}} className="guess-me">
      </div>
      <div className="buttons">
         {colorOptions.map((option)=> {
          return (
            <button onClick={() => controlGuessTrue(option)} key={option} >
              {option}
            </button>
          )
        })}
      </div>
       <div style={{width:'200px', height:'100px',textAlign:'center'}} className='result'>
        {pickedRightColor ? (
        <p style={{color:'green'}}>You know it!</p>
      ) :  pickedRightColor === false ? <p style={{color:'red'}}>Please try again</p> : null }
       </div>
    </div>
  )
}

export default App;
