import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon,  XMarkIcon } from '@heroicons/react/24/outline'
import logo from './../assets/img/logo.png'
import { Link, useLocation  } from 'react-router-dom'


const navigation = [
  { name: 'Inicio', url: '/' },
  { name: 'Te contactamos', url: '/contacto' },
  { name: 'Trabaja con nosotros', url: '/unete' },
  { name: 'Equipo', url: '/equipo' },
]

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function MainHeader() {
  
  const location = useLocation();
  console.log(location.pathname);

  return (
    <Disclosure
      as="nav"
      className="relative bg-[var(--color-verde-intermedio)]/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">

              <Link to="/perfil">
                <img
                  alt="Your Company"
                  src={logo}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                    {navigation.map((item) => {
                      return (
                        <Link
                          key={item.name}
                          to={item.url}
                          aria-current={item.url == location.pathname ? 'page' : undefined}
                          className={classNames(
                            item.url == location.pathname
                              ? 'bg-[var(--color-accent)] text-white'
                              : 'text-gray-700 hover:bg-white/5 hover:text-black',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                        >
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              aria-current={item.url == location.pathname ? 'page' : undefined}
              className={classNames(
                item.url == location.pathname ? 'bg-[var(--color-accent)]/50 text-white' : 'text-gray-700 hover:bg-white/5 hover:text-black',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
