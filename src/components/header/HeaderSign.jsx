import React from 'react'
import { cn } from '../../shared/utils/cn'
import HeaderAvatar from './HeaderAvatar'
import HeaderSignUpButton from './HeaderSignUpButton'

const HeaderSign = ({className = ''}) => {
  return (
    <div className={cn('items-center flex flex-col-reverse site-md:flex-row gap-3.75 site-md:gap-6.25 site-xl:gap-6.75', className)}>
       {/* <HeaderSignUpButton />
       <HeaderAvatar /> */}
    </div>
  )
}

export default HeaderSign
