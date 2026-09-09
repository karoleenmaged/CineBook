import { useEffect, useState } from "react";
import { getMoviedetails, IMAGE_BASE_URL } from "../services/tmdb";
import SeatGrid from "../components/SeatGrid";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingStepper from "../components/BookingStepper";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage"

const SelectSeats = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const x = useNavigate();

    const booking = localStorage.getItem("booking");
    const bookinginfo = booking ? JSON.parse(booking) : null;
    const bookingkey = bookinginfo?.bookingId;

    const [Moviedetails, setMovieDetails] = useState(null);

    const [selectedSeats, setSelectedSeats] = useState(() => {
        if (!bookingkey) return [];

        const saved = localStorage.getItem(`selectedseats_${bookingkey}`);
        return saved ? JSON.parse(saved) : [];
    });

    const rows = ["A", "B", "C", "D", "E"];
    const seatsPerRow = 8;
    const occupiedSeats = ["A3", "B5", "B8", "E6", "E4", "E5"];

    const [seats, setSeats] = useState(() => {
        if (!bookingkey) return [];

        const saved = localStorage.getItem(`seats_${bookingkey}`);

        if (saved) {
            return JSON.parse(saved);
        }

        const seats = [];

        rows.forEach((row) => {
            for (let i = 1; i <= seatsPerRow; i++) {
                seats.push({
                    id: `${row}${i}`,
                    row: row,
                    number: i,
                    status: occupiedSeats.includes(`${row}${i}`)
                        ? "occupied"
                        : "available"
                });
            }
        });

        return seats;
    });

    const selectseat = (selectedSeat) => {
        if (selectedSeat.status === "occupied") return;

        if (selectedSeat.status === "available") {
            setSelectedSeats([...selectedSeats, selectedSeat.id]);
        }

        if (selectedSeat.status === "selected") {
            setSelectedSeats(
                selectedSeats.filter((seat) => seat !== selectedSeat.id)
            );
        }

        setSeats(
            seats.map((seat) =>
                seat.id === selectedSeat.id
                    ? {
                        ...seat,
                        status:
                            seat.status === "available"
                                ? "selected"
                                : "available"
                    }
                    : seat
            )
        );
    };

    useEffect(() => {
        if (!bookingkey) return;

        localStorage.setItem(
            `seats_${bookingkey}`,
            JSON.stringify(seats)
        );

        localStorage.setItem(
            `selectedseats_${bookingkey}`,
            JSON.stringify(selectedSeats)
        );
    }, [seats, selectedSeats, bookingkey]);

    useEffect(() => {
        if (!bookinginfo) {
            setLoading(false);
            return;
        }

        const getdetails = async () => {
            try {
                const res = await getMoviedetails(bookinginfo.movieid);
                setMovieDetails(res);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getdetails();
    }, [bookinginfo]);

    if (!bookinginfo) {
        return <ErrorMessage />;
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage />;
    }

    return (
        <>
            {
                Moviedetails &&

                <div className="flex flex-col">
                    <BookingStepper currentstep={0} />

                    <div className="lg:w-[90%]
                       w-full
                        max-w-6xl
                        mx-auto
                        flex
                        flex-col
                        lg:flex-row
                        gap-10
                        p-4 lg:p-8">

                        <div className="w-full items-center mx-auto lg:w-[35%] lg:items-start flex flex-col gap-4">

                            <img
                                src={`${IMAGE_BASE_URL}/w300/${Moviedetails.poster_path}`}
                                className="w-full max-w-[300px] h-auto lg:w-80"
                            ></img>

                            <h2 className="text-xl capitalize font-bold">
                                {Moviedetails.title}
                            </h2>

                            <h2>{bookinginfo.cinema}</h2>

                            <h2>
                                {new Date(bookinginfo.day).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </h2>

                            <h2>{bookinginfo.time}</h2>

                        </div>

                        <div className="w-full h-px lg:w-px lg:h-120 bg-[var(--color-blue-dark)] lg:ml-20"></div>

                        <div className="w-full lg:w-[65%] mx-auto">
                            <SeatGrid
                                seats={seats}
                                rows={rows}
                                selectseat={selectseat}
                            />
                        </div>

                    </div>

                    <div className="w-[400px] max-w-full mx-auto flex flex-col gap-4">

                        <div className="flex gap-2">

                            <h2 className="font-bold shrink-0">
                                Selected Seats:
                            </h2>

                            <div>
                                <h2>
                                    {selectedSeats.length > 0
                                        ? selectedSeats.join(", ")
                                        : "No seats selected"}
                                </h2>
                            </div>

                        </div>

                        <h2>
                            {`${selectedSeats.length} Seats × EGP150 = ${selectedSeats.length * 150}`}
                        </h2>

                        <button
                            disabled={selectedSeats.length === 0}
                            onClick={() => x("/Fooddrinks")}
                            className="flex items-center justify-center gap-2
                                       bg-[var(--color-accent)] text-white
                                       px-6 py-3 rounded-xl font-semibold
                                       transition-all duration-300
                                       hover:bg-[var(--color-accent-dark)] hover:scale-105
                                       shadow-[0_0_20px_rgba(143,48,69,0.2)]
                                       hover:cursor-pointer
                                       disabled:opacity-50
                                       disabled:cursor-not-allowed
                                       disabled:hover:scale-100"
                        >
                            Continue
                            <ArrowRight size={20} />
                        </button>

                    </div>

                </div>
            }
        </>
    );
};

export default SelectSeats;