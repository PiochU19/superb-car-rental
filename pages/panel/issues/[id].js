import HeadComponent from '../../../components/HeadComponent/HeadComponent';
import Navbar from '../../../components/Navbar/Navbar';
import RespondIssue from '../../../components/RespondIssue/RespondIssue';
import Footer from '../../../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Issues</HeadComponent>
    	<Navbar />
    	<RespondIssue />
    	<Footer />
    </>
  )
}