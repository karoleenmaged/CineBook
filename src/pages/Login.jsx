import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const x = useNavigate()

    const checkvarify = (e) => {
        e.preventDefault()

        if (!form.email || !form.password) {
            toast.error("Fill all fields!")
            return
        }
        const savedUser=localStorage.getItem('user')
        if(!savedUser){
             toast.error('You don`t have an account')
            return
        }
        const user=JSON.parse(savedUser)
        if(user.email!==form.email||user.password!==form.password){
            toast.error('Invalid email or password')
            return
        }
        localStorage.setItem('isLoggedIn','true')
        window.dispatchEvent(new Event('LoginStatusChanged'))
        toast.success("Login successful!")

        x("/")
    }

    return (
        <div className="w-[90%] sm:w-[70%] md:w-[55%] lg:w-[40%] w-full mx-auto py-14">
            <div className="py-12 px-4 flex flex-col bg-[var(--color-bg)] rounded-2xl gap-4">

                <h2 className="text-2xl text-center">
                    Login
                </h2>

                <form
                    onSubmit={checkvarify}
                    className="flex flex-col gap-3 items-start"
                >
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
                    {/* {message && (
                        <p className="text-sm text-[var(--color-accent)]">
                            {message}
                        </p>
                    )} */}

                    <button
                        type="submit"
                        className="bg-[var(--color-accent)] w-full sm:w-[50%] lg:w-[30%] p-3 rounded-2xl mx-auto text-white cursor-pointer hover:bg-[var(--color-accent-dark)] transition-all duration-200"
                    >
                        Login
                    </button>

                </form>

                <span className="mx-auto flex gap-1">
                    Don`t have an account?
                    <Link
                        to="/signup"
                        className="hover:text-[var(--color-accent)]"
                    >
                        Sign up
                    </Link>
                </span>

            </div>
        </div>
    )
}

export default Login