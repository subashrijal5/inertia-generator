import { Listbox, Transition } from "@headlessui/react";
import React, { useState } from "react";

/*
 * This is a custom multi select component.
 * It is a wrapper around the headlessui listbox component.
 * @params options - array of objects with value and label properties
 * @params values - array of values that are selected
 */

const MultiSelect = ({ options=[], values = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedPersons] = useState(values);
    function isSelected(option) {
        return selectedValues.find((el) => el?.value === option.value)
            ? true
            : false;
    }

    function handleSelect(option) {
        if (!isSelected(option)) {
            const selectedValuesUpdated = [
                ...selectedValues,
                options.find((el) => el.value === option.value),
            ];
            setSelectedPersons(selectedValuesUpdated);
        } else {
            handleDeselect(option);
        }
        setIsOpen(true);
    }

    function handleDeselect(option) {
        const selectedValuesUpdated = selectedValues.filter(
            (el) => el.value !== option.value
        );
        setSelectedPersons(selectedValuesUpdated);
        setIsOpen(true);
    }
    return (
        <div>
            <Listbox
                as="div"
                className="space-y-1"
                value={selectedValues}
                onChange={(value) => handleSelect(value)}
                open={isOpen}
            >
                {() => (
                    <>
                        <div className="relative">
                            <span className="inline-block w-full rounded-md shadow-sm">
                                <Listbox.Button
                                    className="relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                    onClick={() => setIsOpen((old) => !old)}
                                    open={isOpen}
                                >
                                    <span className="block truncate">
                                        {selectedValues.length < 1
                                            ? "Select option"
                                            : `Selected options (${selectedValues.length})`}
                                    </span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <path
                                                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </Listbox.Button>
                            </span>

                            <Transition
                                unmount={false}
                                show={isOpen}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                className="absolute w-full mt-1 bg-white rounded-md shadow-lg"
                            >
                                <Listbox.Options
                                    static
                                    className="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-60 focus:outline-none sm:text-sm sm:leading-5"
                                >
                                    {options.map((option, index) => {
                                        const selected = isSelected(option);
                                        return (
                                            <Listbox.Option
                                                key={
                                                    option.id ??
                                                    option.value ??
                                                    index
                                                }
                                                value={option}
                                            >
                                                {({ active }) => (
                                                    <div
                                                        className={`${
                                                            active
                                                                ? "text-white bg-blue-600"
                                                                : "text-gray-900"
                                                        } cursor-default select-none relative py-2 pl-8 pr-4`}
                                                    >
                                                        <span
                                                            className={`${
                                                                selected
                                                                    ? "font-semibold"
                                                                    : "font-normal"
                                                            } block truncate`}
                                                        >
                                                            {option.label}
                                                        </span>
                                                        {selected && (
                                                            <span
                                                                className={`${
                                                                    active
                                                                        ? "text-white"
                                                                        : "text-blue-600"
                                                                } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                                            >
                                                                <svg
                                                                    className="w-5 h-5"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </Listbox.Option>
                                        );
                                    })}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
};

export default MultiSelect;