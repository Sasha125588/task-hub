import { Suspense } from "react";

import { DashboardContent } from "@/components/pages/dashboard/DashboardContent";

export default function DashboardPage() {
  return (
    <Suspense fallback={<>Loading dashboard page</>}>
      <DashboardContent />
    </Suspense>
  );
}
