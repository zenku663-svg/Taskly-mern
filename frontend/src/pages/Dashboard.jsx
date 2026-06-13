import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("Pending");
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://taskly-backend-xz75.onrender.com/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://taskly-backend-xz75.onrender.com/api/tasks",
        {
          title,
          description,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

        setTitle("");
        setDescription("");
        setStatus("Pending");
      fetchTasks();
      toast.success("Task Added Successfully");
    } catch (error) {
      toast.error("Task creation failed");
    }
  };
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://taskly-backend-xz75.onrender.com/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
      toast.success("Task Deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };
    const editTask = (task) => {
      setEditingTask(task);
      setEditTitle(task.title);
      setEditDescription(task.description);
      setEditStatus(task.status);
      setShowEditModal(true);
    };

    const saveEditedTask = async () => {
      try {
        await axios.put(
          `https://taskly-backend-xz75.onrender.com/api/tasks/${editingTask._id}`,
          {
            title: editTitle,
            description: editDescription,
            status: editStatus
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        fetchTasks();

        toast.success("Task Updated");

        setShowEditModal(false);

      } catch (error) {
        toast.error("Update failed");
      }
    };

    const updateStatus = async (id, status) => {
      try {
        await axios.put(
          `https://taskly-backend-xz75.onrender.com/api/tasks/${id}`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      task.status === filter;

    return matchesSearch && matchesFilter;
  });

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

return (
  <div className="min-h-screen bg-black text-white">
    <div className="fixed inset-0 overflow-hidden pointer-events-none">

      <div className="absolute -left-40 top-0 w-[700px] h-[700px] bg-orange-500/15 blur-[220px] rounded-full">
      </div>

      <div className="absolute -right-40 bottom-0 w-[700px] h-[700px] bg-orange-600/15 blur-[220px] rounded-full">
      </div>

    </div>
    {/* Navbar */}
    <div className="border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
    <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-black font-bold">
          ✓
        </div>

        <h1 className="text-2xl font-bold">
          Task<span className="text-orange-500">ly</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">

        <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
            {userName?.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="font-semibold">
              {userName}
            </p>

            <p className="text-xs text-gray-400">
              {userEmail}
            </p>
          </div>

        </div>

        <button
          onClick={logoutHandler}
          className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      </div>
    </div>

    <div className="max-w-6xl mx-auto p-6">

      <div className="mb-10">
        <p className="text-orange-500 uppercase tracking-[0.3em] text-sm">
          Dashboard
        </p>

        <h1
          className="text-3xl sm:text-4xl font-bold mt-3 tracking-tight"
          style={{ fontFamily: "Space Grotesk" }}
        >
          Good to see you,
          <span className="text-orange-500">
            {" "}{userName}!
          </span>
        </h1>
        <p className="text-gray-400 mt-3 text-xl">
          Here's a snapshot of your work.
          Stay focused, stay shipping.
        </p>
      </div>

    <div className="grid md:grid-cols-5 gap-3 sm:gap-4 mb-10">

      <div className="bg-white/5 border border-white/10 rounded-[22px] p-4 sm:p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wider">TOTAL TASKS</p>
        <h2
          className="text-3xl sm:text-4xl font-bold mt-2"
          style={{ fontFamily: "Space Grotesk" }}
        >
          {totalTasks}
        </h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[22px] p-4 sm:p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wider">PENDING</p>
        <h2
          className="text-3xl sm:text-4xl font-bold mt-2"
          style={{ fontFamily: "Space Grotesk" }}
        >
          {pendingTasks}
        </h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[22px] p-4 sm:p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wider">
          IN PROGRESS
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold mt-2"
          style={{ fontFamily: "Space Grotesk" }}
        >
          {inProgressTasks}
        </h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[22px] p-4 sm:p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wider">
          COMPLETED
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold mt-2"
          style={{ fontFamily: "Space Grotesk" }}
        >
          {completedTasks}
        </h2>
      </div>

      <div className="bg-white/5 border border-orange-500/20 rounded-[22px] p-4 sm:p-5">
        <h3 className="text-xs text-gray-400 uppercase tracking-wider">
          Completion Rate
        </h3>

        <p
          className="text-3xl sm:text-4xl font-bold text-orange-500 mt-2"
          style={{ fontFamily: "Space Grotesk" }}
        >
          {completionRate}%
        </p>

        <div className="w-full bg-gray-800 rounded-full h-2 mt-4 overflow-hidden">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-700"
            style={{
              width: `${completionRate}%`,
            }}
          ></div>
        </div>
      </div>

</div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">

        <h2 className="text-2xl font-semibold mb-4">
          Add Task
        </h2>

        <form onSubmit={addTask}>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full bg-black/40 border border-gray-700 rounded-xl p-3 mb-4"
          />

          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full bg-black/40 border border-gray-700 rounded-xl p-3 mb-4"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-black/40 border border-gray-700 rounded-xl p-3 mb-4"
          >
            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>


          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl"
          >
            Add Task
          </button>

        </form>

      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">

      <h2 className="text-4xl font-bold">
        Your Tasks
        <span className="ml-3 text-lg text-gray-400">
          ({filteredTasks.length})
        </span>
      </h2>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-black/40 border border-gray-700 rounded-xl px-4 py-2 w-full md:w-72"
        />

      </div>

      <div className="flex gap-3 mb-6 flex-wrap">

        {[
          "All",
          "Pending",
          "In Progress",
          "Completed",
        ].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl ${
              filter === status
                ? "bg-orange-500"
                : "bg-white/5 border border-white/10"
            }`}
          >
            {status}
          </button>
        ))}

      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className={`bg-white/5 border rounded-[22px] p-5 backdrop-blur-xl transition-all hover:scale-[1.02]
            ${
              task.status === "Completed"
                ? "border-green-500/40 hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]"
                : task.status === "In Progress"
                ? "border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]"
                : "border-orange-500/40 hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]"
            }`}
          >

          <div className="flex justify-between items-center mb-4">

          <div
            className={`inline-block px-3 py-1 rounded-lg text-sm font-medium
            ${
              task.status === "Completed"
                ? "bg-green-500/20 text-green-400"
                : task.status === "In Progress"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {task.status}
          </div>

            <span className="text-[10px] text-gray-500 uppercase">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>

          </div>

          <h3
            className="text-lg font-semibold mb-2 tracking-tight"
            style={{ fontFamily: "Space Grotesk" }}
          >
            {task.title}
          </h3>
            <p className="text-sm text-gray-400 mb-5">
              {task.description}
            </p>
            <hr className="border-white/10 my-4" />
            <div className="flex gap-3">

            <button
              onClick={() => editTask(task)}
              className="flex items-center gap-2 text-xs bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl border border-white/10"
            >
              <Pencil size={16} />
              Edit
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 px-3 py-2"
            >
              <Trash2 size={16} />
              Delete
            </button>

            </div>

          </div>
        ))}
        </div>
      )}

    {showEditModal && (
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

        <div className="bg-zinc-900 border border-white/10 rounded-[22px] p-6 w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6">
            Edit Task
          </h2>

          <input
            type="text"
            value={editTitle}
            onChange={(e) =>
              setEditTitle(e.target.value)
            }
            className="w-full bg-black/40 border border-gray-700 rounded-xl p-3 mb-4"
          />

          <textarea
            value={editDescription}
            onChange={(e) =>
              setEditDescription(e.target.value)
            }
            className="w-full bg-black/40 border border-gray-700 rounded-xl p-3 mb-6"
            rows="4"
          />
          <select
              value={editStatus}
              onChange={(e) =>
                setEditStatus(e.target.value)
              }
              className="w-full bg-black/40 border border-gray-700 rounded-xl p-3 mb-6"
            >
              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

          <div className="flex justify-end gap-3">

            <button
              onClick={() =>
                setShowEditModal(false)
              }
              className="px-5 py-2 rounded-xl border border-white/10"
            >
              Cancel
            </button>

            <button
              onClick={saveEditedTask}
              className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-xl"
            >
              Save
            </button>

          </div>

        </div>

      </div>
    )}
    </div>
  </div>
);
}
export default Dashboard;