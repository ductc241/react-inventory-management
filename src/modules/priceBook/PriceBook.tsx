import React from 'react'

type Props = {}

const PriceBook = (props: Props) => {
  return (
    <div>
      <section className="container mx-auto p-6">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Mã Lô</th>
                  <th className="px-4 py-3">Tên Hàng</th>
                  <th className="px-4 py-3">Giá Nhập ($)</th>
                  <th className="px-4 py-3">Giá Bán ($)</th>
                  <th className="px-4 py-3">Tiền Lãi ($)</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-ms font-semibold border">ML00232</td>
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold text-black">Sạc dự phòng 10000MaH Microcom</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm border w-48">2000</td>
                  <td className="px-4 py-3 text-sm border w-48">
                    <input type="number" className='outline-none focus:border-b-2 border-green-600' />
                  </td>
                  <td className="px-4 py-3 text-sm border w-48">2000</td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-ms font-semibold border">ML00232</td>
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold text-black">Sạc dự phòng 10000MaH Microcom</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm border w-48">2000</td>
                  <td className="px-4 py-3 text-sm border w-48">
                    <input type="number" className='outline-none focus:border-b-2 border-green-600' />
                  </td>
                  <td className="px-4 py-3 text-sm border w-48">2000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  )
}

export default PriceBook