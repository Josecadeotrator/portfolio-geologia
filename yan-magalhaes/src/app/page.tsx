import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Viewer3DLoader from "@/components/Viewer3DLoader";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Viewer3DLoader />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />

    </>
  );
}
