import { useState } from "react";

import { api } from "./lib/api";

export default function App() {
  const [message, setMessage] = useState<string>();

  const pingServer = async () => {
    setMessage("Loading...");

    const { data } = await api.hello.get();

    if (data) {
      setMessage(data.message);
    }
  };

  return (
    <div>
      <button type="button" onClick={pingServer}>
        Say hi!
      </button>
      <p>{message}</p>
    </div>
  );
}
