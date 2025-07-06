import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-bold text-emerald-100 mb-4">Page Not Found</h2>
          <p className="text-emerald-200 mb-8">
            Looks like this page got a little too high and wandered off.
          </p>
          <Link href="/">
            <button className="bg-white text-emerald-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition-colors">
              Go Back Home 🌿
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}