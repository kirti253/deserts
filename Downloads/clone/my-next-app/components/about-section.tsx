"use client";

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-3">
          <span className="text-red-600">ABOUT US</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Adore Technosoft is an ISO 9001:2015, ISO 27001:2022 and ISO
              20000-1:2018 systems integrator committed to delivering the best
              IT solutions driven by the latest technology and best suited
              business-driven solutions to small, medium and global companies
              who are looking for an IT solution, skilled manpower and training.
            </p>

            <div>
              <p className="font-bold text-red-600 mb-2">Pan India Presence:</p>
              <p>
                New Delhi, Noida, Mumbai, Bengaluru, Hyderabad, Chennai and
                Kolkata.
              </p>
            </div>

            <p>
              Our technology expertise and approach gave us an edge that made us
              the preferred partner for global enterprises.
            </p>
            <p>
              We strongly believe "It is not enough to find Talent; it is
              important to know what to do with it"
            </p>
            <p>
              Our professional experts specialising in recruitment, outsourcing,
              and talent management are versatile enough to find the best
              manpower for hard-to-fill jobs.
            </p>
            <p>
              We aim to evolve into a Community Centre focusing on providing
              innovative and productive solutions for critical community needs,
              such as employability, skills training and placement services.
            </p>
            <p>
              We ensure to give a helping hand to our candidates and clients to
              succeed by leveraging our expertise and niche industry and market
              knowledge.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="/business-team-meeting-professionals.jpg"
              alt="Team collaboration"
              className="rounded-lg shadow-lg h-48 w-full object-cover"
            />
            <img
              src="/business-professionals-working.jpg"
              alt="Team working"
              className="rounded-lg shadow-lg h-48 w-full object-cover"
            />
            <div className="bg-red-600 text-white p-8 rounded-lg flex flex-col justify-center">
              <p className="text-5xl font-bold">25</p>
              <p className="text-xl font-semibold">
                Years
                <br />
                Experience Of IT
                <br />
                Solution
              </p>
            </div>
            <img
              src="/business-partners-discussion.png"
              alt="Business partners"
              className="rounded-lg shadow-lg h-48 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
