import { FeatureProvider } from "@/context/feature.context";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const weddingDesc = "Hành trình yêu thương của chúng mình sẽ bước sang một trang mới. Trân trọng kính mời bạn đến chứng kiến và chia sẻ khoảnh khắc hạnh phúc trong lễ cưới của Huy & Liên!";

export const metadata: Metadata = {
  metadataBase: new URL('https://huylien-wedding.vercel.app'),
  title: "Huy & Liên - Thiệp Cưới Online",
  description: weddingDesc,

  // Next.js sẽ tự động render thành <meta property="fb:app_id" content="..." />
  facebook: {
    appId: '100009134251421',
  },

  openGraph: {
    title: "Huy & Liên - Thiệp Cưới Online",
    description: weddingDesc,
    url: 'https://huylien-wedding.vercel.app',
    siteName: 'Huy & Liên Wedding',
    images: [
      {
        // Sử dụng đường dẫn tuyệt đối giúp Crawler của Facebook dễ tìm thấy ảnh hơn
        url: "https://huylien-wedding.vercel.app/wedding-invitation.jpg",
        width: 1200,
        height: 630,
        alt: "Huy & Liên Wedding Card",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huy & Liên - Thiệp Cưới Online",
    description: weddingDesc,
    images: ["https://huylien-wedding.vercel.app/wedding-invitation.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      {/* KHÔNG thêm thẻ <head> thủ công ở đây. 
        Next.js Metadata API sẽ tự chèn các thẻ meta lên đầu file HTML 
        để đảm bảo quy tắc "trước 1MB đầu tiên" của Facebook Crawler.
      */}
      <body>
        <FeatureProvider>
          {children}
        </FeatureProvider>
        <ToastContainer />
      </body>
    </html>
  );
}