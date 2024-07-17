"use client"
import {
    LayoutGrid,
    PiggyBank,
    ReceiptText,
    ShieldCheck,
    CircleDollarSign
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SideNav = () => {

    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: "Incomes",
            icon: PiggyBank,
            path: '/dashboard/incomes'
        },
        {
            id: 3,
            name: "Expenses",
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: "Budgets",
            icon: CircleDollarSign,
            path: '/dashboard/budgets'
        },
        {
            id: 5,
            name: "Upgrade",
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        }
    ]

    const path = usePathname();

    useEffect(() => {
        console.log(path);
    }, [path])

  return (
    <div className="h-screen p-5 border shadow-sm">
        <div className="flex items-center">
            <Image src="./chart-donut.svg" alt="logo" height={25} width={40}/>
            <span className="text-blue-800 text-xl font-bold">Budget Buddy AI</span>
        </div>

        <div className="mt-10">
            {menuList.map((item, index) => (
                <Link key={index} href={item.path}>
                <h2 className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-blue-100 ${path == item.path && 'text-primary bg-blue-100'}`}>
                    {item.name}
                </h2>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SideNav;