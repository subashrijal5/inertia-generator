import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function Textarea(
    {
        name,
        id,
        value="",
        className,
        required,
        isFocused,
        handleChange,
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <textarea
                name={name}
                id={id}
                className={
                    `block w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input` +
                    className
                }
                ref={input}
                required={required}
                onChange={(e) => handleChange(e)}
                value={value}
            >

            </textarea>
        </div>
    );
});
