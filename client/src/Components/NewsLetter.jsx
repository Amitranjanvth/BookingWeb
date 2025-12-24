import React from 'react'
import Title from './Title' 

const NewsLetter = () => {
  return (
     <div className='px-20 pb-24 flex items-center justify-center'>
         <div className="w-3/4 bg-slate-900 px-2 text-center text-white py-10 flex flex-col items-center justify-center">
               <Title title='Stay Updated' subtitle='Subscribe to our newsletter & get the latest news' />
                <div className="flex items-center justify-center mt-10 border border-slate-600 focus-within:outline focus-within:outline-indigo-600 text-sm rounded-full h-14 max-w-md w-full">
                    <input type="text" className="bg-transparent outline-none rounded-full px-4 h-full flex-1" placeholder="Enter your email address"/>
                    <button className="bg-indigo-600 text-white rounded-full h-11 mr-1 px-8 flex items-center justify-center">
                        Subscribe now
                    </button>
                </div>
            </div>
     </div>
  )
}

export default NewsLetter
