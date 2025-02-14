import React from 'react';
import InfoCard2 from '../../components/InfoCard/infoCard2';
import { Button } from '../../components/Button/Button';
import { FaCheckCircle, FaPlus } from 'react-icons/fa';
import { Table } from '../../components/Table/Table';
import TextInput from '../../components/FormInputs/TextInput2';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Modal from '../../components/Modal/Modal';
import SearchInput from '../../components/FormInputs/SearchInput';

const Distribution = () => {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [accountNumber, setAccountNumber] = React.useState('');

  const initialValues = {
    companyName: '',
    contactName: '',
    contactBvn: '',
    contactEmail: '',
    contactPhone: '',
    subAccountName: ''
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required('Company name is required'),
    contactName: Yup.string().required('Contact person name is required'),
    contactBvn: Yup.string().required('BVN is required'),
    contactEmail: Yup.string().email('Invalid email format'),
    contactPhone: Yup.string().required('Phone number is required'),
    subAccountName: Yup.string().required('Sub-account name is required')
  });

  return (
    <section>
       <Modal open={showAddModal} onClick={() => setShowAddModal(false)}>
          {isCreating ? (
            <div className="py-10 px-6 text-center">
              <div className="animate-spin h-8 w-8 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full"/>
              <h2 className="text-xl font-semibold mb-2">Creating sub-account</h2>
              <p className="text-gray-600">This will only take few seconds</p>
            </div>
          ) : showSuccess ? (
            <div className="py-10 px-6 text-center">
              <div className="h-12 w-12 mx-auto mb-4 text-green-500">
                <FaCheckCircle />
              </div>
              <h2 className="text-xl font-semibold mb-2">Sub-account created successfully</h2>
              <p className="text-gray-600">Your sub-account has been created successfully.</p>
            </div>
          ) : (
            <div className="w-[500px]">
              <h2 className="text-xl font-semibold mb-4">Create Sub-account</h2>
              <p className="text-gray-600 mb-6">Provide the details of the sub-account below</p>
              
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  setIsCreating(true);
                  // Simulate API call
                  setTimeout(() => {
                    setIsCreating(false);
                    setShowSuccess(true);
                    setAccountNumber('0123456789');
                  }, 2000);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <TextInput
                      label="Company name"
                      name="companyName"
                      placeholder="Enter company name"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <TextInput
                        label="Contact person name"
                        name="contactName"
                        placeholder="Enter contact name"
                      />
                      <TextInput
                        label="Contact BVN"
                        name="contactBvn"
                        placeholder="Enter BVN"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <TextInput
                        label="Contact email (optional)"
                        name="contactEmail"
                        type="email"
                        placeholder="Enter email address"
                      />
                      <TextInput
                        label="Contact phone number"
                        name="contactPhone"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <TextInput
                      label="Sub-account name"
                      name="subAccountName"
                      placeholder="Enter sub-account name"
                    />

                    <div className="flex gap-4 pt-4">
                      <Button 
                        label="Cancel" 
                        variant="outlined"
                        className='w-full font-medium !text-black bg-white border-gray-300 border justify-center'
                        type="button"
                        onClick={() => setShowAddModal(false)}
                      />
                      <Button 
                        label="Create Sub-account" 
                        className='w-full font-medium justify-center'
                        type="submit"
                        disabled={isSubmitting}
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
          <InfoCard2 header='Total Distributors' value='10' />
          <InfoCard2 header='Active Distributors' value='9' />
          <InfoCard2 header='Inactive Distributors' value='1' />
        </div>

        <div className='w-full min-h-[500px] bg-white rounded-md'>
          <div className='flex  px-3 py-3 border-b border-gray-200 items-center justify-between'>
            <h1 className='text-lg font-bold'>All Distributors</h1>

            <Button onClick={() => setShowAddModal(true)} iconPosition='beforeText' icon={<FaPlus />} label='Add Distributor' />
          </div>

          <Table
            loading={false}
            showCheckbox={true}
            topSlot={
              <div className='flex items-center gap-4 p-4'>
                <SearchInput 
                  placeholder="Search by Amount, Transaction ID or sender/receiver name"
                  className="flex-1"
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
              { header: 'ID', view: (row:any) => row.id },
              { header: 'Sub-account', view: (row:any) => row.subAccount },
              { header: 'Account status', view: (row:any) => row.accountStatus },
              { header: 'Account balance', view: (row:any) => row.accountBalance },
              { header: 'Date Created', view: (row:any) => row.dateCreated },
              { header: 'Status', view: (row:any) => row.status },
              { header: 'Action', view: (row:any) => <Button label="Action" /> },
            ]}
            data={[]}
          />

        </div>

       
      </div>
    </section>

  );
};

export default Distribution;    