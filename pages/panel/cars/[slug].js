import HeadComponent from '../../../components/HeadComponent/HeadComponent';
import Navbar from '../../../components/Navbar/Navbar';
import CarUpdate from '../../../components/CarUpdate/CarUpdate';
import Footer from '../../../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Car</HeadComponent>
    	<Navbar />
    	<CarUpdate />
    	<Footer />
    </>
  )
}