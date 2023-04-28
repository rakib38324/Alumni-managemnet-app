import React, { useState } from "react";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import {
  useAddEventsMutation,
  useGetAllBatchesQuery,
  useGetEventsCategoriesQuery,
} from "../../../features/Api/apiSlice";
import Loading from "../../../sharedComponents/Loading/Loading";
import ErrorAlert from "../../../sharedComponents/Skeletion/ErrorAlert";

const CreateEvents = () => {
  const [
    addEvents,
    {
      data: events,
      isLoading: isEventsAddLoading,
      isError: isEventsAddError,
      error: eventsAddError,
    },
  ] = useAddEventsMutation();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCreateEvents = (event) => {
    event.preventDefault();
    const form = event.target;
    const batch = form.eventsBatch.value;
    const event_title = form.eventsHeading.value;
    const date = selectedDate;
    const location = form.eventsLocation.value;
    const description = form.eventsDetails.value;
    const category = form.eventsCategory.value;
    const image_url = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image_url);
    console.log(category);

    // addEvents({});

    fetch("https://api.imgbb.com/1/upload?key=dd1a5cd35aa9d832298beb50053079da", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const eventsInfo = {
          batch,
          event_title,
          date,
          location,
          description,
          category,
          image_url: data.data.display_url,
        };
        fetch("https://alumni-managemnet-app-server.vercel.app/events", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(eventsInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(eventsInfo);
        console.log(category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  redux fetch event categories
  const {
    data: eventsCategories,
    isError: isEventsError,
    isLoading: isEventsLoading,
    error: eventsError,
  } = useGetEventsCategoriesQuery();

  let eventCategoryNames;
  if (isEventsLoading && !isEventsError) {
    eventCategoryNames = <Loading />;
  }
  if (!isEventsLoading && isEventsError) {
    eventCategoryNames = <ErrorAlert text={eventsError} />;
  }
  if (!isEventsLoading && !isEventsError && eventsCategories?.length === 0) {
    eventCategoryNames = <ErrorAlert text="No Category Find" />;
  }
  if (!isEventsLoading && !isEventsError && eventsCategories?.length > 0) {
    eventCategoryNames = (
      <>
        {eventsCategories.map((eventCategory) => (
          <option key={eventCategory._id} value={eventCategory._id}>
            {eventCategory.eventCategory}
          </option>
        ))}
      </>
    );
  }

  // redux fetch batches
  const {
    data: allBatches,
    isEventsError: isAllBatchesError,
    isEventsLoading: isAllBatchesLoading,
    error: allBatchesError,
  } = useGetAllBatchesQuery();

  let allBatchesOptionsContent;
  if (isAllBatchesLoading && !isAllBatchesError) {
    allBatchesOptionsContent = <Loading />;
  }
  if (!isAllBatchesLoading && isAllBatchesError) {
    allBatchesOptionsContent = <ErrorAlert text={allBatchesError} />;
  }
  if (!isAllBatchesLoading && !isAllBatchesError && allBatches?.length === 0) {
    allBatchesOptionsContent = <ErrorAlert text="No Category Find" />;
  }
  if (!isAllBatchesLoading && !isAllBatchesError && allBatches?.length > 0) {
    allBatchesOptionsContent = (
      <>
        {allBatches.map((allUniversityNames) => (
          <option value={allUniversityNames.batchNumber} key={allUniversityNames._id}>
            {allUniversityNames.batchNumber}
          </option>
        ))}
      </>
    );
  }

  return (
    <div className="w-full mx-auto my-16 px-10">
      {/* <h2 className="text-5xl my-5">Events</h2> */}
      <form onSubmit={(event) => handleCreateEvents(event)}>
        <div className="grid md:grid-cols-2 gap-3 !my-2">
          <input
            type="text"
            placeholder="Events Heading"
            className="input input-bordered w-full"
            name="eventsHeading"
            required
          />
          <input
            type="text"
            placeholder="Events Location"
            className="input input-bordered w-full "
            name="eventsLocation"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div className="form-control w-full ">
            <select className="select select-bordered " name="eventsBatch" required>
              <option value="">Select Batch</option>
              {allBatchesOptionsContent}
            </select>
          </div>
          <div className="form-control w-full ">
            <select className="select select-bordered " name="eventsCategory" required>
              {eventCategoryNames}
            </select>
          </div>
          <div className=" input input-bordered w-full  mb-5 flex items-center">
            <Flatpickr
              data-enable-time
              value={selectedDate}
              onChange={(date) => setSelectedDate(date[0])}
              c
            />
          </div>
        </div>
        <div className="form-control w-full">
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            name="image"
          />
        </div>
        <div className="form-control w-full">
          <textarea
            className="textarea textarea-bordered w-full my-5"
            placeholder="Events Details"
            name="eventsDetails"
            required
          ></textarea>
        </div>
        <button className="px-6 py-4 w-full rounded-lg bg-primary text-white font-semibold">
          {" "}
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvents;
