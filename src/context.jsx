import { createContext, useContext, useState } from "react";

const MyContext = createContext()

export const MyProvider = ({ children }) => {

    const [isPlaying, setPlaying] = useState(false)
    const [isMusicUp, setMusicUp] = useState(false)

    return (
        <MyContext.Provider value={{ isPlaying, setPlaying, isMusicUp, setMusicUp }}>
            { children }
        </MyContext.Provider>
    )
}

export const usePlay = () => {
    return useContext(MyContext)
}