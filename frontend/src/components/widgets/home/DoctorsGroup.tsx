import Image from "next/image";

export default function DoctorsGroup() {
  return (
    <section className="w-full py-8 bg-white dark:bg-gray-900 border-2 border-red-500">
      <div className="w-[90%] mx-auto px-4 flex flex-col items-center">
        <Image
          src="/images/home/doctor-group.png"
          alt="Doctors Group"
          width={800}
          height={400}
          className="rounded-lg shadow w-full w-full mb-4 object-cover"
        />
      </div>
    </section>
  );
} 