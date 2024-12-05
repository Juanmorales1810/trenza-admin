import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface CardPortfolioProps {
    title: string
    location: string
    date: string
    cardImage: string
}

export default function CardPortfolio(props: CardPortfolioProps) {
    const { title, location, date, cardImage } = props
    return (
        <div
            className="relative bg-zinc-950 rounded-lg overflow-hidden shadow-lg group"
        >
            <div className="absolute flex flex-col justify-end items-start px-4 py-2 h-80 w-full z-30">
                <div className="flex w-full justify-between">
                    <div className="text-left text-zinc-50">
                        <h2 className="font-bold text-lg">{title}</h2>
                        <p className="font-semibold text-sm">{location}</p>
                        <p className="text-xs">{date}</p>
                    </div>
                    <div className="items-end pt-9">
                        <Button asChild size="sm">
                            <Link href='#'>
                                Ver más
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <Image
                src={cardImage}
                className="h-80 w-full object-cover object-center gap-10 !m-0 !p-0 [mask-image:radial-gradient(ellipse_140%_95%_at_100%_-10%,#000_10%,transparent_110%)] z-20 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                height="400"
                width="400"
                alt="thumbnail"
            />
        </div>
    )
}
