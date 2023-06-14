import { Head } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { Navbar } from "../../components/Navbar.tsx";
import WholeIsland from "../../islands/WholeIsland.tsx";

export default function Home() {
  
  return (
    <>
      <Head>
        <title>Fresh App</title>
        <link href="styles/index.css" rel="stylesheet" />
      </Head>
      <Navbar />
      <main>
        
        <WholeIsland />
        
      </main>
    </>
  );
}
