const ServiceSection = () => {
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
    <section className="max-w-contain mx-auto px-4 py-16">
      <div className="text- mb-12">
        <h2 className="font-bold mb-2 text-customGreen">
          Activities and Resources We Offer
        </h2>
        <h1 className="text-3xl font-bold mb-2 text-customBlue">
          Our Activities{" "}
        </h1>
        <p className="mb-8 w-4/5">
          Discover the wide range of activities and resources we offer to help
          you succeed in your academic and personal life.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

function ServiceCard({ title, description, imageUrl }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg  hover:border-green-500 hover:shadow-green-100 hover:shadow-lg hover:scale-15">
      <div className="h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
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
export default ServiceSection;
