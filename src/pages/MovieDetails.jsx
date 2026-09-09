import { useEffect, useState } from "react";
import { getMoviedetails,getMovievideo,IMAGE_BASE_URL } from "../services/tmdb";
import { useParams, useLocation  } from "react-router-dom";
import RelatedMovies from "../components/RelatedMovies";
import Showtimes from "../components/Showtimes";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage"
const MovieDetails=()=>{
    const[movieDetails,setMovieDetails]=useState(null)
    const[movieVideo,setMovieVideo]=useState(null)
    const[loading,setLoading]=useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()
    const location = useLocation()
const isUpcoming = location.state?.upcoming
    const getdetails=async()=>{
        try{
        const res=await getMoviedetails(id)
        setMovieDetails(res)
        }catch(error){
           setError(error)
        }
    }

    const getvideo=async()=>{
        try{
        const res=await getMovievideo(id)
        setMovieVideo(res)}
        catch(error){
    setError(error)
}
    }

    useEffect(()=>{
        const loadData = async () => {
        try {
            await Promise.all([
                getdetails(),
                getvideo()
            ]);
        }finally {
            setLoading(false);
        }
    };

    loadData();
    },[id])

    const language={
        'en':'English',
        'ko':'Korean',
        'ja':'Japanese',
        'fr':'French'
    }

    const trailer =
    movieVideo?.results.find(
        (video) => video.type === "Trailer" && video.official
    ) ||
    movieVideo?.results.find(
        (video) => video.type === "Trailer"
    )

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
    }
    if(loading){
        return <Loading/>
    }
    if (error) {
    return <ErrorMessage />
}
    return(
        <>
        {
            movieDetails&&
        <div className="w-full p-10 lg:w-[75%] mx-auto flex flex-col xl:p-30 gap-8">

            <h2 className="lg:text-5xl text-3xl font-bold">{movieDetails.title}</h2>

            <div className="grid grid-cols-[3fr_2fr] lg:grid-cols-[2fr_1fr] gap-5">

                {trailer && (
                <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    className="w-full h-[200px] lg:h-[400px]" 
                    allowFullScreen 
                ></iframe>)}

                <img 
                    src={`${IMAGE_BASE_URL}/w500${movieDetails.poster_path}`}
                    className="w-full h-[200px] lg:h-[400px] object-cover"
                />  

            </div> 
            {!isUpcoming&&
            <button 
                className="bg-[var(--color-accent)] text-lg font-bold rounded-lg w-full sm:w-[300px] mx-auto  px-2 py-1 text-white hover:bg-[var(--color-accent-dark)] transition-all duration-200 cursor-pointer" 
                onClick={()=>{ 
                    document.getElementById("showtimes").scrollIntoView({behavior:'smooth'}) 
                }}
            >
                Show Times
            </button> 
}

            <div className="w-full h-[1px] border-b border-dotted"></div> 

            <div className="w-full flex lg:flex-row justify-between gap-8 flex-col"> 

                <div className="flex flex-col gap-5"> 

                    <div className="flex gap-1 flex-wrap">
    <span className="font-bold shrink-0">Type:</span>

    {movieDetails.genres.map((genre, index) => {
        return (
            <span key={genre.id}>
                {genre.name}
                {index < movieDetails.genres.length - 1 && "."}
            </span>
        )
    })}
</div>

                    <h2>
                        <span className="font-bold">Runtime:</span> {movieDetails.runtime}
                    </h2> 

                    <h2>
                        <span className="font-bold">Release date:</span> {formatDate(movieDetails.release_date)}
                    </h2> 

                    <h2>
                        <span className="font-bold">Language:</span> {language[movieDetails.original_language]||movieDetails.original_language}
                    </h2> 

                </div> 

                <div> 
                    <p className="flex flex-1 font-semibold">{movieDetails.overview}</p> 
                </div> 

            </div> 

            <div className="w-full h-[1px] border-[var(--color-muted)] border-b border-dotted"></div> 

            {!isUpcoming && (
    <>
        <RelatedMovies id={id}/> 

        <div className="w-full h-[1px] border-gray-400 border-b border-dotted"></div> 

        <div id="showtimes"> 
            <Showtimes 
                title={movieDetails.title} 
                id={movieDetails.id}
            /> 
        </div>
    </>
)}
 
        </div>
} 
</>
    )
}

export default MovieDetails