import Footer from "./HomeLayout/HomeFooter";
import LandingPage from "./HomeLayout/LandingPage";
import HowitWorks from "./HomeLayout/HowItwork";
import FeaturedInstructors from "./HomeLayout/FeaturedInstructors";
import Testimonials from "./HomeLayout/TestimonialsSection";
import Header from "./HomeLayout/HomeHeader";

function Home() {
  return (
    <>
      <Header />
      <LandingPage />
      <HowitWorks />
      <Testimonials />
      <FeaturedInstructors />
      <Footer />
    </>
  );
}

export default Home;
