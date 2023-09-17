import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { HiChatBubbleBottomCenter } from "react-icons/hi2"
import {AiOutlineDelete} from "react-icons/ai"
import { IoMdSend } from "react-icons/io"
import { IoCloseSharp } from "react-icons/io5"
import { useSelector } from "react-redux"
import studynotionLogo from "../../assets/Logo/Logo-Small-Light.png"
import { getMessageFromOpenAI } from "../../services/operations/chatAPI"

const ChatBot = () => {
  const { handleSubmit, register, reset } = useForm()
  const [chatBox, setChatBox] = useState(false)
  const [messages, setMessages] = useState([])

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const handleOnSubmit = async (data) => {
    try {
      const response = await getMessageFromOpenAI(data.query)
      let result = response?.data?.response
      const newMessage = {
        query: data.query,
        response: result,
      }
      setMessages([...messages, newMessage])
      reset()
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  const handleDeleteChat = () => {
    setMessages([])
  }

  const toggleChatBox = () => {
    setChatBox(!chatBox)
    if (!chatBox) {
      document.body.classList.add("disable-scroll")
      document.documentElement.classList.add("disable-scroll")
    } else {
      document.body.classList.remove("disable-scroll")
      document.documentElement.classList.remove("disable-scroll")
    }
  }

  return (
    <div>
      {chatBox ? (
        <div className="rounde-lg fixed z-[9999] h-[100vh] -translate-y-14 md:-translate-y-0 w-[400px] border-richblack-700 bg-richblack-800 md:-bottom-1  md:right-5 md:h-[500px]  ">
          <IoCloseSharp
            onClick={toggleChatBox}
            className="absolute right-4 top-2 cursor-pointer text-2xl text-white"
          />

          <div className="flex h-10 items-center bg-richblack-700 pl-3 font-bold text-white">
            Studynotion AI Chatbot
          </div>

          <p className="absolute top-2 translate-y-[1px] left-[80%] cursor-pointer ">
            <AiOutlineDelete onClick={handleDeleteChat} className="text-xl text-white flex items-center"/>
          </p>

          <div
            id="chat-container"
            className="h-[90vh] overflow-auto py-2  md:h-[390px]"
          >
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                <div className="text-gray-400 w-full bg-richblack-700 text-right text-white">
                  <div className="flex justify-end gap-2 px-8 py-2 md:mr-2 md:px-4 ">
                    {message.query}
                    {token !== null && (
                      <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="w-6 object-contain"
                      />
                    )}
                  </div>
                </div>
                <div className="bg-green-500  items-start rounded-lg py-2 text-white">
                  <div className="mr-2 flex items-start gap-2 px-4 text-justify md:px-4">
                    <img
                      src={studynotionLogo}
                      alt=""
                      className="w-6 object-contain"
                    />
                    {message.response}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="fixed bottom-0 z-50 flex max-w-[400px] items-center gap-2 border-t-2 border-richblack-900 bg-richblack-800 py-3 pl-5 ">
              <input
                type="text"
                className="border-gray-300 h-[40px] w-[350px] rounded-lg border-none px-2 focus:outline-none"
                {...register("query")}
              />

              <button
                type="submit"
                className="-translate-x-3 cursor-pointer px-2 text-[25px] text-white"
              >
                <IoMdSend />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div
          onClick={toggleChatBox}
          className="fixed lg:bottom-10 bottom-5 lg:right-10 right-5 z-50 cursor-pointer rounded-full border-2 border-richblack-900 bg-white p-3 text-sm font-extrabold text-richblack-900 md:p-5 md:text-lg"
        >
          <div>
            <HiChatBubbleBottomCenter className="text-xl md:text-4xl " />
            {/* <p className="hidden md:flex">
              ChatBot
            </p> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatBot
