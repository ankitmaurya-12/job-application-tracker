import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Briefcase } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-300 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-xl text-gray-700 hover:text-primary transition-colors"
        >
          <Briefcase size={32} className="text-primary" />
          Job Tracker
        </Link>
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button
            variant="ghost"
            className="text-gray-700 hover:text-black transition-colors"
            >
            Log In
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Sign Up
          </Button>
        </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
