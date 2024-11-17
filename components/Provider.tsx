'use client'

import React, {ReactNode, useContext, useEffect, useState} from 'react';
import Header from "@/components/header";
import {useRouter} from "next/router";
import {createClient} from "@/utils/supabase/client";
import {useLoginStatus} from "@/context/loginStatusContext";

interface ProviderProps {
    children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({children}) => {



    const [user, setUser] = useState(false);
    const supabase = createClient()
    const getUser = async()=> {
        const {data, error} = await supabase.auth.getUser();
        if (data.user) {
            setUser(true);

        }
    }
    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
             <Header/>

            {children}
        </div>
    );
};

export default Provider;
