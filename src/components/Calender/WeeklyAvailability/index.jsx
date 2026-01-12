"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { saveWeeklyAvailability } from "@/services/calenderService";
import { fetchWeeklyAvailability } from "@/services/calenderService";
import TimePicker from "react-time-picker";


/* -------------------- CONSTANTS -------------------- */

const DAYS = [
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
];

const defaultWeek = DAYS.map((day) => ({
    dayOfWeek: day.value,
    isAvailable: false,
    timeSlots: [],
}));

/* -------------------- COMPONENT -------------------- */

const WeeklyAvailability = () => {
    const [week, setWeek] = useState(defaultWeek);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    /* -------------------- HANDLERS -------------------- */

    const toggleDay = (index) => {
        const updated = [...week];
        updated[index].isAvailable = !updated[index].isAvailable;

        if (!updated[index].isAvailable) {
            updated[index].timeSlots = [];
        }

        setWeek(updated);
    };
    const toMinutes = (time) => {
        const [t, modifier] = time.split(" ");
        let [h, m] = t.split(":").map(Number);

        if (modifier === "PM" && h !== 12) h += 12;
        if (modifier === "AM" && h === 12) h = 0;

        return h * 60 + m;
    };
    const addSlot = (index) => {
        const updated = [...week];
        updated[index].timeSlots.push({ from: "", to: "" });
        setWeek(updated);
    };

    const removeSlot = (dayIndex, slotIndex) => {
        const updated = [...week];
        updated[dayIndex].timeSlots.splice(slotIndex, 1);
        setWeek(updated);
    };

    const updateSlot = (dayIndex, slotIndex, field, value) => {
        const updated = [...week];
        updated[dayIndex].timeSlots[slotIndex][field] = value;
        setWeek(updated);
    };

    /* -------------------- SAVE LOGIC -------------------- */

    const handleSaveWeeklyAvailability = async () => {
        setError("");
        setSuccess("");

        // 🔒 VALIDATION
        for (const day of week) {
            if (day.isAvailable) {
                if (!day.timeSlots.length) {
                    setError("Each available day must have at least one time slot.");
                    return;
                }

                for (const slot of day.timeSlots) {
                    if (!slot.from || !slot.to) {
                        setError("Time slots cannot be empty.");
                        return;
                    }

                    if (toMinutes(slot.from) >= toMinutes(slot.to)) {
                        setError("Start time must be before end time.");
                        return;
                    }
                }
            }
        }

        setLoading(true);
        const result = await saveWeeklyAvailability(week);
        setLoading(false);

        if (!result.success) {
            setError(result.message);
            return;
        }

        setSuccess("Weekly availability saved successfully.");
    };

    useEffect(() => {
        const loadWeeklyAvailability = async () => {
            const result = await fetchWeeklyAvailability();

            if (!result.success || !result.data.length) return;

            // normalize data to full 7-day week
            const normalizedWeek = defaultWeek.map(day => {
                const found = result.data.find(
                    d => d.dayOfWeek === day.dayOfWeek
                );

                return found
                    ? {
                        dayOfWeek: found.dayOfWeek,
                        isAvailable: found.isAvailable,
                        timeSlots: found.timeSlots || [],
                    }
                    : day;
            });

            setWeek(normalizedWeek);
        };

        loadWeeklyAvailability();
    }, []);

    /* -------------------- UI -------------------- */

    return (
        <Card>
            <CardHeader>
                <CardTitle>Weekly Availability</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {week.map((day, index) => (
                    <div
                        key={day.dayOfWeek}
                        className="border rounded-lg p-4 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-medium">
                                {DAYS.find((d) => d.value === day.dayOfWeek)?.label}
                            </span>

                            <Switch
                                checked={day.isAvailable}
                                onCheckedChange={() => toggleDay(index)}
                            />
                        </div>

                        {day.isAvailable && (
                            <div className="space-y-3">
                                {day.timeSlots.map((slot, slotIndex) => (
                                    <div
                                        key={slotIndex}
                                        className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center"
                                    >
                                        <div className="time-picker-wrapper">
                                            <TimePicker
                                                value={slot.from || null}
                                                onChange={(value) =>
                                                    updateSlot(index, slotIndex, "from", value)
                                                }
                                                disableClock
                                                clearIcon={null}
                                                locale="en-US"
                                                hourPlaceholder="hh"
                                                minutePlaceholder="mm"
                                            />

                                        </div>

                                        <div className="time-picker-wrapper">
                                            <TimePicker
                                                value={slot.to || null}
                                                onChange={(value) =>
                                                    updateSlot(index, slotIndex, "to", value)
                                                }
                                                disableClock
                                                clearIcon={null}
                                                locale="en-US"
                                                hourPlaceholder="hh"
                                                minutePlaceholder="mm"
                                            />
                                        </div>




                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeSlot(index, slotIndex)}
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addSlot(index)}
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Time Slot
                                </Button>
                            </div>
                        )}
                    </div>
                ))}

                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}

                {success && (
                    <p className="text-sm text-green-600">{success}</p>
                )}

                <Button
                    className="w-full"
                    onClick={handleSaveWeeklyAvailability}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Weekly Availability"}
                </Button>
            </CardContent>
        </Card>
    );
};

export default WeeklyAvailability;
