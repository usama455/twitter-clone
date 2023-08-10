import React from "react";
import Tweet from "../Tweet/Tweet";
import { TimelineHook } from "./TimelineHook";
import Button from '@mui/material/Button';

const Timeline = () => {
    const {
        timeLine,
        currentPage,
        totalPages,
        fetchRequiredPage,
        setTimeLine
    } = TimelineHook();

    const pageButtonsToShow = 5;
    const pageButtonStart = Math.max(1, currentPage - Math.floor(pageButtonsToShow / 2));
    const pageButtonEnd = Math.min(totalPages, pageButtonStart + pageButtonsToShow - 1);

    return (
        <div className="mt-6">
            {timeLine.length === 0 ?
                <span>Follow some tweeps to see tweets</span>
                :
                timeLine.map((tweet: any) => {
                    return (
                        <div key={tweet._id} className="p-2">
                            <Tweet tweet={tweet} setTimeLine={setTimeLine} />
                        </div>
                    );
                })}

            {totalPages > 1 && (
                <div className="flex justify-center mt-4 my-8 pb-4 space-x-2"> {/* Add pb-4 class here */}
                    {currentPage > 1 && (
                        <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            onClick={() => fetchRequiredPage(currentPage - 1)}
                        >
                            Previous
                        </Button>
                    )}

                    {Array.from({ length: pageButtonEnd - pageButtonStart + 1 }, (_, index) => pageButtonStart + index).map((page) => (
                        <Button
                            key={page}
                            variant={page === currentPage ? "contained" : "outlined"}
                            size="small"
                            color="primary"
                            onClick={() => fetchRequiredPage(page)}
                        >
                            {page}
                        </Button>
                    ))}

                    {currentPage < totalPages && (
                        <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            onClick={() => fetchRequiredPage(currentPage + 1)}
                        >
                            Next
                        </Button>
                    )}
                </div>
            )}

        </div>
    );
};

export default Timeline;
