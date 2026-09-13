// @sakinah/ui — barrel export
// All shared UI components and utility functions for MySakinahPro apps

// UI Components
export { AudioPlayer } from "./components/audio-player";
export { AutoScrollManager } from "./components/auto-scroll-manager";
export { BenefitCard } from "./components/benefit-card";
export { FormField } from "./components/form-field";
export { HotlineCard } from "./components/hotline-card";
export { OrnamentalDivider } from "./components/ornamental-divider";
export { ParticleComponent } from "./components/particle-component";
export { ResponsiveContainer } from "./components/responsive-container";
export { ScrollToTop } from "./components/scroll-to-top";
export { SectionHeading } from "./components/section-heading";
export { TimelineStep } from "./components/timeline-step";

// Lib utilities (re-exported so apps import from one place)
export { cn, scrollToSection } from "./lib/utils";
export { saveSubmissionToDatabase, type SubmissionPayload, type SaveSubmissionResult } from "./lib/submission";
export * from "./lib/motion";
