import HeadComponent from '../../components/HeadComponent/HeadComponent';
import Navbar from '../../components/Navbar/Navbar';
import CarsMain from '../../components/CarsMain/CarsMain';
import Footer from '../../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Cars</HeadComponent>
    	<Navbar />
    	<CarsMain />
    	<Footer />
    </>
  )
}