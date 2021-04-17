import HeadComponent from '../components/HeadComponent/HeadComponent';
import Navbar from '../components/Navbar/Navbar';
import AboutMain from '../components/AboutMain/AboutMain';
import Footer from '../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - About</HeadComponent>
    	<Navbar />
    	<AboutMain />
    	<Footer />
    </>
  )
}