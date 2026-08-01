export type CaseStudyImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type CaseStudyModule =
  | { type: 'intro'; title: string; description: string; info: Array<{ label: string; value: string }> }
  | { type: 'device'; image: string; alt: string }
  | { type: 'narrative'; label: 'Challenge' | 'Process' | 'Result'; text: string }
  | { type: 'image-grid'; rows: Array<{ columns: CaseStudyImage[] }> };

export type CaseStudy = {
  modules: CaseStudyModule[];
};

export type WorkItem = {
  id: string;
  title?: string;
  thumbnail: string; // public path to image, e.g. /work/thumb-1.png
  caseStudy?: CaseStudy;
};

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'project-1',
    title: 'Project 1',
    thumbnail: '/work/thumb-1.mp4',
    caseStudy: {
      modules: [
        {
          type: 'intro',
          title: 'Project 1 Overview',
          description: 'Project 1 explores a product experience focused on clarity, efficiency, and meaningful interaction design.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Digital Product' },
            { label: 'Timeline', value: 'Add project dates' },
          ],
        },
        { type: 'device', image: '/work/device.png', alt: 'Project 1 product preview' },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'Describe the user problem, the product context, and the opportunity this project set out to solve.',
        },
        {
          type: 'narrative',
          label: 'Process',
          text: 'Document the research, exploration, collaboration, and decisions that shaped the final direction.',
        },
        {
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/WellReport.png', alt: 'Project research artefact' },
                { src: '/work/test.png', alt: 'Project design artefact' },
              ],
            },
            {
              columns: [
                { src: '/work/thumb-2.png', alt: 'Project interface preview', width: 1280, height: 720 },
              ],
            },
          ],
        },
        {
          type: 'narrative',
          label: 'Result',
          text: 'Summarise the outcome, what shipped, and any results or learnings that matter to the story.',
        },
      ],
    },
  },
  {
    id: 'project-2',
    title: 'Appo',
    thumbnail: '/work/thumb-2.png',
    // Case studies are composed from modules, so every project can use a different order and set of sections.
    caseStudy: {
      modules: [
        {
          type: 'intro',
          title: 'Booking Platform',
          description: 'Appo is a beauty and wellness platform that simplifies appointment booking for clients and business management for service providers.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'App & Website' },
            { label: 'Timeline', value: 'Add project dates' },
          ],
        },
        { type: 'device', image: '/work/device.png', alt: 'Project 2 product preview' },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'Describe the user problem, the product context, and the opportunity this project set out to solve.',
        },
        {
          type: 'narrative',
          label: 'Process',
          text: 'Document the research, exploration, collaboration, and decisions that shaped the final direction.',
        },
        {
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/WellReport.png', alt: 'Project research artefact' },
                { src: '/work/test.png', alt: 'Project design artefact' },
              ],
            },
            {
              columns: [
                { src: '/work/thumb-2.png', alt: 'Project interface preview', width: 1280, height: 720 },
              ],
            },
          ],
        },
        {
          type: 'narrative',
          label: 'Result',
          text: 'Summarise the outcome, what shipped, and any results or learnings that matter to the story.',
        },
      ],
    },
  },
  {
    id: 'project-3',
    title: 'Project 3',
    thumbnail: '/work/thumb-3.mp4',
    caseStudy: {
      modules: [
        {
          type: 'intro',
          title: 'Project 3 Overview',
          description: 'Project 3 highlights a digital experience shaped around product storytelling, user clarity, and seamless interaction.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Website' },
            { label: 'Timeline', value: 'Add project dates' },
          ],
        },
        { type: 'device', image: '/work/device.png', alt: 'Project 3 product preview' },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'Describe the user problem, the product context, and the opportunity this project set out to solve.',
        },
        {
          type: 'narrative',
          label: 'Process',
          text: 'Document the research, exploration, collaboration, and decisions that shaped the final direction.',
        },
        {
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/WellReport.png', alt: 'Project research artefact' },
                { src: '/work/test.png', alt: 'Project design artefact' },
              ],
            },
            {
              columns: [
                { src: '/work/thumb-2.png', alt: 'Project interface preview', width: 1280, height: 720 },
              ],
            },
          ],
        },
        {
          type: 'narrative',
          label: 'Result',
          text: 'Summarise the outcome, what shipped, and any results or learnings that matter to the story.',
        },
      ],
    },
  },
  {
    id: 'project-4',
    title: 'Project 4',
    thumbnail: '/work/thumb-4.mp4',
    caseStudy: {
      modules: [
        {
          type: 'intro',
          title: 'Project 4 Overview',
          description: 'Project 4 presents a thoughtful interface system designed to support a broader product strategy and polished user journeys.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Product Experience' },
            { label: 'Timeline', value: 'Add project dates' },
          ],
        },
        { type: 'device', image: '/work/device.png', alt: 'Project 4 product preview' },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'Describe the user problem, the product context, and the opportunity this project set out to solve.',
        },
        {
          type: 'narrative',
          label: 'Process',
          text: 'Document the research, exploration, collaboration, and decisions that shaped the final direction.',
        },
        {
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/WellReport.png', alt: 'Project research artefact' },
                { src: '/work/test.png', alt: 'Project design artefact' },
              ],
            },
            {
              columns: [
                { src: '/work/thumb-2.png', alt: 'Project interface preview', width: 1280, height: 720 },
              ],
            },
          ],
        },
        {
          type: 'narrative',
          label: 'Result',
          text: 'Summarise the outcome, what shipped, and any results or learnings that matter to the story.',
        },
      ],
    },
  },
  {
    id: 'project-5',
    title: 'Project 5',
    thumbnail: '/work/thumb-5.png',
    caseStudy: {
      modules: [
        {
          type: 'intro',
          title: 'Project 5 Overview',
          description: 'Project 5 frames a product concept with a strong focus on user needs, visual clarity, and practical usability.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Mobile App' },
            { label: 'Timeline', value: 'Add project dates' },
          ],
        },
        { type: 'device', image: '/work/device.png', alt: 'Project 5 product preview' },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'Describe the user problem, the product context, and the opportunity this project set out to solve.',
        },
        {
          type: 'narrative',
          label: 'Process',
          text: 'Document the research, exploration, collaboration, and decisions that shaped the final direction.',
        },
        {
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/WellReport.png', alt: 'Project research artefact' },
                { src: '/work/test.png', alt: 'Project design artefact' },
              ],
            },
            {
              columns: [
                { src: '/work/thumb-2.png', alt: 'Project interface preview', width: 1280, height: 720 },
              ],
            },
          ],
        },
        {
          type: 'narrative',
          label: 'Result',
          text: 'Summarise the outcome, what shipped, and any results or learnings that matter to the story.',
        },
      ],
    },
  },
  {
    id: 'project-6',
    title: 'Project 6',
    thumbnail: '/work/thumb-6.png',
    caseStudy: {
      modules: [
        {
          type: 'intro',
          title: 'Project 6 Overview',
          description: 'Project 6 captures a design direction that blends storytelling, usability, and polished visual execution.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Brand Experience' },
            { label: 'Timeline', value: 'Add project dates' },
          ],
        },
        { type: 'device', image: '/work/device.png', alt: 'Project 6 product preview' },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'Describe the user problem, the product context, and the opportunity this project set out to solve.',
        },
        {
          type: 'narrative',
          label: 'Process',
          text: 'Document the research, exploration, collaboration, and decisions that shaped the final direction.',
        },
        {
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/WellReport.png', alt: 'Project research artefact' },
                { src: '/work/test.png', alt: 'Project design artefact' },
              ],
            },
            {
              columns: [
                { src: '/work/thumb-2.png', alt: 'Project interface preview', width: 1280, height: 720 },
              ],
            },
          ],
        },
        {
          type: 'narrative',
          label: 'Result',
          text: 'Summarise the outcome, what shipped, and any results or learnings that matter to the story.',
        },
      ],
    },
  },
];

export default WORK_ITEMS;
