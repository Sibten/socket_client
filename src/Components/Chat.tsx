import { appSocket } from "../socket";
import React, { useState } from "react";

interface BaseMessage {
  message: string;
  name: string;
}

export default function Chat() {
  const [join, setJoin] = React.useState<boolean>(false);
  const [mesg, setMsg] = useState<Array<string>>([]);
  const [curMsg, setCurMsg] = React.useState("");

  React.useEffect(() => {
    if (join) {
      const name = prompt("Enter name");
      setMsg([...mesg, "You joined the chat"]);
      if (name) appSocket.emit("new-user-joined", name);
      else setJoin(!join);
    }
  }, [join]);

  appSocket.on("user-joined", (res: BaseMessage) => {
    setMsg([...mesg, `${res.message}`]);
  });

  appSocket.on("message", (res: BaseMessage) => {
    setMsg([...mesg, res.message]);
  });

  const send = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    appSocket.emit("send", curMsg);
  };

  return (
    <div className="App">
      <button onClick={() => setJoin(!join)}>
        {join ? "Disconnect" : "Connect"}
      </button>
      {join ? (
        <>
          {" "}
          <div>
            <ul>
              {mesg.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setCurMsg(e.target.value);
            }}
          />
          <button onClick={send}>Send</button>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
