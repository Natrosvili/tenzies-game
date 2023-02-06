import React, {useState, useEffect} from "react";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
import Die from "./Die";
import "../Styles/Game/Game.css"

export default function Game(){

    const [changeNum, setChangeNum] = useState(allNewDice()) 
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const allHeld = changeNum.every(die => die.isHeld)
        const firstValue = changeNum[0].value
        const allSameValue = changeNum.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [changeNum])


    function generateNewDie(){
        return {
            value: Math.ceil(Math.random() * 6), 
            isHeld: false, 
            id: nanoid()
        }
    }


    function allNewDice(){
        const newDice = [] 
        for(let i = 0; i < 10; i++){
            newDice.push(generateNewDie())
        }
        return newDice
    }


    function holdDice(id){
        setChangeNum(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} :
            die
        }))
    }

    function rollDice() {
        if(!tenzies){
            setChangeNum(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                die : 
                generateNewDie()
            }))
        }
        else{
            setTenzies(false)
            setChangeNum(allNewDice())
        }
    }

    return (
        <>
            {tenzies && <Confetti />}
            <h1 className="header">Tenzies</h1>
            <p className="text">
                Roll until all dice are the same. Click each die to freeze
                it at its current value between rolls.
            </p>
            <div className="gridbox">
                {changeNum.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} onClick={() => holdDice(die.id)} />)}
            </div>
            <button className="game-btn" onClick={() => rollDice()}>{tenzies ? "New Game" : "Roll"}</button>
        </>
    )
}