const PaymentMethod = ({
    paymentMethod,
    setPaymentMethod,
    setForm,
    handlepayment,
    x
}) => {
    return (
        <div className="w-full lg:w-[55%] flex flex-col gap-4">

            <h2 className="font-bold text-2xl">
                Payment Method
            </h2>

            <div className="flex flex-col gap-3">

                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="radio"
                        name="payment"
                        value="card"
                        className="accent-[var(--color-accent)]"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        checked={paymentMethod === "card"}
                    />

                    <span>Credit / Debit Card</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="radio"
                        name="payment"
                        value="cash"
                        className="accent-[var(--color-accent)]"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        checked={paymentMethod === "cash"}
                    />

                    <span>Cash</span>
                </label>

            </div>

            {paymentMethod === "card" && (
                <form
                    onSubmit={handlepayment}
                    className="flex flex-col gap-4"
                >

                    <div className="flex flex-col gap-2">
                        <label>Cardholder Name</label>

                        <input
                            type="text"
                            name="cc-name"
                            autoComplete="cc-name"
                            required
                            className="border border-[rgba(104,114,122,0.25)] rounded-xl p-1 bg-[var(--color-card)] text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-2 focus:outline-[var(--color-accent)]"
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    CardholderName: e.target.value
                                }))
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Card Number</label>

                        <input
                            type="text"
                            name="cc-number"
                            autoComplete="cc-number"
                            inputMode="numeric"
                            required
                            pattern="[0-9]{16}"
                            maxLength={16}
                            className="border border-[rgba(104,114,122,0.25)] rounded-xl p-1 bg-[var(--color-card)] text-[var(--color-text)] focus:outline-2 focus:outline-[var(--color-accent)]"
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    CardNumber: e.target.value
                                }))
                            }
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">

                        <div className="flex flex-col gap-2">
                            <label>Expiry</label>

                            <input
                                type="text"
                                name="cc-exp"
                                autoComplete="cc-exp"
                                inputMode="numeric"
                                required
                                placeholder="MM / YY"
                                pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                                className="border border-[rgba(104,114,122,0.25)] rounded-xl p-1 w-full sm:w-50 bg-[var(--color-card)] text-[var(--color-text)] focus:outline-2 focus:outline-[var(--color-accent)]"
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        Expiry: e.target.value
                                    }))
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>CVV</label>

                            <input
                                type="text"
                                name="cc-csc"
                                autoComplete="cc-csc"
                                inputMode="numeric"
                                required
                                pattern="[0-9]{3}"
                                maxLength={3}
                                className="border border-[rgba(104,114,122,0.25)] rounded-xl p-1 w-full sm:w-50 bg-[var(--color-card)] text-[var(--color-text)] focus:outline-2 focus:outline-[var(--color-accent)]"
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        Cvv: e.target.value
                                    }))
                                }
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 
                        bg-[var(--color-accent)] text-white 
                        px-6 py-3 rounded-xl font-semibold 
                        transition-all duration-300 
                        hover:bg-[var(--color-accent-dark)] hover:scale-105 
                        shadow-[0_0_20px_rgba(143,48,69,0.2)] 
                        hover:cursor-pointer lg:w-50 w-full"
                    >
                        Pay Now
                    </button>

                </form>
            )}

            {paymentMethod === "cash" && (
                <div>
                    <button
                        onClick={() => x("/confirmation")}
                        className="flex items-center justify-center gap-2 
                        bg-[var(--color-accent)] text-white 
                        px-6 py-3 rounded-xl font-semibold 
                        transition-all duration-300 
                        hover:bg-[var(--color-accent-dark)] hover:scale-105 
                        shadow-[0_0_20px_rgba(143,48,69,0.2)] 
                        hover:cursor-pointer lg:w-50 w-full"
                    >
                        Confirm Booking
                    </button>
                </div>
            )}

        </div>
    );
};

export default PaymentMethod;