type Service = {
  icon: string;
  title: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    icon: "💡",
    title: "Solutions",
    description: "Innovative IT solutions tailored to your business needs",
  },
  {
    icon: "📄",
    title: "Recruitment",
    description: "Expert recruitment services for your talent needs",
  },
  {
    icon: "👥",
    title: "Training",
    description: "Professional training programs for skill development",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="flex flex-col items-center text-center"
            >
              <span className="text-5xl mb-6" aria-hidden="true">
                {service.icon}
              </span>
              <button className="bg-red-600 text-white px-8 py-3 rounded font-semibold mb-4 hover:bg-red-700 transition">
                {service.title}
              </button>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
