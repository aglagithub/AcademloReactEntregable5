import React from 'react'

const FooterHome = () => {
  return (
    <section className='relative'>
         {/*Sección roja  */}
        <div className='bg-red-600 h-20'></div>
        {/*Sección Negra  */}
        <div className='bg-black h-14'></div>

    {/*Boton Pokeball  */}
    <div className='w-20 aspect-square bg-white border-[6px] border-black rounded-full absolute bottom-0 left-[50%] -translate-x-[50%] after:content-[""] after:h-11 after:aspect-square after:bg-gray-800 after:rounded-full after:absolute after:top-[50%] after:-translate-y-[50%] after:left-[50%] after:-translate-x-[50%] after:border-[9px] after:border-black'>
        
    </div>
    
    </section>
  )
}

export default FooterHome