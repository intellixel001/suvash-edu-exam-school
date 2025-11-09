import React from "react";
import { FaFilter } from "react-icons/fa";

export default function FilterBar({
  filterPosition,
  setFilterPosition,
  filterClass,
  setFilterClass,
  uniqueClasses,
  filterSubject,
  setFilterSubject,
  uniqueSubjects,
}) {
  return (
    <div className="p-4 rounded-xl shadow-md mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Position Filter */}
        <select
          value={filterPosition}
          onChange={(e) => setFilterPosition(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 text-xs md:text-sm rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Package</option>
          <option value="academic">Academic</option>
          <option value="admission">Admission</option>
          <option value="job">Job</option>
        </select>

        {/* Class Filter */}
        {uniqueClasses?.length > 0 && (
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 text-xs md:text-sm rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Classes</option>
            {uniqueClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        )}

        {uniqueSubjects?.length > 0 && (
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 text-xs md:text-sm rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Subjects</option>
            {uniqueSubjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
