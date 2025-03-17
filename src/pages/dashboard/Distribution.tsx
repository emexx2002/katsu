import React, { useState, useEffect } from 'react';
import InfoCard2 from '../../components/InfoCard/infoCard2';
import { Button } from '../../components/Button/Button';
import { FaCheckCircle, FaPlus } from 'react-icons/fa';
import { Table } from '../../components/Table/Table';
import TextInput from '../../components/FormInputs/TextInput2';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Modal from '../../components/Modal/Modal';
import SearchInput from '../../components/FormInputs/SearchInput';
import { useQuery } from "react-query";
import { distributorServices, Distributor } from "../../services/distributors";
import Spinner from "../../components/spinner/Spinner";
import { useNavigate } from 'react-router-dom';
import useFetchWithParams from '../../hooks/useFetchWithParams';
import { fDate } from '../../utils/formatTime';

const Distribution = () => {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [accountNumber, setAccountNumber] = React.useState('');
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const pageSize = 10;

  const initialValues = {
    companyName: '',
    personName: '',
    email: '',
    phoneNumber: ''
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required('Company name is required'),
    personName: Yup.string().required('Contact person name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(
        /^[0-9]{10,15}$/,
        'Phone number must be between 10-15 digits without country code'
      )
      .required('Phone number is required')
  });


  const { data: distributorsData, isLoading: loadingDistributors, error: distributorsError, refetch } = useFetchWithParams(
    [`distributors`, {
      page: page,
      name: search
    }],
    distributorServices.getAllDistributors,
    {
      onSuccess: (data: any) => {
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )



  const {
    data: statsData,
    isLoading: loadingStats
  } = useQuery(
    ["distributorStats"],
    () => distributorServices.getDistributorStats(),
    {
      refetchOnWindowFocus: false,
      staleTime: 300000 // 5 minutes
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (distributorsData) {
    }
    if (distributorsError) {
    }
  }, [distributorsData, distributorsError]);

  const handleCreateDistributor = async (values: any, { resetForm }: any) => {
    setIsCreating(true);
    try {
      const payload = [{
        companyName: values.companyName,
        personName: values.personName,
        email: values.email,
        phone: values.phoneNumber,
        identifier: "1234567890"
      }];

      await distributorServices.createDistributor(payload, true);

      setIsCreating(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setShowAddModal(false);
        resetForm();
        refetch();
      }, 2000);
    } catch (error) {
      console.error("Error creating distributor:", error);
      setIsCreating(false);
    }
  };

  return (
    <section>
      <Modal open={showAddModal} onClick={() => setShowAddModal(false)}>
        {isCreating ? (
          <div className="py-10 px-6 text-center">
            <div className="animate-spin h-8 w-8 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full" />
            <h2 className="text-xl font-semibold mb-2">Creating sub-account</h2>
            <p className="text-gray-600">This will only take few seconds</p>
          </div>
        ) : showSuccess ? (
          <div className="py-10 px-6 text-center">
            <div className="h-12 w-12 mx-auto mb-4 text-green-500">
              <FaCheckCircle />
            </div>
            <h2 className="text-xl font-semibold mb-2">Distributor created successfully</h2>
            <p className="text-gray-600">The distributor has been created successfully.</p>
          </div>
        ) : (
          <div className="w-[500px]">
            <h2 className="text-xl font-semibold mb-4">Create Distributor</h2>
            <p className="text-gray-600 mb-6">Provide the details of the distributor below</p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleCreateDistributor}
            >
              {(formikProps) => (
                <Form className="space-y-4">
                  <TextInput
                    label="Company name"
                    name="companyName"
                    placeholder="Enter company name"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label="Contact person name"
                      name="personName"
                      placeholder="Enter contact name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label="Contact email (optional)"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                    />
                    <TextInput
                      label="Contact phone number"
                      name="phoneNumber"
                      type="text"
                      placeholder="Enter phone number without country code"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      label="Cancel"
                      variant="outlined"
                      className='w-full font-medium !text-black bg-white border-gray-300 border justify-center'
                      type="button"
                      onClick={() => setShowAddModal(false)}
                    />
                    <Button
                      label="Create Distributor"
                      className='w-full font-medium justify-center'
                      type="submit"
                      disabled={formikProps.isSubmitting}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </Modal>
      <div className='w-full h-full space-y-4 px-8 py-8'>
        <h1 className='text-2xl font-bold'>Distributors</h1>
        <div className='w-full grid grid-cols-3 gap-3'>
          <InfoCard2
            header='Total Distributors'
            value={loadingStats ? '...' : String(statsData?.total || '0')}
          />
          <InfoCard2
            header='Active Distributors'
            value={loadingStats ? '...' : String(statsData?.active || '0')}
          />
          <InfoCard2
            header='Inactive Distributors'
            value={loadingStats ? '...' : String(statsData?.inactive || '0')}
          />
        </div>

        <div className='w-full min-h-[500px] bg-white rounded-md'>
          <div className='flex  px-3 py-3 border-b border-gray-200 items-center justify-between'>
            <h1 className='text-lg font-bold'>All Distributors</h1>

            <Button onClick={() => setShowAddModal(true)} iconPosition='beforeText' icon={<FaPlus />} label='Add Distributor' />
          </div>

          <Table
            loading={loadingDistributors}
            showCheckbox={true}
            topSlot={
              <div className='flex items-center gap-4 p-4'>
                <SearchInput
                  placeholder="Search by Amount, Transaction ID or sender/receiver name"
                  className="flex-1"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <select className="h-10 border rounded px-3">
                  <option>Account Status</option>
                </select>
                <select className="h-10 border rounded px-3">
                  <option>Distributor Status</option>
                </select>
              </div>
            }
            columns={[
              { header: 'ID', view: (row: any) => row.id },
              { header: 'Sub-account', view: (row: any) => row.identifier || "-" },
              { header: 'Company Name', view: (row: any) => row.companyName },
              { header: 'Contact Name', view: (row: any) => row.name },
              { header: 'Email', view: (row: any) => row.email },
              { header: 'Date Created', view: (row: any) => row.createdDate ? fDate(row.createdDate).toLocaleString() : "" },
              {
                header: 'Status',
                view: (row: any) => (
                  <span className={`px-2 py-1 rounded text-xs ${row.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {row.active ? 'Active' : 'Inactive'}
                  </span>
                )
              },
              {
                header: 'Action',
                view: (row: any) => (
                  <div className="flex gap-2">
                    <Button
                      label="View"
                      variant="outlined"
                      className="text-primary"
                      onClick={() => navigate(`/distributors/${row.id}`)}
                    />
                  </div>
                )
              },
            ]}
            data={distributorsData?.content || []}
            pagination={{
              totalRows: distributorsData?.totalElements || 0,
              pageSize: pageSize,
              page: page + 1,
              setPage: (newPage) => setPage(newPage - 1)
            }}
          />

        </div>


      </div>
    </section>

  );
};

export default Distribution;    