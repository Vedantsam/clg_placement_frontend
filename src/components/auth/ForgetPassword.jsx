import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { USER_API_END_POINT } from '@/utils/constant'

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 }
}

const ForgotResetPassword = () => {
  const [step, setStep] = useState('request') // 'request' | 'reset'
  const [form, setForm] = useState({
    email: '',
    otp: '',
    newPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const requestOtpHandler = async (e) => {
    e.preventDefault()
    if (!form.email) {
      return toast.error('Please enter your email')
    }
    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, { email: form.email })
      if (res.data.success) {
        toast.success(res.data.message)
        setStep('reset')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const resetPasswordHandler = async (e) => {
    e.preventDefault()
    const { email, otp, newPassword } = form
    if (!email || !otp || !newPassword) {
      return toast.error('Please fill all fields')
    }
    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/reset-password`, { email, otp, newPassword })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/login')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      <motion.div
        className="max-w-md mx-auto mt-20 p-8 bg-white border border-purple-200 rounded-3xl shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {step === 'request' && (
          <>
            <h2 className="text-3xl font-extrabold text-center mb-8 text-purple-700 drop-shadow-sm">
              Forgot Password
            </h2>
            <form onSubmit={requestOtpHandler} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-lg font-semibold text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  placeholder="Enter your email"
                  required
                  className="mt-2 border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-400 rounded-md shadow-sm transition"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 disabled:opacity-60 rounded-xl transition"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          </>
        )}

        {step === 'reset' && (
          <>
            <h2 className="text-3xl font-extrabold text-center mb-8 text-purple-700 drop-shadow-sm">
              Reset Password
            </h2>
            <form onSubmit={resetPasswordHandler} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-lg font-semibold text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  placeholder="Enter your email"
                  required
                  disabled
                  className="mt-2 bg-gray-100 border-purple-300 rounded-md shadow-inner cursor-not-allowed"
                />
              </div>

              <div>
                <Label htmlFor="otp" className="text-lg font-semibold text-gray-700">
                  OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  name="otp"
                  value={form.otp}
                  onChange={changeHandler}
                  placeholder="Enter OTP"
                  required
                  className="mt-2 border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-400 rounded-md shadow-sm transition"
                />
              </div>

              <div>
                <Label htmlFor="newPassword" className="text-lg font-semibold text-gray-700">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={changeHandler}
                  placeholder="Enter new password"
                  required
                  className="mt-2 border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-400 rounded-md shadow-sm transition"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 disabled:opacity-60 rounded-xl transition"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default ForgotResetPassword
