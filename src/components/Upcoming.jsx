import { getUpcomingMovies } from "../services/tmdb"; 
import { useState,useEffect } from "react"; 
import MovieSection from "./MovieSection"; 
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
const Upcoming=()=>{ 
    const[movies,setMovies]=useState([]) 
    const[loading,setLoading]=useState(true)
    const [error, setError] = useState(null)
    const getUpcoming=async()=>{ 
        try{
        const res=await getUpcomingMovies() 
        setMovies(res) }
        catch(error){
            setError(error)
        }
        finally{
            setLoading(false)
        }
    } 

    useEffect(()=>{ 
        getUpcoming() 
    },[]) 
    if(loading){
        return <Loading/>
    }
    if (error) {
    return <ErrorMessage />
}
    return( 
        <div className="pb-20 pt-10"> 
            <MovieSection 
                title="UpComing" 
                movies={movies}
                upcoming={true}
            /> 
        </div> 
    ) 
} 

export default Upcoming;