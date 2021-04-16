import HeadComponent from '../../components/HeadComponent/HeadComponent';
import Navbar from '../../components/Navbar/Navbar';
import RentsPanel from '../../components/RentsPanel/RentsPanel';
import Footer from '../../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Rents</HeadComponent>
    	<Navbar />
    	<RentsPanel />
    	<Footer />
    </>
  )
}