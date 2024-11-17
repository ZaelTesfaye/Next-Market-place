'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'

import {createClient} from '@/utils/supabase/server'

export async function login(formData: FormData) {

    const supabase = createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const {error} = await supabase.auth.signInWithPassword(data);

    if (error) {
        console.log(error);
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    console.log("Signing up")

    const supabase = createClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const {error} = await supabase.auth.signUp(data)

    if (error) {
        console.log("Signing up Error occured")
        console.log(error);
        redirect('/error')

    }

    revalidatePath('/', 'layout')
    redirect('/')
}