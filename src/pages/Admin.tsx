import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@/context/AppContext";
import AdminLayout from "@/admin/components/AdminLayout";
import { Spinner } from "@/components/ui/spinner";

// Lazy load admin pages
const AdminDashboard = lazy(() => import("@/admin/pages/AdminDashboard"));
const AdminProducts = lazy(() => import("@/admin/pages/AdminProducts"));
const AdminOrders = lazy(() => import("@/admin/pages/AdminOrders"));
const AdminQuotes = lazy(() => import("@/admin/pages/AdminQuotes"));
const AdminSettings = lazy(() => import("@/admin/pages/AdminSettings"));
const AdminTrackingMap = lazy(() => import("@/admin/pages/AdminTrackingMap"));
const AdminVendorOrders = lazy(() => import("@/admin/pages/AdminVendorOrders"));
const AdminVendors = lazy(() => import("@/admin/pages/AdminVendors"));
const AdminDelivery = lazy(() => import("@/admin/pages/AdminDelivery"));
const EarningsDashboard = lazy(() => import("@/admin/pages/EarningsDashboard"));
const PrintJobs = lazy(() => import("@/admin/pages/PrintJobs"));
const PrinterSetup = lazy(() => import("@/admin/pages/PrinterSetup"));
const ProductQuality = lazy(() => import("@/admin/pages/ProductQuality"));
const StockManagement = lazy(() => import("@/admin/pages/StockManagement"));
const StoreManagement = lazy(() => import("@/admin/pages/StoreManagement"));
const StoreOnboarding = lazy(() => import("@/admin/pages/StoreOnboarding"));

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
