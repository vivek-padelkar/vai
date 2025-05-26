import './main.css'
import { useContext } from 'react';
import Typewriter from 'typewriter-effect';
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, setRecentPrompt } = useContext(Context)
    const loadPrompt = async (prompt) => {
        console.log('prompt received', prompt)
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
    return (
        <div className='main'>
            <div className="nav">
                <p>VAi</p>
                <img src={assets.user_icon} alt="" />
            </div>

            <div className="main-container">
                {
                    !showResult ? <>
                        <div className="greet">
                            <span>Hello, Dev</span>
                            <p className='typewriter'>
                                <Typewriter
                                    options={{
                                        loop: true
                                    }}
                                    onInit={(typewriter) => {
                                        typewriter.typeString('Its VAi ! How can i help you today?')
                                            .pauseFor(2500)
                                            .deleteAll()
                                            .start();
                                    }}
                                />
                            </p>
                        </div>

                        <div className="cards">
                            <div className="card" onClick={() => loadPrompt(assets.prompts.p1)}>
                                <p>{assets.prompts.p1}</p>
                                <img src={assets.compass_icon} alt="compass" />
                            </div>
                            <div className="card" onClick={() => loadPrompt(assets.prompts.p2)}>
                                <p>{assets.prompts.p2}</p>
                                <img src={assets.bulb_icon} alt="compass" />
                            </div>
                            <div className="card" onClick={() => loadPrompt(assets.prompts.p3)}>
                                <p>{assets.prompts.p3}</p>
                                <img src={assets.message_icon} alt="compass" />
                            </div>
                            <div className="card" onClick={() => loadPrompt(assets.prompts.p4)}>
                                <p>{assets.prompts.p4}</p>
                                <img src={assets.code_icon} alt="compass" />
                            </div>
                        </div>
                    </> : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            {
                                loading ? <div className='loading'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div> : <>
                                    <img src={assets.gemini_icon} alt="" />
                                    {/* <p>{resultData}</p> */}
                                    <Typewriter
                                        options={{
                                            loop: false,
                                            delay: 1,
                                        }}
                                        onInit={(typewriter) => {
                                            typewriter.typeString(resultData)
                                                .start();
                                        }}
                                    />
                                </>
                            }

                        </div>
                    </div>
                }

                <div className='main-bottom'>
                    <div className="search-box">
                        <input className='iptext'
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            name=""
                            id=""
                            placeholder='Whats in your mind?'
                        />
                        <div className="img-container">
                            {
                                input ?
                                    (<img onClick={() => {
                                        onSent()
                                    }} src={assets.send_icon} alt="" />)
                                    : null
                            }
                        </div>
                    </div>

                    <p className="bottom-info">
                        VAi may displays iacurate info, inlucing about people, so double check its response
                    </p>
                </div>
            </div>
        </div >
    )
}

export default Main