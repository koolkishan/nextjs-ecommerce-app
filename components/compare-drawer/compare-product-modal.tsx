'use client';
import { useAppStore } from "@/store";

const CompareModal = () => {
  const { compareLimitExceeded } = useAppStore();
  console.log("🚀 ~ CompareModal ~ compareLimitExceeded:", compareLimitExceeded)
  return <div></div>;
};

export default CompareModal;
