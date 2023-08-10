import React from "react";

const RightSidebar = () => {
  return (
    <div className="sticky top-0 h-screen md:h-[90vh] flex flex-col justify-between">

      <div className="p-6 bg-slate-100 rounded-lg mx-4 space-y-4">
        <h2 className="font-medium">Trending Now</h2>
        <p className="font-bold">#NodeJs</p>
        <p className="font-bold">#ReactJS</p>
        <p className="font-bold">#MongoDB</p>
        <p className="font-bold">#Redux</p>
        <p className="font-bold">#Tailwind</p>
      </div>
    </div>
  );
};

export default RightSidebar;