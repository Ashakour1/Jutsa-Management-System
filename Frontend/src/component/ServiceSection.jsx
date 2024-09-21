import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";


export default function ServiceSection() {
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
        <ServiceCard
          title="Academic Support"
          description="Our dedicated team of academic advisors is here to help you succeed in your studies. Whether you need assistance with a specific subject or guidance on study skills, we've got you covered."
          imageUrl="/Admin/public/placeholder.png"
        />
        <ServiceCard
          title="Extracurricular Activities"
          description="Engage in a wide variety of clubs, organizations, and activities, from cultural and social to sports teams. It's a great way to make new friends, develop new skills, and enhance your overall university experience."
          imageUrl="/Admin/public/placeholder.png"
        />
        <ServiceCard
          title="Career Development"
          description="We offer comprehensive career services and resources to help you prepare for the job market. From resume writing to interview skills, we'll equip you with the tools you need to succeed in your future career."
          imageUrl="/Admin/public/placeholder.png"
        />
      </div>

      <div className="flex justify-center items-center mt-12 m-auto space-x-4">
        <Button variant="outline" className="px-6 py-3">
          Learn More
        </Button>
        <Button variant="outline" className="px-6 py-3 border-none">
          Sign Up {' >'}
        </Button>
      </div>
    </section>
  );
}
