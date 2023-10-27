'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaLinkedin, FaGithub, FaMedium, FaEye, FaHome } from 'react-icons/fa';
import { Navigate } from './dtos/navigate.type';

const navigation: Array<Navigate> = [
    { name: 'todos', href: '/todos' },
    { name: 'weather', href: '/weather' },
    { name: 'photos', href: '/photos' }
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const pathname = usePathname();

    return (
        <Disclosure as="nav" className="bg-slate-400 shadow-sm">
            {({ open }) => (
                <div>
                    <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                {/* <div className="flex flex-shrink-0 items-center">
                                    <Link href={`/${lang}`}>
                                        <FaHome className="hover:text-gray-800 " />
                                    </Link>
                                </div> */}
                                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={`/${item.href}`}
                                            className={classNames(
                                                pathname === item.href
                                                    ? 'border-slate-500 text-gray-900'
                                                    : 'border-transparent dark:text-gray-800 hover:text-gray-500 hover:border-gray-300',
                                                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                                            )}
                                            aria-current={
                                                pathname === item.href
                                                    ? 'page'
                                                    : undefined
                                            }
                                        >
                                            {/* {dictionary.navbar[item.name]} */}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="flex">
                                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8 items-center">
                                    <Link href="https://github.com/ArfOz/">
                                        <FaGithub />
                                    </Link>
                                    <Link href="https://medium.com/@arfoz1245">
                                        <FaMedium />
                                    </Link>
                                    <Link href="https://www.linkedin.com/in/arifozkanozturk/">
                                        <FaLinkedin />
                                    </Link>
                                    {/* <LanguageSwitcher lang={lang} /> */}
                                </div>
                                <div className="flex flex-row"></div>
                                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                    <Menu as="div" className="relative ml-3">
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        ></Transition>
                                    </Menu>
                                </div>
                                <div className="-mr-2 flex items-center sm:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pt-2 flex-col">
                            {navigation.map((item: Navigate) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={`/${item.href}`}
                                    className={classNames(
                                        pathname === item.href
                                            ? 'bg-slate-50 border-slate-500 text-slate-700'
                                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                    )}
                                    aria-current={
                                        pathname === item.href
                                            ? 'page'
                                            : undefined
                                    }
                                >
                                    {/* {dictionary.navbar[item.name]} */}
                                </Disclosure.Button>
                            ))}
                            <div className="flex flex-row py-2 px-4 space-x-4">
                                <Link href="https://github.com/ArfOz/">
                                    <FaGithub />
                                </Link>
                                <Link href="https://medium.com/@arfoz1245">
                                    <FaMedium />
                                </Link>
                                <Link href="https://www.linkedin.com/in/arifozkanozturk/">
                                    <FaLinkedin />
                                </Link>
                            </div>

                            {/* <LanguageSwitcher lang={lang} /> */}
                        </div>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
};

export default Navbar;
