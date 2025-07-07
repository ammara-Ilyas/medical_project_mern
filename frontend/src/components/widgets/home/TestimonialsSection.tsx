export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 bg-blue-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-white mb-8">What Our Patients Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 w-80">
            <p className="text-gray-700 dark:text-gray-200 mb-4">"Excellent care and friendly staff! Highly recommended."</p>
            <div className="font-semibold text-blue-900 dark:text-white">- Sarah K.</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 w-80">
            <p className="text-gray-700 dark:text-gray-200 mb-4">"Doctors are very professional and facilities are top-notch."</p>
            <div className="font-semibold text-blue-900 dark:text-white">- Ahmed R.</div>
          </div>
        </div>
      </div>
    </section>
  );
} 