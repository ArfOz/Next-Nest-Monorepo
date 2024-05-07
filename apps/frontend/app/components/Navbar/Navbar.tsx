'use client'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { FaHome } from 'react-icons/fa'
import SkeletonLoader from '../Skeleton/SkeletonLoader'
import { Navigate } from '../dtos/navigate.type'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
	const pathname = usePathname()
	const { data: session, status, update } = useSession()

	const navigation: Array<Navigate> = []
	if (status == 'authenticated') {
		navigation.push(
			{
				name: 'Profile',
				href: 'profile'
			},
			{
				name: 'Logout',
				href: ''
			}
		)
	} else {
		navigation.push({ name: 'Login', href: 'login' })
	}

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
							</div>

							<div className="flex">
								<div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
									{status === 'loading' ? (
										<SkeletonLoader className="inline-flex flex-row-reverse items-center w-48 px-1 pt-1">
											<div className=" bg-slate-600 items-center rounded-md h-6 w-9/12 px-1 pt-1"></div>
										</SkeletonLoader>
									) : (
										navigation.map((item) => (
											<a
												key={item.name}
												onClick={
													item.name == 'Logout'
														? () =>
																signOut({
																	callbackUrl:
																		process
																			.env
																			.FRONTEND_URL as string
																})
														: undefined
												}
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
										))
									)}
								</div>

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
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</div>
			)}
		</Disclosure>
	)
}

export default Navbar
