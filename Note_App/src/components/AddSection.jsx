import React, { useEffect, useRef } from "react";

function AddSection({ handleButton, title, setTitle, details, setDetails, editId, setEditId, expanded, setExpanded }) {

  const titleRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    if (expanded && titleRef.current) titleRef.current.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  const onSubmit = (e) => {
    handleButton(e);
    setExpanded(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!expanded && (
        <div
          onClick={() => setExpanded(true)}
          className="bg-gray-100 rounded-lg shadow mb-6 cursor-pointer dark:bg-slate-800"
        >
          <div className="flex  items-center gap-3  p-3 ">
            <div className="flex-1 text-left text-gray-600 dark:text-gray-400">Take a note...</div>
            <div className="text-sm text-gray-400 dark:text-gray-500">Click to expand</div>
          </div>
        </div>
      )}

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/40"
          // onMouseDown={(e) => {
          //   if (e.target === e.currentTarget) setExpanded(false);
          // }}
        >
          <form
            onSubmit={onSubmit}
            // onMouseDown={(e) => e.stopPropagation()}
            className="  w-full max-w-2xl  rounded-b-2xl p-8  backdrop-blur-xl  bg-white/60 dark:bg-slate-900/50 border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-400/40 dark:border-gray-200/10 pb-2">
              <h2 className="text-lg font-semibold tracking-wider text-gray-800 dark:text-gray-100">
                {editId !== null ? "EDIT NOTE . . ." : "NOTE HERE . . ."}
              </h2>

              <button
                type="button"
                onClick={() => {setExpanded(false)} }
                className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 transition"
              >
                {editId !== null ? "" : "Close"}
              </button>
            </div>

            {/* Title */}
            <input
              ref={titleRef}
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className=" w-full  bg-transparent text-2xl font-semibold placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-white border-b  border-transparent  focus:border-indigo-400 dark:focus:border-indigo-500 outline-none pb-0.5 mb-2 transition"
            />

            {/* Details */}
            <textarea
              placeholder="Write your thoughts..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={7}
              required
              className=" w-full rounded-xl bg-white/40 dark:bg-slate-800/50 border border-white/30 dark:border-white/10 px-4 py-3 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 resize-none transition mb-6"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setExpanded(false);
                  setTitle("");
                  setDetails("");
                  setEditId(null);
                }}
                className=" px-5 py-2 rounded-lg bg-white/30 dark:bg-slate-700/40 text-gray-800 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-slate-700/60 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="  px-6 py-2  rounded-lg   bg-indigo-500/90  text-white  hover:bg-indigo-600  transition"
              >
                {editId !== null ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddSection;
