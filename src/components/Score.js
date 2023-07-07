export default function Score(props) {

    const minutesTime = props.gameTime.minutes >= 10 ? props.gameTime.minutes : `0${props.gameTime.minutes}`
    const secondsTime = props.gameTime.seconds >= 10 ? props.gameTime.seconds : `0${props.gameTime.seconds}`

    const bestTimeObj = JSON.parse(localStorage.getItem("TIME"))
    const bestTimeObjMinutes = bestTimeObj.minutes >= 10 ? bestTimeObj.minutes : `0${bestTimeObj.minutes}`
    const bestTimeObjSeconds = bestTimeObj.seconds >= 10 ? bestTimeObj.seconds : `0${bestTimeObj.seconds}`

    const rollsRecord = +localStorage.getItem("ROLLS")

    return (
        <div className="score-container">
            <h1 className="won">You Won</h1>
            <div className="record">
                <p>You made <b>{props.rolls}</b> rolls</p>
                <p>Record: <b>{rollsRecord}</b></p>
            </div>
            <div className="record">
                <p>Time: <b>{minutesTime}:{secondsTime}</b></p>
                <p>Record: <b>{bestTimeObjMinutes}:{bestTimeObjSeconds}</b></p>
            </div>
            <button onClick={props.restart} className="restart">New Game</button>
        </div>
    )
}