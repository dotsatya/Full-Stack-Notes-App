import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEditNote } from "react-icons/md";
import AddSection from "../components/AddSection";
import TasksSec from "../components/TasksSec";
import { Moon, Sun } from "react-feather";
import "../App.css";
import api from "../api";


const content = {
  english: {
    title: "Dot Notes",
  },
  bengali: {
    title: "ডট নোটস",
  },
  hindi: {
    title: "डॉट नोट्स",
  },
};

function Home() {
  // const navigate = useNavigate();

  const [dark, setDark] = useState(false);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(0);

  const [expanded, setExpanded] = useState(false);

  const [lang, setLang] = useState("english");
  const [editId, setEditId] = useState(null);


  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth token and local state, then redirect to login
    localStorage.removeItem("token");
    setTasks([]);
    setTitle("");
    setDetails("");
    setEditId(null);
    navigate("/login");
  };

  // redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // fetch notes (requires auth header provided by api interceptor)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // skip fetch when not authenticated

    api.get("/notes")
      .then((res) => {
        setTasks(res.data);
      })
      .catch(() => {
        console.log("Failed to load notes");
      });
  }, []);
  //-----------


  const handleButton = (e) => {
    e.preventDefault();

    if (editId !== null) {
      // EDIT (frontend only for now)
      api.put(`/edit-note/${editId}`, { title, details })
        .then(() => api.get("/notes"))
        .then(res => {
          setTasks(res.data);
          setEditId(null);
          setTitle("");
          setDetails("");
        });
      return;
    }

    // ADD NOTE → BACKEND
    api.post("/add-note", { title, details })
      .then(() => {
        // reload notes from DB
        return api.get("/notes");
      })
      .then((res) => {
        setTasks(res.data);
        setTitle("");
        setDetails("");
      })
      .catch(() => {
        alert("Failed to save note");
      });
  };


  const handleDelete = (id) => {
    api.delete(`/delete-note/${id}`)
      .then(() => api.get("/notes"))
      .then(res => {
        setTasks(res.data);
      });
  };


  const handleEdit = (id) => {
    const taskNote = tasks.find((t) => t.id === id);
    if (!taskNote) return;

    setTitle(taskNote.title);
    setDetails(taskNote.details);
    setEditId(id);
    setExpanded(true);
  };

  return (
    <div className={dark ? "" : "dark"}>
      <main className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-slate-900 transition-colors">
        <header className="w-[90%] fixed py-2 pb-3 flex items-center justify-between border-b border-slate-200  backdrop-blur-xl dark:border-slate-700">
          <div className="flex flex-row items-center gap-1 text-gray-800 dark:text-gray-200"> <MdOutlineEditNote size={32} />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {content[lang] ? content[lang].title : "No lang"}
            </h1></div>

          <div className="flex flex-row gap-2 text-gray-600">
            <button
              onClick={() => setLang("bengali")}
              className="border-b border-gray-400 text-sm rounded-lg p-2 hover:cursor-pointer dark:text-white"
            >
              <h6 className="text-gray-500  hover:text-gray-300">Bengali</h6>
            </button>
            <button
              onClick={() => setLang("english")}
              className="border-b border-gray-400 text-sm rounded-lg p-2 hover:cursor-pointer dark:text-white"
            >
              <h6 className="text-gray-500  hover:text-gray-300">English</h6>
            </button>
            <button
              onClick={() => setLang("hindi")}
              className="border-b border-gray-400 text-sm rounded-lg p-2 hover:cursor-pointer dark:text-white"
            >
              <h6 className="text-gray-500  hover:text-gray-300">Hindi</h6>
            </button>
          </div>
          <div className="flex">
            <button
              onClick={() => setDark(!dark)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95"
            >
              {dark ? (
                <Sun
                  size={18}
                  className="text-yellow-400 rotate-0 transition-transform duration-300"
                />
              ) : (
                <Moon
                  size={18}
                  className="text-yellow-400 transition-transform duration-300"
                />
              )}
            </button>
            <button
              onClick={handleLogout}
              className="ml-3 px-2 py-1 font-bold rounded bg-red-500 dark:bg-red-100 text-red-50 dark:text-red-600 hover:bg-red-400 hover:dark:bg-red-300 transition"
            >
              Log Out
            </button>
          </div>
        </header>

        <section className="w-[80%] mt-16 p-6">
          <AddSection
            title={title}
            setTitle={setTitle}
            details={details}
            setDetails={setDetails}
            handleButton={handleButton}
            editId={editId}
            setEditId={setEditId}
            expanded={expanded}
            setExpanded={setExpanded}
          />

          <TasksSec tasks={tasks}
            setTasks={setTasks}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

export default Home;
