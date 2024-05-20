const Benefits = () => {
  return (
    <div className="container mx-auto py-5 h-svh flex-col lg:flex-row flex justify-between gap-6 md:gap-5 md:items-center">
      <div className=" ml-10 benefits-text basis-2/4 px-3 lg:px-0 flex flex-col gap-5">
        <div className=" space-y-3">
          <h1 className=" font-bold text-2xl lg:text-4xl">
            Participate in IT-DAY: <br /> Share Your Projects and Ideas
          </h1>
          <p className=" leading-7 text-lg">
            Join us for IT-DAY at Jamhuuriya University and showcase your
            innovative projects to a community of tech enthusiasts. As a
            Computer Science student, this is your opportunity to share your
            skills, connect with industry experts,
          </p>
        </div>
        <div className=" flex items-center gap-5 flex-col  md:flex-row">
          <div className=" md:basis-2/5 ">
            <h3 className="font-bold text-xl lg:text-xl">Skill Development</h3>
            <p className=" text-lg leading-6">
              Present your projects and demonstrate your technical capabilities
              to peers, faculty.
            </p>
          </div>
          <div className="md:basis-2/5 ">
            <h3 className="font-bold text-xl lg:text-xl">
              Networking Opportunities
            </h3>
            <p className="text-lg leading-6">
              Connect with like-minded professionals and expand your
              professional network.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className=" py-2 px-5 bg-[#2BB77B] text-[#0E103F] cursor-pointer hover:bg-transparent hover:border hover:border-[#2BB77B] hover:text-[#2BB77B] transition">
            Register Now
          </button>
          <button className="py-2 px-5 border  border-[#2BB77B]  text-[#2BB77B] cursor-pointer  hover:border-none hover:bg-[#2BB77B] transition hover:text-[#0E103F]">
            Register Now
          </button>
        </div>
      </div>
      <div className="img h-3/4 w-full lg:w-2/4 -order-1 lg:order-2">
        <img
          className="w-full h-full"
          src="../../public/imgs/Benifits_img.svg"
          alt="Benefit section img"
        />
      </div>
    </div>
  );
};

export default Benefits;
