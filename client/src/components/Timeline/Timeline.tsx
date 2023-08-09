import React from "react";
import Tweet from "../Tweet/Tweet";
import { TimelineHook } from "./TimelineHook";

const Timeline = () => {
    const { timeLine, setTimeLine } = TimelineHook();
    return (
        <div className="mt-6">
            {timeLine &&
                timeLine.map((tweet: any) => {
                    return (
                        <div key={tweet._id} className="p-2">
                            <Tweet tweet={tweet} setTimeLine={setTimeLine} />
                        </div>
                    );
                })}
        </div>
    );
};

export default Timeline;