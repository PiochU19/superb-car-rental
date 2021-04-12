import HeadComponent from '../components/HeadComponent/HeadComponent';
import Navbar from '../components/Navbar/Navbar';
import PanelMain from '../components/PanelMain/PanelMain';
import Footer from '../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Panel</HeadComponent>
    	<Navbar />
    	<PanelMain />
    	<Footer />
    </>
  )
}