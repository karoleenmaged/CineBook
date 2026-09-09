import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [input, setInput] = useState("")
    const [message, setMessage] = useState("")
    const x = useNavigate()

    const checkvarify = (e) => {
        e.preventDefault()

        if (!form.name || !form.email || !form.password || !input) {
            toast.error("Fill all fields!")
            return
        }
        if(form.password.length<6){
        setMessage("password must be at least 6 characters!")
        return
        }
        if (input !== form.password) {
            setMessage("Passwords do not match")
            return
        }

        setMessage("")
        const oldUser=JSON.parse(localStorage.getItem('user'))
        if(oldUser&&oldUser.email===form.email){
            toast.error('This email is already registered!')
            return
        }
        localStorage.setItem("user", JSON.stringify(form))

        toast.success("Account created successfully!")

        x("/login")
    }

    return (
        <div className="w-[90%] sm:w-[70%] md:w-[55%] lg:w-[40%] w-full mx-auto py-14">
            <div className="py-12 px-4 flex flex-col bg-[var(--color-bg)] rounded-2xl gap-4">

                <h2 className="text-2xl text-center">
                    Create Your Account
                </h2>

                <form
                    onSubmit={checkvarify}
                    className="flex flex-col gap-3 items-start"
                >

                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        className="rounded-xl w-full px-2 py-1 border-2 border-[var(--color-blue-dark)] focus:outline-0 focus:ring-2 focus:ring-[var(--color-blue-dark)] transition-all duration-200"
                        onChange={(e) => {
                            setForm((prev) => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }}
                    />

                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="rounded-xl w-full px-2 py-1 border-2 border-[var(--color-blue-dark)] focus:outline-0 focus:ring-2 focus:ring-[var(--color-blue-dark)] transition-all duration-200"
                        onChange={(e) => {
                            setForm((prev) => ({
                                ...prev,
                                email: e.target.value
                            }))
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="rounded-xl w-full px-2 py-1 border-2 border-[var(--color-blue-dark)] focus:outline-0 focus:ring-2 focus:ring-[var(--color-blue-dark)] transition-all duration-200"
                        onChange={(e) => {
                            setForm((prev) => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="rounded-xl w-full px-2 py-1 border-2 border-[var(--color-blue-dark)] focus:outline-0 focus:ring-2 focus:ring-[var(--color-blue-dark)] transition-all duration-200"
                        onChange={(e) => {
                            setInput(e.target.value)
                        }}
                    />

                    {message && (
                        <p className="text-sm text-[var(--color-accent)]">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="bg-[var(--color-accent)] w-full sm:w-[50%] lg:w-[30%] p-3 rounded-2xl mx-auto text-white cursor-pointer hover:bg-[var(--color-accent-dark)] transition-all duration-200"
                    >
                        Create Account
                    </button>

                </form>

                <span className="mx-auto flex gap-1">
                    Already have an account?
                    <Link
                        to="/login"
                        className="hover:text-[var(--color-accent)]"
                    >
                        Login
                    </Link>
                </span>

            </div>
        </div>
    )
}

export default Signup