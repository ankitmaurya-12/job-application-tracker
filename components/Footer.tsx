import Link from "next/link";
import { Briefcase, Facebook, Twitter, Youtube, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-primary font-semibold text-xl">
              <Briefcase size={32} />
              Job Tracker
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Streamline your job search with our comprehensive application tracking platform. 
              Stay organized and land your dream job.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <Link 
                href="#" 
                className="group p-2 rounded-lg bg-white border border-primary hover:bg-primary transition-colors"
              >
                <Facebook className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
              </Link>
              <Link 
                href="#" 
                className="group p-2 rounded-lg bg-white border border-primary hover:bg-primary transition-colors"
              >
                <Twitter className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
              </Link>
              <Link 
                href="#" 
                className="group p-2 rounded-lg bg-white border border-primary hover:bg-primary transition-colors"
              >
                <Youtube className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
              </Link>
              <Link 
                href="#" 
                className="group p-2 rounded-lg bg-white border border-primary hover:bg-primary transition-colors"
              >
                <Linkedin className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold text-black mb-6">Useful Links</h3>
            <div className="space-y-4">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </div>
          </div>

          {/* Terms */}
          <div>
            <h3 className="font-semibold text-black mb-6">Terms</h3>
            <div className="space-y-4">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                TOS
              </Link>
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>

          {/* Support & Help */}
          <div>
            <h3 className="font-semibold text-black mb-6">Support & Help</h3>
            <div className="space-y-4">
              <Link href="/support" className="block text-muted-foreground hover:text-primary transition-colors">
                Open Support Ticket
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Use
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500" /> by{" "}
            <span className="text-primary font-medium">Ankit Maurya</span>
          </p>
          <p className="text-muted-foreground text-sm">
          © 2026 <span className="text-primary font-medium">Job Tacker</span>. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;