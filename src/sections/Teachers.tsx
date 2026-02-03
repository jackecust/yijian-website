import { useEffect, useRef, useState } from 'react';
import { Award, GraduationCap, Briefcase, TrendingUp, Code } from 'lucide-react';

const teachers = [
  {
    name: '简老师',
    title: '算法工程师',
    image: '/teacher1.jpg',
    icon: Code,
    description: '资深算法工程师，多年一线开发经验',
    details: [
      '前阿里巴巴高级算法工程师',
      'ACM-ICPC亚洲区域赛银牌',
      '8年编程教学经验',
      '擅长算法与数据结构',
    ],
    color: '#1e3c8b',
  },
  {
    name: '李老师',
    title: '复旦博士',
    image: '/teacher2.jpg',
    icon: GraduationCap,
    description: '复旦大学计算机博士，学术研究深厚',
    details: [
      '复旦大学计算机科学博士',
      '发表SCI论文10余篇',
      '国家自然科学基金项目参与人',
      '专注人工智能教育研究',
    ],
    color: '#f58220',
  },
  {
    name: '于老师',
    title: 'AI研究专家',
    image: '/teacher3.jpg',
    icon: Award,
    description: '人工智能领域专家，前沿技术引领者',
    details: [
      '前百度AI研究院研究员',
      '深度学习领域专家',
      '多项AI专利发明人',
      'Kaggle竞赛金牌选手',
    ],
    color: '#10b981',
  },
  {
    name: '罗老师',
    title: '大厂工程师',
    image: '/teacher4.jpg',
    icon: Briefcase,
    description: '头部互联网企业资深工程师',
    details: [
      '前腾讯高级软件工程师',
      '全栈开发技术专家',
      '微服务架构设计者',
      '6年青少年编程教育经验',
    ],
    color: '#8b5cf6',
  },
  {
    name: '陈老师',
    title: '商业分析师',
    image: '/teacher5.jpg',
    icon: TrendingUp,
    description: '数据科学与商业分析专家',
    details: [
      '前麦肯锡数据分析师',
      '数据科学领域专家',
      '商业智能系统架构师',
      '擅长数据可视化教学',
    ],
    color: '#ec4899',
  },
];

const Teachers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTeacher, setActiveTeacher] = useState(0);

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
      id="teachers"
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#1e3c8b]/5 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#f58220]/5 to-transparent rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-[#f58220]/10 px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#f58220] rounded-full" />
            <span className="text-[#f58220] font-medium text-sm">师资团队</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            大咖团队<span className="text-[#1e3c8b]">智慧研发</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            来自国内外优秀学府的专家教授、博士和精英，智库专家保驾护航
          </p>
        </div>

        {/* Teachers Grid */}
        <div className={`grid lg:grid-cols-5 gap-6 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {teachers.map((teacher, index) => {
            const Icon = teacher.icon;
            return (
              <div
                key={index}
                onClick={() => setActiveTeacher(index)}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeTeacher === index ? 'lg:scale-105' : 'lg:scale-100 hover:lg:scale-102'
                }`}
              >
                <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
                  activeTeacher === index 
                    ? 'ring-4 ring-[#f58220] shadow-2xl' 
                    : 'shadow-card hover:shadow-card-hover'
                }`}>
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: teacher.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium opacity-80">{teacher.title}</span>
                    </div>
                    <h3 className="text-xl font-bold">{teacher.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Teacher Details */}
        <div className={`bg-gradient-to-r from-[#1e3c8b] to-[#2d4fa7] rounded-3xl p-8 lg:p-12 text-white transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: teachers[activeTeacher].color }}
                >
                  {(() => {
                    const Icon = teachers[activeTeacher].icon;
                    return <Icon className="w-8 h-8" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold">{teachers[activeTeacher].name}</h3>
                  <p className="text-white/80">{teachers[activeTeacher].title}</p>
                </div>
              </div>
              
              <p className="text-lg text-white/90 mb-8">
                {teachers[activeTeacher].description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {teachers[activeTeacher].details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-white/90 text-sm">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-white/20 flex items-center justify-center">
                    <div 
                      className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold"
                      style={{ backgroundColor: teachers[activeTeacher].color }}
                    >
                      {teachers[activeTeacher].name.charAt(0)}
                    </div>
                  </div>
                </div>
                {/* Orbiting Elements */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-8 h-8 bg-[#f58220] rounded-full" />
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-6 h-6 bg-white/50 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teachers;
