import { useState } from "react";
import {
  Search,
  MoreVertical,
  MapPin,
  Eye,
  UserX,
  UserCheck,
  Trash2,
} from "lucide-react";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { adminUsers as initialUsers } from "../../utils/mockData";
import { formatDate, initialsFromName, cn } from "../../utils/helpers";
import { useToast } from "../../context/ToastContext";

export default function AdminUsers() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(initialUsers);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addToast } = useToast();

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()),
  );

  const toggleStatus = (user) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u,
      ),
    );
    addToast(
      `${user.name} marked as ${user.status === "active" ? "inactive" : "active"}.`,
      "success",
    );
    setOpenMenuId(null);
  };

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    addToast(`${deleteTarget.name} removed.`, "success");
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="font-display text-xl font-semibold text-ink dark:text-gray-100">
          Manage Users
        </h2>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            className="input-field pl-10 w-64"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/60 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide rounded-t-2xl">
              <tr>
                <th className="px-5 py-3.5 font-medium">User</th>
                <th className="px-5 py-3.5 font-medium hidden sm:table-cell">
                  Location
                </th>
                <th className="px-5 py-3.5 font-medium hidden md:table-cell">
                  Joined
                </th>
                <th className="px-5 py-3.5 font-medium">Queries</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary-700 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                        {initialsFromName(u.name)}
                      </div>
                      <div>
                        <p className="font-medium text-ink dark:text-gray-100">
                          {u.name}
                        </p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {u.location}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-gray-500 dark:text-gray-400">
                    {formatDate(u.joined)}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-ink dark:text-gray-100">
                    {u.queries}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge
                      variant={u.status === "active" ? "secondary" : "gray"}
                    >
                      {u.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === u.id ? null : u.id)
                      }
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      aria-label={`More options for ${u.name}`}
                      aria-expanded={openMenuId === u.id}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {openMenuId === u.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-5 mt-1 w-44 bg-white dark:bg-gray-900 rounded-xl shadow-lift border border-gray-100 dark:border-gray-800 py-1.5 z-20 animate-fadeUp text-left">
                          <button
                            onClick={() => {
                              setViewUser(u);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <Eye className="h-4 w-4" /> View details
                          </button>
                          <button
                            onClick={() => toggleStatus(u)}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            {u.status === "active" ? (
                              <UserX className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
                            {u.status === "active"
                              ? "Mark inactive"
                              : "Mark active"}
                          </button>
                          <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
                          <button
                            onClick={() => {
                              setDeleteTarget(u);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            <Trash2 className="h-4 w-4" /> Remove user
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={!!viewUser}
        onClose={() => setViewUser(null)}
        title="User Details"
        size="sm"
      >
        {viewUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary-700 text-white flex items-center justify-center text-sm font-semibold">
                {initialsFromName(viewUser.name)}
              </div>
              <div>
                <p className="font-semibold text-ink dark:text-gray-100">
                  {viewUser.name}
                </p>
                <p className="text-xs text-gray-400">{viewUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                  Location
                </p>
                <p className="text-ink dark:text-gray-100 mt-0.5">
                  {viewUser.location}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                  Joined
                </p>
                <p className="text-ink dark:text-gray-100 mt-0.5">
                  {formatDate(viewUser.joined)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                  Total Queries
                </p>
                <p className="text-ink dark:text-gray-100 mt-0.5 font-mono">
                  {viewUser.queries}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                  Status
                </p>
                <Badge
                  variant={viewUser.status === "active" ? "secondary" : "gray"}
                  className="mt-0.5"
                >
                  {viewUser.status}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Remove this user?"
        size="sm"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This will remove{" "}
          <span className="font-medium text-ink dark:text-gray-200">
            {deleteTarget?.name}
          </span>{" "}
          from the user list. This action cannot be undone.
        </p>
        <div className="flex gap-3 mt-6">
          <Button
            variant="ghost"
            fullWidth
            onClick={() => setDeleteTarget(null)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            fullWidth
            className={cn("bg-red-600 hover:bg-red-700")}
            onClick={confirmDelete}
          >
            Remove
          </Button>
        </div>
      </Modal>
    </div>
  );
}
