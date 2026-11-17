import Banner from "../components/home/Banner"
import Faq from "../components/home/Faq"
import FourSteps from "../components/home/FourSteps"
import Help from "../components/home/Help"
import RecentReports from "../components/home/RecentReports"
import "../styles/home.css"

const Home = () => {
  return (
    <>
        <Banner />
        <RecentReports />
        <FourSteps />
        <Help />
        <Faq />
    </>
  )
}

export default Home
