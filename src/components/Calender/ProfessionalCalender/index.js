"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, CalendarDays } from "lucide-react";
import { createCalendar } from "@/services/calenderService";
import WeeklyAvailability from "../WeeklyAvailability";
import DateOverrides from "../DateOverrides";



const TIMEZONES = [
    // 🇺🇸 UNITED STATES

    // Eastern Time
    "America/New_York",
    "America/Detroit",
    "America/Kentucky/Louisville",
    "America/Kentucky/Monticello",
    "America/Indiana/Indianapolis",
    "America/Indiana/Vincennes",
    "America/Indiana/Winamac",
    "America/Indiana/Marengo",
    "America/Indiana/Petersburg",
    "America/Indiana/Vevay",

    // Central Time
    "America/Chicago",
    "America/Indiana/Tell_City",
    "America/Menominee",
    "America/North_Dakota/Center",
    "America/North_Dakota/New_Salem",
    "America/North_Dakota/Beulah",

    // Mountain Time
    "America/Denver",
    "America/Boise",

    // Arizona (no DST)
    "America/Phoenix",

    // Pacific Time
    "America/Los_Angeles",

    // Alaska Time
    "America/Anchorage",
    "America/Juneau",
    "America/Sitka",
    "America/Metlakatla",
    "America/Yakutat",
    "America/Nome",

    // Hawaii–Aleutian
    "America/Adak",
    "Pacific/Honolulu",

    // 🇨🇦 CANADA

    // Eastern Time
    "America/Toronto",
    "America/Nipigon",
    "America/Thunder_Bay",
    "America/Iqaluit",

    // Central Time
    "America/Winnipeg",
    "America/Rainy_River",
    "America/Rankin_Inlet",
    "America/Resolute",

    // Mountain Time
    "America/Edmonton",
    "America/Cambridge_Bay",
    "America/Inuvik",
    "America/Yellowknife",

    // Pacific Time
    "America/Vancouver",
    "America/Dawson",
    "America/Whitehorse",

    // Atlantic Time
    "America/Halifax",
    "America/Glace_Bay",
    "America/Moncton",
    "America/Goose_Bay",

    // Newfoundland Time
    "America/St_Johns"
];


const ProfessionalCalendar = ({ provider, refetchProvider }) => {
    const [timezone, setTimezone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // If calendar already exists → stop here (future UI)
    if (provider?.calendar) {
        return (
            <>
                <WeeklyAvailability />
                <DateOverrides />
            </>
        );
    }

    const handleCreateCalendar = async () => {
        setError("");

        if (!timezone) {
            setError("Please select a timezone.");
            return;
        }

        setLoading(true);
        const result = await createCalendar(timezone);
        setLoading(false);
        window.location.reload()

        if (!result.success) {
            setError(result.message);
            return;
        }

        // refresh provider details
        refetchProvider?.();
    };

    return (
        <Card className=" mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    Create Availability Calendar
                </CardTitle>
                <CardDescription>
                    Set up your calendar to start accepting bookings.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <Alert>
                    <AlertDescription>
                        You need to create a calendar before setting your availability.
                    </AlertDescription>
                </Alert>

                <div className="space-y-2 w-full ">
                    <label className="text-sm font-medium">
                        Select Your Timezone
                    </label>

                    <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose timezone" />
                        </SelectTrigger>
                        <SelectContent>
                            {TIMEZONES.map((tz) => (
                                <SelectItem key={tz} value={tz}>
                                    {tz}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {error && (
                    <p className="text-sm text-destructive">{error}</p>
                )}

                <Button
                    className="w-full"
                    onClick={handleCreateCalendar}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating Calendar...
                        </>
                    ) : (
                        "Create Calendar"
                    )}
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProfessionalCalendar;
