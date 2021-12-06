import React, {useState} from "react";
import './Calculator.css'
import Buttons from "../buttons/Buttons";
import Display from '../display/Display'

export default () => {

    const [displayValue, setDisplayValue] = useState('0')
    const [clearDisplay, setClearDisplay] = useState(false)
    const [operationToCalc, setOperationToCalc] = useState(null)
    const [values, setValues] = useState([0, 0])
    const [currentValue, setCurrentValue] = useState(0) 

    /**
     * Ao limpar os dados da calculadora.
     */
    const clearMemory = () =>  {
        setDisplayValue('0')
        setClearDisplay(false)
        setOperationToCalc(null)
        setValues([0, 0])
        setCurrentValue(0)
    }

    /**
     * Ao clicar em um operador. 
     */
    const setOperation = (operation) => {
        if (displayValue === '0') return

        if (currentValue === 0) {

            setOperationToCalc(operation)
            setCurrentValue(1)
            setClearDisplay(true)    
            return
        }

        const equal = operation === '='
        const valueCalc = [...values]

        try {
            valueCalc[0] = eval(`${valueCalc[0]} ${operationToCalc} ${valueCalc[1]}`)
        }

        catch {
            valueCalc[0] = values[0]
        }

        valueCalc[1] = 0

        setDisplayValue(valueCalc[0])
        setOperationToCalc(equal ? null : operation)
        setCurrentValue(equal ? 0 : 1)
        setClearDisplay(!equal)
        setValues(valueCalc)
    }

    /**
     * Ao adicionar digito. 
     */
    const addDigit = (number) => {
        if(number === '.' && displayValue.includes('.')) return

        const clearDisplayCalc = displayValue === '0' || clearDisplay
    
        const currentValueCalc = clearDisplayCalc ? '' : displayValue

        const calcDisplayValue = currentValueCalc + number

        setDisplayValue(calcDisplayValue)
        setClearDisplay(false)

        if (number === '.') return

        const newValue = parseFloat(calcDisplayValue)
        values[currentValue] = newValue

        setValues(values)
    }

    return (
        <div className='calculator'>
            <Display value={displayValue}/>
            <Buttons click={() => clearMemory()} triple label="AC"/>
            <Buttons label="/" click={setOperation} operation />
            <Buttons label="7" click={addDigit}/>
            <Buttons label="8" click={addDigit}/>
            <Buttons label="9" click={addDigit} />
            <Buttons label="*"click={setOperation} operation />
            <Buttons label="4" click={addDigit}/>
            <Buttons label="5" click={addDigit} />
            <Buttons label="6" click={addDigit} />
            <Buttons label="-" click={setOperation} operation />
            <Buttons label="1" click={addDigit} />
            <Buttons label="2" click={addDigit} />
            <Buttons label="3" click={addDigit} />
            <Buttons label="+" click={setOperation} operation />
            <Buttons label="0" click={addDigit} double />
            <Buttons label="." click={addDigit}/>
            <Buttons label="=" click={setOperation} operation/>
        </div>
    )
}
