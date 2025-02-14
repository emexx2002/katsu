import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { Button } from '../Button/Button';

interface GenerateStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GenerateStatementModal: React.FC<GenerateStatementModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGenerate = () => {
    setStep(2);
    // Simulate API call delay
    setTimeout(() => {
      setStep(3);
    }, 1000);
  };

  const handleDone = () => {
    setStep(1);
    onClose();
  };

  return (
    <Modal open={isOpen} onClick={onClose}>
      <div className="w-[400px]">
        {step === 1 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Generate account statement</h2>
              
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-10 px-3 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full h-10 px-3 border rounded"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <Button
                label="Cancel"
                onClick={onClose}
                className="flex-1 justify-center !bg-gray-100 !text-gray-700"
              />
              <Button
                label="Generate"
                onClick={handleGenerate}
                className="flex-1 justify-center !bg-primary !text-white"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <div className="py-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Generate account statement</h2>
              
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-red-500">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-10v6h2V7h-2z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Account-statement-Katsu-Jan_Mar2024</div>
                  <div className="text-sm text-gray-500">32 MB</div>
                </div>
              </div>
              <Button
                label="Download"
                onClick={() => setStep(3)}
                className="!px-6"
              />
            </div>
            <Button
              label="Cancel"
              onClick={onClose}
              className="w-full mt-4 !bg-gray-100 !text-gray-700"
            />
          </div>
        )}

        {step === 3 && (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Successful!</h2>
            <p className="text-gray-600 mb-6">Your account statement has been downloaded</p>
            <Button
              label="Done"
              onClick={handleDone}
              className="w-full"
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GenerateStatementModal; 