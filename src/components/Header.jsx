"use client";
import { UserButton, useUser } from "@clerk/nextjs"
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {

    const {user, isSignedIn} = useUser();

  return (
    <div className="flex justify-between items-center border shadow-sm p-5">
        <div className="flex items-center">
            <Image src="/chart-donut.svg" alt="logo" width={40} height={25}/>
            <span className="text-blue-800 font-bold text-xl">Budget Buddy AI</span>
        </div>
        { isSignedIn ? <UserButton /> : (
            <div className="flex gap-3 items-center">
                <Link href="/dashboard">
                    <Button variant="outline" className="rounded-full">Dashboard</Button>
                </Link>
                <Link href="/dashboard">
                    <Button className="rounded-full">Get Started</Button>
                </Link>
            </div>
        )}
    </div>
  )
}

export default Header