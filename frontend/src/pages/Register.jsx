import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://taskly-backend-xz75.onrender.com/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success("Registration Successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-orange-600/20 blur-3xl rounded-full"></div>
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 max-w-6xl w-full">

        <div className="hidden lg:flex flex-col justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-sm font-medium w-fit">

          ✨ Built for makers

        </div>
        <h1
          className="text-5xl font-bold mt-8 leading-tight tracking-tight"
          style={{ fontFamily: "Space Grotesk" }}
        >
            Start your{" "}
            <span className="text-orange-500">
              workspace
            </span>
            <br />
            in seconds
          </h1>

          <p className="text-gray-400 mt-6">
            A premium task manager that's fast,
            focused and beautiful.No clutter, just
            the tools you need to ship more,every day.
          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                ✓
              </div>

              <span className="text-lg text-gray-300">
                Unlimited projects
              </span>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                ✓
              </div>

              <span className="text-lg text-gray-300">
                Realtime status tracking
              </span>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                ✓
              </div>

              <span className="text-lg text-gray-300">
                Keyboard-first UX
              </span>

            </div>

          </div>

        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
        <div className="flex items-center gap-3 mb-10">

          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
            ✓
          </div>

          <h1 className="text-2xl font-bold">
            Task<span className="text-orange-500">ly</span>
          </h1>

        </div>        
          <h2 className="text-4xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-gray-400 mb-8">
            A few details and you're in.
          </p>

          <form
            onSubmit={submitHandler}
            className="space-y-6"
          >

            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 pl-10 pr-3 focus:border-orange-500 outline-none"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 pl-10 pr-3 focus:border-orange-500 outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 pl-10 pr-3 focus:border-orange-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition"
            >
              <ArrowRight size={18} />
              Create Account
            </button>

          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;