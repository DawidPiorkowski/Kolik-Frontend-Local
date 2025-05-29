import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserPlus, FaEnvelope, FaBars, FaUserCog } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  onHowToClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onHowToClick }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Detect scroll to change burger button position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${scrolled ? 'top-4' : 'top-16'} left-4 z-50 text-white bg-indigo-700 p-2 rounded-md focus:outline-none transition-all duration-300`}
      >
        <FaBars size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity"></div>
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-indigo-900 text-white transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <nav className="space-y-4">
            <Link
              to="/"
              className="flex items-center text-lg font-semibold p-2 rounded hover:bg-indigo-800 transition"
            >
              <FaHome className="mr-3 w-5 h-5" />
              Home
            </Link>

            {!user && (
              <button
                onClick={onHowToClick}
                className="flex items-center w-full text-left text-lg font-semibold p-2 rounded hover:bg-indigo-800 transition"
              >
                <FaUserPlus className="mr-3 w-5 h-5" />
                How to Sign Up
              </button>
            )}

            {user && (
              <Link
                to="/account"
                className="flex items-center text-lg font-semibold p-2 rounded hover:bg-indigo-800 transition"
              >
                <FaUserCog className="mr-3 w-5 h-5" />
                Account Settings
              </Link>
            )}

            <Link
              to="/contact"
              className="flex items-center text-lg font-semibold p-2 rounded hover:bg-indigo-800 transition"
            >
              <FaEnvelope className="mr-3 w-5 h-5" />
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
