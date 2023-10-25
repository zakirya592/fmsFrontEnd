import React, { useState } from "react";
import { format, addWeeks, addMonths, addYears } from "date-fns";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the slider styles

function Testing() {
    const [selectedRange, setSelectedRange] = useState([0, 100]);
    const [intervalType, setIntervalType] = useState("weeks");

    let max = 100; // Set your maximum value here

    const handleRangeChange = (value) => {
        setSelectedRange(value);
    };

    const handleDropdownChange = (e) => {
        setIntervalType(e.target.value);
    };

    if (intervalType === "weeks") {
        max = 52; // Maximum weeks in a year
    } else if (intervalType === "months") {
        max = 12; // Maximum months in a year
    } else if (intervalType === "years") {
        max = 10; // Display 10 years in the slider
    }

    // Calculate the date labels based on the selected range
    const [minValue, maxValue] = selectedRange;
    const minDate = format(
        intervalType === "weeks"
            ? addWeeks(new Date(), minValue)
            : intervalType === "months"
                ? addMonths(new Date(), minValue)
                : addYears(new Date(), minValue),
        "dd MMM, yyyy"
    );
    const maxDate = format(
        intervalType === "weeks"
            ? addWeeks(new Date(), maxValue)
            : intervalType === "months"
                ? addMonths(new Date(), maxValue)
                : addYears(new Date(), maxValue),
        "dd MMM, yyyy"
    );

    return (
        <div>
            <div className="time-slider">
                <Slider
                    min={0}
                    max={max}
                    range
                    value={selectedRange}
                    onChange={handleRangeChange}
                />
            </div>
            <div className="time-label">
                <label>{minDate} - {maxDate}</label>
            </div>
            <div className="interval-dropdown">
                <select value={intervalType} onChange={handleDropdownChange}>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                </select>
            </div>
        </div>
    );
}

export default Testing;
