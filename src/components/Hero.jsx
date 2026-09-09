import { IMAGE_BASE_URL, getNowPlayingMovies } from "../services/tmdb";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Showtimes from "./Showtimes";
import MovieDetails from "../pages/MovieDetails";
import { useNavigate } from "react-router-dom";
const Hero = () => {
    const [movies, setMovies] = useState([]);
    const [Currentindex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const x=useNavigate()

    const getNowPlaying = async () => {
        try {
            const res = await getNowPlayingMovies();
            setMovies(res);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNowPlaying();
    }, []);

    useEffect(() => {
        if (movies.length === 0) return;

        const nextIndex =
            (Currentindex + 1) % Math.min(movies.length, 8);

        const img = new Image();

        img.src =
            `${IMAGE_BASE_URL}/w1280${movies[nextIndex].backdrop_path}`;
    }, [Currentindex, movies]);

    const totalMovies = Math.min(movies.length, 8);

    const previousIndex =
        (Currentindex - 1 + totalMovies) % totalMovies;

    const nextIndex =
        (Currentindex + 1) % totalMovies;

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage />;
    }

    if (movies.length === 0) {
        return <ErrorMessage />;
    }

    return (
        <>
            {movies.length > 0 && (
                <div className="w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] relative overflow-hidden bg-black">

                    {/* Previous */}
                    <div className="
                        absolute
                        left-[-45%]
                        sm:left-[-32%]
                        md:left-[-22%]
                        lg:left-[-18%]
                        top-1/2
                        -translate-y-1/2
                        w-[65%]
                        sm:w-[60%]
                        md:w-[55%]
                        lg:w-[50%]
                        aspect-video
                        z-0
                    ">
                        <img
                            src={`${IMAGE_BASE_URL}/w1280${movies[previousIndex].backdrop_path}`}
                            className="w-full h-full object-cover rounded-xl"
                        />

                        <div className="absolute inset-0 bg-black/60 rounded-xl" />
                    </div>

                    {/* Next */}
                    <div className="
                        absolute
                        right-[-45%]
                        sm:right-[-32%]
                        md:right-[-22%]
                        lg:right-[-18%]
                        top-1/2
                        -translate-y-1/2
                        w-[65%]
                        sm:w-[60%]
                        md:w-[55%]
                        lg:w-[50%]
                        aspect-video
                        z-0
                    ">
                        <img
                            src={`${IMAGE_BASE_URL}/w1280${movies[nextIndex].backdrop_path}`}
                            className="w-full h-full object-cover rounded-xl"
                        />

                        <div className="absolute inset-0 bg-black/60 rounded-xl" />
                    </div>

                    <div className="
                        absolute
                        left-1/2
                        -translate-x-1/2
                        top-1/2
                        -translate-y-1/2
                        w-[94%]
                        sm:w-[88%]
                        md:w-[82%]
                        lg:w-[78%]
                        aspect-video
                        z-10
                        overflow-hidden
                        rounded-xl
                    ">

                        <img
                            key={movies[Currentindex].id}
                            src={`${IMAGE_BASE_URL}/w1280${movies[Currentindex].backdrop_path}`}
                            className="absolute inset-0 w-full h-full object-cover hero-animation"
                        />

                        <div className="absolute inset-0 bg-black/50" />

                        <button
                            onClick={() =>
                                setCurrentIndex(
                                    (prevIndex) =>
                                        (prevIndex - 1 + totalMovies) % totalMovies
                                )
                            }
                            className="
                                absolute
                                left-2
                                sm:left-3
                                md:left-5
                                top-1/2
                                -translate-y-1/2
                                z-20
                                text-white
                                bg-black/40
                                p-1.5
                                sm:p-2
                                rounded-full
                                hover:bg-[var(--color-accent)]
                                hover:text-white
                                transition
                            "
                        >
                            <ChevronLeft
                                size={25}
                                className="sm:w-[30px] sm:h-[30px]"
                            />
                        </button>

                        <div className="
                            relative
                            z-10
                            max-w-[82%]
                            sm:max-w-[80%]
                            md:max-w-[75%]
                            lg:max-w-[70%]
                            mx-auto
                            h-full
                            flex
                            flex-col
                            justify-center
                            text-white
                        ">

                            <h2 className="
                                text-2xl
                                sm:text-3xl
                                md:text-5xl
                                lg:text-6xl
                                font-extrabold
                                w-full
                                sm:w-[450px]
                                md:w-[500px]
                                lg:w-[550px]
                            ">
                                {movies[Currentindex].title}
                            </h2>

                            <p className="
                                line-clamp-3
                                sm:line-clamp-4
                                mt-3
                                sm:mt-5
                                text-xs
                                sm:text-sm
                                lg:w-[40%]
                            ">
                                {movies[Currentindex].overview}
                            </p>

                            <div className="flex mt-3 sm:mt-5 gap-2 sm:gap-4">

                                <button className="
                                    bg-[var(--color-accent)]
                                    hover:bg-[var(--color-accent-dark)]
                                    text-white
                                    p-2
                                    sm:p-3
                                    text-sm
                                    sm:text-lg
                                    md:text-xl
                                    font-extrabold
                                    rounded-2xl
                                    transition cursor-pointer
                                " onClick={()=>x(`/movies/${movies[Currentindex].id}`)}>
                                    Book Tickets
                                </button>

                                <button className="
                                    p-2
                                    sm:p-3
                                    text-sm
                                    sm:text-lg
                                    md:text-xl
                                    font-extrabold
                                    rounded-2xl
                                    border
                                    border-[var(--color-blue)]
                                    text-white
                                    hover:bg-[var(--color-accent)]
                                    transition cursor-pointer
                                " onClick={()=>x(`/movies/${movies[Currentindex].id}`)}>
                                    More Info
                                </button>

                            </div>
                        </div>

                        <button
                            onClick={() =>
                                setCurrentIndex(
                                    (prevIndex) =>
                                        (prevIndex + 1) % totalMovies
                                )
                            }
                            className="
                                absolute
                                right-2
                                sm:right-3
                                md:right-5
                                top-1/2
                                -translate-y-1/2
                                z-20
                                text-white
                                bg-black/40
                                p-1.5
                                sm:p-2
                                rounded-full
                                hover:bg-[var(--color-accent)]
                                hover:text-white
                                transition
                            "
                        >
                            <ChevronRight
                                size={25}
                                className="sm:w-[30px] sm:h-[30px]"
                            />
                        </button>

                    </div>

                    <div className="
                        absolute
                        bottom-4
                        sm:bottom-5
                        md:bottom-6
                        left-1/2
                        -translate-x-1/2
                        flex
                        gap-1.5
                        sm:gap-2
                        z-30
                    ">
                        {movies.slice(0, 8).map((movie, index) => (
                            <button
                                key={movie.id}
                                onClick={() => setCurrentIndex(index)}
                                className={`
                                    h-1.5
                                    sm:h-2
                                    rounded-full
                                    transition-all
                                    ${
                                        index === Currentindex
                                            ? "w-5 sm:w-6 bg-[var(--color-accent)]"
                                            : "w-1.5 sm:w-2 bg-white/50"
                                    }
                                `}
                            />
                        ))}
                    </div>

                </div>
            )}
        </>
    );
};

export default Hero;