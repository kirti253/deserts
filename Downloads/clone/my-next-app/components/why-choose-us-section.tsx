type Reason = {
  icon: string;
  title: string;
  description: string;
};

const REASONS: Reason[] = [
  {
    icon: "💼",
    title: "Executive Search",
    description:
      "Top-level executive search and selection services that deliver results quickly.",
  },
  {
    icon: "🎯",
    title: "Head Hunting",
    description: "Specialists in sourcing candidates with niche and critical skills.",
  },
  {
    icon: "⚡",
    title: "Sound Strategies",
    description: "Strategic planning that keeps your business moving forward.",
  },
  {
    icon: "🏅",
    title: "Highly Skilled",
    description: "Experienced recruiters covering requirements at every level.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-red-600 font-semibold mb-2">WHY US</p>
          <h2 className="text-4xl font-bold">
            Why <span className="text-red-600">Choose Us</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {REASONS.map((reason) => (
            <div key={reason.title} className="flex gap-6">
              <div className="shrink-0 text-3xl" aria-hidden="true">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
