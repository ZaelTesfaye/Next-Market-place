'use client'
import React, {useState} from 'react';

import {Icons} from "@/components/icons";
import {useAuth} from "@/context/AuthContextProvider";

const LoginButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {loginAuth, setLoginAuth} = useAuth();

    async function handleClick() {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 5000)
    }

    return (
        <button
            onClick={handleClick}
            type="submit"
            className={`flex justify-center items-center w-full mt-4 bg-primary py-3 text-white rounded-2xl relative font-medium ${isLoading && "bg-blue-300"}`}
            >

            {isLoading && (
                <Icons.spinner className="mr-2 h-5 w-5 animate-spin absolute left-24"/>
            )}
            Sign In

        </button>


    );
};

export default LoginButton;