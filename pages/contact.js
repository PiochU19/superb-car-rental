import HeadComponent from '../components/HeadComponent/HeadComponent';
import Navbar from '../components/Navbar/Navbar';
import ContactMain from '../components/ContactMain/ContactMain';
import Footer from '../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Contact</HeadComponent>
    	<Navbar />
    	<ContactMain />
    	<Footer />
    </>
  )
}
