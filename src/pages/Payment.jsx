import { useEffect, useState } from "react";
import { getMoviedetails } from "../services/tmdb";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "../components/PaymentMethod";
import BookingStepper from "../components/BookingStepper";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage"

const Payment = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const x = useNavigate();

    const [movieDetails, setMovieDetails] = useState(null);

    const [form, setForm] = useState({
        CardholderName: "",
        CardNumber: "",
        Expiry: "",
        Cvv: ""
    });

    const booking = localStorage.getItem("booking");

    let bookinginfo = null;

    try {
        bookinginfo = booking ? JSON.parse(booking) : null;
    }
    catch (error) {
        console.error("Error parsing booking data:", error);
        bookinginfo = null;
    }

    const bookingkey = bookinginfo?.bookingId;

    const getdetails = async () => {
        if (!bookinginfo?.movieid) {
            setLoading(false);
            return;
        }

        try {
            const res = await getMoviedetails(bookinginfo.movieid);
            setMovieDetails(res);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setLoading(false);
        }
    };

    const totalFood = Number(
        localStorage.getItem(`totalfoods_${bookingkey}`) || 0
    );

    let selectedSeats = [];

    try {
        const savedSeats = localStorage.getItem(
            `selectedseats_${bookingkey}`
        );

        selectedSeats = savedSeats ? JSON.parse(savedSeats) : [];

        if (!Array.isArray(selectedSeats)) {
            selectedSeats = [];
        }
    }
    catch (error) {
        console.error("Error parsing selected seats:", error);
        selectedSeats = [];
    }

    const totaltickets = selectedSeats.length * 150;

    const [paymentMethod, setPaymentMethod] = useState(() => {
        if (!bookingkey) return "cash";

        const saved = localStorage.getItem(
            `paymentmethod_${bookingkey}`
        );

        return saved || "cash";
    });

    useEffect(() => {
        if (!bookingkey) return;

        localStorage.setItem(
            `paymentmethod_${bookingkey}`,
            paymentMethod
        );
    }, [paymentMethod, bookingkey]);

    useEffect(() => {
        getdetails();
    }, [bookinginfo?.movieid]);

    const handlepayment = (e) => {
    e.preventDefault();

    if (
        !form.CardNumber ||
        !form.CardholderName ||
        !form.Cvv ||
        !form.Expiry
    ) {
        toast.error("Please fill all data!");
        return;
    }

    x("/confirmation");
};

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
            <BookingStepper currentstep={2} />

            <div className="flex flex-col w-[90%] max-w-6xl mx-auto gap-8 min-h-screen py-6">

                <div className="flex flex-col">

                    <h2 className="text-2xl font-extrabold">
                        Payment
                    </h2>

                    <h2 className="text-xl font-bold">
                        Complete your booking
                    </h2>

                </div>

                <div className="w-full justify-between flex flex-col lg:flex-row">

                    <PaymentMethod
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        setForm={setForm}
                        handlepayment={handlepayment}
                        x={x}
                    />

                    <div className="lg:w-[35%] lg:my-0 w-[80%] my-8 mx-auto flex flex-col gap-3 bg-[var(--color-accent-dark)] p-6 rounded-2xl border border-[rgba(169,216,232,0.2)] shadow-lg text-white">

                        <h2 className="font-bold text-2xl">
                            Booking Summary
                        </h2>

                        <div className="flex flex-col">
                            <h2>{movieDetails?.title}</h2>
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

                        <div className="flex flex-col gap-2 mt-2">

                            <span className="text-sm">
                                Selected Seats
                            </span>

                            <div className="flex flex-wrap gap-2">

                                {selectedSeats.map((seat) => (
                                    <span
                                        key={seat}
                                        className="bg-[var(--color-blue)]/20 text-[var(--color-blue-dark)] px-3 py-1 rounded-lg text-sm font-semibold"
                                    >
                                        {seat}
                                    </span>
                                ))}

                            </div>

                        </div>

                        <div className="flex justify-between items-center mt-2">

                            <span>
                                Tickets ({selectedSeats.length})
                            </span>

                            <span className="font-semibold">
                                EGP {totaltickets}
                            </span>

                        </div>

                        <div className="flex justify-between items-center mt-2">

                            <span>
                                Food & Drinks
                            </span>

                            <span className="font-semibold">
                                EGP {totalFood}
                            </span>

                        </div>

                        <div className="w-full h-px bg-white/10 my-2"></div>

                        <div className="flex justify-between items-center">

                            <span className="text-lg font-bold">
                                Total
                            </span>

                            <span className="text-xl font-extrabold text-[var(--color-blue)]">
                                EGP {totalFood + totaltickets}
                            </span>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default Payment;