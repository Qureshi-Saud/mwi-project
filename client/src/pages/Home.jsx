import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  hero1,
  hero2,
  hero3,
  hero4,
  aboutImg,
  fullwidth,
  fullwidthmobile,
  g1,
  g2,
  g3,
  g4,
  g5,
  g6,
  g7,
  g8,
  expert1,
  expert2,
  expert3,
} from "../assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useWindowWidth from "../hooks/useWindowWidth";

const Home = () => {
  const navigate = useNavigate();
  const width = useWindowWidth();
  const scrollRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (container) {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScrollLeft) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <div className="pt-16">
      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 py-12 md:py-20 gap-6">
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Engineering the Future with Excellence
          </h1>
          <p className="text-gray-600 text-lg">
            Microwell Industries leads with precision and innovation, delivering world-class industrial solutions.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow"
          >
            Contact Us
          </button>
        </div>

        <div className="lg:w-1/2 w-full max-w-xl">
          <Carousel
            autoPlay
            interval={4000}
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            swipeable
            emulateTouch
          >
            {[hero1, hero2, hero3, hero4].map((img, idx) => (
              <div key={idx}>
                <img src={img} alt={`Slide ${idx + 1}`} className="rounded-2xl object-cover" />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="flex flex-col md:flex-row items-center gap-8 px-6 md:px-20 py-16 bg-gray-50">
        <div className="md:w-1/2">
          <img
            src={aboutImg}
            alt="About Us"
            className="rounded-2xl shadow-md object-cover w-full"
          />
        </div>
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            About Microwell Industries
          </h2>
          <p className="text-gray-600 text-lg">
            Microwell Industries is a pioneer in the manufacturing of Mechanical Seals, built with top-grade materials in our modern facility. Our professional team ensures unmatched product quality and reliable after-sales support.
          </p>
          <button
            onClick={() => navigate("/about")}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow"
          >
            More Info
          </button>
        </div>
      </section>

      {/* FULL WIDTH IMAGE */}
      <div className="w-full my-12 px-6 md:px-0">
        <img
          src={fullwidth}
          alt="Microwell Full - Desktop"
          className="max-w-6xl w-full rounded-xl hidden md:block mx-auto"
        />
        <img
          src={fullwidthmobile}
          alt="Microwell Full - Mobile"
          className="w-full rounded-xl block md:hidden"
        />
      </div>

      {/* GALLERY SECTION */}
      <section className="px-6 md:px-20 py-16 bg-white relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
          Our Gallery
        </h2>

        {/* Arrows */}
        <button
          className="absolute left-4 top-[58%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-600"
          onClick={scrollLeft}
        >
          <FaChevronLeft />
        </button>
        <button
          className="absolute right-4 top-[58%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-600"
          onClick={scrollRight}
        >
          <FaChevronRight />
        </button>

        {/* Scrollable image row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-10"
        >
          {[g1, g2, g3, g4, g5, g6, g7, g8].map((img, idx) => (
            <div
              key={idx}
              className="min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-md flex-shrink-0"
            >
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </section>

      {/* FIELDS OF EXPERTISE */}
      <section className="px-6 md:px-20 py-20 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800">
          Fields of Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              img: expert1,
              title: "Skilled Professionals",
              desc: "Our team includes experienced engineers and technicians.",
            },
            {
              img: expert2,
              title: "Superior Quality Analysis",
              desc: "We maintain stringent quality control for every component.",
            },
            {
              img: expert3,
              title: "Advanced Technology",
              desc: "Equipped with modern machinery and innovation.",
            },
          ].map((field, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <img
                src={field.img}
                alt={field.title}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                {field.title}
              </h3>
              <p className="text-gray-600 text-sm">{field.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
