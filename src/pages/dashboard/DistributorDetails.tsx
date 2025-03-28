import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { distributorServices } from '../../services/distributors';
import { Button } from '../../components/Button/Button';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from '../../components/spinner/Spinner';

const DistributorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch distributor details
  const {
    data: distributor,
    isLoading: loadingDistributor
  } = useQuery(
    ['distributor', id],
    () => distributorServices.getDistributorById(Number(id)),
    { enabled: !!id }
  );

  // Fetch distributor account
  const {
    data: account,
    isLoading: loadingAccount
  } = useQuery(
    ['distributorAccount', id],
    () => distributorServices.getDistributorAccount(Number(id)),
    { enabled: !!id }
  );

  if (loadingDistributor || loadingAccount) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="px-8 py-8 bg-gray-50 min-h-screen">
      {/* Back button */}
      <button
        onClick={() => navigate('/distributors')}
        className="flex items-center text-blue-500 font-medium mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Distributor details</h1>

      {/* Distributor header card */}
      <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center shadow-sm">
        <div className="flex items-start">
          <div className="bg-gray-200 w-16 h-16 rounded-lg mr-4 flex items-center justify-center">
            <span className="text-gray-500 text-2xl">{distributor?.companyName?.charAt(0) || 'D'}</span>
          </div>
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-bold mr-3">{distributor?.companyName}</h2>
              <span className={`px-3 py-1 rounded-full text-xs ${distributor?.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {distributor?.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-gray-500">Date created: {new Date(distributor?.createdDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        <Button
          label={distributor?.active ? 'Deactivate' : 'Activate'}
          className={distributor?.active ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}
          onClick={() => {/* Add deactivation logic */ }}
        />
      </div>

      {/* Info sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distributor Information section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </span>
            Distributor Information
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Distributor Name:</span>
              <span className="font-medium">{distributor?.companyName}</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Account Type:</span>
              <span className="font-medium">Personal</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Distributor ID:</span>
              <span className="font-medium">{distributor?.id}</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Enrollment Date:</span>
              <span className="font-medium">{new Date(distributor?.createdDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Address:</span>
              <span className="font-medium">N/A</span>
            </div>
            <div className="flex justify-between pb-3">
              <span className="text-gray-500">Last Transaction:</span>
              <span className="font-medium">N/A</span>
            </div>
          </div>
        </div>

        {/* Sub-account details section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
            </span>
            Sub-account details
          </h3>

          {account && account.length > 0 ? (
            <div className="space-y-4">
              {/* Account details when available */}
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Account Number:</span>
                <span className="font-medium">{account[0].accountNumber}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Bank Name:</span>
                <span className="font-medium">{account[0].bank}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Account Name:</span>
                <span className="font-medium">{account[0].accountName}</span>
              </div>
              <div className="flex justify-between pb-3">
                <span className="text-gray-500">Status:</span>
                <span className={`px-2 py-1 rounded text-xs ${!account[0].frozen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {!account[0].frozen ? 'Active' : 'Frozen'}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded mb-4 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">No sub-account yet</h4>
              <p className="text-gray-500 text-center mb-6">sub-account details will be displayed here</p>
              <Button
                label="Create sub-account"
                onClick={() => setShowAddModal(true)}
                className="bg-blue-500 text-white"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DistributorDetails;