export default function ServicesOverview() {
  return (
    <section className="w-full py-12 bg-blue-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-white mb-4">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 w-64">
            <h3 className="text-lg font-semibold mb-2">Cardiology</h3>
            <p className="text-gray-600 dark:text-gray-300">Heart care and diagnostics by expert cardiologists.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 w-64">
            <h3 className="text-lg font-semibold mb-2">Neurology</h3>
            <p className="text-gray-600 dark:text-gray-300">Advanced neurological treatments and care.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 w-64">
            <h3 className="text-lg font-semibold mb-2">Pediatrics</h3>
            <p className="text-gray-600 dark:text-gray-300">Specialized care for children and infants.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 