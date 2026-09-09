import { useEffect, useState } from "react"; 
import { getRelatedmovies } from "../services/tmdb"; 
import MovieCard from "./MovieCard"; 
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
const RelatedMovies = ({ id }) => { 
    const [movies, setMovies] = useState(null); 
    const [loading,setLoading]=useState(true)
    const [error, setError] = useState(null)
    const getRelated = async () => { 
        try{
        const res = await getRelatedmovies(id); 
        setMovies(res); }
        catch(error){
    setError(error)
}
        finally{
            setLoading(false)
        }
    }; 
 
    useEffect(() => { 
        getRelated(); 
    }, [id]); 
    if(loading){
        return<Loading/>
    }
    if (error) {
    return <ErrorMessage />
}
    return ( 
        <> 
            {movies && 
                <div className="w-full flex flex-col gap-5"> 
                    <h2 className="text-xl sm:text-2xl font-bold">
                        Other Movies We Recommend You Watch
                    </h2> 
 
                    <div className="w-full flex gap-5 overflow-x-auto"> 
                        {movies.slice(0,9).map((movie) => ( 
                            <div key={movie.id} className="w-[200px] h-[300px] sm:w-[300px] sm:h-[300px] shrink-0"> 
                                <MovieCard 
                                    children={movie} 
                                    related={true} 
                                    style="items-center border border-[var(--color-blue)] pb-8" 
                                    imageStyle="w-[40%] h-[150px] mx-auto aspect-auto rounded-none" 
                                    contentStyle="items-center" 
                                    titleStyle="text-center" 
                                    buttonStyle="!w-[120px] mt-auto" 
                                /> 
                            </div> 
                        ))} 
                    </div> 
                </div> 
            } 
        </> 
    ); 
}; 
 
export default RelatedMovies;