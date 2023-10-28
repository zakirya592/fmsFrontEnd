import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addDays,subYears, addMonths, addYears } from 'date-fns';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the slider styles

function Testing() {
    const [selectedRange, setSelectedRange] = useState([0, 100]);
    const [intervalType, setIntervalType] = useState('weeks');
    const [max, setMax] = useState(100);
    const [data, setData] = useState([]);

    const handleRangeChange = (value) => {
        setSelectedRange(value);
    };

    const handleDropdownChange = (e) => {
        setIntervalType(e.target.value);
    };

    useEffect(() => {
        if (intervalType === 'weeks') {
            setMax(7);
        } else if (intervalType === 'months') {
            setMax(12);
        } else if (intervalType === 'years') {
            setMax(10);
        }
    }, [intervalType]);

    useEffect(() => {
        const [minValue, maxValue] = selectedRange;
        const today = new Date();
        const startDate =
            intervalType === 'weeks'
                ? addDays(today, minValue * 7)
                : intervalType === 'months'
                    ? addMonths(today, minValue)
                    : addYears(today, minValue);

        const endDate =
            intervalType === 'weeks'
                ? addDays(today, (maxValue + 1) * 7)
                : intervalType === 'months'
                    ? addMonths(today, maxValue)
                    : addYears(today, maxValue);

        axios.get('/api/PurchaseOrder_GET_List', {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.recordset.length > 0) {
                    const filteredData = res.data.recordset.filter((item) => {
                        const itemDate = new Date(item.PODate);
                        return itemDate >= startDate && itemDate <= endDate;
                    });

                    setData(filteredData);
                    console.log('filteredData', filteredData);
                } else {
                    console.log('The array is empty.');
                    setData([]); // Reset the data if there are no records
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [selectedRange, intervalType]);

    const [minValue, maxValue] = selectedRange;
    const minDate = format(
        intervalType === 'weeks'
            ? addDays(new Date(), minValue )
            : intervalType === 'months'
                ? addMonths(new Date(), minValue)
                : addYears(new Date(), minValue),
        'dd MMM, yyyy'
    );
    console.log('minDate', minDate);
    const maxDate = format(
        intervalType === 'weeks'
            ? addDays(new Date(), maxValue )
            : intervalType === 'months'
                ? addMonths(new Date(), maxValue)
                : addYears(new Date(), maxValue),
        'dd MMM, yyyy'
    );

    const marks = {};
    for (let i = 0; i <= max; i++) {
        marks[i] = i.toString();
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-5 my-auto">
                    <div className="d-flex justify-content-between">
                        <p className="my-auto fw-bord lastpro fs-6">All Periods</p>
                        <select
                            value={intervalType}
                            className="border-0 my-auto"
                            onChange={handleDropdownChange}
                            style={{ padding: '15px 20px' }}
                        >
                            <option value="weeks">Weeks</option>
                            <option value="months">Months</option>
                            <option value="years">Years</option>
                        </select>
                    </div>
                    <label htmlFor="Datetime" className="lablesection color3 text-start my-2">
                        Date Period {minDate} - {maxDate}
                    </label>
                    <Slider
                        min={0}
                        max={max}
                        range
                        value={selectedRange}
                        onChange={handleRangeChange}
                        marks={marks}
                    />
                </div>
            </div>
        </div>
    );
}

export default Testing;
