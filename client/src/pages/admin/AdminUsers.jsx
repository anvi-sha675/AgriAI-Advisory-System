import { useEffect, useState, useCallback } from "react";
import {
  Search,
  MoreVertical,
  MapPin,
  Eye,
  UserX,
  UserCheck,
  Trash2,
  Plus,
  ShieldCheck,
} from "lucide-react";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Loader } from "../../components/ui/Loader";
import { formatDate, initialsFromName, cn } from "../../utils/helpers";
import { useToast } from "../../context/ToastContext";
import { api } from "../../utils/api";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "farmer",
};

export default function AdminUsers() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(emptyForm);
  const [createErrors, setCreateErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get(
        `/admin/users${query ? `?search=${encodeURIComponent(query)}` : ""}`,
      );
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message || "Couldn't load users.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const t = setTimeout(loadUsers, 300);
    return () => clearTimeout(t);
  }, [loadUsers]);

  const toggleStatus = async (user) => {
    setOpenMenuId(null);
    const nextStatus = user.status === "active" ? "inactive" : "active";
    try {
      await api.patch(`/admin/users/${user.id}/status`, { status: nextStatus });
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u)),
      );
      addToast(`${user.name} marked as ${nextStatus}.`, "success");
    } catch (err) {
      addToast(err.message || "Couldn't update status.", "error");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/admin/users/${deleteTarget.id}`);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      addToast(`${deleteTarget.name} removed.`, "success");
    } catch (err) {
      addToast(err.message || "Couldn't remove user.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    setCreateErrors({});
    if (
      !createForm.name.trim() ||
      !createForm.email.trim() ||
      !createForm.password
    ) {
      setCreateErrors({
        name: !createForm.name.trim() ? "Name is required" : undefined,
        email: !createForm.email.trim() ? "Email is required" : undefined,
        password: !createForm.password ? "Password is required" : undefined,
      });
      return;
    }
    setSaving(true);
    try {
      await api.post("/admin/users", createForm);
      addToast(`${createForm.name} added.`, "success");
      setCreateOpen(false);
      setCreateForm(emptyForm);
      loadUsers();
    } catch (err) {
      if (err.fieldErrors) {
        const fieldMap = {};
        err.fieldErrors.forEach((fe) => {
          fieldMap[fe.field] = fe.message;
        });
        setCreateErrors(fieldMap);
      } else {
        addToast(err.message || "Couldn't create user.", "error");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="font-display text-xl font-semibold text-ink dark:text-gray-100">
          Manage Users
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              className="input-field pl-10 w-full sm:w-64"
              placeholder="Search users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button
            variant="primary"
            onClick={() => {
              setCreateForm(emptyForm);
              setCreateErrors({});
              setCreateOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Add user
          </Button>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <Loader label="Loading users..." />
        ) : error ? (
          <div className="py-10 text-center">
            <p className="text-sm text-red-500 mb-3">{error}</p>
            <Button variant="ghost" onClick={loadUsers}>
              Try again
            </Button>
          </div>
        ) : users.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {query
                ? "No users match your search."
                : "No users yet — add the first one."}
            </p>
          </div>
        ) : (
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
                  <th className="px-5 py-3.5 font-medium">Role</th>
                  <th className="px-5 py-3.5 font-medium">Status</th>
                  <th className="px-5 py-3.5 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {users.map((u) => (
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
                        <MapPin className="h-3.5 w-3.5" /> {u.location || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-gray-500 dark:text-gray-400">
                      {formatDate(u.createdAt)}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-ink dark:text-gray-100">
                      {u.queries}
                    </td>
                    <td className="px-5 py-3.5">
                      {u.role === "admin" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 dark:text-secondary-400">
                          <ShieldCheck className="h-3.5 w-3.5" /> Admin
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Farmer
                        </span>
                      )}
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
        )}
      </div>

      {/* View details */}
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
                  {viewUser.location || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                  Joined
                </p>
                <p className="text-ink dark:text-gray-100 mt-0.5">
                  {formatDate(viewUser.createdAt)}
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

      {/* Create user */}
      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Add a new user"
        size="sm"
      >
        <form onSubmit={submitCreate} className="space-y-4" noValidate>
          <Input
            label="Full name"
            id="new-name"
            value={createForm.name}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, name: e.target.value }))
            }
            error={createErrors.name}
          />
          <Input
            label="Email"
            id="new-email"
            type="email"
            value={createForm.email}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, email: e.target.value }))
            }
            error={createErrors.email}
          />
          <Input
            label="Phone (optional)"
            id="new-phone"
            value={createForm.phone}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, phone: e.target.value }))
            }
            error={createErrors.phone}
          />
          <Input
            label="Temporary password"
            id="new-password"
            type="password"
            value={createForm.password}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, password: e.target.value }))
            }
            error={createErrors.password}
          />
          <div>
            <label
              htmlFor="new-role"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Role
            </label>
            <select
              id="new-role"
              className="input-field"
              value={createForm.role}
              onChange={(e) =>
                setCreateForm((f) => ({ ...f, role: e.target.value }))
              }
            >
              <option value="farmer">Farmer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              fullWidth
              onClick={() => setCreateOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" fullWidth disabled={saving}>
              {saving ? "Adding..." : "Add user"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Remove this user?"
        size="sm"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This will permanently remove{" "}
          <span className="font-medium text-ink dark:text-gray-200">
            {deleteTarget?.name}
          </span>{" "}
          and all of their chats and disease reports. This action cannot be
          undone.
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
