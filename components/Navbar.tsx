"use client"

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Briefcase} from "lucide-react";
// import { getSession, signOut } from "@/lib/auth/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutBtn from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";


export default function Navbar(){

  // const session = await getSession();
  const {data:session} = useSession();


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
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-base text-gray-800 hover:text-black transition-colors"
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button 
                  variant="ghost" 
                  className="relative h-8 w-8 rounded-full p-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-white">
                        {session.user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 shadow-accent" align="end">
                  <DropdownMenuLabel className="space-y-1 font-normal">
                    <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium loading-none">
                      {session.user.name || "userName"}
                      </p>
                    <p className="text-xs loading-none text-muted-foreground">
                      {session.user.email || "userEmail"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <SignOutBtn/>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

