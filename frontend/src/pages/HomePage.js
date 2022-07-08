import React from 'react'
import { Carousel } from "react-carousel-minimal";

const Posters = [
  { title: 'Poster01', imageUrl: '#', link: <Home /> },
  { title: 'Poster02', imageUrl: '#', link: <Home /> },
  { title: 'Poster03', imageUrl: '#', link: <Home /> },
]

function CarouselOfPosters ({data}) {

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

export default function Home() {
    return (
        <>
        <CarouselOfPosters data={Posters} />
        </>
    );
}