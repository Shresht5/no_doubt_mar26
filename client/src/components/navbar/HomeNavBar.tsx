'use client'
import { ReactNode, useEffect, useState } from 'react'
import HomeSlideMenu from '../menu/HomeSlideMenu'
import Link from 'next/link';
import Image from 'next/image';

export default function HomeNavBar({ heading, children }: { heading: string, children: ReactNode }) {
    const [slideMenu, setSlideMenu] = useState(false);
    const [profile, setProfile] = useState(false);
    const [picture, setPicture] = useState("");
    const [showNav, setShowNav] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            const parseuser = JSON.parse(user);
            setProfile(true);
            if (parseuser.picture) {
                setPicture(parseuser.picture);
            } else {
                setPicture(""); // fallback logo (public folder)
            }
        }
    }, [])
    const signout = () => {
        localStorage.removeItem('user');
        setPicture("");
        setProfile(false);
    }

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowNav(false); // scroll down
            } else {
                setShowNav(true); // scroll up
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            {/* 👇 add transition + translate */}
            <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 
                ${showNav ? "translate-y-0" : "-translate-y-full"}`}>

                <div className='flex justify-between items-center p-2 px-4 bg-gray-900'>
                    <div className='flex items-center space-x-2'>
                        <div onClick={() => setSlideMenu(true)} className="cursor-pointer">
                            <svg className='h-7 fill-white' viewBox="0 0 640 640">
                                <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
                            </svg>
                        </div>
                        <div className='text-2xl truncate max-w-[200px]'>{heading}</div>
                    </div>
                    <div className='flex items-center' aria-label='logout'>
                        {profile ?
                            <button
                                onClick={signout}
                                className="cursor-pointer flex items-center"
                                title="logout"
                            >
                                {picture ? (
                                    <Image
                                        src={picture}
                                        width={30}
                                        height={30}
                                        alt="profile"
                                        className="rounded-full"
                                    />
                                ) : (
                                    <svg className="h-7 fill-white" viewBox="0 0 640 640">
                                        <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
                                    </svg>
                                )}
                            </button>
                            :
                            <Link href={"/l"}>
                                <div className='flex items-center space-x-2 border-2 p-2 rounded-lg'>
                                    <svg className='h-7 fill-white' viewBox="0 0 640 640">
                                        <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
                                    </svg>
                                    <h3>SignUp</h3>
                                </div>
                            </Link>
                        }

                    </div>
                </div>
            </div>
            {/* CONDITIONAL RENDER */}
            <HomeSlideMenu open={slideMenu} onClose={() => setSlideMenu(false)} >
                {children}
            </HomeSlideMenu>
        </>
    )
}
