export default function StatsCard({ label, value, subtitle, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50 hover:shadow-sahara-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-sahara-800 font-medium mb-1">{label}</p>
          <h3 className="font-heading text-3xl font-semibold text-sahara-950">{value}</h3>
          {subtitle && (
            <p className="text-xs text-sahara-800 mt-1.5">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-sienna-600/10 flex items-center justify-center text-sienna-600">
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
