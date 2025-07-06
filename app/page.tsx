import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Sage 🌿
        </h1>
        <p className="text-2xl text-emerald-100 mb-8 max-w-2xl mx-auto">
          AI-Powered Cannabis Strain Recommendations
        </p>
        <p className="text-lg text-emerald-200 mb-12 max-w-xl mx-auto">
          Submit strains for our database and get personalized recommendations based on your unique needs.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link href="/submit">
            <button className="block w-full sm:w-auto bg-white text-emerald-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition-colors">
              Submit a Strain
            </button>
          </Link>
          <Link href="/recommendations">
            <button className="block w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emerald-900 transition-colors">
              Get Recommendations
            </button>
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl mb-4">🧬</div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Analysis</h3>
            <p className="text-emerald-200">Advanced AI reads lab results to build our comprehensive strain database</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Personalized Matches</h3>
            <p className="text-emerald-200">Get strain recommendations tailored to your specific needs and preferences</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold text-white mb-2">Lab-Verified Data</h3>
            <p className="text-emerald-200">Every strain includes verified cannabinoid and terpene profiles from real labs</p>
          </div>
        </div>
      </div>
    </div>
  );
}