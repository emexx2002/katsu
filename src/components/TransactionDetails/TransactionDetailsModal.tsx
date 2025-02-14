import React from 'react';
import Modal from '../Modal/Modal';
import { HiOutlineDownload } from 'react-icons/hi';
import { IoWarningOutline } from 'react-icons/io5';

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  isOpen,
  onClose,
  transaction
}) => {
  const DetailRow = ({ label, value, className = '' }: { label: string; value: React.ReactNode; className?: string }) => (
    <div className="flex justify-between py-3 border-b border-gray-100">
      <span className="text-gray-600">{label}</span>
      <span className={`text-right ${className}`}>{value}</span>
    </div>
  );

  return (
    <Modal open={isOpen} onClick={onClose}>
      <div className="w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-1">Transaction Details</h2>
        <p className="text-gray-500 mb-6">Your transaction receipt</p>

        <div className="space-y-1">
          <DetailRow label="Receiver name:" value={transaction?.receiver} />
          <DetailRow label="Amount:" value={`₦${transaction?.amount}`} />
          <DetailRow label="Transaction date:" value={transaction?.date} />
          <DetailRow label="Receiver number:" value={transaction?.accountNumber || '1234567890'} />
          <DetailRow label="Receiver bank:" value={transaction?.bank || 'GT Bank'} />
          <DetailRow label="Transaction type:" value={transaction?.type} />
          <DetailRow label="Sender name:" value={transaction?.sender || 'Taiwo Gina'} />
          <DetailRow label="Narration:" value={transaction?.narration || 'Money to sort out Nigeria ehen?'} />
          <DetailRow label="Transaction charge:" value="₦123.000" />
          <DetailRow label="VAT:" value="₦123.000" />
          <DetailRow 
            label="Status:" 
            value={
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                {transaction?.status}
              </span>
            }
          />
          <DetailRow label="Transaction ID:" value={transaction?.transactionId} />
          <DetailRow label="Session ID" value={transaction?.transactionId} />
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Got a complaint?</h3>
          <a href="#" className="text-primary hover:underline">Report transaction</a>
          <p className="text-gray-600 mt-2">
            Or contact Katsu support on{' '}
            <a href="mailto:info@sabi.support" className="text-primary hover:underline">info@sabi.support</a>
            {' '}or{' '}
            <a href="tel:+234-02257681" className="text-primary hover:underline">+234-02257681</a>
          </p>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-md border border-gray-200 font-medium"
          >
            Close
          </button>
          <button
            className="flex-1 py-3 px-4 rounded-md bg-primary text-white font-medium flex items-center justify-center gap-2"
          >
            <HiOutlineDownload className="text-xl" />
            Download Receipt
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionDetailsModal; 