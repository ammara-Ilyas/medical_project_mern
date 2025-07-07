export default function FeaturesSection() {
  return (
    <section className="w-full py-12 bg-blue-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="mx-auto mb-2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">🏥</div>
          <h4 className="font-semibold text-blue-900 dark:text-white">Modern Facilities</h4>
        </div>
        <div>
          <div className="mx-auto mb-2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">👨‍⚕️</div>
          <h4 className="font-semibold text-blue-900 dark:text-white">Expert Doctors</h4>
        </div>
        <div>
          <div className="mx-auto mb-2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">⏰</div>
          <h4 className="font-semibold text-blue-900 dark:text-white">24/7 Service</h4>
        </div>
        <div>
          <div className="mx-auto mb-2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">💊</div>
          <h4 className="font-semibold text-blue-900 dark:text-white">Pharmacy</h4>
        </div>
      </div>
    </section>
  );
} 