import React from "react";

const ListSingle = () => {
    return (
        <div className="p-4 md:w-1/3">
            <div className="h-full overflow-hidden border-2 border-gray-200 rounded-lg border-opacity-60">
                <img
                    className="object-cover object-center w-full lg:h-48 md:h-36"
                    src="https://dummyimage.com/720x400"
                    alt="blog"
                />
                <div className="p-6">
                    <h2 className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">
                        CATEGORY
                    </h2>
                    <h1 className="mb-3 text-lg font-medium text-gray-900 title-font">
                        The Catalyzer
                    </h1>
                    <p className="mb-3 leading-relaxed">
                        Photo booth fam kinfolk cold-pressed sriracha leggings
                        jianbing microdosing tousled waistcoat.
                    </p>
                    <div className="flex flex-wrap items-center ">
                        <a className="inline-flex items-center text-pink-500 md:mb-2 lg:mb-0">
                            Learn More
                            <svg
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                        <span className="inline-flex items-center py-1 pr-3 ml-auto mr-3 text-sm leading-none text-gray-400 border-r-2 border-gray-200 lg:ml-auto md:ml-0">
                            <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            1.2K
                        </span>
                        <span className="inline-flex items-center text-sm leading-none text-gray-400">
                            <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                            </svg>
                            6
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListSingle;
