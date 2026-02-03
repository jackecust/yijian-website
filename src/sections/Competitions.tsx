import { useEffect, useRef, useState } from 'react';
import { Trophy, Medal, Star, Award, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const competitions = [
  {
    name: '全国青少年科技创新大赛',
    organizer: '中国科协青少年科技中心',
    level: '国家级',
    category: '科技创新',
    description: '国内最具影响力的青少年科技竞赛之一',
    benefits: ['综评加分', '升学优势', '创新能力证明'],
    icon: Trophy,
    color: '#f58220',
  },
  {
    name: '蓝桥杯全国软件大赛',
    organizer: '工信部人才交流中心',
    level: '国家级',
    category: '编程竞赛',
    description: '国内领先的IT学科赛事',
    benefits: ['编程能力认证', '企业认可', '综评加分'],
    icon: Medal,
    color: '#1e3c8b',
  },
  {
    name: 'WRC世界机器人大会',
    organizer: '中国电子学会',
    level: '国际级',
    category: '机器人',
    description: '世界级机器人竞技平台',
    benefits: ['国际视野', '技术认证', '综评加分'],
    icon: Star,
    color: '#10b981',
  },
  {
    name: '全球青少年人工智能算法挑战',
    organizer: '中国人工智能学会',
    level: '国际级',
    category: '人工智能',
    description: 'AI领域顶级青少年赛事',
    benefits: ['AI能力认证', '国际认可', '综评加分'],
    icon: Award,
    color: '#8b5cf6',
  },
  {
    name: '宋庆龄少年儿童发明奖',
    organizer: '中国宋庆龄基金会',
    level: '国家级',
    category: '发明创造',
    description: '培养创新精神和实践能力的权威赛事',
    benefits: ['创新能力证明', '综评加分', '荣誉认证'],
    icon: Trophy,
    color: '#ec4899',
  },
  {
    name: '中国电子学会编程等级考试',
    organizer: '中国电子学会',
    level: '国家级',
    category: '等级认证',
    description: '权威的编程能力等级认证',
    benefits: ['能力认证', '学习路径', '综评参考'],
    icon: Medal,
    color: '#06b6d4',
  },
];

const Competitions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="competitions"
      className="py-20 lg:py-28 bg-[#f8f9fa] relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#f58220]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#1e3c8b]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-[#1e3c8b]/10 px-4 py-2 rounded-full mb-4">
            <Trophy className="w-4 h-4 text-[#1e3c8b]" />
            <span className="text-[#1e3c8b] font-medium text-sm">综评赛事</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            创新大赛<span className="text-[#f58220]">直通车</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            直通高含金量科创赛事，助力综评背景提升，为升学加分
          </p>
        </div>

        {/* Competition Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((comp, index) => {
            const Icon = comp.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Hover Background */}
                <div 
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    background: `linear-gradient(135deg, ${comp.color}15 0%, ${comp.color}05 100%)` 
                  }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300"
                      style={{ backgroundColor: isHovered ? comp.color : `${comp.color}15` }}
                    >
                      <Icon 
                        className="w-7 h-7 transition-colors duration-300" 
                        style={{ color: isHovered ? 'white' : comp.color }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${comp.color}15`, color: comp.color }}
                      >
                        {comp.level}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#1e3c8b] transition-colors">
                    {comp.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{comp.organizer}</p>
                  <p className="text-gray-600 text-sm mb-4">{comp.description}</p>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {comp.benefits.map((benefit, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between group/btn hover:bg-[#1e3c8b] hover:text-white transition-all duration-300"
                  >
                    <span>了解详情</span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-[#1e3c8b] to-[#2d4fa7] rounded-3xl p-8 lg:p-12 text-white inline-block max-w-3xl w-full">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              不知道如何规划综评赛事？
            </h3>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              我们的专业团队将根据学生情况，量身定制综评赛事规划方案
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-[#f58220] hover:bg-[#e07418] text-white px-8 rounded-xl"
              >
                免费咨询
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 rounded-xl"
              >
                查看成功案例
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Competitions;
