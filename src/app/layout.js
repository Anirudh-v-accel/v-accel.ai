import "./globals.css";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";

export const metadata = {
  title: "V-accel Ai Dynamics Pvt Ltd | V-Accel.ai",
  description:
    "V-Accel.ai is a product and service-based company specializing in AI, machine learning, and full-stack software development. We build future-ready applications across SaaS, AI, and enterprise innovation to solve real-world business problems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <TopBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
