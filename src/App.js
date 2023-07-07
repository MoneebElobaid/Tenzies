import React, { useState, useEffect } from "react"
import Die from "./components/Die"
import Game from "./components/Game"
import Score from "./components/Score"
import "./style.css"
import {nanoid} from "nanoid"

function App() {    

  const [dice, setDice] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)
  const [numberOfRolls, setNumberOfRolls] = useState(0)
  const [counter, setCounter] = useState({minutes: 0, seconds: 0})
  
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
      let bestTimeObj = JSON.parse(localStorage.getItem("TIME"))
      let bestTime = bestTimeObj ? bestTimeObj.minutes * 60 + bestTimeObj.seconds : 0
      let thisGameTime = counter.minutes * 60 + counter.seconds
      if(bestTimeObj && thisGameTime < bestTime) {
        localStorage.setItem("TIME", JSON.stringify(counter))
      } else if(!bestTimeObj) {
        localStorage.setItem("TIME", JSON.stringify(counter))
      }
      const rollsRecord = JSON.parse(localStorage.getItem("ROLLS"))
      if(rollsRecord && numberOfRolls < rollsRecord) {
        localStorage.setItem("ROLLS", JSON.stringify(numberOfRolls))
      } else if(!rollsRecord) {
        localStorage.setItem("ROLLS", JSON.stringify(numberOfRolls))
      }
    }
  }, [dice])
  
  useEffect(() => {
    let countInterval
    let count = 0
    if(!tenzies) {
      countInterval = setInterval(() => {
        count++
        setCounter(prevCounter => {
          return {
            minutes: parseInt(count / 60),
            seconds: parseInt(count % 60)
          }
        })
      }, 1000)
    }
    return function() {
      clearInterval(countInterval)
    }
  }, [tenzies])  

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    let NewDice = []
    for(let i = 0; i < 10; i++) {
      NewDice.push(generateNewDie())
    }
    return NewDice
  }

  function rollDice() {
    setNumberOfRolls(prevRolls => prevRolls + 1)
    setDice(oldDice => {
      return oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      })
    })
  }

  function holdDice(id) {
    setDice(oldDice => {
      return oldDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    })
  }

  function restart() {
    setCounter({minutes: 0, seconds: 0})
    setDice(allNewDice())
    setTenzies(false)
    setNumberOfRolls(0)
  }

  const values = dice.map(die => die.value)

  const diceElements = dice.map(die => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      hold={() => holdDice(die.id)}
      arrayOfValues={values}
    />
  ))
  
  return (
     <main>
      { !tenzies ? 
          <Game gameEnded={tenzies} diceElements={diceElements} rollDice={rollDice} timer={counter} /> :
          <Score rolls={numberOfRolls} restart={restart} gameTime={counter} />
      }
     </main>
  )
}

export default App
