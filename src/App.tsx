import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Features from './sections/Features';
import Courses from './sections/Courses';
import Teachers from './sections/Teachers';
import Competitions from './sections/Competitions';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Courses />
        <Teachers />
        <Competitions />
        <Footer />
      </main>
    </div>
  );
}

export default App;
