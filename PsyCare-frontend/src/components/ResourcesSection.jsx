import React from "react";
import {
  FaLeaf,
  FaBed,
  FaWind,
  FaBrain,
  FaPhoneAlt,
  FaGamepad,
  FaVideo
} from "react-icons/fa";
import girlImage from "/src/assets/hero-illustration.jpg";
import { Link } from "react-router-dom"; // <-- for linking
import { useNavigate } from "react-router-dom"; 

const categories = [
  "All",
  "Popular",
  "Trending",
  "Essential",
  "Featured",
  "Emergency",
  "Fun",
];

const resources = [
  {
    title: "Stress Management",
    tag: "Popular",
    rating: 4.8,
    description:
      "Learn effective techniques to manage academic and personal stress",
    details: "12 exercises",
    icon: <FaLeaf className="text-emerald-500 text-2xl" />,
    route: "/stress-management"
  },
  {
    title: "Sleep Audio Library",
    tag: "Trending",
    rating: 4.9,
    description:
      "Guided meditations and calming sounds for better sleep",
    details: "25 audios",
    icon: <FaBed className="text-blue-500 text-2xl" />,
    route: "/sleep-library"
  },
  {
    title: "Breathing Exercises",
    tag: "Essential",
    rating: 4.7,
    description: "Simple breathing techniques for anxiety and relaxation",
    details: "8 techniques",
    icon: <FaWind className="text-cyan-500 text-2xl" />,
    route: "/breath"
  },
  {
    title: "Mindfulness Practice",
    tag: "Featured",
    rating: 4.8,
    description: "Daily mindfulness exercises to improve mental clarity",
    details: "15 practices",
    icon: <FaBrain className="text-violet-500 text-2xl" />,
    route: "/mindfulness"
  },  
  {
    title: "Overcoming Depression",
    tag: "Essential",
    rating: 5.0,
    description: "Watch motivational videos and talks to help lift your spirits.",
    details: "10 videos",
    icon: <FaVideo className="text-purple-500 text-2xl" />,
    route: "/video-library"
  },
  {
    title: "Interactive Games",
    tag: "Fun",
    rating: 4.6,
    description: "Fun games designed to boost mood and reduce anxiety",
    details: "6 games",
    icon: <FaGamepad className="text-pink-500 text-2xl" />,
    route: "/games/:title"
  },
];

export default function Resources() {
  const navigate = useNavigate();
  
  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-cover bg-center bg-fixed"
      id="resources"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-1"></div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Wellness Resources Hub
          </h2>
          <p className="text-base text-gray-700 max-w-2xl mx-auto">
            Explore our comprehensive collection of mental health tools and resources
          </p>
        </div>

        {/* Categories */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="px-4 py-1.5 rounded-full bg-white/70 border border-black/5 text-gray-900 hover:bg-white transition text-sm shadow-sm"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 shadow hover:shadow-lg hover:-translate-y-0.5 transition duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div>{res.icon}</div>
                <h5 className="text-lg font-medium text-gray-900">{res.title}</h5>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md text-xs font-medium">
                  {res.tag}
                </span>
                <span className="text-yellow-500 text-sm font-medium">⭐ {res.rating}</span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-2">{res.description}</p>
              <small className="text-gray-500 text-xs">{res.details}</small>

              <div className="mt-3 flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-violet-400 text-white hover:bg-violet-500 text-sm transition" onClick={() => navigate(res.route)}>
                  Start
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm transition">
                  Preview
                </button>
              </div>
            </div>
          ))}

          {/* Slim Card for Testing */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white rounded-xl p-4 shadow hover:shadow-lg hover:-translate-y-0.5 transition duration-300 flex items-center justify-between">
            <div>
              <h5 className="text-lg font-medium text-gray-900">Test Your Condition</h5>
              <p className="text-gray-600 text-sm mt-1">
                Take a quick self-assessment to understand your mental wellness better
              </p>
            </div>
            <Link
              to="/tests"
              className="px-3 py-1.5 rounded-lg bg-violet-400 text-white hover:bg-violet-500 text-sm transition"
            >
              Start
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}