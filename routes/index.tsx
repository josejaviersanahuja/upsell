import { Head } from "$fresh/runtime.ts";
import { Navbar } from "../components/Navbar.tsx";

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
        
        <p>Necesitamos 2 listados. Vamos a sacar el <b>Booking Journal</b> del Mes que vamos a estudiar</p>
        <p>Ve a la pestaña Reports del Host, escribe en el buscador Booking Journal y ahí va a aparecer</p>
        <img
          src="booking_journal.png"
          alt="screen-shot del booking journal"
        />
        <p>Ahora vamos a Reservations y vamos a buscar todas las reservas con 1 Mes antes del mes que vamos a procesar</p>
        <p>Luego filtramos las reservas todas las que hayan hecho checkout y las que estén checked in</p>
        <p>Procuramos tener la vista simplificada y damos click al botón del excel.</p>
        <p>Para generar el excel procuramos seleccionar:</p>
        <ol>
          <li>resno</li>
          <li>CheckInFormatted</li>
          <li>CheckOutFormatted</li>
          <li>room</li>
          <li>guest</li>
          <li>agency</li>
          <li>company</li>
          <li>SegmentDescription</li>
          <li>SubSegmentDescription</li>
          <li>ChannelDescription</li>
          <li>Price</li>
          <li>PriceTotal</li>
          <li>UserCode</li>
        </ol>
        <img
          src="list.png"
          alt="screen-shot del listado"
        />
      </main>
    </>
  );
}
