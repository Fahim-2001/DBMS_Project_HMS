import React from "react";

const DisplayStats = async () => {
  // API responses to get Stats.
  const users = await fetch(`${process.env.NEXT_PUBLIC_URL}api/users`, {
    cache: "no-cache",
  }).then((res) => res.json());
  const doctors = await fetch(`${process.env.NEXT_PUBLIC_URL}api/doctors`, {
    cache: "no-cache",
  }).then((res) => res.json());
  const labTestRequests = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/labtests`,
    { cache: "no-cache" }
  ).then((res) => res.json());

  let pendingLabTests = labTestRequests?.filter(
    (test) => test.report_status === "Uploaded"
  );
  // console.log(pendingLabTests);
  return (
    <div className="grid gap-4 grid-cols-2 justify-items-center my-4">
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
        <div className="bg-primary rounded-b-md w-full py-3">
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
        <div className="bg-primary rounded-b-md w-full py-3">
          <p className="text-5xl text-white font-bold text-center">
            {doctors.length}
          </p>
          <p className="text-xl text-white font-bold text-center">Doctors</p>
        </div>
      </div>

      {/* Card 3 */}
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
        <div className="bg-primary rounded-b-md w-full py-3">
          <p className="text-5xl text-white font-bold text-center">
            {labTestRequests.length}
          </p>
          <p className="text-xl text-white font-bold text-center">
            Total Lab Tests
          </p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="flex flex-col items-center border shadow-md rounded-md w-full">
        <div className="py-4">
          <img
            width="70"
            height="70"
            src="https://img.icons8.com/ios/50/health-graph.png"
            alt="health-graph"
          />
        </div>
        <div className="bg-primary rounded-b-md w-full py-3">
          <p className="text-5xl text-white font-bold text-center">
            {pendingLabTests.length}
          </p>
          <p className="text-xl text-white font-bold text-center">
            Completed Lab Reports
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayStats;
