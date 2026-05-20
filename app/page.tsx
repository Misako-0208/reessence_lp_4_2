import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PainPointsSection } from "@/components/pain-points-section"
import { ValuePropositionSection } from "@/components/value-proposition-section"
import { GuideSection } from "@/components/guide-section"
import { StepsSection } from "@/components/steps-section"
import { BrandStorySection } from "@/components/brand-story-section"
import { FaqSection } from "@/components/faq-section"
import { VideoSection } from "@/components/video-section"
import { PricingSection } from "@/components/pricing-section"
import { MonitorSection } from "@/components/monitor-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <Header />
      <main>
        {/* 1. ファーストビュー */}
        <HeroSection />

        {/* 2. リスク喚起 */}
        <PainPointsSection />

        {/* 3. 価値の提案 */}
        <ValuePropositionSection />

        {/* 4. 使い方動画 */}
        <VideoSection />

        {/* 5. 導き手（権威性） */}
        <GuideSection />

        {/* 6. 計画（利用ステップ） */}
        <StepsSection />

        {/* 7. 説明（ブランドストーリー） */}
        <BrandStorySection />

        {/* 8. FAQ */}
        <FaqSection />

        {/* 9. 価格 */}
        <PricingSection />

        {/* 10. PDFプレゼント（PMS対策ガイド） */}
        <MonitorSection />
      </main>

      {/* 10. フッター */}
      <Footer />
    </>
  )
}
