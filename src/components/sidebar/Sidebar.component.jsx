import './sidebar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../context/context'
const Sidebar = () => {
    const [extended, setExtended] = useState(false)
    const { onSent, previousPrompt, setRecentPrompt, newChat } = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
    return (
        <div className='sidebar'>
            <div className="top">
                <img className='menu' src={assets.menu_icon} alt='Menu icon' onClick={() => setExtended(!extended)} />
                <div className="new-chat" onClick={() => newChat()}>
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {
                    extended ?
                        <div className="recent">
                            <p className='recent-title'>Recent</p>
                            {previousPrompt && previousPrompt.map((item, index) => {
                                return (
                                    <div className="recent-entry" key={item} onClick={() => loadPrompt(item)}>
                                        <img src={assets.message_icon} alt="" />
                                        <p>{`${item.slice(0, 18)}...`}</p>
                                    </div>
                                )
                            })}
                        </div> : null
                }

            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Setting</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar 