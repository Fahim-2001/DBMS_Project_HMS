"use client";
import{ UserDataContext } from "@/app/(frontend)/Contexts/UserDataProvider/UserDataProvider";
import React, { useContext } from "react";
import useSWR from "swr";

// Function to fetch stats.
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const getStats = (url) => {
  const { data: data, error, isLoading } = useSWR(url, fetcher);
  return data || [];
};

const DisplayStats = async () => {
  const {runningUser} = useContext(UserDataContext);

  // API responses to get Stats.
  const users = getStats(`${process.env.NEXT_PUBLIC_URL}api/users`);
  const doctors = getStats(`${process.env.NEXT_PUBLIC_URL}api/doctors`);
  const appointments = getStats(
    `${process.env.NEXT_PUBLIC_URL}api/appointments`
  );
  const labTestRequests = getStats(
    `${process.env.NEXT_PUBLIC_URL}api/labtests`
  );

  let completedLabTests = labTestRequests?.filter(
    (test) => test.report_status === "Uploaded"
  );

  let completedAppointmens = appointments?.filter(
    (appointment) => appointment.appt_status === "Checked"
  );

  return (
    <section>
      <p className="text-center"><span className="text:lg md:text-xl font-semibold">Welcome,</span>{" "}<span className="text-xl md:text-2xl text-primary font-bold">{runningUser?.fullname}</span> </p>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 justify-items-center my-4">
        {/* Card 1 */}
        <div className="flex flex-col items-center border shadow-md rounded-md w-full">
          <div className="py-4">
            <svg
              width="70px"
              height="70px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <circle cx="12" cy="6" r="4" fill="#000000"></circle>
                <path
                  d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                  fill="#000000"
                ></path>
              </g>
            </svg>
          </div>
          <div className="bg-primary rounded-b-md w-full h-full py-3">
            <p className="text-5xl text-white font-bold text-center">
              {users?.length}
            </p>
            <p className="text-xl text-white font-bold text-center">Users</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center border shadow-md rounded-md w-full">
          <div className="py-4">
            <svg
              width="70px"
              height="70px"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M24 25.1333C28.9725 25.1333 33 21.076 33 16.0667C33 11.0573 28.9725 7 24 7C19.0275 7 15 11.0573 15 16.0667C15 21.076 19.0275 25.1333 24 25.1333Z"
                  fill="#000000"
                ></path>
                <mask
                  id="mask0"
                  maskType="alpha"
                  maskUnits="userSpaceOnUse"
                  x="6"
                  y="28"
                  width="36"
                  height="13"
                >
                  <path
                    d="M16.8786 28.3569C17.3814 28.2333 17.8971 28.4861 18.1254 28.9539L22.1893 28.9542C24 28.9538 24 28.9543 25.8105 28.9539L29.8746 28.9539C30.1029 28.4861 30.6186 28.2333 31.1214 28.3569C36.5255 29.6849 42 32.3928 42 36.4664V40.9997H6V36.4664C6 32.3928 11.4745 29.6849 16.8786 28.3569Z"
                    fill="#000000"
                  ></path>
                </mask>
                <g mask="url(#mask0)"> </g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.6354 29.9375C15.4505 30.5613 15.4381 31.3074 15.7149 32.1985C15.8088 32.1896 15.9039 32.1851 16 32.1851C17.6569 32.1851 19 33.5382 19 35.2073C19 36.8764 17.6569 38.2295 16 38.2295C14.3431 38.2295 13 36.8764 13 35.2073C13 34.3657 13.3415 33.6044 13.8925 33.0564C13.4321 31.7408 13.3829 30.4996 13.7178 29.3692C13.7252 29.3442 13.7328 29.3193 13.7406 29.2945C9.54212 30.7966 6 33.1897 6 36.4664V42.9997H42V36.4664C42 33.2191 38.5212 30.8396 34.3723 29.3352C34.5763 29.9155 34.6923 30.5333 34.7142 31.1851H34.9412C35.1715 31.1851 35.3947 31.2645 35.5732 31.4101L37.632 33.0891C37.8649 33.279 38 33.5636 38 33.8641V38.2295C38 38.7818 37.5523 39.2295 37 39.2295H34.9412V37.2295H36V34.3389L34.5851 33.1851H34.5045C34.4953 33.2244 34.4858 33.2639 34.476 33.3035L33.9986 33.1851H32.4149L31 34.3389V37.2295H32.0588V39.2295H30C29.4477 39.2295 29 38.7818 29 38.2295V33.8641C29 33.5636 29.1351 33.279 29.368 33.0891L31.4268 31.4101C31.6053 31.2645 31.8285 31.1851 32.0588 31.1851H32.7126C32.6878 30.6727 32.5803 30.2144 32.4114 29.8041C32.2091 29.3129 31.9073 28.8627 31.5142 28.4558C31.3833 28.422 31.2523 28.389 31.1214 28.3569C30.6186 28.2333 30.1029 28.4861 29.8746 28.9539L25.8105 28.9539C24.9218 28.9541 24.4694 28.9541 24.0249 28.954H24.0248H24.0248C23.5637 28.954 23.1112 28.954 22.1893 28.9542L18.1254 28.9539C17.8971 28.4861 17.3814 28.2333 16.8786 28.3569C16.7666 28.3844 16.6544 28.4125 16.5424 28.4413C16.0993 28.8976 15.7951 29.3987 15.6354 29.9375ZM17 35.2073C17 35.7858 16.5384 36.2295 16 36.2295C15.4616 36.2295 15 35.7858 15 35.2073C15 34.6288 15.4616 34.1851 16 34.1851C16.5384 34.1851 17 34.6288 17 35.2073Z"
                  fill="#000000"
                ></path>
              </g>
            </svg>
          </div>
          <div className="bg-primary rounded-b-md w-full h-full py-3">
            <p className="text-5xl text-white font-bold text-center">
              {doctors?.length}
            </p>
            <p className="text-xl text-white font-bold text-center">Doctors</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center border shadow-md rounded-md w-full">
          <div className="py-4">
            <svg
              fill="#000000"
              width="70px"
              height="70px"
              viewBox="0 0 24 24"
              data-name="Layer 1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title></title>
                <path d="M18,5V3a1,1,0,0,0-2,0V5H8V3A1,1,0,0,0,6,3V5H2V21H22V5Zm2,14H4V7H20Zm-7-9H11v2h2Zm4,0H15v2h2ZM9,14H7v2H9Zm4,0H11v2h2Z"></path>
              </g>
            </svg>
          </div>
          <div className="bg-primary rounded-b-md w-full h-full py-3">
            <p className="text-5xl text-white font-bold text-center">
              {appointments?.length}
            </p>
            <p className="text-xl text-white font-bold text-center">
              Total Booked Appointments
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center border shadow-md rounded-md w-full">
          <div className="py-4">
            <svg
              width="71px"
              height="71px"
              viewBox="0 0 1024 1024"
              fill="#000000"
              class="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M824.8 1003.2H203.2c-12.8 0-25.6-2.4-37.6-7.2-11.2-4.8-21.6-12-30.4-20.8-8.8-8.8-16-19.2-20.8-30.4-4.8-12-7.2-24-7.2-37.6V260c0-12.8 2.4-25.6 7.2-37.6 4.8-11.2 12-21.6 20.8-30.4 8.8-8.8 19.2-16 30.4-20.8 12-4.8 24-7.2 37.6-7.2h94.4v48H203.2c-26.4 0-48 21.6-48 48v647.2c0 26.4 21.6 48 48 48h621.6c26.4 0 48-21.6 48-48V260c0-26.4-21.6-48-48-48H730.4v-48H824c12.8 0 25.6 2.4 37.6 7.2 11.2 4.8 21.6 12 30.4 20.8 8.8 8.8 16 19.2 20.8 30.4 4.8 12 7.2 24 7.2 37.6v647.2c0 12.8-2.4 25.6-7.2 37.6-4.8 11.2-12 21.6-20.8 30.4-8.8 8.8-19.2 16-30.4 20.8-11.2 4.8-24 7.2-36.8 7.2z"
                  fill=""
                ></path>
                <path
                  d="M752.8 308H274.4V152.8c0-32.8 26.4-60 60-60h61.6c22.4-44 67.2-72.8 117.6-72.8 50.4 0 95.2 28.8 117.6 72.8h61.6c32.8 0 60 26.4 60 60v155.2m-430.4-48h382.4V152.8c0-6.4-5.6-12-12-12H598.4l-5.6-16c-12-33.6-43.2-56-79.2-56s-67.2 22.4-79.2 56l-5.6 16H334.4c-6.4 0-12 5.6-12 12v107.2zM432.8 792c-6.4 0-12-2.4-16.8-7.2L252.8 621.6c-4.8-4.8-7.2-10.4-7.2-16.8s2.4-12 7.2-16.8c4.8-4.8 10.4-7.2 16.8-7.2s12 2.4 16.8 7.2L418.4 720c4 4 8.8 5.6 13.6 5.6s10.4-1.6 13.6-5.6l295.2-295.2c4.8-4.8 10.4-7.2 16.8-7.2s12 2.4 16.8 7.2c9.6 9.6 9.6 24 0 33.6L449.6 784.8c-4.8 4-11.2 7.2-16.8 7.2z"
                  fill=""
                ></path>
              </g>
            </svg>
          </div>
          <div className="bg-primary rounded-b-md w-full h-full  py-3">
            <p className="text-5xl text-white font-bold text-center">
              {completedAppointmens?.length}
            </p>
            <p className="text-xl text-white font-bold text-center">
              Completed Appointments
            </p>
          </div>
        </div>

        {/* Card 5 */}
        <div className="flex flex-col items-center border shadow-md rounded-md w-full">
          <div className="py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="70px"
              height="70px"
            >
              <path d="m13.293 2.707.818.818L3.318 14.318C2.468 15.168 2 16.298 2 17.5s.468 2.332 1.318 3.183C4.169 21.532 5.299 22 6.5 22s2.331-.468 3.182-1.318L20.475 9.889l.818.818 1.414-1.414-8-8-1.414 1.414zm3.182 8.354-2.403-2.404-1.414 1.414 2.403 2.404-1.414 1.415-.99-.99-1.414 1.414.99.99-1.415 1.415-2.403-2.404L7 15.728l2.403 2.404-1.136 1.136c-.945.944-2.59.944-3.535 0C4.26 18.795 4 18.168 4 17.5s.26-1.295.732-1.768L15.525 4.939l3.535 3.535-2.585 2.587z"></path>
            </svg>
          </div>
          <div className="bg-primary rounded-b-md w-full h-full py-3">
            <p className="text-5xl text-white font-bold text-center">
              {labTestRequests?.length}
            </p>
            <p className="text-xl text-white font-bold text-center">
              Total Lab Tests
            </p>
          </div>
        </div>

        {/* Card 6 */}
        <div className="flex flex-col items-center border shadow-md rounded-md w-full">
          <div className="py-4">
            <img
              width="70"
              height="70"
              src="https://img.icons8.com/ios/50/health-graph.png"
              alt="health-graph"
            />
          </div>
          <div className="bg-primary rounded-b-md w-full h-full py-3">
            <p className="text-5xl text-white font-bold text-center">
              {completedLabTests?.length}
            </p>
            <p className="text-xl text-white font-bold text-center">
              Completed Lab Reports
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisplayStats;
