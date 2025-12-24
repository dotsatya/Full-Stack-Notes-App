import React from "react";
import { FaRegEdit } from "react-icons/fa";

function TasksSec({ tasks, setTasks, handleEdit, handleDelete }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No notes yet — add one above.
        </p>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-4 break-inside-avoid inline-block w-full max-h-125 overflow-y-auto"
            >
              <h3 className="pb-1 text-lg wrap-break-word font-semibold border-b border-gray-300 dark:border-gray-700 text-slate-900 dark:text-slate-100">
                {task.title}
              </h3>

              <p className="text-sm wrap-break-word whitespace-pre-line text-gray-600 dark:text-gray-300 mt-2">
                {task.details}
              </p>

              <div className="flex items-center justify-end gap-3 mt-4">
                {/* Edit */}
                <button
                  onClick={() => handleEdit(task.id)}
                  className="px-2 py-1 rounded cursor-pointer bg-green-300 hover:bg-green-400 transition dark:bg-green-800 dark:hover:bg-green-700 "
                  title="Edit"
                >
                  <FaRegEdit
                    size={22}
                    className="text-white dark:text-gray-300"
                  />
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded cursor-pointer hover:bg-red-100 transition dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TasksSec;
