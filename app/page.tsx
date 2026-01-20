import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="felx min-h-screen flex-col bg-white">
   <main className="flex-1">
    <section className="container mx-auto px-4 py-32">
      <div className=" mx-auto max-w-4xl text-center">
        <h1 className="text-5xl text-black mb-6 font-bold">
          A better way to track your job application.
        </h1>
        <p className="text-muted-foreground mb-10 text-xl">
          Organize and manage your job applications efficiently with our intuitive platform.
        </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <Link href="/signup">
      <Button size='lg' className="h-12 px-8 py-4 text-lg font-medium">
        Start for free <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      </Link>
      <p className="text-sm text-muted-foreground">No Credit Card Required</p>
      </div>
      </div>
    </section>
   </main>
    </div>
  );
}
