import React from 'react'

export const Buttons = ({className, text, disabled, onclick}) => {

    return (
        <button className={className} disabled={()=> disabled?"disabled":""} onClick={onclick}
        >{text}</button>
    )
}
