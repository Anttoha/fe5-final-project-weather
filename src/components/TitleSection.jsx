import React from 'react'
import { cn } from '../shared/utils/cn'

const TitleSection = ({children, className}) => {
  return (
    <h2 className={cn('text-[10px] site-md:text-[12px] site-xl:text-[16px] font-semibold', className)}>
      {children}
    </h2>
  )
}

export default TitleSection
