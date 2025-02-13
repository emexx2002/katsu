import React, { useState } from 'react'


interface TabBarITF {
    tabs:string[],
    onChange?: (e: any) => void;
}

const TabBar = ({tabs} : TabBarITF) => {
    const [active,setActive] = useState<string>(tabs[0])

    const handleTabChange = (val:string | any) => {
        setActive(val)
    }
  return (
    <div className='flex items-center gap-8'>
        {
            tabs.map((items:string) =>  <Tab active={active} label={items} onClick={() => handleTabChange(items)} />)
        }
       
    </div>
  )
}

const Tab = ({ active, label, onClick }: { active: string, label: string, onClick: (param:any) => void }) => {

    return (
      <button onClick={() => onClick(label)} className={`${active === label ? " h-[48px] text-xs min-w-[84px] text-black flex border-b-2 border-black  items-center justify-center font-semibold lg:text-sm shadow-sm px-2 lg:px-3 py-3 rounded-b-sm capitalize" : "h-[48px] min-w-[84px] text-xs lg:text-sm flex rounded-b-sm text-gray-500 font-semibold items-center justify-center px-2 lg:px-3 py-3 capitalize"}`}>
        {label}
      </button>
    )
  }

export default TabBar