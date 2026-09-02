import React from 'react'
import { cn } from '../../shared/utils/cn'

const ButtonBrand = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative overflow-hidden squircle-15 site-xl:squircle-25 text-[9px] site-xl:text-[10px] font-medium px-4 py-2 cursor-pointer',
        'text-white hover:text-black active:scale-90 active:duration-75 transition-all duration-300',
        'bg-brand',

        'before:absolute before:inset-0 before:bg-box',
        'before:-translate-y-full hover:before:translate-y-0',
        'before:transition-transform before:duration-300 before:ease-in-out',

        className
      )}
    >
      {/* Обертка для текста с z-10 */}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default ButtonBrand