import { useState } from "react";

export function useCounter (init = 0){
    const [count, updateCount] = useState(init)

    function increase(){
        updateCount((prevCount) => { return prevCount + 1})
    }

    function decrease(){
        updateCount((prevCount) => prevCount - 1)
    }

    function reset(){
        updateCount(0)
    }

    return [count, increase, decrease, reset]
}