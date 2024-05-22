import { Api } from "./api";

export const deleteEvent = async (eventId) => {
  try {
    const rs = await Api.delete(`/events/${eventId}`);
    if (rs?.status === 204) {
      return true;
    }
    return false;
  } catch (err) {
    return err.response?.data;
  }
};
