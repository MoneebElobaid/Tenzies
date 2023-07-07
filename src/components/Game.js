export default function Game(props) {

    const minutesTimer = props.timer.minutes >= 10 ? props.timer.minutes : `0${props.timer.minutes}`
    const secondsTimer = props.timer.seconds >= 10 ? props.timer.seconds : `0${props.timer.seconds}`

    return (
        <>
            <div className="info">
                <h1>Tenzies</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="dice-container">
                {props.diceElements}
            </div>
            <button onClick={props.rollDice} className="roll-btn">Roll</button>
            <div className="timer">{minutesTimer}:{secondsTimer}</div>
        </>
    )
}