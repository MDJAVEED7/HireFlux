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
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
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
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form
                    onSubmit={submitHandler}
                    className='w-1/2 border rounded-md p-6 my-10'
                    style={{
                        borderColor: "#4F9CF9",
                        backgroundColor: "#FFFFFF",
                        color: "#043873",
                        boxShadow: `0 0 10px ${'#FFE492'}`
                    }}
                >
                    <h1 className='font-bold text-xl mb-5' style={{ color: "#043873" }}>Login</h1>

                    <div className='my-2'>
                        <Label htmlFor="email" style={{ color: "#043873" }}>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            id="email"
                            onChange={changeEventHandler}
                            placeholder="Example@gmail.com"
                            required
                            style={{
                                borderColor: "#4F9CF9",
                                color: "#043873",
                                backgroundColor: "#FFFFFF"
                            }}
                        />
                    </div>

                    <div className='my-2'>
                        <Label htmlFor="password" style={{ color: "#043873" }}>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            id="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                            required
                            style={{
                                borderColor: "#4F9CF9",
                                color: "#043873",
                                backgroundColor: "#FFFFFF"
                            }}
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="student"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    required
                                    style={{ accentColor: "#4F9CF9" }}
                                />
                                <Label htmlFor="student" style={{ color: "#043873" }}>Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="recruiter"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    required
                                    style={{ accentColor: "#4F9CF9" }}
                                />
                                <Label htmlFor="recruiter" style={{ color: "#043873" }}>Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {
                        loading
                            ? <Button
                                className="w-full my-4"
                                style={{ backgroundColor: "#4F9CF9", color: "#FFFFFF" }}
                                disabled
                              >
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                              </Button>
                            : <Button
                                type="submit"
                                className="w-full my-4"
                                style={{ backgroundColor: "#4F9CF9", color: "#FFFFFF" }}
                              >
                                Login
                              </Button>
                    }

                    <span className='text-sm' style={{ color: "#043873" }}>
                        Don't have an account? <Link to="/signup" className='text-blue-600' style={{ color: "#4F9CF9" }}>Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login
