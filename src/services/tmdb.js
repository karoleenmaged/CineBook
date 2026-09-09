import axios from "axios";
const BASE_URL="https://api.themoviedb.org/3"
export const IMAGE_BASE_URL="https://image.tmdb.org/t/p"
export default BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const getNowPlayingMovies = async () => {
const response = await axios.get(`${BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`);
return response.data.results
}
export const getUpcomingMovies=async()=>{
    const response=await axios.get(`${BASE_URL}/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`)
    return response.data.results
}
export const getCertification=async(movieid)=>{
    const response = await axios.get(`${BASE_URL}/movie/${movieid}/release_dates?api_key=${API_KEY}`);
     const egypt = response.data.results.find(
        (country) => country.iso_3166_1 === "EG"
    );
    if (!egypt || egypt.release_dates.length === 0) {
    return "";
}
    return egypt.release_dates[0].certification;
}
export const getMoviedetails=async(movieid)=>{
    const response=await axios.get(`${BASE_URL}/movie/${movieid}?language=en-US&api_key=${API_KEY}`)
    return response.data;
}
export const getMovievideo=async(movieid)=>{
    const response=await axios.get(`${BASE_URL}/movie/${movieid}/videos?language=en-US&api_key=${API_KEY}`)
    return response.data;
}
export const getRelatedmovies=async(movieid)=>{
    const response=await axios.get(`${BASE_URL}/movie/${movieid}/similar?language=en-US&page=1&api_key=${API_KEY}`)
    return response.data.results;
}