import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogProps,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  panelClassName?: string;
};

const Modal = ({
  show,
  onClose,
  children,
  panelClassName,
  ...rest
}: ModalProps & DialogProps) => {
  return (
    <Transition appear show={show}>
      <Dialog
        as="div"
        open={show}
        onClose={onClose}
        className="relative z-50"
        {...rest}
      >
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform scale-95"
              enterTo="opacity-100 transform scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform scale-100"
              leaveTo="opacity-0 transform scale-95"
            >
              <DialogPanel
                className={twMerge(
                  'w-full max-w-[800px] p-4 rounded-xl bg-white/5 backdrop-blur-2xl shadow-xl overflow-hidden bg-white',
                  panelClassName
                )}
              >
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
