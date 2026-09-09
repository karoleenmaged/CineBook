import FoodCard from "../components/FoodCard";
import popcorn from "../assets/popcorn.avif";
import Burger from "../assets/Burger.avif";
import Chips from "../assets/Chips.avif";
import Hotdog from "../assets/Hotdog.avif";
import Juice from "../assets/Juice.avif";
import Nachos from "../assets/Nachos.avif";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingStepper from "../components/BookingStepper";
import ErrorMessage from "../components/ErrorMessage"

const FoodDrinks = () => {

    const x = useNavigate();

    const booking = localStorage.getItem("booking");
    const bookinginfo = booking ? JSON.parse(booking) : null;

    const bookingkey = bookinginfo?.bookingId;

    const selectedSeats = JSON.parse(
        localStorage.getItem(`selectedseats_${bookingkey}`) || "[]"
    );

    const foods = [
        {
            id: 1,
            name: "Popcorn",
            price: 80,
            image: popcorn
        },
        {
            id: 2,
            name: "Chips",
            price: 30,
            image: Chips
        },
        {
            id: 3,
            name: "Burger",
            price: 150,
            image: Burger
        },
        {
            id: 4,
            name: "Hot Dog",
            price: 100,
            image: Hotdog
        },
        {
            id: 5,
            name: "Nachos",
            price: 60,
            image: Nachos
        },
        {
            id: 6,
            name: "Juice",
            price: 40,
            image: Juice
        }
    ];

    const [foodCounts, setFoodCounts] = useState(() => {

        if (!bookingkey) return {};

        const saved = {};

        foods.forEach((food) => {

            const count = localStorage.getItem(
                `totalcount_${bookingkey}_${food.id}`
            );

            saved[food.id] = count ? Number(count) : 0;

        });

        return saved;
    });

    const handlecount = (id, operation) => {

        setFoodCounts((prev) => {

            const newCount =
                operation === "+"
                    ? prev[id] + 1
                    : Math.max(prev[id] - 1, 0);

            localStorage.setItem(
                `totalcount_${bookingkey}_${id}`,
                newCount
            );

            const newCounts = {
                ...prev,
                [id]: newCount
            };

            const newTotal = foods.reduce((total, food) => {
                return total + food.price * (newCounts[food.id] || 0);
            }, 0);

            localStorage.setItem(
                `totalfoods_${bookingkey}`,
                newTotal
            );

            return newCounts;

        });
    };

    const totalFoods = foods.reduce((total, food) => {

        return total + food.price * (foodCounts[food.id] || 0);

    }, 0);

    if (!bookinginfo) {
        return <ErrorMessage />;
    }

    if (selectedSeats.length === 0) {
        return <ErrorMessage />;
    }

    const totaltickets = selectedSeats.length * 150;

    return (
        <>
            <BookingStepper currentstep={1}/>

            <div className="flex flex-col w-[90%] max-w-6xl mx-auto gap-8 min-h-screen py-6">

                <div className="flex flex-col items-center">

                    <h2 className="text-2xl font-extrabold">
                        Food & Drinks
                    </h2>

                    <h2 className="text-xl font-bold">
                        Complete your movie experience
                    </h2>

                </div>

                <div className="flex lg:justify-between lg:flex-row flex-col">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full lg:w-[55%] mx-auto">

                        {foods.map((food) => (

                            <FoodCard
                                key={food.id}
                                title={food.name}
                                img={food.image}
                                price={food.price}
                                id={food.id}
                                count={foodCounts[food.id]}
                                handlecount={handlecount}
                            />

                        ))}

                    </div>

                    <div className="flex flex-col lg:w-[35%] gap-5 w-full lg:mx-0 mx-auto my-8 lg:my-0">

                        <div className="bg-[var(--color-accent-dark)] p-6 rounded-2xl border border-[rgba(169,216,232,0.2)] shadow-lg text-white">

                            <h2 className="text-2xl font-extrabold text-center">
                                Your Order
                            </h2>

                            <div className="flex flex-col gap-2 mt-5">

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

                            <div className="flex justify-between items-center mt-5">

                                <span>
                                    Tickets ({selectedSeats.length})
                                </span>

                                <span className="font-semibold">
                                    EGP {totaltickets}
                                </span>

                            </div>

                            <div className="flex justify-between items-center mt-3">

                                <span>
                                    Food & Drinks
                                </span>

                                <span className="font-semibold">
                                    EGP {totalFoods}
                                </span>

                            </div>

                            <div className="w-full h-px bg-white/10 my-4"></div>

                            <div className="flex justify-between items-center">

                                <span className="text-lg font-bold">
                                    Total
                                </span>

                                <span className="text-xl font-extrabold text-[var(--color-blue)]">
                                    EGP {totalFoods + totaltickets}
                                </span>

                            </div>

                        </div>

                        <button
                            onClick={() => x("/Payment")}
                            className="flex items-center justify-center gap-2 w-full
                            bg-[var(--color-accent)] text-white
                            px-6 py-3 rounded-xl font-semibold
                            transition-all duration-300
                            hover:bg-[var(--color-accent-dark)] hover:scale-105
                            shadow-[0_0_20px_rgba(143,48,69,0.2)]
                            hover:cursor-pointer"
                        >

                            Continue to Payment

                            <ArrowRight size={20} />

                        </button>

                    </div>

                </div>

            </div>
        </>
    );
};

export default FoodDrinks;