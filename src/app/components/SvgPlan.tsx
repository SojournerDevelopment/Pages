"use client";
import React, {useImperativeHandle, useState, forwardRef, useEffect} from 'react';
import nextConfig from "../../../next.config";

interface OperatorPosition {
    id: number;
    cx: number;
    cy: number;
    number: number | null; // null means no number is displayed
}

interface SvgPlanProps {
    hideUnused: boolean;
}

// Define the ref methods interface
export interface SvgPlanRef {
    resetAllPlaceholders: () => void;
}

const LOCAL_STORAGE_KEY = "svgPlanPlaceholders";

const SvgPlan = forwardRef<SvgPlanRef, SvgPlanProps>(({ hideUnused }, ref) => {
    const [placeholders, setPlaceholders] = useState<OperatorPosition[]>([]);
    const [counter, setCounter] = useState(0);

    // Load placeholders from localStorage on mount (only in the browser)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedPlaceholders = localStorage.getItem(LOCAL_STORAGE_KEY);

            console.log("savedPlaceholders");
            console.log(savedPlaceholders);

            if (savedPlaceholders) {
                const parsedPlaceholders = JSON.parse(savedPlaceholders);
                if(parsedPlaceholders.length < 64){
                    populateInitial();
                }else{
                    setPlaceholders(parsedPlaceholders);
                }

                // Update the counter based on the highest number in the saved data
                const highestNumber = parsedPlaceholders.reduce(
                    (max: number, placeholder: OperatorPosition) =>
                        placeholder.number !== null && placeholder.number > max
                            ? placeholder.number
                            : max,
                    0
                );
                setCounter(highestNumber);
            } else {
                // Set default placeholders if no saved data exists
                populateInitial();
            }
        }
    }, []);

    const populateInitial = () => {
        setPlaceholders([
            // Eingang Raucherzone oben links
            { id: 1, cx: 422, cy: 105, number: null },
            { id: 2, cx: 514, cy: 105, number: null },

            // Eingang Raucherzone oben rechts
            { id: 3, cx: 905, cy: 105, number: null },
            { id: 4, cx: 997, cy: 105, number: null },

            // Eingang Haupteingang unten links
            { id: 12, cx: 458, cy: 765, number: null },
            { id: 13, cx: 499, cy: 765, number: null },

            // Eingang Nord Mitte
            { id: 5, cx: 689, cy: 765, number: null },
            { id: 6, cx: 724, cy: 765, number: null },

            // Eingang Innen Nord Links
            { id: 7, cx: 376, cy: 702, number: null },
            { id: 8, cx: 417, cy: 702, number: null },

            // Eingang Innen Nord Rechts Doppel
            { id: 9, cx: 956, cy: 702, number: null },
            { id: 10, cx: 997, cy: 702, number: null },

            // Eingang Innen Nord Rechts Einzel
            { id: 11, cx: 1079, cy: 702, number: null },

            // Innenfeld von oben nach unten
            { id: 14, cx: 603, cy: 279, number: null },
            { id: 15, cx: 813, cy: 279, number: null },

            { id: 16, cx: 654, cy: 309, number: null },
            { id: 17, cx: 760, cy: 309, number: null },

            // Innenfeld OST
            { id: 18, cx: 618, cy: 381, number: null },
            { id: 19, cx: 618, cy: 418, number: null },

            // Innenfeld WEST
            { id: 20, cx: 798, cy: 381, number: null },
            { id: 21, cx: 798, cy: 418, number: null },

            { id: 22, cx: 654, cy: 491, number: null },
            { id: 23, cx: 760, cy: 491, number: null },

            { id: 24, cx: 708, cy: 565, number: null },

            { id: 25, cx: 603, cy: 590, number: null },
            { id: 26, cx: 813, cy: 590, number: null },

            // Ebene B - 15 + 14
            { id: 27, cx: 639, cy: 624, number: null },
            { id: 28, cx: 775, cy: 624, number: null },

            // Ebene C - 15 + 14
            { id: 29, cx: 573, cy: 653, number: null },
            { id: 30, cx: 708, cy: 653, number: null },
            { id: 31, cx: 843, cy: 653, number: null },

            // Ebene D - 15 + 14
            { id: 32, cx: 573, cy: 687, number: null },
            { id: 33, cx: 843, cy: 687, number: null },

            // Ebene B - 6,5,4,3,2,1
            { id: 34, cx: 519, cy: 176, number: null },
            { id: 35, cx: 519, cy: 270, number: null },
            { id: 36, cx: 519, cy: 358, number: null },
            { id: 37, cx: 519, cy: 443, number: null },
            { id: 38, cx: 519, cy: 533, number: null },
            { id: 39, cx: 519, cy: 624, number: null },

            // Ebene B - 8,9,10,11,12,13
            { id: 40, cx: 896, cy: 176, number: null },
            { id: 41, cx: 896, cy: 270, number: null },
            { id: 42, cx: 896, cy: 358, number: null },
            { id: 43, cx: 896, cy: 443, number: null },
            { id: 44, cx: 896, cy: 533, number: null },
            { id: 45, cx: 896, cy: 624, number: null },

            // Ebene C - 5,4,3,2,1
            { id: 60, cx: 459, cy: 224, number: null },
            { id: 61, cx: 459, cy: 312, number: null },
            { id: 62, cx: 459, cy: 400, number: null },
            { id: 63, cx: 459, cy: 488, number: null },
            { id: 64, cx: 459, cy: 576, number: null },

            // Ebene C - 9,10,11,12,13
            { id: 67, cx: 956, cy: 224, number: null },
            { id: 46, cx: 956, cy: 312, number: null },
            { id: 47, cx: 956, cy: 400, number: null },
            { id: 48, cx: 956, cy: 488, number: null },
            { id: 49, cx: 956, cy: 576, number: null },

            // Ebene D - 5,4,3,2,1
            { id: 50, cx: 368, cy: 201, number: null },
            { id: 51, cx: 368, cy: 338, number: null },
            { id: 52, cx: 368, cy: 428, number: null },
            { id: 53, cx: 368, cy: 518, number: null },
            { id: 54, cx: 368, cy: 600, number: null },

            // Ebene D - 9,10,11,12,13
            { id: 55, cx: 1054, cy: 201, number: null },
            { id: 56, cx: 1054, cy: 338, number: null },
            { id: 57, cx: 1054, cy: 428, number: null },
            { id: 58, cx: 1054, cy: 518, number: null },
            { id: 59, cx: 1054, cy: 600, number: null },
        ]);
    }

    // Save placeholders to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== "undefined") {
            if(placeholders.length > 0){
                console.log("Saving placeholders to localStorage: "+placeholders.length);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(placeholders));
            }else{
                console.log("Not saving placeholders, empty")
            }
        }
    }, [placeholders]);

    const handlePlaceholderClick = (id: number) => {
        setPlaceholders((prevPlaceholders) => {
            let updatedCounter = counter;
            const updatedPlaceholders = prevPlaceholders.map((placeholder) => {
                if (placeholder.id === id) {
                    if (placeholder.number === null) {
                        updatedCounter += 1;
                        return { ...placeholder, number: updatedCounter };
                    } else if (placeholder.number === counter) {
                        updatedCounter -= 1;
                        return { ...placeholder, number: null };
                    }
                }
                return placeholder;
            });
            setCounter(updatedCounter);
            return updatedPlaceholders;
        });
    };

    // Expose methods to the parent via the ref
    useImperativeHandle(ref, () => ({
        resetAllPlaceholders() {
            setPlaceholders((prev) =>
                prev.map((placeholder) => ({
                    ...placeholder,
                    number: null,
                }))
            );
            setCounter(0);
        },
        logCurrentState() {
            console.log("Placeholders:", placeholders);
            console.log("Counter:", counter);
        },
    }));

    return (
        <svg
            id="svg-plan"
            xmlns="http://www.w3.org/2000/svg"
            width="1300"
            height="900"
            viewBox="0 0 1300 900"
            style={{ border: '1px solid black', borderRadius: '12px' }}
        >
            {/* Background image */}
            <image
                href={nextConfig.basePath+"/assets/tools/planner_map.jpg"} // Replace with your image URL
                width="1300"
                height="900"
            />

            {/* Placeholder circles */}
            {placeholders.map((placeholder) => (
                (!hideUnused || placeholder.number !== null) && (
                    <g
                        key={placeholder.id}
                        onClick={() => handlePlaceholderClick(placeholder.id)}
                        style={{cursor: 'pointer'}}
                    >
                        <ellipse
                            cx={placeholder.cx}
                            cy={placeholder.cy}
                            rx="15"
                            ry="15"
                            fill="#fff"
                            fillOpacity="0.6"
                            stroke="#000"
                            strokeWidth={placeholder.number !== null ? "2" : "0.5"} // Thicker border if clicked
                        />
                        {placeholder.number !== null && (
                            <text
                                x={placeholder.cx}
                                y={placeholder.cy}
                                fill="#000"
                                className="font-bold font-mono"
                                fontSize="20"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {placeholder.number}
                            </text>
                        )}
                    </g>
                )
            ))}
        </svg>
    );
});

export default SvgPlan;
