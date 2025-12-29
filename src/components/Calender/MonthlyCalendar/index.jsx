"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { fetchMonthlyCalendar } from "@/services/calenderService";
import clsx from "clsx";

/* ---------------- CONSTANTS ---------------- */

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ---------------- HELPERS ---------------- */

const formatTime12h = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    const hour = Number(h);
    const suffix = hour >= 12 ? "PM" : "AM";
    const twelveHour = hour % 12 || 12;
    return `${twelveHour}:${m} ${suffix}`;
};

const getMonthLabel = (month, year) => {
    return new Date(year, month - 1).toLocaleString("default", {
        month: "long",
        year: "numeric",
    });
};

/* ---------------- COMPONENT ---------------- */

const MonthlyCalendar = ({ providerId }) => {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());
    const [calendar, setCalendar] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        loadCalendar();
    }, [month, year]);

    const loadCalendar = async () => {
        const result = await fetchMonthlyCalendar(providerId, month, year);
        if (result.success) {
            setCalendar(result.data);
            setSelectedDay(null);
        }
    };

    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    return (
        <>
            <Card>
                <CardHeader className="space-y-2">
                    <CardTitle>Availability</CardTitle>

                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMonth((m) => (m === 1 ? 12 : m - 1))}
                        >
                            Prev
                        </Button>

                        <span className="font-medium text-sm">
                            {getMonthLabel(month, year)}
                        </span>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMonth((m) => (m === 12 ? 1 : m + 1))}
                        >
                            Next
                        </Button>
                    </div>
                </CardHeader>


                <CardContent>
                    {/* WEEK HEADERS */}
                    <div className="grid grid-cols-7 text-center font-medium mb-2">
                        {WEEK_DAYS.map((d) => (
                            <div key={d}>{d}</div>
                        ))}
                    </div>

                    {/* CALENDAR GRID */}
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} />
                        ))}

                        {Array.from({ length: daysInMonth }).map((_, index) => {
                            const day = index + 1;
                            const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                            const data = calendar.find((d) => d.date === dateKey);

                            return (
                                <button
                                    key={day}
                                    onClick={() => {
                                        if (!data) return;
                                        setSelectedDay(data);
                                        setOpen(true);
                                    }}
                                    className={clsx(
                                        "rounded-md border p-2 text-sm text-center transition",
                                        data?.available
                                            ? "bg-green-100 hover:bg-green-200"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    )}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* SELECTED DAY MODAL */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedDay?.date
                                ? new Date(selectedDay.date).toDateString()
                                : ""}
                        </DialogTitle>
                    </DialogHeader>

                    {selectedDay?.available ? (
                        <div className="space-y-3">
                            <p className="text-sm text-green-600 font-medium">
                                Available Time Slots
                            </p>

                            <ul className="space-y-2">
                                {selectedDay.timeSlots.map((slot, i) => (
                                    <li
                                        key={i}
                                        className="flex justify-between rounded-md border px-3 py-2 text-sm"
                                    >
                                        <span>{formatTime12h(slot.from)}</span>
                                        <span>–</span>
                                        <span>{formatTime12h(slot.to)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            This day is not available.
                        </p>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MonthlyCalendar;
