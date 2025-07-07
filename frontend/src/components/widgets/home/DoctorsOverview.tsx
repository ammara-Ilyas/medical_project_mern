export default function DoctorsOverview() {
  return (
    <section className="w-full py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-white mb-4">Meet Our Doctors</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg shadow p-6 w-64">
            <h3 className="text-lg font-semibold mb-2">Dr. John Doe</h3>
            <p className="text-gray-600 dark:text-gray-300">Cardiologist</p>
          </div>
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg shadow p-6 w-64">
            <h3 className="text-lg font-semibold mb-2">Dr. Jane Smith</h3>
            <p className="text-gray-600 dark:text-gray-300">Neurologist</p>
          </div>
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg shadow p-6 w-64">
            <h3 className="text-lg font-semibold mb-2">Dr. Alex Lee</h3>
            <p className="text-gray-600 dark:text-gray-300">Pediatrician</p>
          </div>
        </div>
      </div>
    </section>
  );
} 