import React from 'react';
import { Link } from 'react-router-dom'

const todaysDate = new Date().toISOString().split(",")[0];

export default function Signup() {
    return (
        <div class="w-full bg-suyati-blue p-8 ">
            <div class="flex md:w-80 md:mx-auto md:rounded-lg md:shadow-lg justify-center py-10 items-center bg-white">
                <form class="bg-white">
                    <h1 class="text-gray-800 font-bold text-2xl mb-1">Welcome!</h1>
                    <p class="text-sm font-normal text-gray-600 mb-7">Please tell us a little about yourself</p>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd" />
                    </svg>
                        <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Full Name" />
                    </div>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                        <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Username" />
                    </div>

                    <div class="flex items-center justify-center">
                        <div class="datepicker flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <input type="text"
                            class="form-control block w-full pl-2 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded border-none focus:ring-0 outline-none"
                            placeholder="Select a date" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="h-5 w-5 text-gray-400" viewBox="0 0 16 16">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address" />
                    </div>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd" />
                        </svg>
                        <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Password" />
                    </div>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd" />
                        </svg>
                        <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Retype password" />
                    </div>
                    <div class='my-4 '>
                        {/* <span class="text-sm ml-2  hover:text-blue-500 cursor-pointer">Forgot Password ?</span> */}
                            <button type="submit" class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Signup</button>
                        <div class='flex space-x-1 text-sm p-2'>
                            <label class=''> Already have an account? </label>
                            <Link to='/login'>
                                <span 
                                class="text-sm p-1 font-bold text-suyati-yellow cursor-pointer">
                                    Login
                                </span>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}