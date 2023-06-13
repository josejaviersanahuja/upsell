import { Head } from "$fresh/runtime.ts";
import { Navbar } from "../../components/Navbar.tsx";
import BookingJournalTeaxtArea from "../../islands/BookingJournalTextArea.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
        <link href="styles/index.css" rel="stylesheet" />
      </Head>
      <Navbar />
      <main>
        <h1>Automatizando el UPSELL</h1>
        <BookingJournalTeaxtArea />
      </main>
    </>
  );
}
