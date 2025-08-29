
import React, { useState, useCallback } from 'react';
import { diagnoseCropDisease } from '../services/geminiService';
import type { CropDiagnosis } from '../types';

const CropDoctorPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [diagnosis, setDiagnosis] = useState<CropDiagnosis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setDiagnosis(null);
        setError(null);
        setIsSuccess(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiagnose = useCallback(async () => {
    if (!file || !image) return;

    setIsLoading(true);
    setError(null);
    setDiagnosis(null);
    setIsSuccess(false);

    try {
      // The base64 string from FileReader includes the data URI prefix, which needs to be removed.
      const base64String = image.split(',')[1];
      const result = await diagnoseCropDisease(base64String, file.type);
      setDiagnosis(result);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [file, image]);

  const resetState = () => {
    setImage(null);
    setFile(null);
    setDiagnosis(null);
    setError(null);
    setIsLoading(false);
    setIsSuccess(false);
  };
  
  const DiagnosisResult = ({ diagnosis }: { diagnosis: CropDiagnosis }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 animate-fade-in">
      <h3 className={`text-2xl font-bold mb-4 ${diagnosis.isHealthy ? 'text-green-600' : 'text-red-600'}`}>
        {diagnosis.diseaseName}
      </h3>
      <p className="text-gray-600 mb-4">{diagnosis.description}</p>
      
      {!diagnosis.isHealthy && (
        <>
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Recommended Treatment:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {diagnosis.recommendedTreatment.map((step, index) => <li key={index}>{step}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Preventive Measures:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {diagnosis.preventiveMeasures.map((step, index) => <li key={index}>{step}</li>)}
            </ul>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="bg-green-50 min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">AI Crop Doctor</h1>
          <p className="text-gray-600 mt-4 text-lg">
            Upload an image of your crop to get an instant diagnosis and treatment recommendations.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          {!image ? (
            <div className="text-center">
              <label htmlFor="crop-image-upload" className="cursor-pointer inline-block bg-orange-500 text-white font-semibold px-8 py-4 rounded-md hover:bg-orange-600 transition duration-300">
                Upload Crop Image
              </label>
              <input
                id="crop-image-upload"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="text-sm text-gray-500 mt-4">Supports PNG and JPG formats.</p>
            </div>
          ) : (
            <div className="text-center">
              <img src={image} alt="Crop preview" className="mx-auto rounded-lg shadow-md max-h-80 mb-6" />
              <div className="flex justify-center space-x-4">
                 <button
                  onClick={handleDiagnose}
                  className="bg-green-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
                  disabled={isLoading}
                >
                  {isLoading ? 'Analyzing...' : 'Diagnose Plant'}
                </button>
                 <button
                  onClick={resetState}
                  className="bg-gray-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-gray-600 transition duration-300"
                  disabled={isLoading}
                >
                  Change Image
                </button>
              </div>
            </div>
          )}
        </div>
        
        {isLoading && (
          <div className="text-center mt-6">
            <p className="text-lg text-gray-700 animate-pulse">Our AI is analyzing your crop, please wait...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {isSuccess && !isLoading && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg relative mt-6" role="alert">
                <strong className="font-bold">Success! </strong>
                <span className="block sm:inline">Diagnosis complete. See the results below.</span>
            </div>
        )}

        {diagnosis && <DiagnosisResult diagnosis={diagnosis} />}

      </div>
    </div>
  );
};

export default CropDoctorPage;