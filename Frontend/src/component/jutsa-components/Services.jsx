export default function ServiceSection() {
  const services = [
    {
      title: "Academic Support",
      description:
        "Our dedicated team of academic advisors is here to help you succeed in your studies. Whether you need assistance with a specific subject or guidance on study skills, we've got you covered.",
      imageUrl: "/about_image.jpg",
    },
    {
      title: "Extracurricular Activities",
      description:
        "Engage in a wide variety of clubs, organizations, and activities, from cultural and social to sports teams. It's a great way to make new friends, develop new skills, and enhance your overall university experience.",
      imageUrl: "/about_image.jpg",
    },
    {
      title: "Career Development",
      description:
        "We offer comprehensive career services and resources to help you prepare for the job market. From resume writing to interview skills, we'll equip you with the tools you need to succeed in your future career.",
      imageUrl: "/about_image.jpg",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          Empower
        </h2>
        <h3 className="text-3xl font-bold mb-4">
          Discover the Services and Resources We Offer
        </h3>
        <p className="max-w-2xl mx-auto text-gray-600">
          At Jutsa, we provide a wide range of services and resources to support
          and enhance your student experience. From academic support to
          extracurricular activities, we have everything you need to thrive.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>

      <div className="flex justify-center items-center mt-12 space-x-4">
        <button className="px-6 py-3 border border-gray-600 text-gray-700 rounded-md hover:bg-gray-50 transition">
          Learn More
        </button>
        <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition flex items-center space-x-2">
          <span>Sign Up</span>
          <span className="text-lg">→</span>
        </button>
      </div>
    </section>
  );
}

function ServiceCard({ title, description, imageUrl }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transition hover:border-green-500 hover:shadow-green-100 hover:shadow-lg hover:scale-105">
      <div className="overflow-hidden h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
