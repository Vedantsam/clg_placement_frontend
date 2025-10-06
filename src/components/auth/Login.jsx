import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })
 const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
    e.preventDefault();
    try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });
        if (res.data.success) {
            dispatch(setUser(res.data.user));
            navigate("/");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
        dispatch(setLoading(false));
    }
}
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        >
          <h1 className="text-3xl font-extrabold text-center mb-8 text-purple-700">
            Welcome Back 👋
          </h1>

          <div className="space-y-5">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="you@example.com"
                required
                disabled={loading}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="••••••••"
                required
                disabled={loading}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="mb-2 block">Select Role</Label>
              <RadioGroup className="flex gap-6">
                {["student", "recruiter"].map(role => (
                  <label
                    key={role}
                    htmlFor={role}
                    className={`flex items-center cursor-pointer gap-2 p-2 rounded-md border 
                      ${input.role === role
                        ? "border-none  text-purple-800"
                        : "border-none"}
                    `}
                  >
                    <Input
                      type="radio"
                      id={role}
                      name="role"
                      value={role}
                      checked={input.role === role}
                      onChange={changeEventHandler}
                      disabled={loading}
                      className="cursor-pointer"
                    />
                    <span className="capitalize">{role}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>

          <Button
            type="submit"
            
            className="w-full mt-8 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 flex justify-center items-center"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </Button>
           <p className="text-center text-sm mt-4">
            <Link
              to="/forget-password"
              className="text-purple-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>

          <p className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Signup
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  )
}

export default Login
