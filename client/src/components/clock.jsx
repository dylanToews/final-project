import { useState } from "react";

export default function Clock(props) {

  let time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})


  const [currentTime, setCurrentTIme] = useState(time);

  const updateTime = () => {
    let constantTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    setCurrentTIme(constantTime)
  }

  setInterval(updateTime)

  return (
    <div>
      <h1>Current Time: {currentTime}</h1>

    </div>
  )

}