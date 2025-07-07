export default function NewsSection() {
  return (
    <section className="w-full py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-white mb-8">Latest News</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg shadow p-6 w-80">
            <h3 className="text-lg font-semibold mb-2">Grand Opening of New Wing</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">We are excited to announce the opening of our new hospital wing with state-of-the-art facilities.</p>
            <span className="text-xs text-gray-400">April 2024</span>
          </div>
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg shadow p-6 w-80">
            <h3 className="text-lg font-semibold mb-2">Free Health Camp</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Join our free health camp this weekend for checkups and consultations.</p>
            <span className="text-xs text-gray-400">March 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
} 