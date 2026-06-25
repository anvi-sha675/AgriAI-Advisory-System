import {
  AreaChart,
  Area,
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
import { TrendingUp, MessageCircle, Users, ScanSearch } from "lucide-react";
import StatsCard from "../components/feature/StatsCard";
import {
  queryCategoryData,
  userGrowthData,
  queryTrendData,
} from "../utils/mockData";

const COLORS = ["#166534", "#22C55E", "#0EA5E9", "#c99a4a", "#86efac"];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          icon={MessageCircle}
          label="Total Queries"
          value="1,248"
          change="+12%"
          trend="up"
          accent="primary"
        />
        <StatsCard
          icon={Users}
          label="Active Users"
          value="320"
          change="+8%"
          trend="up"
          accent="secondary"
        />
        <StatsCard
          icon={ScanSearch}
          label="Disease Reports"
          value="186"
          change="+15%"
          trend="up"
          accent="accent"
        />
        <StatsCard
          icon={TrendingUp}
          label="Avg. Response Time"
          value="2.4s"
          change="-6%"
          trend="up"
          accent="earth"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-1">
            Weekly Query Trend
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
            Queries received over the past 7 days
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={queryTrendData}>
              <defs>
                <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#colorQueries)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-1">
            Most Common Issues
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
            Query breakdown by category
          </p>
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
      </div>

      <div className="card p-6">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-1">
          User Growth
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Registered farmers over the past 6 months
        </p>
        <ResponsiveContainer width="100%" height={280}>
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
            <Bar dataKey="users" fill="#22C55E" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
