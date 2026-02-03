import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, ChevronRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/hero-bg.jpg" 
          alt="Tech Education"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3c8b]/90 via-[#1e3c8b]/70 to-transparent" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-20">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-[#f58220]" />
              <span className="text-white/90 text-sm font-medium">上海综评 · 科创教育领导者</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                <span className="block">以简驭繁</span>
                <span className="block text-[#f58220]">决胜综评</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-xl leading-relaxed">
                专注人工智能、软件编程、硬件创新，助力上海学子综合素质评价提升
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4">
              {['AI编程', '软件开发', '硬件创新', '综评指导'].map((item, index) => (
                <div 
                  key={item}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-2 h-2 bg-[#f58220] rounded-full" />
                  <span className="text-white font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-[#f58220] hover:bg-[#e07418] text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={() => scrollToSection('contact')}
              >
                <Phone className="w-5 h-5 mr-2" />
                立即咨询
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
                onClick={() => scrollToSection('courses')}
              >
                了解课程
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#f58220]" />
                <span className="font-medium">183-0198-0613</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#f58220]" />
                <span className="font-medium">微信: farawaywei</span>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className={`hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Main Stats Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '5+', label: '资深教师', desc: '平均10年教学经验' },
                    { number: '100+', label: '学员成果', desc: '综评成功案例' },
                    { number: '3', label: '核心方向', desc: 'AI/软件/硬件' },
                    { number: '10+', label: '合作赛事', desc: '高含金量比赛' },
                  ].map((stat, index) => (
                    <div 
                      key={index}
                      className="text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300"
                    >
                      <div className="text-3xl font-bold text-[#f58220] mb-1">{stat.number}</div>
                      <div className="text-white font-semibold mb-1">{stat.label}</div>
                      <div className="text-white/60 text-sm">{stat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#f58220]/10 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#f58220]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a1a1a]">专业团队</div>
                    <div className="text-sm text-gray-500">算法工程师 + 复旦博士</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
