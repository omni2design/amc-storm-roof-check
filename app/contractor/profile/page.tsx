import { ContractorShell } from "@/components/product/contractor/ContractorShell";
import { ContractorProfileSummaryCard } from "@/components/product/contractor/ContractorProfileSummaryCard";
import { ContractorBusinessHoursCard } from "@/components/product/contractor/ContractorBusinessHoursCard";
import { ContractorSettingsList } from "@/components/product/contractor/ContractorSettingsList";
import {
  ProfilePageContent,
  ProfileSectionHeading,
} from "@/components/product/contractor/ProfilePageLayout";
import {
  MOCK_BUSINESS_HOURS,
  MOCK_PROFILE,
  MOCK_PROFILE_QUICK_ACTIONS,
} from "@/lib/contractor/mock-data";

/** 09.01 — Profile (829:8190) */
export default function ContractorProfilePage() {
  return (
    <ContractorShell
      title="Profile"
      activeNav="profile"
      showProfileSignOutCta
      className="bg-[#f9fafb]"
    >
      <ProfilePageContent>
        <ContractorProfileSummaryCard
          name={MOCK_PROFILE.name}
          roleLine={MOCK_PROFILE.roleLine}
          location={MOCK_PROFILE.location}
          stats={[...MOCK_PROFILE.stats]}
        />

        <ProfileSectionHeading>Business Hours</ProfileSectionHeading>
        <ContractorBusinessHoursCard days={MOCK_BUSINESS_HOURS} />

        <ProfileSectionHeading>Quick Actions</ProfileSectionHeading>
        <ContractorSettingsList items={MOCK_PROFILE_QUICK_ACTIONS} />
      </ProfilePageContent>
    </ContractorShell>
  );
}
