import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { useLocation } from 'react-router-dom'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import CinemaService from "../../service/CinemaService"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SelectMenu = ({ onSelectChange, items, content }) => {

    const [selected, setSelected] = useState(null)
    const handleSelectChange = (value) => {
        setSelected(value);

        // Gọi hàm callback để truyền giá trị ra lại component cha
        onSelectChange(value);
    };
    return (
        <Listbox value={selected} onChange={handleSelectChange}>
            {({ open }) => (
                <>
                    <div className="relative">
                        <Listbox.Button className="relative w-full">
                            <span className="flex items-center">
                                <span className={`${selected !== null ? 'text-slate-400' : 'text-gray-400'} text-lg ml-2 block truncate`}>{selected || content}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {Array.isArray(items) && items.map((item, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {item}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
export default SelectMenu;
