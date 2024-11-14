import { ShimmerText, ShimmerTitle } from "shimmer-effects-react";
import "./ShimmerComment.css";

type IProps = {};

const ShimmerComment = ({}: IProps) => {
    return (
        <div className="mt-4 ml-4">
            <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 w-full border rounded-lg bg-white shadow-lg">
                <div className="relative flex gap-4">
                    <div className="flex flex-col w-full">
                        <ShimmerTitle mode="light" line={1} />
                        <div className="my-2 flex">
                            <p className="text-dark text-sm">@</p>
                            <ShimmerTitle className="w-1/3 self-center py-1" mode="light" line={1} />
                        </div>
                    </div>
                </div>
                <div className="-mt-4 text-gray-500">
                    <ShimmerText mode="light" line={3} />
                </div>
            </div>
            <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 w-full border rounded-lg bg-white shadow-lg">
                <div className="relative flex gap-4">
                    <div className="flex flex-col w-full">
                        <ShimmerTitle mode="light" line={1} />
                        <div className="my-2 flex">
                            <p className="text-dark text-sm">@</p>
                            <ShimmerTitle className="w-1/3 self-center py-1" mode="light" line={1} />
                        </div>
                    </div>
                </div>
                <div className="-mt-4 text-gray-500">
                    <ShimmerText mode="light" line={3} />
                </div>
            </div>
        </div>
    );
};

export default ShimmerComment;
