import { useEffect, useRef, useState } from 'react';
import { Users, BookOpen, Cpu, Lightbulb, Bot, Trophy } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: '大咖团队',
    subtitle: '智慧研发',
    description: '算法工程师、复旦博士、AI研究专家组成的顶级师资团队',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: BookOpen,
    title: '科学课程',
    subtitle: '系统学习',
    description: 'Python、C++、人工智能，循序渐进的完整课程体系',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Cpu,
    title: '软硬结合',
    subtitle: '项目制教学',
    description: '软硬件结合实战，早早驾驭人工智能核心技术',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Lightbulb,
    title: '跨学科',
    subtitle: '多元发展',
    description: '融合多学科知识，培养综合创新能力',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Bot,
    title: 'AIGC融入',
    subtitle: 'AI学习助手',
    description: '提前配备人工智能学习助手，领先一步掌握未来技能',
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    icon: Trophy,
    title: '大赛直通车',
    subtitle: '背景提升',
    description: '直通高含金量科创赛事，助力综评背景提升',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    const cards = sectionRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="features"
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1e3c8b]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f58220]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#f58220]/10 px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#f58220] rounded-full" />
            <span className="text-[#f58220] font-medium text-sm">核心优势</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            为什么选择<span className="text-[#1e3c8b]">一简科创</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            专业师资 · 科学课程 · 软硬结合 · 大赛直通车
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.includes(index);
            
            return (
              <div
                key={index}
                data-index={index}
                className={`feature-card group relative bg-white rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100 hover:border-transparent hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-500`}>
                    <Icon className="w-7 h-7 text-[#1e3c8b] group-hover:text-white transition-colors duration-500" />
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-[#1a1a1a] group-hover:text-white transition-colors duration-500 mb-1">
                      {feature.title}
                    </h3>
                    <span className="text-sm font-medium text-[#f58220] group-hover:text-white/80 transition-colors duration-500">
                      {feature.subtitle}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#f58220]/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
