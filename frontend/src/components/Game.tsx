import React, { useState } from 'react'
import CardContainer from './CardContainer'

interface Props {
    
}

const words = ['sana1', 'sana2', 'sana3', 'sana4'];

const Game = (props: Props) => {
    const [word, setWord] = useState(words[0])
    const [points, setPoints] = useState(0)
    const right = () => {
        setPoints(points+1)
        nextWord()
    }
    const skip = () => {
        setPoints(points-1)
        nextWord()
    }
    const nextWord = () => {
        setWord(words[words.indexOf(word) +1 ])
    }

    return (
        <div>
            <p>{points}</p>
            <CardContainer right={right} skip={skip} word={word}/>
        </div>
    )
}

export default Game
