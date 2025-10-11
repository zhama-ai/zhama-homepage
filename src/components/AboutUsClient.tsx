'use client';

import { useEffect, useRef } from 'react';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Card, CardContent } from './ui/Card';
import { Award, CheckCircle, Zap, Bot } from 'lucide-react';

interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  vision: {
    title: string;
    paragraphs: string[];
  };
  features: Array<{title: string, description: string}>;
  footer: {
    prefix: string;
    suffix: string;
  };
  typingPhrases: string[];
}

interface AboutUsClientProps {
  data: AboutData;
}

const getFeatureIcon = (index: number) => {
  const icons = [
    <Award key="icon-0" className="h-6 w-6" />,
    <CheckCircle key="icon-1" className="h-6 w-6" />,
    <Zap key="icon-2" className="h-6 w-6" />,
    <Bot key="icon-3" className="h-6 w-6" />,
  ];
  return icons[index];
};

export default function AboutUsClient({ data }: AboutUsClientProps) {
  const typingTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = typingTextRef.current;
    if (!element || data.typingPhrases.length === 0) return;

    element.textContent = "";
    let timeoutIds: NodeJS.Timeout[] = [];
    let currentIndex = 0;
    let isActive = true;

    const typeText = (text: string, callback?: () => void) => {
      if (!isActive || !element) return;
      element.textContent = "";
      let charIndex = 0;

      const typeChar = () => {
        if (!isActive || !element || charIndex >= text.length) {
          if (callback && isActive) {
            const timeoutId = setTimeout(callback, 2000);
            timeoutIds.push(timeoutId);
          }
          return;
        }
        element.textContent += text[charIndex];
        charIndex++;
        const timeoutId = setTimeout(typeChar, 100);
        timeoutIds.push(timeoutId);
      };
      typeChar();
    };

    const eraseText = (callback?: () => void) => {
      if (!isActive || !element) return;
      const currentText = element.textContent || "";
      let charIndex = currentText.length;

      const eraseChar = () => {
        if (!isActive || !element || charIndex <= 0) {
          if (callback && isActive) {
            const timeoutId = setTimeout(callback, 500);
            timeoutIds.push(timeoutId);
          }
          return;
        }
        element.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        const timeoutId = setTimeout(eraseChar, 50);
        timeoutIds.push(timeoutId);
      };
      eraseChar();
    };

    const runCycle = () => {
      if (!isActive) return;
      const currentPhrase = data.typingPhrases[currentIndex];
      typeText(currentPhrase, () => {
        eraseText(() => {
          currentIndex = (currentIndex + 1) % data.typingPhrases.length;
          if (isActive) {
            const timeoutId = setTimeout(runCycle, 300);
            timeoutIds.push(timeoutId);
          }
        });
      });
    };

    const initialTimeoutId = setTimeout(runCycle, 500);
    timeoutIds.push(initialTimeoutId);

    return () => {
      isActive = false;
      timeoutIds.forEach(clearTimeout);
      timeoutIds = [];
      if (element) {
        element.textContent = "";
      }
    };
  }, [data.typingPhrases]);

  return (
    <Section id="about" className="bg-white dark:bg-zinc-900 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -right-32 -top-32 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
      <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
      
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-primary-600 dark:text-primary-400 font-semibold text-base uppercase tracking-wider">
            {data.title}
          </h2>
          <p 
            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50" 
            dangerouslySetInnerHTML={{ __html: data.subtitle }}
          />
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Vision Card */}
        <Card className="p-8 lg:p-12 mb-16 animate-scale-in animate-delay-100">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 bg-primary-600/10 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              {data.vision.title}
            </h3>
            
            <div className="space-y-4">
              {data.vision.paragraphs.map((paragraph, index) => (
                <p 
                  key={index}
                  className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
            
            {/* Features Grid */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              {data.features.map((feature, index) => (
                <div
                  key={index}
                  className="card-hover group p-6"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-primary-600/10 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600/20 transition-all duration-300">
                      {getFeatureIcon(index)}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        {/* Typing Animation Footer */}
        <div className="text-center">
          <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
            <span className="text-primary-600 dark:text-primary-400 font-bold">
              {data.footer.prefix}
            </span>
            {data.footer.suffix}
            <br className="hidden sm:block" />
            <span ref={typingTextRef} className="inline-block min-h-[2rem] text-primary-600 dark:text-primary-400" />
          </p>
        </div>
      </Container>
    </Section>
  );
}
