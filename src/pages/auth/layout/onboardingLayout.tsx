import { LayoutOutlet } from '../../../Routes/Layout';
import { useLocation } from "react-router-dom";
import bg from '../../../assets/noise.png';
export default function AuthLayout() {
  const location = useLocation();
  return (
    <div className='h-screen flex flex-col gap-8 justify-between md:px-20 py-4'>
      <div className='flex items-center'>
        <img src="/images/logo.png" className='w-[100px] h-auto' alt="logo" />
      </div>
      <div className='flex h-full items-center md:gap-8 justify-center'>
        <div className={`w-full lg:w-1/2 lg:py-10  px-4`}>
          <LayoutOutlet />
        </div>
        <div className={`hidden lg:block h-full w-1/2 px-4`}>
          <div className='h-full bg-[#FFF3DA] bg-cover relative rounded-3xl'>
            <div style={{ backgroundImage: `url(${bg})` }} className="absolute inset-0 opacity-10 rounded-3xl" />
            <div className="relative rounded-3xl h-full  p-4 text-[#212B36] overflow-hidden">
              <img src="/images/logo.png" className='w-[100px] h-auto' alt="logo" />
              <div className='relative z-50'>
                <div className='space-y-3 px-3'>
                  <h3 className="text-[38px] font-semibold ">Unlock Your Cash Flow</h3>
                  <p className="text-2xl font-medium">Turn your unpaid invoices into <br /> instant capital</p>
                </div>

              </div>

            </div>
            <img src="/images/person.png" className='w-full absolute bottom-0 left-0 right-0 z-10  h-auto object-cover' alt="onboarding" />
          </div>

        </div>
      </div>

      <div className='flex items-center justify-between'>
        <p className='text-sm'>Licensed By Central Bank of Nigeria.</p>
        <div className='flex items-center gap-2'>
          <p className='text-sm'>Privacy Policy</p>
          <p className='text-sm'>Terms of Service</p>
        </div>
      </div>
    </div>
  );
}
