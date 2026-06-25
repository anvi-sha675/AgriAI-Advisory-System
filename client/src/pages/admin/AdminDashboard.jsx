import {
  Users,
  MessageCircle,
  Activity,
  ScanSearch,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "../../components/feature/StatsCard";
import {
  adminUsers,
  adminRecentQueries,
  queryTrendData,
} from "../../utils/mockData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Badge from "../../components/ui/Badge";

const categoryColor = {
  Disease: "red",
  Fertilizer: "earth",
  Pest: "secondary",
  Weather: "accent",
};

export default function AdminDashboard() {
  const activeUsers = adminUsers.filter((u) => u.status === "active").length;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          icon={Users}
          label="Total Users"
          value={adminUsers.length * 64}
          change="+14%"
          trend="up"
          accent="primary"
        />
        <StatsCard
          icon={MessageCircle}
          label="Total Queries"
          value="1,248"
          change="+9%"
          trend="up"
          accent="secondary"
        />
        <StatsCard
          icon={Activity}
          label="Active Users"
          value={activeUsers * 58}
          change="+5%"
          trend="up"
          accent="accent"
        />
        <StatsCard
          icon={ScanSearch}
          label="Disease Reports"
          value="186"
          change="+11%"
          trend="up"
          accent="earth"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-1">
            Query Activity
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
            Platform-wide query volume this week
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={queryTrendData}>
              <defs>
                <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#166534" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#166534" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="day"
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
              <Area
                type="monotone"
                dataKey="queries"
                stroke="#166534"
                strokeWidth={2.5}
                fill="url(#colorAdmin)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100">
              Recent Queries
            </h3>
            <Link
              to="/admin/chats"
              className="text-xs font-medium text-primary-700 dark:text-secondary-400 flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {adminRecentQueries.map((q) => (
              <div
                key={q.id}
                className="border-b border-gray-50 dark:border-gray-800/60 pb-3 last:border-none last:pb-0"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-ink dark:text-gray-100">
                    {q.user}
                  </p>
                  <Badge
                    variant={categoryColor[q.category] || "gray"}
                    className="text-[10px]"
                  >
                    {q.category}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                  {q.query}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">{q.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
