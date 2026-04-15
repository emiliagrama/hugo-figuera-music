import { useState } from "react";
import ContactOverlay from "./components/ContactOverlay";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Credits from "./components/Credits";
import ShowreelSection from "./components/ShowreelSection.jsx";
import Footer from "./components/Footer.jsx";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <div className="hf-page">
      <Hero />

      <main className="hf-main-band">
        <ShowreelSection />
        <Credits />
        <About />
      </main>
      <section
        className="preFooterCTA"
         style={{ "--contact-wave-bg": 'url("/images/showreel-wave-bg.png")' }}
      >
        <h3>Have a project in mind?</h3>
        <p>Let’s create something powerful together.</p>
        <button onClick={() => setContactOpen(true)}>
          Start a conversation
        </button>
      </section>
      <Footer />
      <ContactOverlay
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
      <Analytics />
    </div>
  );
}

export default App;

