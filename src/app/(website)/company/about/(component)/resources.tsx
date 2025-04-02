import { FaGlobe, FaUserGraduate, FaPassport } from "react-icons/fa";

const resources = [
  {
    title: "Study Abroad Programs",
    description: "Explore top universities and programs tailored for you.",
    icon: <FaGlobe className="text-primary text-5xl" />,
    link: "#",
  },
  {
    title: "Career Guidance",
    description: "Get expert career advice to shape your future.",
    icon: <FaUserGraduate className="text-primary text-5xl" />,
    link: "#",
  },
  {
    title: "Visa Assistance",
    description: "Navigate visa applications with our expert support.",
    icon: <FaPassport className="text-primary text-5xl" />,
    link: "#",
  },
];

export default function ResourcesSection() {
  return (
    <section className="bg-gray-50 py-16 px-6 mt-32 mb-[-35px]">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">Resources</h2>
        <p className="text-gray-600 mt-2">Everything you need for a successful study journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
          >
            {resource.icon}
            <h3 className="text-xl font-semibold text-primary mt-4">{resource.title}</h3>
            <p className="text-gray-600 mt-2">{resource.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
