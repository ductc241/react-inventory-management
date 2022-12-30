import React from 'react'
import SidebarCategorys from '../../components/Sidebar/Sidebar.categorys'
import PriceBook from '../../modules/priceBook/PriceBook'

type Props = {}

const Layout_PriceBook = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-2">
          <SidebarCategorys />
        </div>
        <div className="col-span-10">
          <PriceBook />
        </div>
      </div>
    </div>
  )
}

export default Layout_PriceBook