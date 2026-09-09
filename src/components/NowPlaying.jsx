import {useState ,useEffect} from "react"; 
import MovieSection from "./MovieSection"; 
import { getNowPlayingMovies } from "../services/tmdb"; 
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
const NowPlaying=({ limit ,showViewAll})=>{ 
    const[movies,setMovies]=useState([]) 
    const[loading,setLoading]=useState(true)
    const [error, setError] = useState(null)
    const getNowPlaying=async()=>{ 
        try{
        const res=await getNowPlayingMovies() 
        setMovies(res) }
        catch(error){
            setError(error)
        }
        finally{
            setLoading(false)
        }
    } 

    useEffect(()=>{ 
        getNowPlaying() 
    },[]) 
    if(loading){
        return <Loading/>
    }
    if (error) {
    return <ErrorMessage />
}
    return( 
        <MovieSection 
            movies={movies} 
            title={`What's On`} 
            limit={limit} 
            showViewAll={showViewAll} 
        /> 
    ) 
} 

export default NowPlaying;