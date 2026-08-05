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

import type { GridItem } from '../lib/gridItemTypes';

export type WorkItem = GridItem & {
  caseStudy?: CaseStudy;
};

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'project-1',
    title: 'Well BP',
    gridThumbnail: '/work/thumb-1.mp4',
    iconThumbnail: '/work/thumb-1.mp4',
    caseStudy: {
      modules: [
        {
          type: 'intro',
          title: 'Digital Agency Website',
          description: 'Project 1 explores a product experience focused on clarity, efficiency, and meaningful interaction design.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Digital Product' },
            { label: 'Timeline', value: 'Add project dates' },
          ],
        },
        { type: 'device', image: '/work/well/hero.png', alt: 'Project 1 product preview' },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'Describe the user problem, the product context, and the opportunity this project set out to solve.',
        },
        { type: 'device', image: '/work/well/services.png', alt: 'Project 1 product preview' },
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
          ],
        },
        {
          type: 'narrative',
          label: 'Result',
          text: 'Summarise the outcome, what shipped, and any results or learnings that matter to the story.',
        },
        { type: 'device', image: '/work/well/work.png', alt: 'Project 1 product preview' },
        { type: 'device', image: '/work/well/testimonial.png', alt: 'Project 1 product preview' },
        { type: 'device', image: '/work/well/foot.png', alt: 'Project 1 product preview' },
      ],
    },
  },
  {
    id: 'project-2',
    title: 'Appo',
    gridThumbnail: '/work/thumb-2.png',
    iconThumbnail: '/work/thumb-2.png',
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
        { 
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/appo/salon.png', alt: 'Project research artefact' },
                { src: '/work/appo/appoicon.png', alt: 'Project design artefact' },
              ],
            },
          ],
        },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'Many beauty and wellness businesses still rely on manual booking methods, creating friction for both clients and staff. Appo was designed to simplify booking and business management in one platform.',
        },
        { type: 'device', image: '/work/appo/appoweb.png', alt: 'Project 1 product preview' },
        {
          type: 'narrative',
          label: 'Process',
          text: 'Through research, wireframing, prototyping, and iteration, the experience was refined into a simple and scalable solution for both clients and businesses.',
        },
        {
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/appo/wire.png', alt: 'Project research artefact' },
              ],
            },
            
          ],
        },
        {
          type: 'narrative',
          label: 'Result',
          text: 'Appo delivers a seamless booking experience for clients and an intuitive management platform for businesses to handle appointments, staff, and daily operations.',
        },
        {
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/appo/appo1.png', alt: 'Project research artefact' },               
              ],
            },
            {
              columns: [
                { src: '/work/appo/biz.png', alt: 'Project research artefact' },
              ],
            },
            {
              columns: [
                { src: '/work/appo/socials.png', alt: 'Project research artefact' },
              ],
            },
            {
              columns: [
                { src: '/work/appo/booking.png', alt: 'Project research artefact' },
              ],
            },
            {
              columns: [
                { src: '/work/appo/bill.png', alt: 'Project research artefact' },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'project-3',
    title: 'Kupi Poklon',
    gridThumbnail: '/work/thumb-3.mp4',
    iconThumbnail: '/work/thumb-3.mp4',
    caseStudy: {
      modules: [
        {
          type: 'intro',
          title: 'Gift Card Platform',
          description: 'Project 3 highlights a digital experience shaped around product storytelling, user clarity, and seamless interaction.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Website' },
            { label: 'Timeline', value: 'Add project dates' },
          ],
        },
        { type: 'device', image: '/work/poklon/hero.png', alt: 'Project 3 product preview' },
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
          type: 'narrative',
          label: 'Result',
          text: 'Summarise the outcome, what shipped, and any results or learnings that matter to the story.',
        },
        { type: 'device', image: '/work/poklon/services.png', alt: 'Project 3 product preview' },
        { type: 'device', image: '/work/poklon/steps.png', alt: 'Project 3 product preview' },
        { type: 'device', image: '/work/poklon/category.png', alt: 'Project 3 product preview' },
        { type: 'device', image: '/work/poklon/types.png', alt: 'Project 3 product preview' },
      ],
    },
  },
  {
    id: 'project-4',
    title: 'Universe',
    gridThumbnail: '/work/thumb-4.mp4',
    iconThumbnail: '/work/thumb-4.mp4',
    caseStudy: {
      modules: [
        {
          type: 'intro',
          title: 'AI System Design',
          description: 'Project 4 presents a thoughtful interface system designed to support a broader product strategy and polished user journeys.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Product Experience' },
            { label: 'Timeline', value: 'Add project dates' },
          ],
        },
        { 
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/universe/three.png', alt: 'Project research artefact' },
                { src: '/work/universe/app.png', alt: 'Project design artefact' },
              ],
            },
          ],
        },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'Describe the user problem, the product context, and the opportunity this project set out to solve.',
        },
        {
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/universe/notif.png', alt: 'Project research artefact' },
              ],
            },
          ],
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
                { src: '/work/universe/flow.png', alt: 'Project research artefact' },
              ],
            },
          ],
        },
        {
          type: 'narrative',
          label: 'Result',
          text: 'Summarise the outcome, what shipped, and any results or learnings that matter to the story.',
        },
        {
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/universe/universe_two.png', alt: 'Project research artefact' },
              ],
            },
            {
              columns: [
                { src: '/work/universe/three.png', alt: 'Project research artefact' },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'project-5',
    title: 'Pitaboom',
    gridThumbnail: '/work/thumb-5.png',
    iconThumbnail: '/work/thumb-5.png',
    caseStudy: {
      modules: [
        {
          type: 'intro',
          title: 'Luxury Restaurant',
          description: 'Project 5 frames a product concept with a strong focus on user needs, visual clarity, and practical usability.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Mobile App' },
            { label: 'Timeline', value: 'Add project dates' },
          ],
        },
        { type: 'device', image: '/work/pita/hero.png', alt: 'Project 5 product preview' },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'Describe the user problem, the product context, and the opportunity this project set out to solve.',
        },
        {
          type: 'image-grid',
          rows: [
            {
              columns: [
                { src: '/work/pita/figma.png', alt: 'Project research artefact' },
              ],
            },
          ],
        },
        {
          type: 'narrative',
          label: 'Process',
          text: 'Document the research, exploration, collaboration, and decisions that shaped the final direction.',
        },
        
        {
          type: 'narrative',
          label: 'Result',
          text: 'Summarise the outcome, what shipped, and any results or learnings that matter to the story.',
        },
        { type: 'device', image: '/work/pita/description.png', alt: 'Project 5 product preview' },
        { type: 'device', image: '/work/pita/menu.png', alt: 'Project 5 product preview' },
        { type: 'device', image: '/work/pita/story.png', alt: 'Project 5 product preview' },
        { type: 'device', image: '/work/pita/faq.png', alt: 'Project 5 product preview' },
      ],
    },
  },
  {
    id: 'project-6',
    title: 'SaMed',
    gridThumbnail: '/work/thumb-6.png',
    iconThumbnail: '/work/thumb-6.png',
    interaction: 'locked',
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
