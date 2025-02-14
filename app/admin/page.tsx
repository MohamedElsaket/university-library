import Charts from "@/components/admin/home/Charts";
import CircleCharts from "@/components/admin/home/CircleCharts";

export default function page() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <Charts />
      </div>
      <div className="flex-1">
        <CircleCharts />
      </div>
    </div>
  );
}
