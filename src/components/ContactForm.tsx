'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from './ui/Card';
import { cn } from '@/lib/utils';

interface ContactFormData {
  title: string;
  email: string;
  phone: string;
  content: string;
}

export default function ContactForm() {
  const t = useTranslations('contactPage');
  const [formData, setFormData] = useState<ContactFormData>({
    title: '',
    email: '',
    phone: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'direct'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          title: '',
          email: '',
          phone: '',
          content: ''
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                {t('successMessage')}
              </p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 dark:text-red-300 font-medium">
                {errorMessage || t('errorMessage')}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
              {t('form.title.label')} *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder={t('form.title.placeholder')}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
              {t('form.email.label')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t('form.email.placeholder')}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
              {t('form.phone.label')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('form.phone.placeholder')}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
              {t('form.content.label')} *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={6}
              placeholder={t('form.content.placeholder')}
              className="input resize-vertical"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'w-full btn btn-primary py-4 text-lg font-semibold',
              'disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
            )}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('form.submitting')}
              </>
            ) : (
              t('form.submit')
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                {t('info.email.title')}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                contact@zhama.com
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                {t('info.response.title')}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {t('info.response.time')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
