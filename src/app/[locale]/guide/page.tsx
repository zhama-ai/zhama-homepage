import { redirect } from 'next/navigation';
import { docsUrl } from '@/lib/external-links';

// The product manual lives in the documentation center.
export default function GuidePage() {
  redirect(docsUrl('manual'));
}
