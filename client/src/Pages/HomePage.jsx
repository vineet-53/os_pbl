import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/NavBar/NavBar";

export default function HomePage() {

  return (
    <div className="relative overflow-hidden bg-[#0A1F2B] min-h-screen text-white">
      {/* Decorative Grid Background */}
      {/* <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 p-8 opacity-20">
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            className="border border-gray-600 rounded-lg"
            style={{
              animation: `pulse ${5 + (i % 6) * 0.3}s infinite alternate`,
            }}
          ></div>
        ))}
      </div> */}

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center pt-36 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold ">
          Smart Scheduling
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
            for efficient systems
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-gray-300">
          This project simulates core CPU and disk scheduling algorithms
          including FCFS, SJF, Round Robin, Priority, SSTF, SCAN, and more —
          providing clear visualizations and real-time analytics to help
          students and engineers understand and compare algorithm performance.
        </p>

        <div className="mt-10 flex space-x-4">
          <motion.a
            href="/file-upload"
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 border-2 border-gradient-to-r border-teal-300 border-opacity-70 font-semibold rounded-lg bg-gradient-to-br from-teal-500/20 to-blue-500/20 backdrop-blur-md hover:from-teal-400/30 hover:to-blue-400/30 transition"
          >
            Upload
          </motion.a>
        </div>
      </main>

      {/* Custom pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          from {
            opacity: 0.1;
          }
          to {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
