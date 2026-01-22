import Footer from "@/components/Footer";
import ImageTabs from "@/components/image-tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="felx min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32">
          <div className=" mx-auto max-w-4xl text-center">
            <h1 className="text-5xl text-black mb-6 font-bold">
              A better way to track your job application.
            </h1>
            <p className="text-muted-foreground mb-10 text-xl">
              Organize and manage your job applications efficiently with our
              intuitive platform.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="h-12 px-8 py-4 text-lg font-medium"
                >
                  Start for free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                No Credit Card Required
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white to-gray-25 py-8"></section>


        {/*Hero Images Section*/}
        {/* created another component casue it is CSR */}
        <ImageTabs/>
        

        {/* Features section  */}
        <section className="border-t bg-white py-24">
          <div className=" mx-auto container px-4">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col ">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-2xl text-black font-semibold">
                  Organize Applications
                </h3>
                <p className="text-muted-foreground">
                  Keep track of all your job applications in one place with our
                  easy-to-use dashboard.
                </p>
              </div>
              <div className="flex flex-col ">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-2xl text-black font-semibold">
                  Track Progress
                </h3>
                <p className="text-muted-foreground">
                  Monitor the status of each application and stay updated on
                  your job search journey.
                </p>
              </div>
              <div className="flex flex-col ">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-2xl text-black font-semibold">
                  Stay Organized
                </h3>
                <p className="text-muted-foreground">
                  Use our platform to manage deadlines, interviews, and follow-ups
                  effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transiton section  */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-8"></section>

        {/* Call to Action Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-black mb-4">
              Ready to streamline your job search?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of professionals who trust our platform
            </p>
            <Link href="/sign-up">
            <Button size="lg" className="h-12 px-8 py-4 text-lg font-medium">
              Get Started Today
            </Button>
            </Link>
          </div>
        </section>
      
      </main>

        {/* Footer Section */}
        <Footer />
    </div>
  );
}
