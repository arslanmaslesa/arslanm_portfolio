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
          description: 'Well BP is a digital consulting agency that helps businesses grow through web design, SEO, digital marketing, and strategic consulting, creating effective digital experiences that drive results.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Website' },
            { label: 'Duration', value: '6 weeks' },
          ],
        },
        { type: 'device', image: '/work/well/hero.png', alt: 'Project 1 product preview' },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'The existing website presented valuable services but lacked a clear structure, making it difficult for visitors to understand the agency\'s offerings and navigate the experience with confidence.',
        },
        { type: 'device', image: '/work/well/services.png', alt: 'Project 1 product preview' },
        {
          type: 'narrative',
          label: 'Process',
          text: 'I analyzed the existing website, researched competitors, mapped user flows, and redesigned the experience with a stronger information architecture, clearer messaging, and a modern visual system.',
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
          text: 'The redesign delivers a cleaner, more intuitive experience that highlights Well BP\'s services, improves navigation, and better communicates the agency\'s expertise and value.',
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
            { label: 'Duration', value: '8 months' },
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
          description: 'Kupi Poklon is a gift card platform that enables customers to purchase digital gift cards while providing businesses and shopping centers with custom gift card solutions.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Website' },
            { label: 'Duration', value: '4 weeks' },
          ],
        },
        { type: 'device', image: '/work/poklon/hero.png', alt: 'Project 3 product preview' },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'The existing website didn\'t clearly communicate the platform\'s offerings, making it difficult for users and business clients to quickly understand its value.',
        },
        {
          type: 'narrative',
          label: 'Process',
          text: 'I reviewed the existing experience, restructured the content, and redesigned the interface with clearer navigation, improved hierarchy, and a more modern visual identity.',
        },
        
        {
          type: 'narrative',
          label: 'Result',
          text: 'The redesign creates a cleaner, more engaging experience that better showcases Kupi Poklon\'s services and makes the platform easier to understand and explore.',
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
          description: 'Universe is an AI-powered concept designed to unify digital and physical services into one intelligent platform, simplifying complex workflows through a seamless, user-centered experience.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Product Experience' },
            { label: 'Duration', value: '4 weeks' },
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
          text: 'The goal was to transform a highly complex AI ecosystem into a clear, intuitive concept that stakeholders could easily understand, evaluate, and envision.',
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
          text: 'I explored user journeys, organized complex features into a logical structure, and designed a simple, cohesive interface that clearly communicated the product vision.',
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
          text: 'The final concept successfully translated a sophisticated AI system into an accessible product experience, making it easier for stakeholders to understand its value and future potential.',
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
          description: 'PitaBoom is a luxury restaurant website designed to showcase the brand through a refined digital experience that reflects its premium identity and menu.',
          info: [
            { label: 'Role', value: 'Product Designer' },
            { label: 'Project Type', value: 'Website' },
            { label: 'Duration', value: '4 weeks' },
          ],
        },
        { type: 'device', image: '/work/pita/hero.png', alt: 'Project 5 product preview' },
        {
          type: 'narrative',
          label: 'Challenge',
          text: 'The goal was to create a modern website that balanced elegant visuals with intuitive navigation while reinforcing the restaurant\'s premium brand.',
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
          text: 'I designed a clean, sophisticated interface with strong visual hierarchy, refined typography, and an experience focused on showcasing the restaurant and its offerings.',
        },
        
        {
          type: 'narrative',
          label: 'Result',
          text: 'The final design delivers a premium online experience that strengthens the brand identity, improves usability, and encourages visitors to explore the menu and restaurant.',
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
            { label: 'Project Type', value: 'Website' },
            { label: 'Duration', value: '2 weeks' },
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
