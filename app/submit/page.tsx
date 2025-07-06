'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UploadButton } from "lib/uploadthing";

interface FormData {
  strainName: string;
  brandName: string;
  strainType: string;
  dispensary: string;
  thcPercentage: string;
  cbdPercentage: string;
  cbgPercentage: string;
  cbnPercentage: string;
  description: string;
  flavorProfile: string;
  aroma: string;
  effects: string[];
  medicalUses: string[];
  submitterEmail: string;
}

interface UploadedFiles {
  container: string;
  terpene: string;
  cannabinoid: string;
  bud: string;
}

export default function SubmitPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    container: '',
    terpene: '',
    cannabinoid: '',
    bud: '',
  });

  const [formData, setFormData] = useState<FormData>({
    strainName: '',
    brandName: '',
    strainType: '',
    dispensary: '',
    thcPercentage: '',
    cbdPercentage: '',
    cbgPercentage: '',
    cbnPercentage: '',
    description: '',
    flavorProfile: '',
    aroma: '',
    effects: [],
    medicalUses: [],
    submitterEmail: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const effectOptions = [
    'Relaxed', 'Happy', 'Euphoric', 'Creative', 'Focused', 'Energetic', 
    'Uplifted', 'Sleepy', 'Hungry', 'Talkative', 'Giggly', 'Aroused'
  ];

  const medicalOptions = [
    'Anxiety', 'Depression', 'Chronic Pain', 'Insomnia', 'PTSD', 
    'Epilepsy', 'Arthritis', 'ADHD', 'Migraines', 'Nausea', 
    'Appetite Loss', 'Glaucoma'
  ];

  const handleFileUpload = (type: keyof UploadedFiles, url: string) => {
    setUploadedFiles(prev => ({ ...prev, [type]: url }));
    console.log(`${type} uploaded:`, url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: 'effects' | 'medicalUses', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields before submitting
      if (!formData.strainName || !formData.brandName || !formData.strainType) {
        throw new Error('Please fill in all required fields');
      }

      // Combine form data with uploaded files
      const submissionData = {
        ...formData,
        images: uploadedFiles,
      };

      console.log('Submitting strain data:', submissionData);

      // Submit to API
      const response = await fetch('/api/strains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        console.log('Strain submitted successfully:', result);
        
        // Show the strain ID in the success message
        console.log('New strain ID:', result.strainId);
      } else {
        throw new Error(result.error || 'Failed to submit strain');
      }
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          strainName: '',
          brandName: '',
          strainType: '',
          dispensary: '',
          thcPercentage: '',
          cbdPercentage: '',
          cbgPercentage: '',
          cbnPercentage: '',
          description: '',
          flavorProfile: '',
          aroma: '',
          effects: [],
          medicalUses: [],
          submitterEmail: '',
        });
        setUploadedFiles({
          container: '',
          terpene: '',
          cannabinoid: '',
          bud: '',
        });
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
            Help us build the most comprehensive cannabis database. Upload your strain's lab results and detailed information.
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="max-w-4xl mx-auto mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            <strong>Success!</strong> Your strain has been submitted for review. Thank you for contributing to Sage! 🌿
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="max-w-4xl mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <strong>Error!</strong> There was a problem submitting your strain. Please try again.
          </div>
        )}

        {/* Form */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
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

            {/* Cannabinoid Info */}
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                🧪 Cannabinoid Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    THC Percentage
                  </label>
                  <input
                    type="number"
                    name="thcPercentage"
                    value={formData.thcPercentage}
                    onChange={handleInputChange}
                    min="0"
                    max="50"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
                    placeholder="e.g., 22.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CBD Percentage
                  </label>
                  <input
                    type="number"
                    name="cbdPercentage"
                    value={formData.cbdPercentage}
                    onChange={handleInputChange}
                    min="0"
                    max="50"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
                    placeholder="e.g., 0.8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CBG Percentage
                  </label>
                  <input
                    type="number"
                    name="cbgPercentage"
                    value={formData.cbgPercentage}
                    onChange={handleInputChange}
                    min="0"
                    max="10"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
                    placeholder="e.g., 1.2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CBN Percentage
                  </label>
                  <input
                    type="number"
                    name="cbnPercentage"
                    value={formData.cbnPercentage}
                    onChange={handleInputChange}
                    min="0"
                    max="10"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
                    placeholder="e.g., 0.3"
                  />
                </div>
              </div>
            </div>

            {/* Effects */}
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                ✨ Effects
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {effectOptions.map((effect) => (
                  <label key={effect} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.effects.includes(effect)}
                      onChange={() => handleCheckboxChange('effects', effect)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700">{effect}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Medical Uses */}
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                🏥 Medical Uses
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {medicalOptions.map((use) => (
                  <label key={use} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.medicalUses.includes(use)}
                      onChange={() => handleCheckboxChange('medicalUses', use)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700">{use}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sensory Profile */}
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                👃 Sensory Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flavor Profile
                  </label>
                  <input
                    type="text"
                    name="flavorProfile"
                    value={formData.flavorProfile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
                    placeholder="e.g., Sweet, Citrus, Pine"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aroma
                  </label>
                  <input
                    type="text"
                    name="aroma"
                    value={formData.aroma}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
                    placeholder="e.g., Earthy, Floral, Diesel"
                  />
                </div>
              </div>
            </div>

            {/* Description & Contact */}
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                📄 Additional Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
                    placeholder="Describe the strain's characteristics, effects, and growing conditions..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="submitterEmail"
                    value={formData.submitterEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
                    placeholder="your.email@example.com (for follow-up questions)"
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                📸 Lab Results & Images
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Container Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Container/Packaging <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                    <div className="text-3xl mb-2">📦</div>
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
                      <div className="mt-3">
                        <img src={uploadedFiles.container} alt="Container" className="max-w-24 mx-auto rounded" />
                        <p className="text-green-600 text-xs mt-1">✅ Uploaded!</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Terpene Profile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Terpene Profile <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                    <div className="text-3xl mb-2">🧪</div>
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
                      <div className="mt-3">
                        <img src={uploadedFiles.terpene} alt="Terpene Profile" className="max-w-24 mx-auto rounded" />
                        <p className="text-green-600 text-xs mt-1">✅ Uploaded!</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cannabinoid Profile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cannabinoid Profile <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                    <div className="text-3xl mb-2">🔬</div>
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
                      <div className="mt-3">
                        <img src={uploadedFiles.cannabinoid} alt="Cannabinoid Profile" className="max-w-24 mx-auto rounded" />
                        <p className="text-green-600 text-xs mt-1">✅ Uploaded!</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bud Photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bud Photo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                    <div className="text-3xl mb-2">🌿</div>
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
                      <div className="mt-3">
                        <img src={uploadedFiles.bud} alt="Bud Photo" className="max-w-24 mx-auto rounded" />
                        <p className="text-green-600 text-xs mt-1">✅ Uploaded!</p>
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
                disabled={isSubmitting}
                className={`font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isSubmitting ? 'Submitting... ⏳' : 'Submit for Review 🌿'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}