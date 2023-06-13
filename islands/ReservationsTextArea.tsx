import { StateUpdater, useRef, useState } from "preact/hooks";
import { ReservationType, finalRes, test1res } from "../utils/res.ts";

type Props = {
  setRes: StateUpdater<ReservationType[]>
}

export default function ReservationsTeaxtArea({setRes}: Props) {
  const res = useRef<HTMLTextAreaElement>(null);
  const [passed, setPassed] = useState(0);
  const [error, setError] = useState("");

  return (
    <>
      <textarea ref={res}></textarea>
      <button onClick={checkData}>Check</button>
      <p>Han pasado {passed} de 1 Checks</p>
      <p>{error}</p>
    </>
  );
  function checkData() {
    setError("");
    setPassed(0);
    const str = res.current?.value;
    if (!str) {
      console.log("nada que hacer");
    } else {
      const lines = str.split("\n");
      console.log("INFO res number", lines.length);
      const t1 = test1res(lines, setError);
      if (t1) {
        setPassed((prev) => prev + 1);
      } else {
        return;
      }
      const reservations = finalRes(lines)
      setRes(reservations);
      
    }
  }
}
