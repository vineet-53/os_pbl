import Navbar from "../components/NavBar/NavBar";

const teamMembers = [
  {
    name: "Divya Chaudhary",
    section: "A2",
    photo: "/public/Screenshot 2025-05-18 002150.png",
    role: "Frontend Development & UI Design",
  },
  {
    name: "Himanshu Dhapola",
    section: "A1",
    photo: "/public/Screenshot 2025-05-18 002122.png",
    role: "Backend Logic & Algorithm Implementation",
  },
  {
    name: "Rakesh Singh",
    section: "E1",
    photo: "/public/Screenshot 2025-05-18 002157.png",
    role: "Testing & Documentation",
  },
  {
    name: "Vineet Singh",
    section: "B2",
    photo: "/public/Screenshot 2025-05-18 001907.png",
    role: "Project Management & Deployment",
  },
];

const AboutPage = () => {
  return (
    <>
      <div className="min-h-screen bg-[#0A1F2B] text-white px-6">
        <Navbar />
        <h1 className="text-4xl font-bold my-10 text-center underline underline-offset-8 decoration-teal-500">
          Meet Our Team
        </h1>
        <div className="max-w-5xl mx-auto grid gap-10 mt-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {teamMembers.map(({ name, section, photo, role }, index) => (
            <div
              key={index}
              className="bg-[#01090fcb] cursor-pointer border border-sky-300 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              <img
                src={photo}
                alt={name}
                className="w-32 h-32 rounded-full object-cover mb-5 border-4 border-teal-500"
              />
              <h2 className="text-xl font-semibold mb-2">{name}</h2>
              <p className="text-center font-semibold text-teal-500">
                {section}
              </p>
              <p className="text-center text-gray-300">{role}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
