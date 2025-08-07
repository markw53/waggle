import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border py-6 mt-auto relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand & Tagline */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-foreground flex items-center gap-2">
              <span role="img" aria-label="Paw print">🐾</span>
              Waggle
            </h3>
            <p className="text-sm text-muted-foreground">
              Connecting paws, creating lifelong friendships. <br />
              The safe way to match your dog.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/dogs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="My Dogs"
                >
                  My Dogs
                </Link>
              </li>
              <li>
                <Link
                  to="/matches"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Matches"
                >
                  Matches
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/calendar"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Calendar"
                >
                  Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/help"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Help Center"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Contact Us"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Privacy Policy"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook className="text-2xl md:text-3xl text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="text-2xl md:text-3xl text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="text-2xl md:text-3xl text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border">
          <p className="text-sm text-center text-muted-foreground">
            © {currentYear} Waggle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;