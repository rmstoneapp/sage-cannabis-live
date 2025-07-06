'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UploadButton } from "lib/uploadthing";

export default function SubmitPage() {
  const [uploadedFiles, setUploadedFiles] = useState({
    container: '',
    terpene: '',
    cannabinoid: '',
    bud: '',
  });

  const [formData, setFormData] = useState({
    strainName: '',
    brandName: '',
    strainType: '',
    dispensary: '',
  });

  const handleFileUpload = (type: 'container' | 'terpene' | 'cannabinoid' | 'bud', url: string) => {
    setUploadedFiles(prev => ({ ...prev, [type]: url }));
    console.log(`${type} uploaded:`, url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            Submit a Strain 🌿
          </h1>
          <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
            Help us build the most comprehensive cannabis database. Upload your strain's lab results.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-xl">
          <form className="space-y-8">
            {/* Basic Info */}
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                📝 Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Strain Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="strainName"
                    value={formData.strainName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
                    placeholder="e.g., Blue Dream"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
                    placeholder="e.g., Cookies, Jungle Boys"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Strain Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="strainType"
                    value={formData.strainType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
                  >
                    <option value="">Select type</option>
                    <option value="indica">Indica</option>
                    <option value="sativa">Sativa</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dispensary (Optional)
                  </label>
                  <input
                    type="text"
                    name="dispensary"
                    value={formData.dispensary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
                    placeholder="Where did you purchase this?"
                  />
                </div>
              </div>
            </div>

            {/* Image Uploads */}
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                📸 Lab Results & Images
              </h2>
              
              <div className="space-y-6">
                {/* Container Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Container/Packaging <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
                    <div className="text-4xl mb-4">📦</div>
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.[0]) {
                          handleFileUpload('container', res[0].url);
                        }
                      }}
                      onUploadError={(error) => console.error(error)}
                    />
                    {uploadedFiles.container && (
                      <div className="mt-4">
                        <img src={uploadedFiles.container} alt="Container" className="max-w-32 mx-auto rounded" />
                        <p className="text-green-600 text-sm mt-2">✅ Container uploaded!</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Terpene Profile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Terpene Profile <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
                    <div className="text-4xl mb-4">🧪</div>
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.[0]) {
                          handleFileUpload('terpene', res[0].url);
                        }
                      }}
                      onUploadError={(error) => console.error(error)}
                    />
                    {uploadedFiles.terpene && (
                      <div className="mt-4">
                        <img src={uploadedFiles.terpene} alt="Terpene Profile" className="max-w-32 mx-auto rounded" />
                        <p className="text-green-600 text-sm mt-2">✅ Terpene profile uploaded!</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cannabinoid Profile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cannabinoid Profile <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
                    <div className="text-4xl mb-4">🔬</div>
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.[0]) {
                          handleFileUpload('cannabinoid', res[0].url);
                        }
                      }}
                      onUploadError={(error) => console.error(error)}
                    />
                    {uploadedFiles.cannabinoid && (
                      <div className="mt-4">
                        <img src={uploadedFiles.cannabinoid} alt="Cannabinoid Profile" className="max-w-32 mx-auto rounded" />
                        <p className="text-green-600 text-sm mt-2">✅ Cannabinoid profile uploaded!</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bud Photo (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bud Photo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
                    <div className="text-4xl mb-4">🌿</div>
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.[0]) {
                          handleFileUpload('bud', res[0].url);
                        }
                      }}
                      onUploadError={(error) => console.error(error)}
                    />
                    {uploadedFiles.bud && (
                      <div className="mt-4">
                        <img src={uploadedFiles.bud} alt="Bud Photo" className="max-w-32 mx-auto rounded" />
                        <p className="text-green-600 text-sm mt-2">✅ Bud photo uploaded!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Submit for Review 🌿
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}