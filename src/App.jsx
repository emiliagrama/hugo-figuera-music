import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import ShowreelSection from "./components/ShowreelSection.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="hf-page">
      <Hero />

      <main className="hf-main-band">
        <About />
        <ShowreelSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;

