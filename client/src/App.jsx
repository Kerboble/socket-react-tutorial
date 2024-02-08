import {useEffect, useState} from 'react'
import './App.css'
import { io } from 'socket.io-client'
const socket= io.connect("http://localhost:5174")

function App() {
  const [message, setMessage] = useState("")
  const[messageReceived, setMessageReceived] = useState("")
  const [room, setRoom] = useState("")

  const joinRoom = () => {
    if(room !== "")
    socket.emit("join_room", room)
  }

  const sendMessage = () => {
    socket.emit("send_message", { message, room })
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      setMessageReceived(data.message)
    })
  },[socket])

  return (
    <>
      <div className="app" >
        <div className="room">
          <input 
          type="text"
          onChange={(event) => {
            setRoom(event.target.value)
          }}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
        <input type="text" 
        placeholder='type message' 
        onChange={(event) => {
          setMessage(event.target.value)
        }}/>
          <button className='sendMsg' onClick={sendMessage}>Send</button>
          <div>Message:</div>
          {messageReceived}
      </div>
    </>
  )
}

export default App
