"use client"
import { motion } from "framer-motion"

import CoupleIntroCard from "../CoupleIntroCard"
import FloatingHearts from "../FloatingIcons"
import { Heart1 } from "../Heart"

const IntroPage = ({ brideData, groomData }: any) => {
  return (
    <section id="couple" className="relative overflow-hidden">
      <FloatingHearts count={30} icons={["💕", "❤️", "🌸"]} />
      {/* --- Nền và nội dung chính --- */}
      <div
        style={{
          backgroundImage: `url('/layout/couple')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="w-full min-h-screen py-30 relative flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
        >
          <div className="w-full relative z-20 text-center px-4">
            <motion.div
              className="flex justify-center items-center "
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1
                className="test text-center font-bold bg-gradient-to-r 
                        from-pink-400 via-rose-400 to-amber-300 bg-clip-text text-transparent drop-shadow-lg"
                style={{ fontSize: 55 }}
              >
                Cô dâu
              </h1>
              <motion.h1
                className="test text-center mx-4 sm:mx-12 font-bold bg-gradient-to-r 
                        from-pink-400 via-rose-400 to-amber-300 bg-clip-text text-transparent drop-shadow-lg"
                style={{ fontSize: 55 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                &
              </motion.h1>
              <h1
                className="test text-center font-bold bg-gradient-to-r 
                        from-pink-400 via-rose-400 to-amber-300 bg-clip-text text-transparent drop-shadow-lg"
                style={{ fontSize: 55 }}
              >
                Chú rể
              </h1>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="flex justify-center mt-6"
            >
              <Heart1 />
            </motion.div>
            <div className="w-full flex justify-center items-stretch flex-wrap relative z-20">
              <CoupleIntroCard {...brideData} />
              <CoupleIntroCard {...groomData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroPage
