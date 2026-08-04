import { generateMetadata as genMeta } from '@/lib/seo';
import BookingFlow from './BookingFlow';

export const metadata = genMeta({
  title: 'Book a Service — Schedule Your Garage Door Appointment',
  description: 'Book your garage door repair, installation, or maintenance appointment online. Fast emergency response in the Piedmont Triad.',
  path: '/book',
});

export default function BookPage() {
  return <BookingFlow />;
}
