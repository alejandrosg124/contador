import { useState } from 'react'

function Counter () {

    const [contador, setContador] = useState(0)
    const [inputValue, setInputValue] = useState('')

    const aumentarContador = () => {
        setContador(contador+1)
    }

    const disminuirContador = () => {
        if (contador == 0) {
            alert("No puedes disminuir más")
            return
        }
        setContador(contador-1)
    }

    const resetContador = () => {
        setContador(0)
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }
    
    const aumentarPorNumero = () => {
        const numero = parseInt(inputValue, 10)
        if (isNaN(numero)) {
            alert("Por favor ingresa un número válido")
            return
        }
        setContador(contador + numero)
        setInputValue('')
    }

    return(
        <span>
        <h1>Contador</h1>
        <p>Tienes {contador} en el contador</p>
        <div className="flex">
            <button onClick={aumentarContador}>Aumentar</button>
            <button onClick={disminuirContador}>Disminuir</button>
            <button onClick={resetContador}>Reset</button>
        </div>
        <div className="flex" style={{marginTop: '10px'}}>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Ingresa un número" 
            />
            <button onClick={aumentarPorNumero}>Aumentar por número</button>
        </div>
        </span>

    )

}

export default Counter
