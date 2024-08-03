import React from "react";
import Link from "next/link";
import {
  FaMedal,
  FaHandsHelping,
  FaUserGraduate,
  FaHeartbeat,
  FaDonate,
  FaHandHoldingHeart,
} from "react-icons/fa";

const Presentation = () => {
  return (
    <section className="presentation-section py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-8 text-blue-600">
          About Our Association
        </h2>

        <div className="mission-vision-history mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="mission bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
            <h3 className="text-4xl font-bold mb-4 text-blue-500">Mission</h3>
            <p className="text-lg text-gray-700">
              Our mission is to empower individuals and communities through
              education, resources, and support. We strive to uplift those in
              need, fostering growth and opportunities for every person we
              reach.
            </p>
          </div>

          <div className="vision bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
            <h3 className="text-4xl font-bold mb-4 text-blue-500">Vision</h3>
            <p className="text-lg text-gray-700">
              We envision a world where every person has access to the tools and
              opportunities needed to achieve their full potential. Our goal is
              to create a supportive environment where everyone can flourish and
              succeed.
            </p>
          </div>

          <div className="history bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
            <h3 className="text-4xl font-bold mb-4 text-blue-500">History</h3>
            <p className="text-lg text-gray-700">
              Since our founding in 2000, we have expanded from a small local
              group to an influential global organization. Our journey is marked
              by countless initiatives and programs that have significantly
              impacted communities around the world.
            </p>
          </div>
        </div>

        <div className="achievements mb-12">
          <h3 className="text-5xl font-bold mb-8 text-blue-600">
            Our Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="achievement-item bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
              <FaMedal className="text-6xl text-yellow-500 mb-4" />
              <h4 className="text-3xl font-semibold mb-2">100+ Projects</h4>
              <p className="text-lg text-gray-700">
                We have successfully implemented over 100 community-driven
                projects, making a tangible difference in many lives.
              </p>
            </div>
            <div className="achievement-item bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
              <FaUserGraduate className="text-6xl text-green-500 mb-4" />
              <h4 className="text-3xl font-semibold mb-2">500+ Scholarships</h4>
              <p className="text-lg text-gray-700">
                Our scholarship programs have supported over 500 students,
                helping them achieve their educational goals.
              </p>
            </div>
            <div className="achievement-item bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
              <FaHeartbeat className="text-6xl text-red-500 mb-4" />
              <h4 className="text-3xl font-semibold mb-2">
                10,000+ Beneficiaries
              </h4>
              <p className="text-lg text-gray-700">
                Our health initiatives have reached over 10,000 individuals,
                providing vital support and medical care.
              </p>
            </div>
            <div className="achievement-item bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
              <FaHandsHelping className="text-6xl text-blue-500 mb-4" />
              <h4 className="text-3xl font-semibold mb-2">
                Awards & Recognitions
              </h4>
              <p className="text-lg text-gray-700">
                We are honored to have received numerous awards for our
                dedication to community service and excellence in our field.
              </p>
            </div>
          </div>
        </div>

        <div
          className="get-involved relative bg-cover bg-center text-white p-8 rounded-lg shadow-lg overflow-hidden"
          style={{ backgroundImage: 'url("/path/to/your/image.jpg")' }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 text-center">
            <h3 className="text-5xl font-bold mb-6">Get Involved</h3>
            <p className="text-lg mb-8">
              Join our mission to create positive change. Whether through
              volunteering your time, making a donation, or partnering with us,
              there are many ways you can make a meaningful impact.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/Connexion" className="flex items-center bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition">
                  <FaHandHoldingHeart className="mr-2" />
                  Volunteer
              </Link>
              <button className="flex items-center bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition">
                <FaDonate className="text-2xl mr-2" />
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Presentation;
