import React, { ReactNode } from 'react'

type ModalProps = {
  children: ReactNode
  title: string
  onClose: () => void
}

export default function Modal({ title, children, onClose }: ModalProps) {
  return (
    <>
      <div className="opacity-50 fixed inset-0 z-40 bg-black" />
      <div
        className="
          modal
          justify-center items-center flex
          overflow-x-hidden overflow-y-auto fixed
          inset-0 z-40 outline-none focus:outline-none
        "
      >
        <div className="relative my-6 mx-auto w-1/2">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold text-center w-full">
                {title}
              </h3>
              <button
                type="button"
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => onClose()}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
