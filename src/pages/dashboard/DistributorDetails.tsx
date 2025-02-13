import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const DistributorDetails = () => {
  return (
    <div className="p-6">
      {/* Back Button */}
      <div className="mb-4">
        <button className="flex items-center text-blue-500 hover:text-blue-600">
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Distributor details</h1>

      {/* Distributor Header Card */}
      <div className="bg-white rounded-lg p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 2H5C3.89543 2 3 2.89543 3 4V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V4C21 2.89543 20.1046 2 19 2Z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">Hubmart Distributor 1</h2>
              <span className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded">Active</span>
            </div>
            <p className="text-sm text-gray-500">Date created: 24 July, 2022</p>
          </div>
        </div>
        <button className="px-4 py-2 text-red-500 bg-red-50 rounded hover:bg-red-100">
          Deactivate
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distributor Information Card */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" />
              <path d="M12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
            </svg>
            <h3 className="text-lg font-semibold">Distributor Information</h3>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Distributor Name:', value: 'Evergreen Solutions' },
              { label: 'Account Type:', value: 'Personal' },
              { label: 'Distributor ID:', value: '0123456789' },
              { label: 'Enrolment Date:', value: '24 July, 2022' },
              { label: 'Address:', value: '9B, Awolowo Avenue, Ikeja' },
              { label: 'Last Transaction:', value: '28 February 2024' },
            ].map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{item.label}</span>
                <span className="text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-account Card */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 2H5C3.89543 2 3 2.89543 3 4V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V4C21 2.89543 20.1046 2 19 2Z" />
            </svg>
            <h3 className="text-lg font-semibold">Sub-account details</h3>
          </div>

          <div className="flex flex-col items-center justify-center h-[300px]">
            <svg className="w-16 h-16 text-blue-500 mb-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 2H5C3.89543 2 3 2.89543 3 4V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V4C21 2.89543 20.1046 2 19 2Z" />
            </svg>
            <h4 className="text-lg font-semibold mb-2">No sub-account yet</h4>
            <p className="text-gray-500 mb-4">sub-account details will be displayed here</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Create sub-account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DistributorDetails