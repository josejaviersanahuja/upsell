import { useRef } from "preact/hooks";

export default function BookingJournalTeaxtArea() {
  const bj = useRef<HTMLTextAreaElement>(null);
  return (
    <>
      <textarea ref={bj}></textarea>
      <button onClick={checkData}>Check</button>
    </>
  );
  function checkData() {
    console.log(bj.current?.value);
    const str = bj.current?.value
    if (!str) {
      console.log("nada que hacer");
    } else {
      const lines = str.split("\n");
      lines.forEach((line) => {
        console.log(line.split("\t"));
      })
    }
  }
}
