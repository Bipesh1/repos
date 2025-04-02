import { FaUsers, FaHandsHelping, FaEye, FaRocket, FaLightbulb } from "react-icons/fa";

const values = [
  {
    title: "Student Focused",
    description: "We prioritize students' academic and career growth.",
    icon: <FaUsers className="text-secondary text-4xl" />,
  },
  {
    title: "Guidance & Support",
    description: "Providing expert advice for studying abroad and career planning.",
    icon: <FaHandsHelping className="text-secondary text-4xl" />,
  },
  {
    title: "Transparency",
    description: "Honest and clear guidance at every step of your journey.",
    icon: <FaEye className="text-secondary text-4xl" />,
  },
  {
    title: "Opportunities",
    description: "Scholarships, internships, and career growth for students.",
    icon: <FaRocket className="text-secondary text-4xl" />,
  },
  {
    title: "Innovation",
    description: "We empower students with modern skills and resources.",
    icon: <FaLightbulb className="text-secondary text-4xl" />,
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-primary">Our Values</h2>
        <p className="text-gray-700 text-lg mt-2">
          Guiding students towards success with our core principles.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {values.map((value, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2"
          >
            <div className="flex items-center space-x-4 ">
              {value.icon}
              <h3 className="text-xl font-semibold text-secondary">{value.title}</h3>
            </div>
            <p className="text-gray-600 mt-2">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
