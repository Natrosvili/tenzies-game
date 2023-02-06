import React from "react"
import "../Styles/Die/Die.css"

export default function Die(props) {


    return (
        <section >
            <div onClick={props.onClick} className={props.isHeld ? "die-clicked" : "die"}>
                {props.value}
            </div>
        </section>
    )
}