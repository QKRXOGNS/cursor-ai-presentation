'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Settings, MessageSquare, Zap, Shield, Brain, Code, Globe, Maximize, Minimize } from 'lucide-react';
import Image from 'next/image';

interface SlideFeature {
  name: string;
  description: string;
  icon: any;
  details: string;
}

interface SlideAdvanced {
  title: string;
  description: string;
  icon: any;
  points: string[];
}

interface SlideStep {
  title: string;
  description: string;
  icon: any;
}

interface SlideContent {
  description?: string;
  features?: string[];
  steps?: SlideStep[];
  featuresList?: SlideFeature[];
  advanced?: SlideAdvanced[];
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  type: "title" | "installation" | "features" | "advanced";
  content: SlideContent;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Cursor AI",
    subtitle: "AI 기반 코드 에디터 설치 가이드",
    type: "title",
    content: {
      description: "VS Code를 기반으로 한 차세대 AI 코드 에디터",
      features: ["AI 자동완성", "스마트 채팅", "코드 리팩토링", "실시간 협업"]
    }
  },
  {
    id: 2,
    title: "기본 소개",
    subtitle: "Cursor AI 설치 및 초기 설정",
    type: "installation",
    content: {
      steps: [
        { title: "다운로드", description: "공식 웹사이트에서 설치 파일 다운로드", icon: Download },
        { title: "설치", description: "설치 마법사를 따라 간단한 설치 진행", icon: Settings },
        { title: "언어 설정", description: "한국어 인터페이스 설정", icon: Globe },
        { title: "VS Code 기반", description: "친숙한 VS Code 인터페이스 제공", icon: Code }
      ]
    }
  },
  {
    id: 3,
    title: "핵심 기능",
    subtitle: "AI 기능 사용법 및 주요 기능들",
    type: "features",
    content: {
      featuresList: [
        { 
          name: "AI Chat", 
          description: "자연어로 코드 질문 및 수정 요청",
          icon: MessageSquare,
          details: "Cmd/Ctrl + L로 채팅 창 열기"
        },
        { 
          name: "Tab 자동완성", 
          description: "AI가 예측하는 코드 자동완성",
          icon: Zap,
          details: "Tab 키로 AI 제안 코드 적용"
        },
        { 
          name: "설정 가이드", 
          description: "모델 선택, 인덱싱, 룰 설정",
          icon: Settings,
          details: "프로젝트별 커스터마이징 가능"
        }
      ]
    }
  },
  {
    id: 4,
    title: "고급 기능",
    subtitle: "보안 설정 및 고급 사용법",
    type: "advanced",
    content: {
      advanced: [
        { 
          title: "보안 설정", 
          description: "코드 프라이버시 및 데이터 보호 설정",
          icon: Shield,
          points: ["로컬 모델 사용", "민감 정보 필터링", "기업용 보안 옵션"]
        },
        { 
          title: "AI 모델 관리", 
          description: "다양한 AI 모델 선택 및 최적화",
          icon: Brain,
          points: ["GPT-4", "Claude", "로컬 모델", "커스텀 모델"]
        }
      ]
    }
  }
];



export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isInstallationSlide = () => slides[currentSlide]?.type === 'installation';
  const hasSubSteps = () => isInstallationSlide() && slides[currentSlide]?.content?.steps;
  const maxSubSteps = () => hasSubSteps() ? slides[currentSlide].content.steps!.length : 0;

  // 전체 화면 모드 토글
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // 전체 화면 상태 감지
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // 키보드 단축키 (F11, ESC)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
      } else if (event.key === 'Escape' && isFullscreen) {
        // ESC는 브라우저에서 자동으로 전체 화면을 종료함
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const nextSlide = () => {
    if (hasSubSteps() && currentSubStep < maxSubSteps() - 1) {
      // 설치 페이지에서 서브 스텝 이동
      setCurrentSubStep(currentSubStep + 1);
    } else if (currentSlide < slides.length - 1) {
      // 다음 페이지로 이동
      setCurrentSlide(currentSlide + 1);
      setCurrentSubStep(0);
    }
  };

  const prevSlide = () => {
    if (hasSubSteps() && currentSubStep > 0) {
      // 설치 페이지에서 이전 서브 스텝으로 이동
      setCurrentSubStep(currentSubStep - 1);
    } else if (currentSlide > 0) {
      // 이전 페이지로 이동
      setCurrentSlide(currentSlide - 1);
      const prevSlideSteps = slides[currentSlide - 1]?.type === 'installation' ? slides[currentSlide - 1].content.steps?.length || 0 : 0;
      setCurrentSubStep(prevSlideSteps > 0 ? prevSlideSteps - 1 : 0);
    }
  };

  const renderSlideContent = (slide: Slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-2xl text-gray-300">{slide.subtitle}</p>
              <p className="text-lg text-gray-400">{slide.content.description}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-2 gap-6 max-w-2xl mx-auto"
            >
              {slide.content.features?.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                >
                  <p className="text-gray-300">{feature}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        );

      case 'installation':
        const currentStep = slide.content.steps?.[currentSubStep];
        const IconComponent = currentStep?.icon;
        
        // 각 스텝별 GIF 파일명 매핑
        const getStepGif = (stepIndex: number) => {
          const gifs = [
            "/Timeline 1.gif", // 다운로드
            "/Timeline 1.gif", // 설치 (나중에 실제 GIF로 교체)
            "/Timeline 2.gif", // 언어 설정
            "/3.gif"  // VS Code 기반 - VS Code 기반 인터페이스를 보여주는 GIF
          ];
          return gifs[stepIndex] || "/Timeline 1.gif";
        };

        return (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
              <p className="text-xl text-gray-300">
                {currentStep?.title} ({currentSubStep + 1}/{slide.content.steps?.length})
              </p>
            </motion.div>
            
            {/* Current Step GIF */}
            <motion.div
              key={currentSubStep}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto max-w-7xl bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-700"
            >
              <div className="flex justify-center items-center">
                <Image
                  src={getStepGif(currentSubStep)}
                  alt={`${currentStep?.title} 가이드`}
                  width={960}
                  height={640}
                  className="object-contain max-w-full h-auto"
                  priority
                />
              </div>
            </motion.div>

            {/* Current Step Info */}
            <motion.div
              key={`info-${currentSubStep}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gradient-to-br from-blue-800/40 to-blue-900/40 rounded-lg p-6 border border-blue-500/30 max-w-7xl mx-auto"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-blue-500/30 p-3 rounded-lg">
                  {IconComponent && <IconComponent className="w-8 h-8 text-blue-300" />}
                </div>
                <h3 className="text-2xl font-semibold text-white">{currentStep?.title}</h3>
              </div>
              <p className="text-gray-300 text-lg">{currentStep?.description}</p>
            </motion.div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {slide.content.steps?.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSubStep ? 'bg-blue-400' : 
                    index < currentSubStep ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold text-center mb-12"
            >
              {slide.title}
            </motion.h2>
            
            <div className="space-y-6">
              {slide.content.featuresList?.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3, duration: 0.8 }}
                    className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-xl p-8 border border-gray-700 hover:border-purple-500/50 transition-colors"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="bg-purple-500/20 p-4 rounded-xl">
                        <IconComponent className="w-8 h-8 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-white mb-2">{feature.name}</h3>
                        <p className="text-gray-300 text-lg mb-2">{feature.description}</p>
                        <p className="text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full inline-block">
                          {feature.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold text-center mb-12"
            >
              {slide.title}
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {slide.content.advanced?.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 50, rotateY: 45 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ delay: index * 0.3, duration: 0.8 }}
                    className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-xl p-8 border border-green-500/30 hover:border-green-400/60 transition-all transform hover:scale-105"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="bg-green-500/20 p-4 rounded-xl">
                        <IconComponent className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="text-gray-300 text-lg mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.points.map((point, pointIndex) => (
                        <motion.li
                          key={point}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.3 + pointIndex * 0.1 + 0.5 }}
                          className="text-gray-400 flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Cursor AI 가이드</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              {currentSlide + 1} / {slides.length}
              {hasSubSteps() && ` (${currentSubStep + 1}/${maxSubSteps()})`}
            </span>
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setCurrentSubStep(0);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              title={isFullscreen ? "전체 화면 종료 (ESC)" : "전체 화면 (F11)"}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="min-h-[80vh] flex items-center justify-center"
            >
              {renderSlideContent(slides[currentSlide])}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-700">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0 && currentSubStep === 0}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1 && (!hasSubSteps() || currentSubStep === maxSubSteps() - 1)}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
