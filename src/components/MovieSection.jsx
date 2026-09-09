import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getCertification } from "../services/tmdb";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MovieSection = ({ movies, title, limit, showViewAll, upcoming }) => {
    const [certification, setCertification] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovieCertification = async () => {
            try {
                const allcertification = await Promise.all(
                    movies.map(async (movie) => {
                        const res = await getCertification(movie.id);
                        return res;
                    })
                );

                setCertification(allcertification);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getMovieCertification();
    }, [movies]);

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
        <div className="flex flex-col gap-4 mt-20 w-[80%] mx-auto">

            <div className="flex gap-2 items-center justify-between">

                <h2 className="text-2xl sm:text-3xl lg:text-4xl pb-3 text-center font-bold">
                    {title}
                </h2>

                {showViewAll && (
                    <Link
                        to="/movies"
                        className="hover:text-[var(--color-accent)] flex items-center gap-1"
                    >
                        View All
                        <ArrowRight size={20} />
                    </Link>
                )}

            </div>

            <div className="w-[100%] h-[1px] bg-[var(--color-blue-dark)]"></div>

            <div className="w-[100%] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-7 gap-x-7">

                {
                    limit ? (
                        movies.slice(0, limit).map((movie, index) =>
                            <MovieCard
                                children={movie}
                                key={movie.id}
                                certification={certification[index]}
                                upcoming={upcoming}
                            />
                        )
                    ) : (
                        movies.map((movie, index) =>
                            <MovieCard
                                children={movie}
                                key={movie.id}
                                certification={certification[index]}
                                upcoming={upcoming}
                            />
                        )
                    )
                }

            </div>

        </div>
    )
}

export default MovieSection;