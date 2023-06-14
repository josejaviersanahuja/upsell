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
        <p>Del Booking Journal nos interesan solo las ventas directas. Hablarlo con el jefe pero supongo que entran Late Check Out, Parking, Breakfast Direct, Lunch Direct, Dinner Direct</p>
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
        <p>Del Booking Journal vamos a copiar desde la línea Late check out hasta el último subtotal. Mejor veanlo</p>
        <img
          src="bj1.png"
          alt="screen-shot bj1"
        />
        <p>Desde la línea 11 en este caso hasta el último Total sin incluir el revenue</p>
        <img
          src="bj2.png"
          alt="screen-shot bj2"
        />

      </main>
    </>
  );
}
