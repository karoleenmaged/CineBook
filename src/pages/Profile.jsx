import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Ticket,
    Film,
    Utensils,
    Pencil,
    Lock,
    LogOut,
    ChevronRight,
    X
} from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
    const x = useNavigate();

    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Error loading user:", error);
            return null;
        }
    });

    const [tickets] = useState(() => {
        try {
            const savedTickets = localStorage.getItem("tickets");

            if (!savedTickets) return [];

            const parsedTickets = JSON.parse(savedTickets);

            return Array.isArray(parsedTickets) ? parsedTickets : [];
        } catch (error) {
            console.error("Error loading tickets:", error);
            return [];
        }
    });

    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");

        window.dispatchEvent(
            new Event("LoginStatusChanged")
        );

        x("/");
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();

        if (
            !passwordForm.oldPassword ||
            !passwordForm.newPassword ||
            !passwordForm.confirmPassword
        ) {
            toast.error("Please fill all fields!");
            return;
        }

        if (passwordForm.oldPassword !== user.password) {
            toast.error("Current password is incorrect!");
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters!");
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const updatedUser = {
            ...user,
            password: passwordForm.newPassword
        };

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

        setPasswordForm({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        });

        setShowPasswordForm(false);

        toast.success("Password changed successfully!");
    };

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-[var(--color-muted)]">
                    No user information found.
                </p>
            </div>
        );
    }

    return (
        <div className="w-[90%] max-w-5xl mx-auto py-10">
            <div className="bg-[var(--color-card)] rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">

                <div className="w-24 h-24 rounded-full bg-[var(--color-accent-dark)] text-[var(--color-blue)] flex justify-center items-center text-4xl font-bold shrink-0">
                    {user.name?.charAt(0).toUpperCase()}
                </div>

                <div className="text-center sm:text-left flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
                        {user.name}
                    </h1>

                    <p className="text-[var(--color-muted)] mt-1">
                        {user.email}
                    </p>
                </div>

                <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] transition"
                >
                    <Pencil size={18} />
                    Edit Profile
                </button>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">

                <div className="bg-[var(--color-card)] rounded-2xl shadow-md p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-blue)]/30 flex justify-center items-center">
                        <Ticket
                            className="text-[var(--color-accent-dark)]"
                            size={24}
                        />
                    </div>

                    <div>
                        <p className="text-[var(--color-muted)] text-sm">
                            Total Tickets
                        </p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">
                            {tickets.length}
                        </h2>
                    </div>
                </div>


                <div className="bg-[var(--color-card)] rounded-2xl shadow-md p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-blue)]/30 flex justify-center items-center">
                        <Film
                            className="text-[var(--color-accent-dark)]"
                            size={24}
                        />
                    </div>

                    <div>
                        <p className="text-[var(--color-muted)] text-sm">
                            Movies Booked
                        </p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">
                            {tickets.length}
                        </h2>
                    </div>
                </div>


                <div className="bg-[var(--color-card)] rounded-2xl shadow-md p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-blue)]/30 flex justify-center items-center">
                        <Utensils
                            className="text-[var(--color-accent-dark)]"
                            size={24}
                        />
                    </div>

                    <div>
                        <p className="text-[var(--color-muted)] text-sm">
                            Food Orders
                        </p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">
                            {tickets.filter((ticket)=>ticket.foodTotal>0).length}
                        </h2>
                    </div>
                </div>

            </div>
            <div className="bg-[var(--color-card)] rounded-3xl shadow-lg mt-8 overflow-hidden">

                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-[var(--color-text)]">
                        Account
                    </h2>
                </div>


                <button
                    onClick={() => x("/tickets")}
                    className="w-full flex items-center gap-4 p-5 hover:bg-[var(--color-bg)] transition text-left"
                >
                    <Ticket
                        size={22}
                        className="text-[var(--color-accent-dark)]"
                    />

                    <div className="flex-1">
                        <h3 className="font-semibold text-[var(--color-text)]">
                            My Tickets
                        </h3>

                        <p className="text-sm text-[var(--color-muted)]">
                            View your booked tickets
                        </p>
                    </div>

                    <ChevronRight
                        size={20}
                        className="text-[var(--color-muted)]"
                    />
                </button>


                <button
                    className="w-full flex items-center gap-4 p-5 hover:bg-[var(--color-bg)] transition text-left border-t border-gray-200"
                >
                    <User
                        size={22}
                        className="text-[var(--color-accent-dark)]"
                    />

                    <div className="flex-1">
                        <h3 className="font-semibold text-[var(--color-text)]">
                            Personal Information
                        </h3>

                        <p className="text-sm text-[var(--color-muted)]">
                            Manage your personal information
                        </p>
                    </div>

                    <ChevronRight
                        size={20}
                        className="text-[var(--color-muted)]"
                    />
                </button>


                <button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="w-full flex items-center gap-4 p-5 hover:bg-[var(--color-bg)] transition text-left border-t border-gray-200"
                >
                    <Lock
                        size={22}
                        className="text-[var(--color-accent-dark)]"
                    />

                    <div className="flex-1">
                        <h3 className="font-semibold text-[var(--color-text)]">
                            Change Password
                        </h3>

                        <p className="text-sm text-[var(--color-muted)]">
                            Update your account password
                        </p>
                    </div>

                    <ChevronRight
                        size={20}
                        className={`text-[var(--color-muted)] transition ${
                            showPasswordForm ? "rotate-90" : ""
                        }`}
                    />
                </button>
                {showPasswordForm && (
                    <div className="border-t border-gray-200 p-6">

                        <div className="flex justify-between items-center mb-5">

                            <h3 className="text-lg font-bold text-[var(--color-text)]">
                                Change Password
                            </h3>

                            <button
                                onClick={() => setShowPasswordForm(false)}
                                className="text-[var(--color-muted)] hover:text-[var(--color-text)]"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        <form
                            onSubmit={handlePasswordChange}
                            className="flex flex-col gap-4"
                        >

                            <input
                                type="password"
                                placeholder="Current Password"
                                value={passwordForm.oldPassword}
                                onChange={(e) =>
                                    setPasswordForm({
                                        ...passwordForm,
                                        oldPassword: e.target.value
                                    })
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)]"
                            />

                            <input
                                type="password"
                                placeholder="New Password"
                                value={passwordForm.newPassword}
                                onChange={(e) =>
                                    setPasswordForm({
                                        ...passwordForm,
                                        newPassword: e.target.value
                                    })
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)]"
                            />

                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) =>
                                    setPasswordForm({
                                        ...passwordForm,
                                        confirmPassword: e.target.value
                                    })
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)]"
                            />

                            <button
                                type="submit"
                                className="w-full sm:w-fit px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] transition"
                            >
                                Change Password
                            </button>

                        </form>

                    </div>
                )}

            </div>
            <button
                onClick={handleLogout}
                className="w-full mt-6 flex justify-center items-center gap-2 py-4 rounded-2xl border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition font-semibold"
            >
                <LogOut size={20} />
                Log Out
            </button>

        </div>
    );
};

export default Profile;