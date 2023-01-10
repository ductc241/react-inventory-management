import React from 'react'
import SidebarCategorys from '../../components/Sidebar/Sidebar.categorys'
import Returns from '../../modules/Returns/Returns'

type Props = {}

const Layout_Returns = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-2">
          <SidebarCategorys />
        </div>
        <div className="col-span-10">
          <Returns />
        </div>
      </div>
    </div>
  )
}

export default Layout_Returns