import React from 'react'
import { cn } from '../../shared/utils/cn'

const Logo = ({className = ''}) => {
  return (
    <a href="#" className={cn('inline-block', className)}>
        <img src="/assets/logo.webp" alt="logo" className='w-full h-full object-contain'/>
    </a>
  )
}

export default Logo
