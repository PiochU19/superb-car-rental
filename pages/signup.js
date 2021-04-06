import HeadComponent from '../components/HeadComponent/HeadComponent';
import Navbar from '../components/Navbar/Navbar';
import SignupMain from '../components/SignupMain/SignupMain';
import Footer from '../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Signup</HeadComponent>
    	<Navbar />
    	<SignupMain />
    	<Footer />
    </>
  )
}