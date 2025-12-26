import React from 'react'

const Title = (props) => {
    const {title, subtitle, align, font} = props;
  return (
    <div className={`flex flex-col justify-center items-center ${align === 'left' && 'md:items-start md:text-left'}`}>
      <h1 className={`text-[4xl] md:text-[40px] ${font || 'font-PlayFair'}`}>{title}</h1>
      <p className='text-sm md:text-base gray-500/90 mt-2 max-w-[50%]'>{subtitle}</p>
    </div>
  )
}

export default Title
