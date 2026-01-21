import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Briefcase } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-gray-50 border-gray-300 ">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl text-primary hover:text-gray-600 transition-colors"
        >
          <Briefcase size={32} className="text-primary" />
          Job Tracker
        </Link>
      <div className="flex items-center gap-4">
        <Link href="/sign-in">
          <Button
            variant="ghost"
            className="text-base text-gray-800 hover:text-black transition-colors"
            >
            Log In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className="text-base bg-primary hover:bg-primary/90 text-white">
            Sign Up
          </Button>
        </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
