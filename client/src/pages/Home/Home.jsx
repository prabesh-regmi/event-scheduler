import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, deleteEvent, getHolidays } from "../../services";
import ModalTemplateWithArgs from "../../components/common/modal/ModalTemplateWithArgs";
import DeleteConformationModal from "../../components/common/modal/DeleteConformation";
import Calendar from "../../components/calendar/Calendar";
import { setHolidays } from "../../redux/slices/holidaysSlice";
import { clearEvents, setEvents } from "../../redux/slices/eventsSlice";
import SubmitSpinner from "../../components/common/SubmitSpinner";

function Home() {
  const [deleteItem, setDeleteItem] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useSelector((state) => state.login);
  const { holidays } = useSelector((state) => state.holidays);
  const { events } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    dispatch(clearEvents());
    const data = await getEvents();
    const holidays = await getHolidays();
    dispatch(setHolidays(holidays));
    dispatch(setEvents({ events: data.events }));
  };
  const onDelete = async () => {
    setIsDeleting(true);
    const deleted = await deleteEvent(deleteItem);
    if (deleted) {
      setDeleteItem("");
      fetchData();
    }
    setIsDeleting(false);
  };
  const onDeleteCancel = () => {
    setDeleteItem("");
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    fetchData();
  }, []);
  return (
    <div className="max-w-5xl mx-auto my-10 px-4 min-h-96">
      <div className="flex justify-between items-center">
        {holidays && events ? (
          <Calendar events={events} />
        ) : (
          <div className="flex justify-center py-16 w-full">
            <SubmitSpinner className="size-32 text-white animate-spin" />
          </div>
        )}
      </div>
      <ModalTemplateWithArgs
        isOpen={!!deleteItem}
        width="w-md"
        onClose={onDeleteCancel}
      >
        <DeleteConformationModal
          onConfirm={onDelete}
          onCancel={onDeleteCancel}
          isLoading={isDeleting}
        />
      </ModalTemplateWithArgs>
    </div>
  );
}

export default Home;
