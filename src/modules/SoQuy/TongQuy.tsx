import React from 'react'

type Props = {}

const TongQuy = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 p-8 border rounded mb-5 py-4 flex -space-x-4">
        <div className="text-right">
          <p className='text-sm'>Quỹ đầu kỳ</p>
          <p className='text-yellow-500 font-mono text-sm font-semibold'>100.000.000</p>
        </div>
        <div className="text-right">
          <p className='text-sm'>Tổng thu</p>
          <p className='text-blue-500 font-mono text-sm font-semibold'>10000</p>
        </div>
        <div className="text-right">
          <p className='text-sm'>Tổng chi</p>
          <p className='text-rose-500 font-mono text-sm font-semibold'>10000</p>
        </div>
        <div className="text-right">
          <div className="">
            {/* <p className='text-sm space-x-1'>Tồn quỹ</p> */}
            <div className="group inline-block">
              <ul className="outline-none focus:outline-none py-1 rounded-sm flex items-center min-w-32">
                <span className="flex">
                  <p className='text-sm space-x-1 px-2'>Tồn quỹ</p>

                  <i className="fa fa-info-circle mt-0.5" />
                </span>
              </ul>
              <ul
                className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                        transition duration-150 ease-in-out origin-top text-black w-64 py-2 drop-shadow-xl -ml-44"
              >
                <li className="px-3 py-1 hover:text-sky-700 text-xs">
                  Tồn quỹ = Quỹ đầu kỳ + Tổng thu - Tổng chi
                </li>

              </ul>
            </div>

          </div>



          <p className='text-green-500 font-mono text-sm font-semibold'>10000</p>
        </div>
      </div>
    </div>
  )
}

export default TongQuy