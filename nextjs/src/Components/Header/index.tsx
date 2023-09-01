'use client'
import { Navbar, NavbarBrand } from "@nextui-org/react";
import {MdDriveEta} from "react-icons/md"
export default function Header() {
    return (
        <Navbar maxWidth="full" height="80px" className="bg-transparent" isBlurred={false} >
            <NavbarBrand >
               <MdDriveEta size="2em" /> 
               <p className="font-bold pl-2 text-[1.2em]">Full Cycle Driver</p>
            </NavbarBrand>
        </Navbar>
    )
}