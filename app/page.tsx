import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { RunOfShow } from "./components/RunOfShow";
import { Speakers } from "./components/Speakers";
import { Hosts } from "./components/Hosts";
import { Register } from "./components/Register";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";

function HeatDivider() {
  return (
    <div className="ignite-container">
      <div aria-hidden className="heat-divider" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <RunOfShow />
        <Speakers />
        <HeatDivider />
        <Hosts />
        <HeatDivider />
        <Register />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
