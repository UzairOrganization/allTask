"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { saveDateOverride, fetchDateOverrides } from "@/services/calenderService";

/* ---------------- HELPERS ---------------- */

const formatTime12h = (time) => {
  if (!time) return "";
  const [h, m] = time.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const twelveHour = hour % 12 || 12;
  return `${twelveHour}:${m} ${suffix}`;
};

/* ---------------- COMPONENT ---------------- */

const DateOverrides = () => {
  const [date, setDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [timeSlots, setTimeSlots] = useState([{ from: "", to: "" }]);
  const [overrides, setOverrides] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchOverrides();
  }, []);

  const fetchOverrides = async () => {
    const result = await fetchDateOverrides();
    if (result.success) setOverrides(result.data);
  };

  const resetForm = () => {
    setDate("");
    setIsAvailable(false);
    setTimeSlots([{ from: "", to: "" }]);
  };

  const handleSave = async () => {
    const payload = {
      date,
      isAvailable,
      timeSlots: isAvailable ? timeSlots : [],
    };

    const result = await saveDateOverride(payload);
    if (result.success) {
      fetchOverrides();
      setOpen(false);
      resetForm();
    }
  };

  return (
    <>
      {/* MAIN CARD */}
      <Card className={'mt-8'}>
        <CardHeader className="flex  flex-row items-center justify-between">
          <CardTitle>Date Overrides</CardTitle>
          <Button onClick={() => setOpen(true)}>Add Override</Button>
        </CardHeader>

        <CardContent className="space-y-3">
          {overrides.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No date overrides added yet.
            </p>
          )}

          {overrides.map((o) => (
            <div
              key={o._id}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <p className="font-medium">
                  {new Date(o.date).toDateString()}
                </p>

                {o.isAvailable ? (
                  <p className="text-sm text-green-600">
                    {o.timeSlots.map((t, i) => (
                      <span key={i}>
                        {formatTime12h(t.from)} – {formatTime12h(t.to)}
                      </span>
                    ))}
                  </p>
                ) : (
                  <p className="text-sm text-red-500">Unavailable</p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set Date Override</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <span className="font-medium">Available on this date</span>
              <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
            </div>

            {isAvailable && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">
                    From
                  </label>
                  <Input
                    type="time"
                    value={timeSlots[0].from}
                    onChange={(e) =>
                      setTimeSlots([{ ...timeSlots[0], from: e.target.value }])
                    }
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">
                    To
                  </label>
                  <Input
                    type="time"
                    value={timeSlots[0].to}
                    onChange={(e) =>
                      setTimeSlots([{ ...timeSlots[0], to: e.target.value }])
                    }
                  />
                </div>

                {timeSlots[0].from && timeSlots[0].to && (
                  <p className="col-span-2 text-sm text-muted-foreground">
                    Selected:&nbsp;
                    <strong>
                      {formatTime12h(timeSlots[0].from)} –{" "}
                      {formatTime12h(timeSlots[0].to)}
                    </strong>
                  </p>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Override</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DateOverrides;
