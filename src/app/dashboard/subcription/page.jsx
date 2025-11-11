"use client";
import React, { useEffect, useState, useMemo } from "react";
import FilterBar from "./FilterBar";
import apiClient from "@/api/apiClient";
import DisplayPackage from "./DisplayPackage";

export default function Page() {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);

  const [filterPosition, setFilterPosition] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const fetchAllPackages = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient(`/student/exam/package/options/get`);
      setAllData(res.data || []);
      setData(res.data || []);
    } catch (err) {
      console.error("❌ fetchAllPackages error:", err);
      setAllData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPackages();
  }, []);

  // 🔄 Reset Class & Subject when Position changes
  useEffect(() => {
    setFilterClass("");
    setFilterSubject("");
  }, [filterPosition]);

  // 🔄 Reset Subject when Class changes
  useEffect(() => {
    setFilterSubject("");
  }, [filterClass]);

  /**
   * ✅ Filter result to show list
   */
  useEffect(() => {
    let filtered = [...allData];

    if (filterPosition)
      filtered = filtered.filter((d) => d.position === filterPosition);

    if (filterClass)
      filtered = filtered.filter((d) => d.className === filterClass);

    if (filterSubject)
      filtered = filtered.filter((d) => d.subject === filterSubject);

    setData(filtered);
  }, [filterPosition, filterClass, filterSubject, allData]);

  /**
   * ✅ Cascading Dropdown Logic (Available Options)
   */
  const filteredForDropdown = useMemo(() => {
    let temp = [...allData];

    console.log(temp);

    if (filterPosition)
      temp = temp.filter((d) => {
        console.log(d.position, filterPosition);
        return d.position?.toLowerCase() === filterPosition?.toLowerCase();
      });

    if (filterClass)
      temp = temp.filter(
        (d) => d.className?.toLowerCase() === filterClass?.toLowerCase()
      );

    return temp;
  }, [allData, filterPosition, filterClass]);

  const uniqueClasses = useMemo(() => {
    console.log({ filterPosition, filteredForDropdown });
    if (!filterPosition) return [];
    return [...new Set(filteredForDropdown.map((t) => t?.className))].filter(
      Boolean
    );
  }, [filteredForDropdown, filterPosition]);

  const uniqueSubjects = useMemo(() => {
    if (!filterPosition || !filterClass) return [];
    return [...new Set(filteredForDropdown.map((t) => t?.subject))].filter(
      Boolean
    );
  }, [filteredForDropdown, filterPosition, filterClass]);

  console.log(uniqueClasses);

  return (
    <div className="container mx-auto px-2">
      <FilterBar
        filterPosition={filterPosition}
        setFilterPosition={setFilterPosition}
        filterClass={filterClass}
        setFilterClass={setFilterClass}
        uniqueClasses={uniqueClasses}
        filterSubject={filterSubject}
        setFilterSubject={setFilterSubject}
        uniqueSubjects={uniqueSubjects}
      />

      <DisplayPackage
        filterPosition={filterPosition}
        filterClass={filterClass}
        filterSubject={filterSubject}
      />
    </div>
  );
}
