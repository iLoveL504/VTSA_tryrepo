import { useState, useEffect } from "react";

const useToggle = () => {
    const [ toggle, setToggle ] = useState(true)
    const invertToggle = () => {
        setToggle(prev => !prev)
        console.log(toggle)
    }
    return [ toggle, invertToggle ]
}

export default useToggle

