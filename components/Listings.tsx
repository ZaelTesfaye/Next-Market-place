"use client"

import React, {useEffect, useState} from 'react';
import {createClient} from "@/utils/supabase/client";
import Image from "next/image";
import {Bath, BedDouble, MapPin, Ruler, Search} from "lucide-react";

import Filter from "@/components/Filter";
import Link from "next/link";
import AddressSearch from "@/components/AddressSearch";
import {Button} from "@/components/ui/button";


const Listings = ({forSell, setCoordinates}) => {
    const [listing, setListing] = useState([]);
    const [bedroom, setBedroom] = useState(0);
    const [bathroom, setBathroom] = useState(0);
    const [parking, setParking] = useState(0);
    const [homeType, setHomeType] = useState();
    const [searchInput, setSearchInput] = useState();

    const supabase = createClient();

    const handleSearch = async () => {
        console.log(searchInput)
        const query = supabase
            .from('listing')
            .select("*, listingImages(listing_id, url)")
            .eq('activeStatus', true)
            .eq('type', forSell ? 'sell' : 'rent')
            .gte('bedroom', bedroom)
            .gte('bathroom', bathroom)
            .gte('parking', parking)
            .like('address', '%'+searchInput+'%')
            .order('id', {ascending: false})
        if (homeType && homeType!=='all') query
            .eq('propertyType', homeType);

        const {data, error} = await query;

        if (error) return console.log(error)
        if (data) setListing(data);
    }


    useEffect(() => {

        const getListing = async () => {
            const {data, error} = await supabase
                .from('listing')
                .select("*, listingImages(listing_id, url)")
                .eq('activeStatus', true)
                .eq('type', forSell ? 'sell' : 'rent')
                .order('id', {ascending: false})

            if (error) return console.log(error)

            if (data) {
                setListing(data);
                setCoordinates(data[0]?.coordinates);
            }
        }
        getListing();

    }, [forSell]);

    return (
        <div>
            <div className={"flex gap-5 items-end"}>
                <AddressSearch  setSearchInput={setSearchInput}/>
                <Button type={"button"}
                        onClick={handleSearch}>
                    <Search/>
                    Search
                </Button>
            </div>

            <div className={"pt-5 pl-12"}>
                <Filter setParking={(value)=> setParking(value)} setBathroom={setBathroom} setBedroom={setBedroom}
                        setHomeType={setHomeType}/>
            </div>

            <div className={"grid lg:grid-cols-3 md:grid-cols-2 sm:grid:cols-1 gap-8 mt-12"}>
                {listing.map((item, index) => {
                        return (
                            <Link href={`/view-listing/${item.id}`} key={index}>

                                <div
                                    className={"flex flex-col gap-5 justify-between items-center cursor-pointer pt-5 p-2  rounded-lg hover: border-2  hover:border-gray-600 "}>
                                    <div>
                                        <Image src={item.listingImages[0].url} alt={"Listing Image"} width={150}
                                               height={100}
                                               className={"rounded-lg object-cover w-full h-64 "}/>
                                    </div>
                                    <div>


                                        <div className={"py-3 flex flex-col gap-3"}>
                                            <h2 className={"font-bold text-xl"}>$ {item.price}</h2>
                                            <h2 className={"text-gray-600 text-sm flex gap-3"}><MapPin/> {item.address}</h2>
                                        </div>
                                        <div className={"flex gap-8 justify-center"}>
                                            <h2 className={"flex text-gray-600 gap-3 bg-slate-200 justify-center"}>
                                                <BedDouble
                                                /> {item.bedroom}
                                            </h2>
                                            <h2 className={"flex text-gray-600 gap-3 bg-slate-200 justify-center"}>
                                                <Bath/> {item.bathroom}
                                            </h2>
                                            <h2 className={"flex text-gray-600 gap-3 bg-slate-200 justify-center"}>
                                                <Ruler/> {item.area}
                                            </h2>

                                        </div>
                                    </div>
                                </div>
                            </Link>

                        )
                    }
                )
                }
            </div>
        </div>
    )
}
export default Listings;