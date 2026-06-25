import { Download, FileBarChart } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Button from "../../components/ui/Button";
import { queryCategoryData, userGrowthData } from "../../utils/mockData";
import { useToast } from "../../context/ToastContext";

const COLORS = ["#166534", "#22C55E", "#0EA5E9", "#c99a4a", "#86efac"];

const reportLinks = [
  { title: "Monthly User Activity", date: "June 2026", size: "1.2 MB" },
  { title: "Disease Report Summary", date: "May 2026", size: "860 KB" },
  { title: "Regional Query Breakdown", date: "May 2026", size: "640 KB" },
];

export default function AdminReports() {
  const { addToast } = useToast();

  const handleExport = (label) => {
    addToast(
      `"${label}" export will be available once a real reporting backend is connected.`,
      "info",
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="font-display text-xl font-semibold text-ink dark:text-gray-100">
          Reports & Analytics
        </h2>
        <Button
          icon={Download}
          variant="outline"
          onClick={() => handleExport("Full report")}
        >
          Export Report
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-5">
            Query Categories
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={queryCategoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
              >
                {queryCategoryData.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  fontSize: 13,
                }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-5">
            User Growth
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={userGrowthData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  fontSize: 13,
                }}
              />
              <Bar dataKey="users" fill="#16a34a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-4">
          Generated Reports
        </h3>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {reportLinks.map((r) => (
            <div
              key={r.title}
              className="flex items-center justify-between py-3.5"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                  <FileBarChart className="h-4 w-4 text-primary-700 dark:text-secondary-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink dark:text-gray-100">
                    {r.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {r.date} &middot; {r.size}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleExport(r.title)}
                className="text-gray-400 hover:text-primary-700 dark:hover:text-secondary-400"
                aria-label={`Download ${r.title}`}
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
