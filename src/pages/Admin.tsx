import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@/context/AppContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Spinner } from "@/components/ui/spinner";

// Lazy load admin pages
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminProducts = lazy(() => import("@/pages/AdminProducts"));
const AdminOrders = lazy(() => import("@/pages/AdminOrders"));
const AdminQuotes = lazy(() => import("@/pages/AdminQuotes"));
const AdminSettings = lazy(() => import("@/pages/AdminSettings"));
const AdminTrackingMap = lazy(() => import("@/pages/AdminTrackingMap"));
const AdminVendorOrders = lazy(() => import("@/pages/AdminVendorOrders"));
const AdminVendors = lazy(() => import("@/pages/AdminVendors"));
const AdminDelivery = lazy(() => import("@/pages/AdminDelivery"));
const EarningsDashboard = lazy(() => import("@/pages/EarningsDashboard"));
const PrintJobs = lazy(() => import("@/pages/PrintJobs"));
const PrinterSetup = lazy(() => import("@/pages/PrinterSetup"));
const ProductQuality = lazy(() => import("@/pages/ProductQuality"));
const StockManagement = lazy(() => import("@/pages/StockManagement"));
const StoreManagement = lazy(() => import("@/pages/StoreManagement"));
const StoreOnboarding = lazy(() => import("@/pages/StoreOnboarding"));

function AdminFallback() {
  return (
    <div className="flex items-center justify-center h-96">
      <Spinner className="h-8 w-8" />
    </div>
  );
}

export default function Admin() {
  const { isAdmin } = useUser();

  if (!isAdmin) {
    return <Navigate to="/account" replace />;
  }

  return (
    <AdminLayout>
      <Suspense fallback={<AdminFallback />}>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="quotes" element={<AdminQuotes />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="tracking" element={<AdminTrackingMap />} />
          <Route path="vendors" element={<AdminVendors />} />
          <Route path="vendor-orders" element={<AdminVendorOrders />} />
          <Route path="delivery" element={<AdminDelivery />} />
          <Route path="earnings" element={<EarningsDashboard />} />
          <Route path="print" element={<PrintJobs />} />
          <Route path="printer-setup" element={<PrinterSetup />} />
          <Route path="quality" element={<ProductQuality />} />
          <Route path="stock" element={<StockManagement />} />
          <Route path="stores" element={<StoreManagement />} />
          <Route path="store-onboarding" element={<StoreOnboarding />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Suspense>
    </AdminLayout>
  );
}
