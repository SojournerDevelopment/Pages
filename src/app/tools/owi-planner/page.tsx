"use client";
import SvgPlan from "@/app/components/SvgPlan";
import {useRef, useState} from "react";
import {toPng} from "html-to-image";

export default function Index() {
    const [hideUnused, setHideUnused] = useState(false);
    const svgPlanRef = useRef<any>(null);

    const resetPlaceholders = () => {
        if (svgPlanRef.current) {
            svgPlanRef.current.resetAllPlaceholders();
        }
    };

    const handleDownload = () => {
        const svgElement = document.getElementById("svg-plan");
        if (svgElement) {
            toPng(svgElement)
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = "plan.png";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch((error) => {
                    console.error("Error generating PNG:", error);
                });
        }
    };

    return (
        <main>
            <div className="container mx-auto py-10">
                <button onClick={() => setHideUnused(!hideUnused)}>
                    {hideUnused ? "Show all positions" : "Hide unused positions"}
                </button>
                <button className={"pl-4"} onClick={resetPlaceholders}>Reset</button>
                <button className={"pl-4"} onClick={handleDownload}>Download as PNG</button>
                <SvgPlan ref={svgPlanRef} hideUnused={hideUnused}/>
                <div className="py-4">
                    <p>Click on a position to mark it as used.</p>
                </div>
            </div>
        </main>
    );
}
