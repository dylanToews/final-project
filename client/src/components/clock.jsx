import { useState } from "react";

export default function Clock(props) {

  let time = new Date().toLocaleTimeString()
  
  const [currentTime, setCurrentTIme] = useState(time);

  const updateTime = () => {
    let time = new Date().toLocaleTimeString()
    setCurrentTIme(time)
  }

  setInterval(updateTime, 1000)

  return (
    <div>
      <h1>{currentTime}</h1>
    </div>
  )

}