

export default function NotFoundPage() {
    return (
        <div className="relative min-h-screen bg-[#0a0f21] flex items-center justify-center overflow-hidden px-4">
            {/* Floating SVG circles */}
            <svg
                className="pointer-events-none absolute inset-0 w-full h-full"
                aria-hidden="true"
            >
                {/* Circle 1 */}
                <circle
                    cx="15%"
                    cy="90%"
                    r="60"
                    stroke="#2266ff88"
                    strokeWidth="2"
                    fill="none"
                    className="opacity-50 drop-shadow-[0_0_6px_rgba(34,102,255,0.7)] animate-bounce"
                    style={{ animationDuration: "6s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }}
                />
                {/* Circle 2 */}
                <circle
                    cx="70%"
                    cy="80%"
                    r="40"
                    stroke="#2266ff88"
                    strokeWidth="2"
                    fill="none"
                    className="opacity-50 drop-shadow-[0_0_6px_rgba(34,102,255,0.7)] animate-pulse"
                    style={{ animationDuration: "7s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }}
                />
                {/* Circle 3 */}
                <circle
                    cx="50%"
                    cy="95%"
                    r="80"
                    stroke="#2266ff88"
                    strokeWidth="2"
                    fill="none"
                    className="opacity-50 drop-shadow-[0_0_6px_rgba(34,102,255,0.7)] animate-bounce"
                    style={{ animationDuration: "8s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }}
                />
            </svg>

            {/* Main Content */}
            <div className="relative z-10 max-w-md text-center bg-[#0a0f21cc] rounded-3xl p-10 shadow-[0_0_30px_rgba(34,102,255,0.4)] backdrop-blur-md">
                <h1
                    className="text-[10rem] font-extrabold text-[#68a0ff] tracking-widest
          drop-shadow-[0_0_10px_rgba(104,160,255,0.8)] animate-pulse"
                >
                    404
                </h1>
                <p className="text-lg text-[#a0bfff] mb-8 drop-shadow-[0_0_5px_rgba(68,119,255,0.6)]">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <a
                    href="/"
                    className="inline-block px-8 py-3 border-2 border-[#68a0ff] rounded-full text-[#68a0ff] font-semibold
          transition-all duration-300 hover:bg-[#68a0ff] hover:text-[#0a0f21] hover:scale-105
          drop-shadow-[0_0_10px_rgba(104,160,255,0.7)]"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
