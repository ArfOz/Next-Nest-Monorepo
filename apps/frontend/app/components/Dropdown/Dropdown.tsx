import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function DropdownThreedots() {
    return (
        <div className=" text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        <BsThreeDotsVertical />
                        {/* <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        /> */}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="py-2 text-sm font-medium text-gray-700">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={`block px-4 py-2 ${
                                        active
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-700'
                                    }`}
                                    href="/account-settings"
                                >
                                    Account settings
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={`block px-4 py-2 ${
                                        active
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-700'
                                    }`}
                                    href="/account-settings"
                                >
                                    Documentation
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item disabled>
                            <span className="block px-4 py-2 text-gray-400">
                                Invite a friend (coming soon!)
                            </span>
                        </Menu.Item>
                    </Menu.Items>
                    ;
                </Transition>
            </Menu>
        </div>
    );
}
