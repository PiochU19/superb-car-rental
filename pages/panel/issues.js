import HeadComponent from '../../components/HeadComponent/HeadComponent';
import Navbar from '../../components/Navbar/Navbar';
import IssuesMain from '../../components/IssuesMain/IssuesMain';
import Footer from '../../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Issues</HeadComponent>
    	<Navbar />
    	<IssuesMain />
    	<Footer />
    </>
  )
}