'use client'

const ProgressBar = ({ steps, total }) => {
    const progress = (steps / total) * 100;
    
    const stepNames = [
        "Service Related Questions",
        "General Information",
        "Contact Details",
        "Available Service Providers",
        "Preview"
    ];

    return (
        <div className="w-full space-y-4">
            {/* Step indicator with animated transition */}
            <div className="flex items-center justify-between">
                <div className="transition-all duration-300 ease-in-out">
                    <span className="text-lg font-semibold text-gray-800">
                        Step {steps} <span className="text-gray-500">/ {total}</span>
                    </span>
                    <h3 className="text-xl font-bold text-[#00725A] mt-1">
                        {stepNames[steps - 1]}
                    </h3>
                </div>
                <span className="text-sm font-medium text-[#00725A] bg-[#00725A]/10 px-3 py-1 rounded-full">
                    {Math.round(progress)}% Complete
                </span>
            </div>

            {/* Progress bar with gradient and animation */}
            <div className="w-full space-y-2">
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#00725A] to-[#00A381] transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-white shadow-sm"></div>
                    </div>
                </div>

                {/* Step dots */}
                <div className="flex justify-between px-1">
                    {stepNames.map((_, index) => (
                        <div 
                            key={index} 
                            className="relative flex flex-col items-center"
                            onClick={() => {/* Add navigation logic here if needed */}}
                        >
                            <div 
                                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                    index < steps 
                                        ? 'bg-[#00725A] scale-125' 
                                        : index === steps 
                                            ? 'bg-[#00725A] ring-2 ring-[#00725A] ring-offset-2'
                                            : 'bg-gray-300'
                                }`}
                            />
                            {index < steps - 1 && (
                                <div className="absolute top-1.5 h-0.5 w-8 bg-[#00725A] -translate-x-4"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;