import { useRef, useState } from "preact/hooks";
import {
  BookingJournalType,
  cleanTuplasFromNegativeCharges,
  finalBookingJournal,
  separateLines,
  test1LinesWith18Sections,
  test2,
  test3,
} from "../utils/bj.ts";
import { finalRes, ReservationType, test1res } from "../utils/res.ts";
import { USERS, UserType } from "../utils/user.ts";
import { createCsv, createUpsell, UpsellType } from "../utils/upsell.ts";

export default function WholeIsland() {
  const bj = useRef<HTMLTextAreaElement>(null);
  const [passed, setPassed] = useState(0);
  const [error, setError] = useState("");

  const res = useRef<HTMLTextAreaElement>(null);
  const [resPassed, setResPassed] = useState(0);
  const [resErrors, setResError] = useState("");

  const [finalReserv, setFinalReserv] = useState<ReservationType[]>([]);
  const [finalBJ, setFinalBJ] = useState<BookingJournalType[]>([]);
  const [
    messageWhenGettingAccomodationUpsell,
    setMessageWhenGettingAccomodationUpsell,
  ] = useState("");

  const [upsell, setUpsell] = useState<UpsellType[]>([]);

  return (
    <>
      <h1>BookingJournal</h1>
      {finalBJ.length === 0
        ? (
          <>
            <textarea ref={bj}></textarea>
            <button onClick={checkData}>Check</button>
            <p>Han pasado {passed} de 3 Checks</p>
            <p>{error}</p>
          </>
        )
        : <p>Ya tenemos los datos</p>}

      <h1>Reservations</h1>

      {finalReserv.length === 0
        ? (
          <>
            <textarea ref={res}></textarea>
            <button onClick={checkResData}>Check</button>
            <p>Han pasado {resPassed} de 1 Checks</p>
            <p>{resErrors}</p>
          </>
        )
        : <p>Yatenemos los datos</p>}

      {(finalBJ.length > 0 && finalReserv.length > 0) &&
        (
          <>
            <h1>Recuperamos las reservas walk in</h1>
            {!messageWhenGettingAccomodationUpsell && (
              <button onClick={() => generateAccomodationUpsell(finalReserv)}>
                Haz click aquí
              </button>
            )}
            <p>{messageWhenGettingAccomodationUpsell}</p>
            {messageWhenGettingAccomodationUpsell && (
              <>
                <h1>Generar Upsell</h1>
                <button onClick={generateUpsell}>
                  Generar
                </button>
              </>
            )}
          </>
        )}
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

      const t3 = test3(cleanTuplas);

      if (t3) {
        setPassed((prev) => prev + 1);
      } else {
        setError(
          'Hay posteos negativos "Void Charges" que no conseguimos eliminar',
        );
      }

      const bj = finalBookingJournal(cleanTuplas);
      setFinalBJ(bj);
    }
  }
  function checkResData() {
    setResError("");
    setResPassed(0);
    const str = res.current?.value;
    if (!str) {
      console.log("nada que hacer");
    } else {
      const lines = str.split("\n");
      console.log("INFO res number", lines.length);
      const t1 = test1res(lines, setResError);
      if (t1) {
        setResPassed((prev) => prev + 1);
      } else {
        return;
      }
      const reservations = finalRes(lines);
      setFinalReserv(reservations);
    }
  }
  function generateAccomodationUpsell(data: ReservationType[]) {
    let message = "De " + data.length + " reservas ";
    const walkInRes = data.filter((res) =>
      res.segment === "D FIT" && res.subSegment === "DIRECT FIT" &&
      !res.room.includes(">>") &&
      USERS.includes(res.user as UserType)
    );
    message += walkInRes.length + " son reservas que se incorporan al upsell";

    setMessageWhenGettingAccomodationUpsell(message);
    if (walkInRes.length > 0) {
      const addBJ: BookingJournalType[] = walkInRes.map((res) => {
        return {
          formatedDate: res.checkIn,
          name: res.guest,
          resNumber: res.resNum,
          price: res.price,
          qty: Math.round(res.priceTotal / res.price),
          room: res.room,
          type: "Accomodation",
          user: res.user,
        };
      });
      setFinalBJ((prev) => prev.concat(addBJ));
    }
  }
  function generateUpsell() {
    const us = createUpsell(finalReserv, finalBJ);
    setUpsell(us);
    console.log(us);
    
    createCsv(us.toSorted((a,b) => a.date.localeCompare(b.date)))
  }
}
