import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";

export function ChangeProfile() {
  const { setUsername } = useContext(AppContext);

  const [newUsername, setNewusername] = useState("");

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setNewusername(e.target.value);
        }}
      />
      <button onClick={() => setUsername(newUsername)}>Change Username</button>
    </div>
  );
}
