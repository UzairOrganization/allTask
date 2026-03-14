"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import {
  saveDateOverride,
  fetchDateOverrides,
  deleteDateOverride,
} from "@/services/calenderService";
import TimePicker from "react-time-picker";
import { Trash2 } from "lucide-react";


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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedOverride, setSelectedOverride] = useState(null);

  const [open, setOpen] = useState(false);
  const toMinutes = (time) => {
    if (!time) return 0;

    const [t, modifier] = time.split(" ");
    let [h, m] = t.split(":").map(Number);

    if (modifier === "PM" && h !== 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;

    return h * 60 + m;
  };

  useEffect(() => {
    fetchOverrides();
  }, []);

  const fetchOverrides = async () => {
    const result = await fetchDateOverrides();
    if (result.success) setOverrides(result.data);
  };
  const handleDelete = (id) => {
    setSelectedOverride(id);
    setDeleteOpen(true);
  };
  const confirmDelete = async () => {
    if (!selectedOverride) return;

    const result = await deleteDateOverride(selectedOverride);

    if (result.success) {
      fetchOverrides();
    }

    setDeleteOpen(false);
    setSelectedOverride(null);
  };

  const resetForm = () => {
    setDate("");
    setIsAvailable(false);
    setTimeSlots([{ from: "", to: "" }]);
  };

  const handleSave = async () => {
    if (isAvailable) {
      if (toMinutes(timeSlots[0].from) >= toMinutes(timeSlots[0].to)) {
        return alert("Start time must be before end time");
      }
    }
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
      <Card className={"mt-8"}>
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
                <p className="font-medium">{new Date(o.date).toDateString()}</p>

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

              {/* DELETE BUTTON */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(o._id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
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
                  <label className="text-xs text-muted-foreground">From</label>
                  <TimePicker
                    value={timeSlots[0].from}
                    onChange={(value) =>
                      setTimeSlots([{ ...timeSlots[0], from: value }])
                    }
                    disableClock
                    clearIcon={null}
                    locale="en-US" // ✅ forces 12-hour
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">To</label>
                  <TimePicker
                    value={timeSlots[0].to}
                    onChange={(value) =>
                      setTimeSlots([{ ...timeSlots[0], to: value }])
                    }
                    disableClock
                    clearIcon={null}
                    locale="en-US" // ✅ forces 12-hour
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
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Date Override</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to remove this date override?
          </p>

          <DialogFooter className="pt-4">
            <Button
  variant="outline"
  onClick={() => {
    setDeleteOpen(false);
    setSelectedOverride(null);
  }}
>
              Cancel
            </Button>

            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DateOverrides;
