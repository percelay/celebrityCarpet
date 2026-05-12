import { PageHero } from "@/components/page-hero";
import { ProjectsSection } from "@/components/projects-section";
import { getSiteAssets } from "@/lib/site-content";

export const metadata = { title: "Projects — Celebrity Carpet Installations" };

export default function ProjectsPage() {
  const { projects } = getSiteAssets();

  return (
    <>
      <PageHero
        eyebrow="Recent Work"
        title="Projects"
        description="Carpet installations, stair runs, theaters, residences, and custom fabrications. Click any photo to enlarge."
      />
      <ProjectsSection projects={projects} />
    </>
  );
}
