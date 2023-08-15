import React from "react";
import ListSingle from "./ListSingle";

const Archive = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {[1,2,3,4,5,6,7,8,9,10].map(i=> {
                        return <ListSingle key={i}/>
                    })}
                </div>
            </div>
        </section>
    );
};

export default Archive;
