import HeadComponent from '../../../components/HeadComponent/HeadComponent';
import Navbar from '../../../components/Navbar/Navbar';
import CarAdd from '../../../components/CarAdd/CarAdd';
import Footer from '../../../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Add Car</HeadComponent>
    	<Navbar />
    	<CarAdd />
    	<Footer />
    </>
  )
}