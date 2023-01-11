import React, { createContext, useEffect, useState } from "react";

export const WaitingContext = createContext();

function WaitingForAlarm({ children }) {
  const [waiting, setWaiting] = useState(false);

  return (
    <WaitingForAlarm.Provider
      value={{
        waiting,
        setWaiting
      }}
    >
      {children}
    </WaitingForAlarm.Provider>
  );
}

export default WaitingForAlarm;
