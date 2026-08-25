import React from 'react'
import { weatherIcon } from '../../shared/utils/weatherIcons'

const EightDay = ({city}) => {
  return (
    <li className='w-full max-w-25 site-md:max-w-full rounded-[10px] bg-[#D9D9D9] pt-2.5 pb-5.5 site-md:py-0.5 site-md:px-4 site-xl:px-12.5 flex flex-col site-md:grid site-md:grid-cols-3 items-center text-[10px] site-md:text-[14px] site-xl:text-[16px] font-medium'>
        <p className='site-md:text-left'>{city.day}, {city.date}</p>
        <div className="mt-5 mb-3.75 site-md:my-auto site-md:justify-self-center flex flex-col site-md:flex-row gap-1.75 site-md:gap-3.75 site-xl:gap-3.25 items-center"><img src={weatherIcon(city?.description)} alt="" className='size-7.5 site-md:size-8.75 site-xl:size-11.25' /><p>{city.tempMin}/{city.tempMax}℃</p></div>
        <p className='site-md:justify-self-end site-md:text-right'>{city.description}</p>
    </li>
  )
}

export default EightDay
