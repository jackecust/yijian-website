import { useState } from 'react';
import { Phone, MessageCircle, MapPin, Mail, ChevronRight, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  // 从环境变量读取 API 地址，默认为本地开发地址
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    grade: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('请填写您的姓名');
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('请填写联系电话');
      return false;
    }
    // 简单的手机号验证
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      setErrorMessage('请填写正确的手机号码');
      return false;
    }
    if (!formData.grade.trim()) {
      setErrorMessage('请填写孩子年级');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // 增加超时时间和重试逻辑
    const fetchWithTimeout = async (
      url: string,
      options: RequestInit,
      timeout: number = 60000
    ): Promise<Response> => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    };

    // 重试函数
    const fetchWithRetry = async (url: string, options: RequestInit, maxRetries: number = 2) => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const response = await fetchWithTimeout(url, options, 60000); // 60秒超时
          return response;
        } catch (error) {
          console.warn(`提交失败，尝试 ${attempt}/${maxRetries}`, error);

          // 最后一次尝试失败才抛出错误
          if (attempt === maxRetries) {
            throw error;
          }

          // 等待 2 秒后重试
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
      throw new Error('Max retries exceeded');
    };

    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }, 2); // 最多重试 2 次

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', grade: '' });

        // 3秒后重置状态
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || '提交失败，请稍后重试');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('服务器启动中，请稍后重试（首次访问需要 1-2 分钟）');
      console.error('提交失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                立即开始您的<span className="text-[#f58220]">科创之旅</span>
              </h2>
              <p className="text-white/70 text-lg mb-8">
                专业团队为您量身定制学习计划，助力综评背景提升
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#f58220]/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#f58220]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">咨询电话</div>
                    <div className="text-lg font-semibold">183-0198-0613</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#f58220]/20 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-[#f58220]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">微信咨询</div>
                    <div className="text-lg font-semibold">farawaywei</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-6">预约免费试听</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="您的姓名"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#f58220]"
                    disabled={isSubmitting}
                  />
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="联系电话"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#f58220]"
                    disabled={isSubmitting}
                  />
                </div>
                <Input
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="孩子年级"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#f58220]"
                  disabled={isSubmitting}
                />

                {/* Error Message */}
                {errorMessage && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-lg">
                    <XCircle className="w-4 h-4" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 px-3 py-2 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    <span>提交成功！我们会尽快联系您</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full bg-[#f58220] hover:bg-[#e07418] text-white py-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      提交中...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      已提交
                    </>
                  ) : (
                    <>
                      立即预约
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1e3c8b] to-[#f58220] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">一</span>
              </div>
              <div>
                <div className="text-xl font-bold">一简科创</div>
                <div className="text-xs text-white/60">以简驭繁，决胜综评</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              专注上海地区综合素质评价，提供人工智能、软件编程、硬件创新等专业课程。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6">快速链接</h4>
            <ul className="space-y-3">
              {[
                { label: '首页', href: '#hero' },
                { label: '课程介绍', href: '#courses' },
                { label: '师资团队', href: '#teachers' },
                { label: '综评赛事', href: '#competitions' },
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-white/60 hover:text-[#f58220] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-bold mb-6">课程体系</h4>
            <ul className="space-y-3">
              {[
                'Python人工智能',
                'C++软件编程',
                'Arduino硬件',
                '物联网开发',
                '信奥竞赛辅导',
              ].map((course) => (
                <li key={course}>
                  <span className="text-white/60 text-sm">{course}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6">联系我们</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#f58220] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-white/60">电话</div>
                  <div className="text-white">183-0198-0613</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-[#f58220] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-white/60">微信</div>
                  <div className="text-white">farawaywei</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#f58220] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-white/60">邮箱</div>
                  <div className="text-white">contact@yijiankechuang.com</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#f58220] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-white/60">地址</div>
                  <div className="text-white">上海市（详情咨询）</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/40 text-sm">
              © 2024 一简科创. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                服务条款
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
