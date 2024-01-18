import React, { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';

const ErrorDialog = ({ showState, closefn, buttonClickFunction ,title,  errMsg, btnText }) => {

  return (
    <Transition appear show={showState} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closefn}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-0"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg text-center  font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2 text-center">
                  <p className="text-sm text-gray-500">{errMsg}</p>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    className="inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={buttonClickFunction}
                  >
                    {btnText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ErrorDialog;
