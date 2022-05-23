import { React, Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { SearchIcon, MenuIcon, ShoppingCartIcon, XIcon, UserIcon, LoginIcon } from '@heroicons/react/outline'
import UserContext from 'context/UserContext'

import logo_big from 'assets/Suyati-logo-01.svg'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'More', href: '#', current: false },
  { name: 'Orders', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const is_user_logged_in = useContext(UserContext);

  return (
    <>
      <div class="min-h-full md:sticky shadow">
        <Disclosure as="nav" class="bg-white">
          {({ open }) => (
            <>
              <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div class="flex items-center justify-evenly h-16 space-x-9">

                  {/*Logo */}
                  <div class="flex items-center mr-4">
                    <div class="flex-shrink-0">
                      <img
                        class="h-8 w-18"
                        src={logo_big}
                        alt="Workflow"
                      />
                    </div>
                  </div>

                  {/*Search bar */}
                  <div class='mx-8 w-full'>
                    <div class="py-2 relative text-gray-600">
                      <input class="border-2 border-gray-300 bg-white h-10 w-full px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="search" name="search" placeholder="Search"/>
                      <button type="submit" class="absolute right-0 top-0 mt-4 mr-3">
                        <SearchIcon class='h-6  w-6 ' aria-hidden="true" />
                      </button>
                    </div>
                  </div>


                  <div class="hidden md:block">
                    <div class="ml-4 flex items-center md:ml-6 space-x-6">

                      {/* navigation links */}
                      <div class="hidden md:block">
                        <div class="text-left h-auto flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              class={classNames(
                                item.current
                                  ? 'bg-suyati-blue text-white'
                                  : 'text-suyati-gray hover:bg-suyati-blue hover:text-white',
                                'px-3 py-2 text-left rounded-md text-sm font-medium my-auto'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        class="bg-white p-1 rounded-full text-suyati-blue hover:text-white hover:bg-suyati-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <ShoppingCartIcon class="h-6 w-6 hover:bg-suyati-blue hover:text-white" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" class='w-13'>
                        <div class='w-8'>
                          <Menu.Button class="bg-white p-1 rounded-full text-suyati-yellow"  >
                              {/* <UserIcon class='w-full h-full'/> */}
                              <LoginIcon class='w-full h-full' />
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
                          <Menu.Items class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    class={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div class="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span class="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon class="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon class="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      class={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-suyati-gray hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}


                {/* USER STUFF SHOULD GO HERE */}
                  <Disclosure.Button
                    key={user.name}
                    as="a"
                    href=""
                    class={classNames(
                      user.current ? 'bg-gray-900 text-white' : 'text-suyati-gray hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current=""
                  >
                    {user.name}
                  </Disclosure.Button>

                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}




