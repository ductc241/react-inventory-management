import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Modal } from '../../../components'
import ListQuyen from '../ListQuyen'

type Props = {}

const Profile = (props: Props) => {
  return (
    <div>
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")' }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black" />
          </div>
          <Link to='/' className="absolute p-4 text-white text-lg hover:text-green-500">
            <p className=''>
              <i className="fas fa-chevron-left mr-2 text-white hover:text-green-500" />
              Trở về
            </p>

          </Link>
        </section>
        <section className="relative py-8">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 ">
              <div className="px-6">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 w-52">
                      <img className='rounded-full' alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" />
                    </div>
                  </div>
                  {/* <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="text-center mt-24 md:text-left md:-mt-12 md:ml-[350px]">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    Tên Admin
                  </h3>
                  <div className="text-base leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                    <i className="far fa-envelope mr-2 text-lg text-blueGray-400" />
                    polywareh@fpt.edu.vn
                  </div>
                  <div className="text-base leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                    <i className="fab fa-whatsapp mr-2 text-lg text-blueGray-400" />
                    0923.239.468
                  </div>
                  <div className="text-base leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                    Sóc Sơn, Hà Nội, Việt Nam
                  </div>

                  <div className="md:text-right md:-mt-44">
                    <div className="py-2 px-3 sm:mt-0">
                      <button className="bg-[#00263a] active:bg-teal-800 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                        Chỉnh sửa thông tin
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center md:mt-48">
                  <div className="md:col-span-2 xl:col-span-3">
                    <h3 className="text-2xl font-semibold">
                      Quản lý quyền
                    </h3>
                  </div>
                  <ListQuyen />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

export default Profile