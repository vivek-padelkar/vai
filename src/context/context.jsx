import { createContext, useState } from "react";
import generateText from "../assets/config/gemini";

export const Context = createContext()
const ContextProvider = (props) => {
    const [input, setInput] = useState('')
    const [recentPrompt, setRecentPrompt] = useState('')
    const [previousPrompt, setPreviousPrompt] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState([])

    const newChat = () => {
        setLoading(false)
        setShowResult(false)

    }
    const onSent = async (prompt = '') => {
        let newResponse = ''
        setResultData('')
        setLoading(true)
        setShowResult(true)
        let response = ''
        if (prompt !== '') {
            response = await generateText(prompt)
            setRecentPrompt(prompt)
            setPreviousPrompt(prev => [...prev, prompt])
        } else {
            setPreviousPrompt(prev => [...prev, input])
            setRecentPrompt(input)
            response = await generateText(input)
        }
        let responsArray = response.split("**")
        for (let i = 0; i < responsArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responsArray[i]
            } else {
                newResponse += "<b>" + responsArray[i] + "</b>"
            }
        }
        newResponse = newResponse.split('*').join('</br>')

        console.log('response rturned', response)
        setResultData(newResponse)
        setLoading(false)
        setInput('')
    }
    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        resultData,
        setShowResult,
        input,
        setInput,
        loading,
        newChat
    }
    return (
        <Context.Provider value={contextValue} >
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider