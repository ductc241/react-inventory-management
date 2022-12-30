import React from 'react'

type Props = {}

const PriceBook = (props: Props) => {
  return (
    <div>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Mã Lô</th>
                  <th className="px-4 py-3">Tên Hàng</th>
                  <th className="px-4 py-3">Giá Nhập</th>
                  <th className="px-4 py-3">Giá Bán</th>
                  <th className="px-4 py-3">Tiền Lãi</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-ms font-semibold border">ML00232</td>
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" loading="lazy" />
                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-semibold text-black">Sufyan</p>
                        <p className="text-xs text-gray-600">Developer</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm border">2000 VNĐ</td>
                  <td className="px-4 py-3 text-sm border">2000 VNĐ</td>
                  <td className="px-4 py-3 text-sm border">2000 VNĐ</td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-ms font-semibold border">ML00232</td>
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" loading="lazy" />
                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-semibold text-black">Sufyan</p>
                        <p className="text-xs text-gray-600">Developer</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm border">2000 VNĐ</td>
                  <td className="px-4 py-3 text-sm border">2000 VNĐ</td>
                  <td className="px-4 py-3 text-sm border">2000 VNĐ</td>
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