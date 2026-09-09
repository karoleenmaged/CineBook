import { useEffect, useState } from "react";
import cinemas from "../data/showtimes";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

const Showtimes = ({ title, id }) => {
    const today = new Date();
    const x = useNavigate();
    const [days, setDays] = useState([]);
    const [error, setError] = useState(null);

    const [selectedDay, setSelectedDay] = useState(() => {
        try {
            const saved = localStorage.getItem(`day_${id}`);

            return saved || today.toISOString().split("T")[0];
        } catch (error) {
            console.error("Error loading selected day:", error);
            return today.toISOString().split("T")[0];
        }
    });

    useEffect(() => {
        try {
            const newDays = [];

            for (let i = 0; i < 7; i++) {
                const date = new Date(today);

                date.setDate(date.getDate() + i);

                newDays.push(date);
            }

            setDays(newDays);
        } catch (error) {
            setError(error);
        }
    }, []);

    const changeDay = (day) => {
        try {
            const formattedDay = day.toISOString().split("T")[0];

            setSelectedDay(formattedDay);
            localStorage.setItem(`day_${id}`, formattedDay);
        } catch (error) {
            console.error("Error changing day:", error);
            setError(error);
        }
    };

    const handleBooking = (cinema, time) => {
        try {
            const booking = {
                bookingId: crypto.randomUUID(),
                day: selectedDay,
                cinema: cinema.name,
                time: time,
                movieid: id,
                title: title
            };

            localStorage.setItem("booking", JSON.stringify(booking));

            x("/booking");
        } catch (error) {
            console.error("Error creating booking:", error);
            setError(error);
        }
    };

    if (error) {
        return <ErrorMessage />;
    }

    return (
        <div className="flex flex-col w-full my-6">

            <h2 className="text-lg lg:text-2xl font-bold">
                {title} - Show Times
            </h2>

            <div className="w-full">
                <nav className="flex text-xl justify-start my-4 overflow-x-auto gap-4 sm:justify-between sm:overflow-visible">

                    {days.map((day, index) => {

                        const label =
                            index === 0
                                ? "Today"
                                : index === 1
                                ? "Tomorrow"
                                : day.toLocaleString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    weekday: "short"
                                });

                        const isSelected =
                            day.toISOString().split("T")[0] === selectedDay;

                        return (
                            <li
                                key={index}
                                onClick={() => changeDay(day)}
                                className={`list-none whitespace-nowrap shrink-0 ${
                                    isSelected
                                        ? "text-[var(--color-accent)] font-bold"
                                        : "text-[var(--color-muted)] hover:underline cursor-pointer"
                                }`}
                            >
                                {label}
                            </li>
                        );
                    })}

                </nav>
            </div>

            <div
                key={selectedDay}
                className="flex flex-col gap-10 my-4 animate-[fadeIn_0.3s_ease-in-out]"
            >

                {
                    cinemas.map((cinema, index) =>
                        <div key={cinema.id} className="flex flex-col gap-3">

                            <h2 className="font-bold text-xl">
                                {cinema.name}
                            </h2>

                            <h2 className="font-semibold text-lg">
                                Standard
                            </h2>

                            <div className="flex gap-4 flex-wrap">

                                {
                                    cinema.times.map((time) =>
                                        <button
                                            key={time}
                                            className="relative bg-[var(--color-accent)] w-30 p-1 cursor-pointer text-white rounded transition-all duration-100 hover:bg-[var(--color-accent-dark)]"
                                            onClick={() => handleBooking(cinema, time)}
                                        >

                                            <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></span>

                                            {time}

                                        </button>
                                    )
                                }

                            </div>

                            {index !== cinemas.length - 1 && (
                                <div className="h-1 bg-[var(--color-blue)] w-[10%]"></div>
                            )}

                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default Showtimes;