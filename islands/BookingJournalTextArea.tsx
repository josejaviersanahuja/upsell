import { StateUpdater, useRef, useState } from "preact/hooks";
import {
BookingJournalType,
  cleanTuplasFromNegativeCharges,
  finalBookingJournal,
  separateLines,
  test1LinesWith18Sections,
  test2,
test3,
} from "../utils/bj.ts";

type Props = {
  setBJ: StateUpdater<BookingJournalType[]>
}

export default function BookingJournalTeaxtArea({setBJ}: Props) {
  const bj = useRef<HTMLTextAreaElement>(null);
  const [passed, setPassed] = useState(0);
  const [error, setError] = useState("");

  return (
    <>
      <textarea ref={bj}></textarea>
      <button onClick={checkData}>Check</button>
      <p>Han pasado {passed} de 3 Checks</p>
      <p>{error}</p>
    </>
  );
  function checkData() {
    setError("");
    setPassed(0);
    const str = bj.current?.value;
    if (!str) {
      console.log("nada que hacer");
    } else {
      const lines = str.split("\n");
      let testPassed = false;
      testPassed = test1LinesWith18Sections(lines, setError);
      if (testPassed) {
        setPassed((prev) => prev + 1);
      } else {
        return;
      }
      const tuplas = separateLines(lines);
      console.log(tuplas);

      const t2: boolean = test2(tuplas, setPassed, setError);
      if (!t2) {
        return;
      }

      const cleanTuplas = cleanTuplasFromNegativeCharges(tuplas);

      const t3 = test3(cleanTuplas)

      if (t3) {
        setPassed(prev => prev +1)
      } else {
        setError("Hay posteos negativos \"Void Charges\" que no conseguimos eliminar")
      }

      const bj = finalBookingJournal(cleanTuplas);
      setBJ(bj);
      
    }
  }
}
