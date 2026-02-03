import { useEffect, useRef, useState } from 'react';
import { Code, Cpu, Bot, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const courses = [
  {
    id: 'ai',
    icon: Bot,
    title: '人工智能',
    subtitle: 'Python AI',
    description: '从Python基础到人工智能应用，系统学习AI编程',
    color: '#1e3c8b',
    bgGradient: 'from-[#1e3c8b] to-[#2d4fa7]',
    levels: [
      { name: 'Python AI 1', age: '9-10岁', focus: '基础构建与编程入门' },
      { name: 'Python AI 2', age: '10-12岁', focus: '深化编程与AI基础' },
      { name: 'Python AI 3', age: '11-13岁', focus: 'AI深入与项目实践' },
      { name: 'Python AI 4', age: '12-14岁', focus: 'AI高阶与跨学科拓展' },
    ],
    features: ['Python语法基础', '数据结构算法', '机器学习入门', 'AI项目实战'],
  },
  {
    id: 'software',
    icon: Code,
    title: '软件编程',
    subtitle: 'C++ / Scratch',
    description: '信奥C++编程，为信息学竞赛打下坚实基础',
    color: '#f58220',
    bgGradient: 'from-[#f58220] to-[#ff9a3d]',
    levels: [
      { name: 'C++ 基础', age: '10-12岁', focus: '语法与基础算法' },
      { name: 'C++ 进阶', age: '11-13岁', focus: '数据结构进阶' },
      { name: '信奥冲刺', age: '12-15岁', focus: '竞赛算法强化' },
      { name: '竞赛实战', age: '13-16岁', focus: 'NOIP/CSP冲刺' },
    ],
    features: ['C++核心语法', '算法与数据结构', '信奥竞赛辅导', 'NOIP/CSP备考'],
  },
  {
    id: 'hardware',
    icon: Cpu,
    title: '硬件创新',
    subtitle: 'Arduino / 物联网',
    description: '软硬件结合，动手实践创造智能作品',
    color: '#10b981',
    bgGradient: 'from-[#10b981] to-[#34d399]',
    levels: [
      { name: '硬件入门', age: '9-11岁', focus: '电子基础与传感器' },
      { name: 'Arduino', age: '10-12岁', focus: '编程控制硬件' },
      { name: '物联网', age: '11-13岁', focus: '智能互联项目' },
      { name: '创新设计', age: '12-15岁', focus: '综合项目开发' },
    ],
    features: ['电子电路基础', '传感器应用', '物联网开发', '智能硬件设计'],
  },
];

const Courses = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCourse, setActiveCourse] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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

  const currentCourse = courses[activeCourse];
  const Icon = currentCourse.icon;

  return (
    <section 
      ref={sectionRef}
      id="courses"
      className="py-20 lg:py-28 bg-[#f8f9fa] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#1e3c8b]/20 rounded-full" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-[#f58220]/20 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-[#1e3c8b]/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-[#1e3c8b]/10 px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#1e3c8b] rounded-full" />
            <span className="text-[#1e3c8b] font-medium text-sm">课程体系</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            三大核心<span className="text-[#f58220]">课程方向</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            人工智能 · 软件编程 · 硬件创新，全方位培养科技素养
          </p>
        </div>

        {/* Course Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {courses.map((course, index) => {
            const TabIcon = course.icon;
            return (
              <button
                key={course.id}
                onClick={() => setActiveCourse(index)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeCourse === index
                    ? `bg-gradient-to-r ${course.bgGradient} text-white shadow-lg scale-105`
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-card'
                }`}
              >
                <TabIcon className="w-5 h-5" />
                <span>{course.title}</span>
              </button>
            );
          })}
        </div>

        {/* Course Content */}
        <div className={`bg-white rounded-3xl shadow-card overflow-hidden transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2">
            {/* Left - Image & Intro */}
            <div className={`p-8 lg:p-12 bg-gradient-to-br ${currentCourse.bgGradient} text-white`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold">{currentCourse.title}</h3>
                  <p className="text-white/80">{currentCourse.subtitle}</p>
                </div>
              </div>
              
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                {currentCourse.description}
              </p>

              <div className="space-y-3 mb-8">
                {currentCourse.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-white/80" />
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="bg-white text-[#1a1a1a] hover:bg-white/90 px-6 py-3 rounded-xl font-semibold group"
              >
                了解详情
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right - Levels */}
            <div className="p-8 lg:p-12">
              <h4 className="text-xl font-bold text-[#1a1a1a] mb-6">课程阶段</h4>
              <div className="space-y-4">
                {currentCourse.levels.map((level, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 group cursor-pointer"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                      style={{ backgroundColor: currentCourse.color }}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-bold text-[#1a1a1a] group-hover:text-[#1e3c8b] transition-colors">
                          {level.name}
                        </h5>
                        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                          {level.age}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{level.focus}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#1e3c8b] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
