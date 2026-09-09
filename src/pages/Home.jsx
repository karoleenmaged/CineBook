import Hero from "../components/Hero";
import NowPlaying from "../components/NowPlaying";
import CTA from "../components/CTA";
const Home=()=>{
    return(
        <>
        <Hero/>
        <NowPlaying limit={8} showViewAll={true}/>
        <CTA/>
        </>
    )
}
export default Home