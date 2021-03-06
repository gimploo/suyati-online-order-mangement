import React from 'react';
import { Link } from 'react-router-dom'

let today = new Date().toISOString().substr(0, 10);

export default function Signup() {


    return (
        <div class="w-full bg-suyati-blue p-8 ">
            <div class="flex md:w-80 md:mx-auto rounded-lg md:shadow-lg justify-center py-10 items-center bg-white">
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
                        <div class="w-full flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <input value={today} type="date" 
                            class="block form-control w-full pl-2 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded border-none focus:ring-0 outline-none"
                            placeholder="Select a date" />
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
                        <input class="pl-2 outline-none border-none" type="password" name="" id="" placeholder="Password" />
                    </div>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd" />
                        </svg>
                        <input class="pl-2 outline-none border-none" type="password" name="" id="" placeholder="Retype password" />
                    </div>
                    <div class="flex justify-center space-x-2">
                        <h1 class="text-md font-semibold text-gray-600 px-1">Select a role</h1>
                        <select class='border-2 rounded-md text-gray-400 outline-none'>
                        <option class="form-check form-check-inline">
                            <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox1" value="option1"/>
                            <label class="text-sm form-check-label inline-block text-gray-600" for="inlineCheckbox1">Buyer</label>
                        </option>
                        <option class="form-check form-check-inline">
                            <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox2" value="option2"/>
                            <label class="text-sm form-check-label inline-block text-gray-600" for="inlineCheckbox2">Seller</label>
                        </option>
                        </select>
                    </div>
                    <div class='my-4 '>
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