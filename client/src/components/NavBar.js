import React, { useState } from "react";

function Navbar() {
    const [apiSectionOpen, setApiSectionOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const toggleApiInput = () => {
        if (!apiSectionOpen) {
            setApiSectionOpen(true);
        }
        else if (apiSectionOpen) {
            setApiSectionOpen(false);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const data = {input: inputValue};
            const port = process.env.REACT_APP_BE_EP
            try {
                const response = await fetch(port, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    console.log(response);
                } else {
                    console.error('Error submitting data');
                };
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    return (
            <nav class="bg-gray-800">
                <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div class="relative flex h-16 items-center justify-between">
                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                        <div class="hidden sm:ml-5 sm:block">
                        <div class="flex space-x-3">
                            <a href="/" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" aria-current="page">Dashboard</a>
                            <a href="https://www.medicines.org.uk/emc/" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">EMC</a>
                            <button class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={toggleApiInput}>API Key</button>
                            <div className={`inputSection ${apiSectionOpen ? "open": ""} content-center`}>
                            <input class="content-center 
                            appearance-none 
                            py-1 px-2 
                            border border-black-500 
                            rounded w-full text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline" 
                            id="password" 
                            type="password" 
                            placeholder="Enter API Key" 
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <h1 className="navbar-title text-3xl font-bold text-gray-300">LC-Vision Pill Checker 🔎</h1>

                        </div>
                    </div>
                </div>

        </nav>
    )
};

export default Navbar;