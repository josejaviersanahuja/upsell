import { Head } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { Navbar } from "../../components/Navbar.tsx";
import BookingJournalTeaxtArea from "../../islands/BookingJournalTextArea.tsx";
import ReservationsTeaxtArea from "../../islands/ReservationsTextArea.tsx";
import { ReservationType } from "../../utils/res.ts";
import { BookingJournalType } from "../../utils/bj.ts";

export default function Home() {
  const [res, setRes] = useState<ReservationType[]>([]);
  const [bj, setBJ] = useState<BookingJournalType[]>([]);

  return (
    <>
      <Head>
        <title>Fresh App</title>
        <link href="styles/index.css" rel="stylesheet" />
      </Head>
      <Navbar />
      <main>
        <h1>BookingJournal</h1>
        {bj.length === 0
          ? <BookingJournalTeaxtArea setBJ={setBJ} />
          : <p>Ya tenemos los datos cargados</p>}
        <h1>Reservations</h1>
        {res.length === 0
          ? <ReservationsTeaxtArea setRes={setRes} />
          : <p>Ya tenemos cargadas las reservas</p>}
      </main>
    </>
  );
}
