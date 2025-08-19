import { motion } from "framer-motion";
import { useState, useEffect } from "react";



export default function SuspenseLoader() {


    const [messageIndex, setMessageIndex] = useState(0);


    const messages = [
        "Loading your dashboard...",
        "Fetching latest data...",
        "Almost ready...",
        "Setting up your workspace..."
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);


    
    return (
        <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden relative px-4 sm:px-6 lg:px-8">
            {/* Enhanced animated background orbs - responsive sizes */}
            <div className="absolute inset-0">
                {/* Primary floating orb */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-full blur-xl"
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -25, 40, 0],
                        scale: [1, 1.2, 0.9, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Secondary floating orb */}
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"
                    animate={{
                        x: [0, -40, 60, 0],
                        y: [0, 30, -20, 0],
                        scale: [1.2, 1, 1.4, 1.2],
                        rotate: [0, -90, -180, -270, -360]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />

                {/* Additional ambient orbs */}
                <motion.div
                    className="absolute top-1/2 left-10 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-pink-500/15 to-rose-500/15 rounded-full blur-lg"
                    animate={{
                        x: [0, 30, -10, 0],
                        y: [0, -40, 20, 0],
                        scale: [0.8, 1.3, 1, 0.8],
                        opacity: [0.3, 0.6, 0.2, 0.3]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />

                <motion.div
                    className="absolute bottom-10 left-1/2 w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-md"
                    animate={{
                        x: [0, -25, 35, 0],
                        y: [0, 15, -30, 0],
                        scale: [1, 0.7, 1.2, 1],
                        opacity: [0.4, 0.8, 0.3, 0.4]
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3
                    }}
                />

                {/* Subtle particle effects */}
                <motion.div
                    className="absolute top-3/4 right-10 w-3 h-3 sm:w-4 sm:h-4 bg-white/10 rounded-full blur-sm"
                    animate={{
                        x: [0, 20, -15, 0],
                        y: [0, -30, 10, 0],
                        scale: [0.5, 1, 0.3, 0.5],
                        opacity: [0.2, 0.7, 0.1, 0.2]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4
                    }}
                />
            </div>

            {/* Main loader - responsive */}
            <motion.div
                className="flex flex-col items-center space-y-6 sm:space-y-8 z-10 max-w-sm sm:max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Spinning rings loader - responsive sizes */}
                <div className="relative">
                    {/* Outer ring */}
                    <motion.div
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border-2 border-transparent border-t-violet-500 border-r-purple-500 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    {/* Inner ring */}
                    <motion.div
                        className="absolute top-2 left-2 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 border-transparent border-t-cyan-400 border-l-blue-400 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    {/* Center dot */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* Text with typing effect - responsive */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div
                        className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-400 mb-3 sm:mb-4 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <span>Loading</span>
                        <div className="ml-1 flex">
                            {[0, 1, 2].map((i) => (
                                <motion.span
                                    key={i}
                                    className="text-violet-400"
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0.8, 1, 0.8]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                        ease: "easeInOut"
                                    }}
                                >
                                    .
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Dynamic message */}
                    <motion.p
                        key={messageIndex}
                        className="text-sm sm:text-base text-gray-400 mb-4 h-6 sm:h-7 flex items-center justify-center px-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                    >
                        {messages[messageIndex]}
                    </motion.p>

                    {/* Animated dots */}
                    <div className="flex items-center justify-center space-x-1 sm:space-x-1.5">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-violet-400 rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 1, 0.3]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Progress bar - responsive */}
                <motion.div
                    className="w-32 sm:w-48 lg:w-56 h-0.5 bg-gray-800 rounded-full overflow-hidden"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 rounded-full"
                        animate={{
                            x: [-150, 150],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}