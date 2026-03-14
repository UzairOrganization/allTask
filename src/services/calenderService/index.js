import { API } from "@/lib/data-service";
import axios from "axios";

export const createCalendar = async (timezone) => {
    try {
        if (!timezone) {
            throw new Error("Timezone is required");
        }

        const response = await axios.post(
            `${API}/api/calender/create`,
            { timezone },
            { withCredentials: true }
        );

        return {
            success: true,
            data: response.data
        };

    } catch (error) {
        return {
            success: false,
            message:
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong"
        };
    }
};


export const saveWeeklyAvailability = async (weeklyAvailability) => {
    try {
        if (!Array.isArray(weeklyAvailability)) {
            throw new Error("Weekly availability must be an array");
        }

        const response = await axios.post(
            `${API}/api/calender/weekly`,
            weeklyAvailability,
            { withCredentials: true }
        );

        return {
            success: true,
            data: response.data
        };

    } catch (error) {
        return {
            success: false,
            message:
                error?.response?.data?.message ||
                error.message ||
                "Failed to save weekly availability"
        };
    }
};


export const fetchWeeklyAvailability = async () => {
    try {
        const response = await axios.get(
            `${API}/api/calender/weekly`,
            { withCredentials: true }
        );

        return {
            success: true,
            data: response.data.weeklyAvailability,
        };

    } catch (error) {
        return {
            success: false,
            message:
                error?.response?.data?.message ||
                "Failed to fetch weekly availability",
        };
    }
};



export const saveDateOverride = async (payload) => {
    try {
        const response = await axios.post(
            `${API}/api/calender/override`,
            payload,
            { withCredentials: true }
        );

        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message:
                error?.response?.data?.message ||
                "Failed to save date override",
        };
    }
};

export const fetchDateOverrides = async () => {
    try {
        const response = await axios.get(
            `${API}/api/calender/override`,
            { withCredentials: true }
        );

        return {
            success: true,
            data: response.data.overrides,
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch date overrides",
        };
    }
};

export const deleteDateOverride = async (id) => {
  try {
    const res = await axios.delete(`${API}/api/calender/override/${id}`, {
      withCredentials: true
    });

    return {
      success: true,
      data: res.data
    };

  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Delete failed"
    };
  }
};

export const fetchMonthlyCalendar = async (providerName, month, year) => {
  try {
    const encodedName = encodeURIComponent(providerName);

    const response = await axios.get(
      `${API}/api/calender/monthly/${encodedName}?month=${month}&year=${year}`
    );

    return {
      success: true,
      data: response.data.calendar,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Failed to load calendar",
    };
  }
};
