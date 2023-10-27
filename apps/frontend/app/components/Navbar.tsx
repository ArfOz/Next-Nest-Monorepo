'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaLinkedin, FaGithub, FaMedium, FaEye, FaHome } from 'react-icons/fa';
import { Navigate } from './dtos/navigate.type';

const navigation: Array<Navigate> = [
    { name: 'HomePage', href: '/' },
    { name: 'Login', href: '/Login' }
    // { name: 'photos', href: '/photos' }
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
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href={`/`}>
                                        <FaHome className="hover:text-gray-800 " />
                                    </Link>
                                </div>
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
                                            {item.name}
                                        </a>
                                    ))}
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

                            {/* <LanguageSwitcher lang={lang} /> */}
                        </div>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
};

export default Navbar;
