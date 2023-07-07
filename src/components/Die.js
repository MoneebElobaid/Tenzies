import React from "react"
import {nanoid} from "nanoid"

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }

    let dots = []
    for(let i = 0; i < props.value; i++) {
        dots.push(<div key={nanoid()} className="dot"></div>)
    }

    let numberOfDice
    switch (props.value) {
        case 1:
            numberOfDice = "one"
            break;
        case 2:
            numberOfDice = "two"
            break;
        case 3:
            numberOfDice = "three"
            break;
        case 4:
            numberOfDice = "four"
            break;
        case 5:
            numberOfDice = "five"
            break;
        case 6:
            numberOfDice = "six"
            break;
    }

    return (
        <div 
            style={styles} 
            onClick={props.hold}
            className={numberOfDice}
        >
            {dots}
        </div>
    )
}