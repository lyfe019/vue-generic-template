// src/router/components/common.component.routes.js

// Import component showcase views for the common category
import ButtonsShowcase from '@/views/ui-components/common/ButtonsShowcase.vue'
import IconsShowcase from '@/views/ui-components/common/IconShowcase.vue'
import AvatarShowcase from '@/views/ui-components/common/AvatarShowcase.vue'
import AccordionShowcase from '@/views/ui-components/common/AccordionShowcase.vue'
import BadgeShowcase from '@/views/ui-components/common/BadgeShowcase.vue'
import LinkShowcase from '@/views/ui-components/common/LinkShowcase.vue' // NEW: Import LinkShowcase

const commonComponentRoutes = [
  {
    path: 'common/buttons',
    name: 'ComponentShowcaseButtons',
    component: ButtonsShowcase,
    meta: { requiresAuth: true, title: 'Buttons Showcase' },
  },
  {
    path: 'common/icons',
    name: 'ComponentShowcaseIcons',
    component: IconsShowcase,
    meta: { requiresAuth: true, title: 'Icons Showcase' },
  },
  {
    path: 'common/avatars',
    name: 'ComponentShowcaseAvatars',
    component: AvatarShowcase,
    meta: { requiresAuth: true, title: 'Avatars Showcase' },
  },
  {
    path: 'common/accordions',
    name: 'ComponentShowcaseAccordions',
    component: AccordionShowcase,
    meta: { requiresAuth: true, title: 'Accordions Showcase' },
  },
  {
    path: 'common/badges',
    name: 'ComponentShowcaseBadges',
    component: BadgeShowcase,
    meta: { requiresAuth: true, title: 'Badges Showcase' },
  },
  {
    path: 'common/links', // NEW: Route for Link Showcase
    name: 'ComponentShowcaseLinks',
    component: LinkShowcase,
    meta: { requiresAuth: true, title: 'Links Showcase' },
  },
  // Add other common component routes here
]

export default commonComponentRoutes
