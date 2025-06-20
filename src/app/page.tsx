'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Settings, MessageSquare, Zap, Shield, Brain, Code, Globe, Maximize, Minimize, LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface SlideFeature {
  name: string;
  description: string;
  icon: LucideIcon;
  details: string;
  subSteps?: { title: string; description: string; image: string; }[];
}

interface SlideAdvanced {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
}

interface SlideStep {
  title: string;
  description: string;
  icon: LucideIcon;
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
        { title: "설치 & 설정 가져오기", description: "다른 IDE를 사용하고 있다면 설치 세팅을 그대로 가져올 수 있습니다", icon: Settings },
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
          name: "설정 가이드", 
          description: "모델 선택, 인덱싱, 룰 설정",
          icon: Settings,
          details: "프로젝트별 커스터마이징 가능",
          subSteps: [
            { title: "시작 화면", description: "Cursor AI 메인 화면", image: "/설정가이드/1.PNG" },
            { title: "설정 페이지", description: "설정 아이콘을 클릭하여 설정 페이지 진입", image: "/설정가이드/2.PNG" },
            { title: "모델 선택", description: "시중에 있는 거의 모든 AI 모델들을 연결할 수 있고 유명한 ChatGPT, Claude Sonnet, Gemini, DeepSeek 등을 직접 연결도 할 수 있습니다", image: "/설정가이드/3.PNG" },
            { title: "룰 설정", description: "룰은 크게 전역룰과 프로젝트 룰이 있고 전역룰은 모든 대화를 한글로 해달라는 것 등을 넣을 수 있고 프로젝트룰은 그 프로젝트마다의 고유한 설정이나 알아야 할 룰 같은 걸 넣는 룰", image: "/설정가이드/4.PNG" },
            { title: "룰 설정 상세", description: "룰 설정의 상세 화면으로 더 구체적인 설정이 가능합니다", image: "/설정가이드/5.PNG" },
            { title: "인덱싱", description: "인덱싱은 해당 프로젝트의 파일들을 읽어서 챗 에이전트와 대화할 때 해당 내용을 읽고 기억해서 원활하게 개발할 수 있게 하는 기능", image: "/설정가이드/6.PNG" }
          ]
        },
        { 
          name: "AI Chat", 
          description: "자연어로 코드 질문 및 수정 요청",
          icon: MessageSquare,
          details: "Cmd/Ctrl + L로 채팅 창 열기",
          subSteps: [
            { title: "채팅 시작하기", description: "Ctrl + L 로 열어서 시작하기", image: "/채팅가이드/0.PNG" },
            { title: "모델 선택", description: "다양한 AI 모델 중에서 선택할 수 있습니다. GPT-4, Claude Sonnet, Gemini 등 각 모델마다 고유한 특성과 강점이 있어 상황에 맞게 선택하여 사용할 수 있습니다", image: "/채팅가이드/1.PNG" },
            { title: "채팅 모드 선택", description: "Agent 모드: 복잡한 작업을 자율적으로 수행하는 자동화 도구. Ask 모드: 질문-응답 특화 읽기 전용 모드. Manual 모드: 사용자 주도의 정밀 편집 모드로 구체적 명령 수행", image: "/채팅가이드/2.PNG" },
            { title: "참조 태그 사용", description: "채팅할 때 @파일명, @폴더명, @코드블록 등을 태그하여 특정 파일이나 코드를 참조할 수 있습니다. 이를 통해 AI가 더 정확하고 맥락에 맞는 답변을 제공할 수 있습니다", image: "/채팅가이드/3.PNG" },
            { title: "문서 태그 활용", description: "README 문서나 기타 문서 파일을 태그하여 프로젝트의 Getting Started 가이드, 개발 서버 실행 방법, 배포 방법 등의 정보를 AI와 공유할 수 있습니다. 이를 통해 프로젝트 특화된 도움을 받을 수 있습니다", image: "/채팅가이드/4.PNG" }
          ]
        },
        { 
          name: "Tab 자동완성", 
          description: "AI가 예측하는 코드 자동완성",
          icon: Zap,
          details: "Tab 키로 AI 제안 코드 적용",
          subSteps: [
            { title: "변경 사항 확인 및 저장", description: "AI가 제안한 코드 변경 사항을 에디터에서 직접 확인할 수 있습니다. 변경된 부분은 하이라이트로 표시되며, 저장 전에 미리보기를 통해 코드를 검토할 수 있습니다", image: "/자동완성/1.PNG" },
            { title: "변경 위치 탐색 및 제어", description: "변경된 위치로 빠르게 이동할 수 있습니다. Ctrl+Enter로 변경 내용을 수락하고, Ctrl+Shift+Delete로 변경 사항을 취소할 수 있어 효율적인 코드 편집이 가능합니다", image: "/자동완성/2.PNG" },
            { title: "개별 변경 사항 선택", description: "각각의 변경 사항을 개별적으로 검토하고 선택할 수 있습니다. 필요한 변경 사항만 수락하고 불필요한 부분은 취소하여 정밀한 코드 편집을 수행할 수 있습니다", image: "/자동완성/3.PNG" },
            { title: "채팅창 변경 내역 관리", description: "모든 변경된 내용을 채팅창에서 한눈에 확인할 수 있습니다. 각 변경 사항에 대해 수락 또는 거부를 선택할 수 있어 체계적인 코드 리뷰와 관리가 가능합니다", image: "/자동완성/4.PNG" }
          ]
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
  const [currentFeatureSubStep, setCurrentFeatureSubStep] = useState(0);
  const isFeaturesSlide = () => slides[currentSlide]?.type === 'features';
  const getCurrentFeature = () => slides[currentSlide]?.content?.featuresList?.[currentSubStep];
  const hasFeatureSubSteps = () => {
    const feature = getCurrentFeature();
    return feature?.subSteps && feature.subSteps.length > 0;
  };
  const hasSubSteps = () => (isInstallationSlide() && slides[currentSlide]?.content?.steps) || (isFeaturesSlide() && slides[currentSlide]?.content?.featuresList);
  const maxSubSteps = () => {
    if (isInstallationSlide()) return slides[currentSlide].content.steps?.length || 0;
    if (isFeaturesSlide()) return slides[currentSlide].content.featuresList?.length || 0;
    return 0;
  };
  const maxFeatureSubSteps = () => getCurrentFeature()?.subSteps?.length || 0;

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

  // 키보드 단축키 (F11, ESC, 방향키)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
      } else if (event.key === 'Escape' && isFullscreen) {
        // ESC는 브라우저에서 자동으로 전체 화면을 종료함
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        nextSlide();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentSlide, currentSubStep, currentFeatureSubStep]);

  const nextSlide = () => {
    // Features 슬라이드에서 현재 기능에 서브스텝이 있는 경우
    if (isFeaturesSlide() && hasFeatureSubSteps() && currentFeatureSubStep < maxFeatureSubSteps() - 1) {
      setCurrentFeatureSubStep(currentFeatureSubStep + 1);
    } else if (hasSubSteps() && currentSubStep < maxSubSteps() - 1) {
      // 다음 기능으로 이동 또는 설치 페이지 서브 스텝 이동
      setCurrentSubStep(currentSubStep + 1);
      setCurrentFeatureSubStep(0);
    } else if (currentSlide < slides.length - 1) {
      // 다음 페이지로 이동
      setCurrentSlide(currentSlide + 1);
      setCurrentSubStep(0);
      setCurrentFeatureSubStep(0);
    }
  };

  const prevSlide = () => {
    // Features 슬라이드에서 현재 기능에 서브스텝이 있는 경우
    if (isFeaturesSlide() && hasFeatureSubSteps() && currentFeatureSubStep > 0) {
      setCurrentFeatureSubStep(currentFeatureSubStep - 1);
    } else if (hasSubSteps() && currentSubStep > 0) {
      // 이전 기능으로 이동 또는 설치 페이지 이전 서브 스텝으로 이동
      setCurrentSubStep(currentSubStep - 1);
      // 이전 기능에 서브스텝이 있다면 마지막 서브스텝으로
      if (isFeaturesSlide()) {
        const prevFeature = slides[currentSlide]?.content?.featuresList?.[currentSubStep - 1];
        setCurrentFeatureSubStep(prevFeature?.subSteps ? prevFeature.subSteps.length - 1 : 0);
      }
    } else if (currentSlide > 0) {
      // 이전 페이지로 이동
      setCurrentSlide(currentSlide - 1);
      const prevSlideSteps = slides[currentSlide - 1]?.type === 'installation' ? slides[currentSlide - 1].content.steps?.length || 0 : 
                            slides[currentSlide - 1]?.type === 'features' ? slides[currentSlide - 1].content.featuresList?.length || 0 : 0;
      setCurrentSubStep(prevSlideSteps > 0 ? prevSlideSteps - 1 : 0);
      setCurrentFeatureSubStep(0);
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
            "/다운로드.jfif", // 설치 - 다른 IDE에서 설정 가져오기
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
            
            {/* Current Step GIF - 설치 스텝이 아닐 때만 표시 */}
            {currentSubStep !== 1 && (
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
            )}

            {/* Current Step Info */}
            <motion.div
              key={`info-${currentSubStep}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`rounded-lg border max-w-7xl mx-auto ${
                currentSubStep === 1 
                  ? "bg-gradient-to-br from-blue-800/20 to-blue-900/20 border-blue-500/20 p-12 min-h-[400px] flex items-center justify-center"
                  : "bg-gradient-to-br from-blue-800/40 to-blue-900/40 border-blue-500/30 p-6"
              }`}
            >
              {/* 설치 스텝(인덱스 1)에서만 특별한 IDE 레이아웃 표시 */}
              {currentSubStep === 1 ? (
                <div className="flex items-center space-x-12 w-full">
                  {/* 왼쪽: IDE 이미지들 */}
                  <div className="flex flex-col space-y-8">
                    <h3 className="text-xl font-semibold text-white text-center mb-4">기존 IDE</h3>
                    <div className="flex flex-col space-y-6">
                      {/* 코드 IDE */}
                      <div className="w-20 h-20 bg-gray-800/50 rounded-lg overflow-hidden border border-gray-600/50">
                        <Image
                          src="/코드.jfif"
                          alt="코드 IDE"
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      
                      {/* 라이더 IDE */}
                      <div className="w-20 h-20 bg-gray-800/50 rounded-lg overflow-hidden border border-gray-600/50">
                        <Image
                          src="/라이더.jfif"
                          alt="라이더 IDE"
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      
                      {/* 비쥬얼 IDE */}
                      <div className="w-20 h-20 bg-gray-800/50 rounded-lg overflow-hidden border border-gray-600/50">
                        <Image
                          src="/비쥬얼.jfif"
                          alt="비쥬얼 IDE"
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* 오른쪽: 설명 컨테이너 */}
                  <div className="flex-1 bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-xl p-10 border border-gray-600/50">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="bg-blue-500/30 p-4 rounded-lg">
                        <Settings className="w-10 h-10 text-blue-300" />
                      </div>
                      <h3 className="text-3xl font-semibold text-white">설치 & 설정 가져오기</h3>
                    </div>
                    <div className="space-y-6">
                      <p className="text-gray-300 text-xl">다른 IDE를 사용하고 있다면 설치 세팅을 그대로 가져올 수 있습니다</p>
                      <ul className="space-y-4 text-lg text-gray-400">
                        <li className="flex items-center space-x-4">
                          <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                          <span>키보드 단축키 자동 매핑</span>
                        </li>
                        <li className="flex items-center space-x-4">
                          <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                          <span>테마 및 색상 설정 동기화</span>
                        </li>
                        <li className="flex items-center space-x-4">
                          <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                          <span>확장 프로그램 호환성 확인</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                // 기본 스텝 정보 레이아웃
                <>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-blue-500/30 p-3 rounded-lg">
                      {IconComponent && <IconComponent className="w-8 h-8 text-blue-300" />}
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{currentStep?.title}</h3>
                  </div>
                  <p className="text-gray-300 text-lg">{currentStep?.description}</p>
                </>
              )}
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
        const currentFeature = slide.content.featuresList?.[currentSubStep];
        const FeatureIconComponent = currentFeature?.icon;
        
        // 현재 기능에 서브스텝이 있는지 확인
        const hasCurrentFeatureSubSteps = currentFeature?.subSteps && currentFeature.subSteps.length > 0;
        const currentSubStepData = hasCurrentFeatureSubSteps ? currentFeature?.subSteps?.[currentFeatureSubStep] : null;
        
        // 각 기능별 이미지 매핑 (서브스텝이 없는 경우)
        const getFeatureImage = (featureIndex: number) => {
          const images = [
            "/Timeline 1.gif", // 설정 가이드 (서브스텝 없을 때)
            "/Timeline 1.gif", // AI Chat
            "/Timeline 2.gif"  // Tab 자동완성
          ];
          return images[featureIndex] || "/Timeline 1.gif";
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
                {currentFeature?.name} ({currentSubStep + 1}/{slide.content.featuresList?.length})
                {hasCurrentFeatureSubSteps && ` - ${currentSubStepData?.title} (${currentFeatureSubStep + 1}/${currentFeature?.subSteps?.length})`}
              </p>
            </motion.div>
            
            {/* 메인 콘텐츠: 왼쪽 이미지 + 오른쪽 기능 설명 */}
            <motion.div
              key={`feature-${currentSubStep}-${currentFeatureSubStep}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-12 max-w-none mx-auto"
            >
              {/* 왼쪽: 기능 이미지 */}
              <motion.div
                key={`${currentSubStep}-${currentFeatureSubStep}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[75%] bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-700"
              >
                <Image
                  src={hasCurrentFeatureSubSteps ? currentSubStepData?.image || getFeatureImage(currentSubStep) : getFeatureImage(currentSubStep)}
                  alt={`${currentFeature?.name} 가이드`}
                  width={3000}
                  height={2000}
                  className="object-contain w-full h-auto"
                  priority
                />
              </motion.div>
              
              {/* 오른쪽: 기능 설명 */}
              <div className="w-[25%] bg-gradient-to-r from-purple-800/60 to-purple-900/60 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="bg-purple-500/30 p-4 rounded-lg">
                    {FeatureIconComponent && <FeatureIconComponent className="w-10 h-10 text-purple-300" />}
                  </div>
                  <h3 className="text-3xl font-semibold text-white">
                    {hasCurrentFeatureSubSteps ? currentSubStepData?.title : currentFeature?.name}
                  </h3>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-300 text-xl">
                    {hasCurrentFeatureSubSteps ? currentSubStepData?.description : currentFeature?.description}
                  </p>
                  {!hasCurrentFeatureSubSteps && (
                    <div className="bg-purple-500/20 px-6 py-4 rounded-lg">
                      <p className="text-purple-200 text-lg font-medium">{currentFeature?.details}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {hasCurrentFeatureSubSteps ? (
                // 서브스텝 진행 상황
                currentFeature?.subSteps?.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentFeatureSubStep ? 'bg-purple-400' : 
                      index < currentFeatureSubStep ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  />
                ))
              ) : (
                // 메인 기능 진행 상황
                slide.content.featuresList?.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSubStep ? 'bg-purple-400' : 
                      index < currentSubStep ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  />
                ))
              )}
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
