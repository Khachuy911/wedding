import { FeatureProvider } from "@/context/feature.context";
import { QueryProvider } from "@/context/query-provider";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const weddingDesc = "Hành trình yêu thương của chúng mình sẽ bước sang một trang mới. Trân trọng kính mời bạn đến chứng kiến và chia sẻ khoảnh khắc hạnh phúc trong lễ cưới của Huy & Liên!";
const weddingTitle = "Huy & Liên - Thiệp Cưới Online";
const weddingUrl = "https://huylien-wedding.vercel.app";
const weddingImage = `${weddingUrl}/wedding-invitation.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(weddingUrl),
  title: weddingTitle,
  description: weddingDesc,

  facebook: {
    appId: '100009134251421',
  },

  openGraph: {
    title: weddingTitle,
    description: weddingDesc,
    url: weddingUrl,
    siteName: 'Huy & Liên Wedding',
    images: [
      {
        url: weddingImage,
        width: 1280,
        height: 720,
        alt: weddingTitle,
      },
    ],
    type: "website",
    locale: "vi_VN",
  },

  twitter: {
    card: "summary_large_image", // Giúp ảnh hiển thị to tràn màn hình giống ảnh mẫu 1
    site: "@youtube", // Bạn có thể bỏ dòng này hoặc thay bằng id của bạn
    title: weddingTitle,
    description: weddingDesc,
    images: [weddingImage],
  },

  // Các thẻ bổ sung để tăng khả năng nhận diện giống trang mẫu
  other: {
    "twitter:url": weddingUrl,
    "og:image:secure_url": weddingImage,
    "og:image:type": "image/jpeg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      {/* Không chèn <head> thủ công để Next.js tự tối ưu thứ tự thẻ meta */}
      <body>
        <QueryProvider>
          <FeatureProvider>
            {children}
          </FeatureProvider>
        </QueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}