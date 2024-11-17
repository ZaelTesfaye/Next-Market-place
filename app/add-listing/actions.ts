"use server"

import {createClient} from "@/utils/supabase/server";


interface DataResponse {
    data: { id: number; name: string }[]; // Assuming 'name' is another property
    error: Error | null; // 'error' can also be null if there is no error
}

export const findAndSetCoordinate = async (address: string) => {

    const encodedAddress = encodeURIComponent(address)
    const key = process.env.GEO_CODE_API_KEY!;
    const response = await fetch(`https://geocode.maps.co/search?q=${encodedAddress}&api_key=${key}`)
    if (!response.ok) return {status: false, message: "Couldn't find the place"};
    const [{lat='0', lon='0'}]: [{ lat: string, lon: string }] = await response.json();
    if (!lat) return {status: false, message: "Couldn't find the place"};

    const supabase = createClient();

    const {data, error} = await supabase.auth.getUser()
    if (error) return {status: false, message: "User not authenticated"}

    const {data: propData, error: propError} = await supabase
        .from('listing')
        .insert([
            {
                address: address,
                coordinates: {lat, lon},
                createdBy: data.user.email,
            },
        ])
        .select()

    if (propError) {
        return {status: false, message: "Failed to add address"};
    }

    return {status: true, message: "Successful", propData}
}
export const autoComplete = async (text: string) => {
    const encodedText = encodeURIComponent(text);
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodedText}&apiKey=${process.env.GEO_AUTO_COMPLETE_KEY}`)
    if (!response.ok) {
        throw new Error("Failed to fetch address names");
    }
    return response.json();
}