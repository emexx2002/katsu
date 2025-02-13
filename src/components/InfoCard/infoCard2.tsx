import React from 'react'

interface InfoCard2Props {
    header: string;
    value: string;
}

const infoCard2 = ({
    header,
    value
}: InfoCard2Props) => {
  return (
    <div className='bg-white flex flex-col space-y-2 justify-center w-full h-[100px] rounded-[16px] max-w-[344px] p-4'>
        <h4 className='text-base font-medium text-[#637381]'>{header}</h4>
        <p className=' text-black text-lg font-bold'>{value}</p>
    </div>
  )
}

export default infoCard2