'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  // Mock data for now - later this will come from your database
  const [submissions] = useState([
    {
      id: 1,
      strainName: 'Blue Dream',
      brandName: 'Cookies',
      strainType: 'hybrid',
      dispensary: 'Green Thumb Dispensary',
      submittedAt: '2024-01-15',
      status: 'pending',
      images: {
        container: 'https://via.placeholder.com/150x150?text=Container',
        terpene: 'https://via.placeholder.com/150x150?text=Terpenes',
        cannabinoid: 'https://via.placeholder.com/150x150?text=Cannabinoids',
        bud: 'https://via.placeholder.com/150x150?text=Bud'
      }
    },
    {
      id: 2,
      strainName: 'OG Kush',
      brandName: 'Jungle Boys',
      strainType: 'indica',
      dispensary: 'Purple Haze',
      submittedAt: '2024-01-14',
      status: 'pending',
      images: {
        container: 'https://via.placeholder.com/150x150?text=Container',
        terpene: 'https://via.placeholder.com/150x150?text=Terpenes',
        cannabinoid: 'https://via.placeholder.com/150x150?text=Cannabinoids',
        bud: ''
      }
    }
  ]);

  const approveSubmission = (id: number) => {
    alert(`Approved submission #${id}! (This will update the database later)`);
  };

  const rejectSubmission = (id: number) => {
    alert(`Rejected submission #${id}! (This will update the database later)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <Link href="/" className="inline-flex items-center text-emerald-200 hover:text-white transition-colors text-lg">
              ← Back to Home
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Admin Review Dashboard 👨‍💼
          </h1>
          <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
            Review and approve strain submissions from users.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-emerald-600">2</div>
            <div className="text-gray-600">Pending Reviews</div>
          </div>
          <div className="bg-white/90 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">15</div>
            <div className="text-gray-600">Approved Strains</div>
          </div>
          <div className="bg-white/90 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600">3</div>
            <div className="text-gray-600">Rejected</div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-6">
          {submissions.map((submission) => (
            <div key={submission.id} className="bg-white/95 rounded-xl p-6 shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-emerald-900">
                    {submission.strainName} - {submission.brandName}
                  </h3>
                  <div className="flex gap-4 text-sm text-gray-600 mt-2">
                    <span>Type: <strong>{submission.strainType}</strong></span>
                    <span>Dispensary: <strong>{submission.dispensary || 'Not specified'}</strong></span>
                    <span>Submitted: <strong>{submission.submittedAt}</strong></span>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {submission.status.toUpperCase()}
                </span>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <img src={submission.images.container} alt="Container" className="w-full h-32 object-cover rounded-lg border" />
                  <p className="text-sm text-gray-600 mt-2">Container</p>
                </div>
                <div className="text-center">
                  <img src={submission.images.terpene} alt="Terpene Profile" className="w-full h-32 object-cover rounded-lg border" />
                  <p className="text-sm text-gray-600 mt-2">Terpenes</p>
                </div>
                <div className="text-center">
                  <img src={submission.images.cannabinoid} alt="Cannabinoid Profile" className="w-full h-32 object-cover rounded-lg border" />
                  <p className="text-sm text-gray-600 mt-2">Cannabinoids</p>
                </div>
                <div className="text-center">
                  {submission.images.bud ? (
                    <img src={submission.images.bud} alt="Bud Photo" className="w-full h-32 object-cover rounded-lg border" />
                  ) : (
                    <div className="w-full h-32 bg-gray-200 rounded-lg border flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No bud photo</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mt-2">Bud Photo</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => approveSubmission(submission.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => rejectSubmission(submission.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  ❌ Reject
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  👁️ View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {submissions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-white mb-2">No submissions yet</h3>
            <p className="text-emerald-200">Submissions will appear here when users submit strains.</p>
          </div>
        )}
      </div>
    </div>
  );
}