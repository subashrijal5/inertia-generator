import React from "react";

function BasicCard({ children, className, ...props }) {
    return (
        <div
            className={
                "p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" +
                className
            }
            {...props}
        >
            {children}
        </div>
    );
}

export default BasicCard;
