"use client";

import { ToastContainer, collapseToast, toast } from "react-toastify";

// const Msg = ({ closeToast, toastProps }) => (
//   <div>
//     Lorem ipsum dolor {toastProps.position}
//     <button>Retry</button>
//     <button onClick={closeToast}>Close</button>
//   </div>
// );

export default function NotificationCard(props) {
  return (
    <>
      <div className="flex justify-evenly items-center text-gray-600 p-4">
        <p>{props.notificationText}</p>
      </div>
    </>
  );
}
