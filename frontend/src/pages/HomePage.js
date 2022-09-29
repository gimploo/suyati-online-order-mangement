import PopUp from 'components/Popup';
import React from 'react'
import { Carousel } from "react-carousel-minimal";
import { Link } from 'react-router-dom';

const Posters = [
    { title: 'Poster01', imageUrl: '#', link: <Home /> },
    { title: 'Poster02', imageUrl: '#', link: <Home /> },
    { title: 'Poster03', imageUrl: '#', link: <Home /> },
]

function CarouselOfPosters({ data }) {

    const captionStyle = {
        fontSize: "1.5em",
        fontWeight: "bold",
    };

    return (
        <div class="bg-black border-2 h-auto text-center w-full">
            <Carousel
                data={data}
                time={10000}
                width="100%"
                captionStyle={captionStyle}
                radius="10px"
                captionPosition="center"
                automatic={true}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="cover"
            />
        </div>
    )
};

const TShirt = () => {

    return (

        <Link to='/product' >
            <div class="group relative">
                <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." class="w-full h-full object-center object-cover lg:w-full lg:h-full" />
                </div>
                <div class="mt-4 flex justify-between">
                    <div>
                        <h3 class="text-sm text-gray-700">
                            <a href="#">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                Basic Tee
                            </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">Black</p>
                    </div>
                    <p class="text-sm font-medium text-gray-900">$35</p>
                </div>
            </div>
        </Link>
    )

}

function ProductLists() {

    return (
        <div class="bg-white">
            <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Customers also purchased</h2>

                <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    <TShirt />
                    <TShirt />
                    <TShirt />
                    <TShirt />
                </div>
            </div>
        </div>
    )

}

export default function Home() {
    return (
        <>
            <CarouselOfPosters data={Posters} />
            <ProductLists />
        </>
    );
}