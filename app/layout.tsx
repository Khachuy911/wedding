import { FeatureProvider } from "@/context/feature.context"
import type { Metadata } from "next"
import { ToastContainer } from "react-toastify"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://your-wedding.vercel.app'),
  title: "Thiệp cưới online",
  description: "Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi",
  openGraph: {
    title: "Thiệp cưới online",
    description: "Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi",
    images: [
      {
        url: "/layout/couple.png",
        width: 1200,
        height: 630,
        alt: "Ảnh cưới",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiệp cưới online",
    description: "Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi",
    images: ["/layout/couple.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <FeatureProvider>
          {children}
        </FeatureProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
