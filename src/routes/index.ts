import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { ContactRoutes } from '../app/modules/contact/contact.route';
import { CategoryRoutes } from '../app/modules/category/category.route';
import { AboutRoutes } from '../app/modules/about/about.route';
import { FAQRoutes } from '../app/modules/faqs/faq.route';
import { HowItWorksRoutes } from '../app/modules/how-it-works/how-it-works.route';
import { ContactInfoRoutes } from '../app/modules/contact-info/contact-info.route';
import { ReviewRoutes } from '../app/modules/review/review.route';
import { GiftCardRoutes } from '../app/modules/giftcard/gift-card.route';
import { AnalysisRoutes } from '../app/modules/dashboard-analysis/analysis.route';
import { PaymentRoutes } from '../app/modules/payment/payment.route';
import { PrivacyPolicyRoutes } from '../app/modules/privacy-policy/pp.route';
import { TermsAndConditionsRoutes } from '../app/modules/terms-and-conditions/tc.route';
import { InviteRoutes } from '../app/modules/invite/invite.route';

const router = express.Router();

const apiRoutes = [
      {
            path: '/users',
            route: UserRoutes,
      },
      {
            path: '/auth',
            route: AuthRoutes,
      },
      {
            path: '/contacts',
            route: ContactRoutes,
      },
      {
            path: '/categories',
            route: CategoryRoutes,
      },
      {
            path: '/about',
            route: AboutRoutes,
      },
      {
            path: '/faqs',
            route: FAQRoutes,
      },
      {
            path: '/how-it-works',
            route: HowItWorksRoutes,
      },
      {
            path: '/contact-info',
            route: ContactInfoRoutes,
      },
      {
            path: '/reviews',
            route: ReviewRoutes,
      },

      {
            path: '/gift-cards',
            route: GiftCardRoutes,
      },
      {
            path: '/payments',
            route: PaymentRoutes,
      },
      {
            path: '/analysis',
            route: AnalysisRoutes,
      },
      {
            path: '/privacy-policy',
            route: PrivacyPolicyRoutes,
      },
      {
            path: '/terms-and-conditions',
            route: TermsAndConditionsRoutes,
      },
      {
            path: '/invites',
            route: InviteRoutes,
      },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
